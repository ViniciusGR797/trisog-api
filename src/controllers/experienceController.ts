import { Request, Response } from "express";
import {
  ExperienceUpsert,
  ExperienceUpsertExtended,
} from "../models/experienceModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { ExperienceService } from "../services/experienceService";
import { DestinationService } from "../services/destinationService";
import { CategoryService } from "../services/categoryService";
import { PlanService } from "../services/planService";
import { DestinationUpsertExtended, Weather } from "../models/destinationModel";
import { JsonObject } from "@prisma/client/runtime/library";
import { Category, CategoryUpsertExtended } from "../models/categoryModel";
import { Plan } from "../models/planModel";

export class ExperienceController {
  static async getExperiences(req: Request, res: Response): Promise<Response> {
    const { experiences, error: getExperiencesError } =
      await ExperienceService.getExperiences();
    if (getExperiencesError) {
      return res.status(500).json({ msg: getExperiencesError });
    }

    return res.status(200).json(experiences);
  }

  static async getExperienceById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const experienceId = req.params.experience_id;
    if (!isValidObjectId(experienceId)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }

    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(experienceId);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(experience);
  }

  static async createExperience(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new ExperienceUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      let errorMessage;

      if (firstError.constraints) {
        errorMessage = Object.values(firstError.constraints)[0];
      } else if (
        firstError.children &&
        firstError.children.length > 0 &&
        firstError.children[0].constraints
      ) {
        errorMessage = Object.values(firstError.children[0].constraints)[0];
      } else if (
        firstError.children &&
        firstError.children.length > 0 &&
        firstError.children[0].children &&
        firstError.children[0].children.length > 0 &&
        firstError.children[0].children[0].constraints
      ) {
        errorMessage = Object.values(
          firstError.children[0].children[0].constraints
        )[0];
      } else {
        errorMessage = "Invalid and/or incomplete parameters";
      }
      return res.status(400).json({ msg: errorMessage });
    }

    let categories: Category[] = [];
    for (const categoryId of payload.categories_id) {
      if (!isValidObjectId(categoryId)) {
        return res
          .status(400)
          .json({ msg: `Invalid category ID ${categoryId}` });
      }

      const { category, error: getCategoryError } =
        await CategoryService.getCategoryById(categoryId);
      if (getCategoryError) {
        return res.status(500).json({ msg: getCategoryError });
      }
      if (!category) {
        return res.status(400).json({
          msg: `The specified category ID ${categoryId} does not exist, please choose a valid category`,
        });
      }
      categories.push(category);
    }

    for (const planId of payload.plans_id) {
      if (!isValidObjectId(planId)) {
        return res.status(400).json({ msg: `Invalid plan ID: ${planId}` });
      }

      const { plan, error: getPlanError } = await PlanService.getPlanById(
        planId
      );
      if (getPlanError) {
        return res.status(500).json({ msg: getPlanError });
      }
      if (!plan) {
        return res.status(400).json({
          msg: `The specified plan ID ${planId} does not exist, please choose a valid plan`,
        });
      }
    }

    const destinationId = payload.destination_id;
    if (!isValidObjectId(destinationId)) {
      return res.status(400).json({ msg: "Invalid destination ID" });
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(payload.destination_id);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }
    if (!destination) {
      return res.status(400).json({
        msg: "The specified destination does not exist, please choose a valid destination",
      });
    }

    const newPayload = new ExperienceUpsertExtended({
      ...payload,
      rating: 0,
    });

    const { createdExperienceId, error: createExperienceError } =
      await ExperienceService.createExperience(newPayload);
    if (createExperienceError) {
      return res.status(500).json({ msg: createExperienceError });
    }
    if (!createdExperienceId || createdExperienceId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(createdExperienceId);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(404).json({ msg: "No data found" });
    }

    for (const category of categories) {
      category.travel_count += 1;
      const { id, ...remainingCategory } = category;
      const newCategory = new CategoryUpsertExtended({
        ...remainingCategory,
      });
      const { updatedCategory, error: updatedCategoryError } =
        await CategoryService.updateCategory(category.id, newCategory);
      if (updatedCategoryError) {
        return res.status(500).json({ msg: updatedCategoryError });
      }
    }

    destination.travel_count += 1;
    const { id, weather, ...remainingDestination } = destination;
    const newDestination = new DestinationUpsertExtended({
      ...remainingDestination,
      weather: new Weather({
        jan_feb: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
        mar_apr: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
        may_jun: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
        jul_aug: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
        sep_oct: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
        nov_dec: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
      }),
      image: destination.images[0],
    });
    const { updatedDestination, error: updatedDestinationError } =
      await DestinationService.updateDestination(destinationId, newDestination);
    if (updatedDestinationError) {
      return res.status(500).json({ msg: updatedDestinationError });
    }

    return res.status(201).json(experience);
  }

  static async updateExperience(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const experienceId = req.params.experience_id;
    if (!isValidObjectId(experienceId)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }

    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(experienceId);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new ExperienceUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    for (const categoryId of payload.categories_id) {
      if (!isValidObjectId(categoryId)) {
        return res
          .status(400)
          .json({ msg: `Invalid category ID ${categoryId}` });
      }

      const { category, error: getCategoryError } =
        await CategoryService.getCategoryById(categoryId);
      if (getCategoryError) {
        return res.status(500).json({ msg: getCategoryError });
      }
      if (!category) {
        return res.status(400).json({
          msg: `The specified category ID ${categoryId} does not exist, please choose a valid category`,
        });
      }
    }

    for (const planId of payload.plans_id) {
      if (!isValidObjectId(planId)) {
        return res.status(400).json({ msg: `Invalid plan ID: ${planId}` });
      }

      const { plan, error: getPlanError } = await PlanService.getPlanById(
        planId
      );
      if (getPlanError) {
        return res.status(500).json({ msg: getPlanError });
      }
      if (!plan) {
        return res.status(400).json({
          msg: `The specified plan ID ${planId} does not exist, please choose a valid plan`,
        });
      }
    }

    const destinationId = payload.destination_id;
    if (!isValidObjectId(destinationId)) {
      return res.status(400).json({ msg: "Invalid destination ID" });
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(payload.destination_id);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }
    if (!destination) {
      return res.status(400).json({
        msg: "The specified destination does not exist, please choose a valid destination",
      });
    }

    const newPayload = new ExperienceUpsertExtended({
      ...payload,
      rating: experience.rating,
    });

    const { updatedExperience, error: updatedExperienceError } =
      await ExperienceService.updateExperience(experienceId, newPayload);
    if (updatedExperienceError) {
      return res.status(500).json({ msg: updatedExperienceError });
    }
    if (!updatedExperience) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedExperience);
  }

  static async deleteExperience(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const experienceId = req.params.experience_id;
    if (!isValidObjectId(experienceId)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }

    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(experienceId);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedExperience, error: deletedExperienceError } =
      await ExperienceService.deleteExperience(experienceId);
    if (deletedExperienceError) {
      return res.status(500).json({ msg: deletedExperienceError });
    }

    let categories: Category[] = [];
    for (const categoryId of experience.categories_id) {

      const { category, error: getCategoryError } =
        await CategoryService.getCategoryById(categoryId);
      if (getCategoryError) {
        return res.status(500).json({ msg: getCategoryError });
      }
      if (category) {
        categories.push(category);
      }
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(experience.destination_id);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }

    for (const category of categories) {
      if (category.travel_count > 0){
        category.travel_count -= 1;
        const { id, ...remainingCategory } = category;
        const newCategory = new CategoryUpsertExtended({
          ...remainingCategory,
        });
        const { updatedCategory, error: updatedCategoryError } =
          await CategoryService.updateCategory(category.id, newCategory);
        if (updatedCategoryError) {
          return res.status(500).json({ msg: updatedCategoryError });
        }
      }
    }

    if (destination && destination.travel_count > 0) {
      destination.travel_count -= 1;
      const { id, weather, ...remainingDestination } = destination;
      const newDestination = new DestinationUpsertExtended({
        ...remainingDestination,
        weather: new Weather({
          jan_feb: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
          mar_apr: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
          may_jun: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
          jul_aug: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
          sep_oct: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
          nov_dec: typeof weather === 'object' && weather !== null && !Array.isArray(weather) ? Number(weather.jan_feb) : 0,
        }),
        image: destination.images[0],
      });
      const { updatedDestination, error: updatedDestinationError } =
        await DestinationService.updateDestination(destination.id, newDestination);
      if (updatedDestinationError) {
        return res.status(500).json({ msg: updatedDestinationError });
      }
    }

    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
