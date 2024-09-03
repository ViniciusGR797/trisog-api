import { Request, Response } from "express";
import {
  Experience,
  ExperienceUpsert,
  ExperienceUpsertExtended,
  PaginatedExperiences,
} from "../models/experienceModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { ExperienceService } from "../services/experienceService";
import { DestinationService } from "../services/destinationService";
import { CategoryService } from "../services/categoryService";
import { PlanService } from "../services/planService";
import {
  Destination,
  DestinationUpsertExtended,
  Weather,
} from "../models/destinationModel";
import { Category, CategoryUpsertExtended } from "../models/categoryModel";
import { createQueryOptions } from "../utils/queryOptions";
import { Plan } from "../models/planModel";
import { Ratings } from "../models/reviewModel";
import { JsonObject } from "@prisma/client/runtime/library";
import { FavoriteService } from "../services/favoriteService";

interface WeatherJson {
  jan_feb?: WeatherPeriodJson;
  mar_apr?: WeatherPeriodJson;
  may_jun?: WeatherPeriodJson;
  jul_aug?: WeatherPeriodJson;
  sep_oct?: WeatherPeriodJson;
  nov_dec?: WeatherPeriodJson;
}

interface WeatherPeriodJson {
  min?: number;
  max?: number;
}

export class ExperienceController {
  static async getExperiences(req: Request, res: Response): Promise<Response> {
    const { queryOptions, error: queryOptionsError } = createQueryOptions(
      req.query
    );
    if (queryOptionsError) {
      return res.status(400).json({ msg: queryOptionsError });
    }
    if (!queryOptions) {
      return res.status(400).json({ msg: "Invalid query options" });
    }

    const { experiences: experiencesRaw, error: getExperiencesError } =
      await ExperienceService.getExperiences(queryOptions);
    if (getExperiencesError) {
      return res.status(500).json({ msg: getExperiencesError });
    }
    if (!experiencesRaw) {
      return res.status(200).json(experiencesRaw);
    }

    const { experiences: _, ...remainingExperiencesRaw } = experiencesRaw;
    const experiences = new PaginatedExperiences({
      ...remainingExperiencesRaw,
      experiences: [],
    });

    for (const experienceRaw of experiencesRaw?.experiences || []) {
      const {
        categories_id,
        plans_id,
        destination_id,
        ...remainingExperienceRaw
      } = experienceRaw;
      let categories: Category[] = [];
      let plans: Plan[] = [];
      let destination: Destination = {} as Destination;

      for (const categoryId of categories_id) {
        const { category, error: getCategoryError } =
          await CategoryService.getCategoryById(categoryId);
        if (getCategoryError) {
          return res.status(500).json({ msg: getCategoryError });
        }
        if (!category) {
          return res.status(404).json({
            msg: `No category found for experience ID ${experienceRaw.id}`,
          });
        }
        categories.push(category);
      }

      for (const planId of plans_id) {
        const { plan, error: getPlanError } = await PlanService.getPlanById(
          planId
        );
        if (getPlanError) {
          return res.status(500).json({ msg: getPlanError });
        }
        if (!plan) {
          return res.status(404).json({
            msg: `No plan found for experience ID ${experienceRaw.id}`,
          });
        }
        plans.push(plan);
      }

      if (destination_id) {
        const { destination: getDestination, error: getDestinationError } =
          await DestinationService.getDestinationById(destination_id);
        if (getDestinationError) {
          return res.status(500).json({ msg: getDestinationError });
        }
        if (!getDestination) {
          return res.status(404).json({
            msg: `No destination found for experience ID ${experienceRaw.id}`,
          });
        }

        destination = getDestination;
      }

      const experience = new Experience({
        ...remainingExperienceRaw,
        categories,
        plans,
        destination,
      });

      experiences.experiences.push(experience);
    }

    return res.status(200).json(experiences);
  }

  static async getExperiencesUserFavorites(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { queryOptions, error: queryOptionsError } = createQueryOptions(
      req.query
    );
    if (queryOptionsError) {
      return res.status(400).json({ msg: queryOptionsError });
    }
    if (!queryOptions) {
      return res.status(400).json({ msg: "Invalid query options" });
    }

    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const { favorites, error: getFavoriteError } =
      await FavoriteService.getFavoritesByUser(userId);
    if (getFavoriteError) {
      return res.status(500).json({ msg: getFavoriteError });
    }
    if (!favorites) {
      return res.status(200).json([]);
    }

    const experienceIds = favorites.map(
      (experience) => experience.experience_id
    );

    const { experiences: experiencesRaw, error: getExperiencesError } =
      await ExperienceService.getExperiencesUserFavorites(
        queryOptions,
        experienceIds
      );
    if (getExperiencesError) {
      return res.status(500).json({ msg: getExperiencesError });
    }
    if (!experiencesRaw) {
      return res.status(200).json(experiencesRaw);
    }

    const { experiences: _, ...remainingExperiencesRaw } = experiencesRaw;
    const experiences = new PaginatedExperiences({
      ...remainingExperiencesRaw,
      experiences: [],
    });

    for (const experienceRaw of experiencesRaw?.experiences || []) {
      const {
        categories_id,
        plans_id,
        destination_id,
        ...remainingExperienceRaw
      } = experienceRaw;
      let categories: Category[] = [];
      let plans: Plan[] = [];
      let destination: Destination = {} as Destination;

      for (const categoryId of categories_id) {
        const { category, error: getCategoryError } =
          await CategoryService.getCategoryById(categoryId);
        if (getCategoryError) {
          return res.status(500).json({ msg: getCategoryError });
        }
        if (!category) {
          return res.status(404).json({
            msg: `No category found for experience ID ${experienceRaw.id}`,
          });
        }
        categories.push(category);
      }

      for (const planId of plans_id) {
        const { plan, error: getPlanError } = await PlanService.getPlanById(
          planId
        );
        if (getPlanError) {
          return res.status(500).json({ msg: getPlanError });
        }
        if (!plan) {
          return res.status(404).json({
            msg: `No plan found for experience ID ${experienceRaw.id}`,
          });
        }
        plans.push(plan);
      }

      if (destination_id) {
        const { destination: getDestination, error: getDestinationError } =
          await DestinationService.getDestinationById(destination_id);
        if (getDestinationError) {
          return res.status(500).json({ msg: getDestinationError });
        }
        if (!getDestination) {
          return res.status(404).json({
            msg: `No destination found for experience ID ${experienceRaw.id}`,
          });
        }

        destination = getDestination;
      }

      const experience = new Experience({
        ...remainingExperienceRaw,
        categories,
        plans,
        destination,
      });

      experiences.experiences.push(experience);
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

    const { experience: experienceRaw, error: getExperienceError } =
      await ExperienceService.getExperienceById(experienceId);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experienceRaw) {
      return res.status(404).json({ msg: "No data found" });
    }

    const {
      categories_id,
      plans_id,
      destination_id,
      ...remainingExperienceRaw
    } = experienceRaw;
    let categories: Category[] = [];
    let plans: Plan[] = [];
    let destination: Destination = {} as Destination;

    for (const categoryId of categories_id) {
      const { category, error: getCategoryError } =
        await CategoryService.getCategoryById(categoryId);
      if (getCategoryError) {
        return res.status(500).json({ msg: getCategoryError });
      }
      if (!category) {
        return res.status(404).json({
          msg: "No category found",
        });
      }
      categories.push(category);
    }

    for (const planId of plans_id) {
      const { plan, error: getPlanError } = await PlanService.getPlanById(
        planId
      );
      if (getPlanError) {
        return res.status(500).json({ msg: getPlanError });
      }
      if (!plan) {
        return res.status(404).json({
          msg: "No plan found",
        });
      }
      plans.push(plan);
    }

    if (destination_id) {
      const { destination: getDestination, error: getDestinationError } =
        await DestinationService.getDestinationById(destination_id);
      if (getDestinationError) {
        return res.status(500).json({ msg: getDestinationError });
      }
      if (!getDestination) {
        return res.status(404).json({
          msg: "No destination found",
        });
      }

      destination = getDestination;
    }

    const experience = new Experience({
      ...remainingExperienceRaw,
      categories,
      plans,
      destination,
    });

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
      ratings: new Ratings({
        services: 0,
        location: 0,
        amenities: 0,
        prices: 0,
        food: 0,
        room_comfort_and_quality: 0,
      }),
      review_count: 0,
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
        jan_feb: {
          min: Number(
            (weather as WeatherJson)?.jan_feb?.min ?? 0
          ),
          max: Number(
            (weather as WeatherJson)?.jan_feb?.max ?? 0
          ),
        },
        mar_apr: {
          min: Number(
            (weather as WeatherJson)?.mar_apr?.min ?? 0
          ),
          max: Number(
            (weather as WeatherJson)?.mar_apr?.max ?? 0
          ),
        },
        may_jun: {
          min: Number(
            (weather as WeatherJson)?.may_jun?.min ?? 0
          ),
          max: Number(
            (weather as WeatherJson)?.may_jun?.max ?? 0
          ),
        },
        jul_aug: {
          min: Number(
            (weather as WeatherJson)?.jul_aug?.min ?? 0
          ),
          max: Number(
            (weather as WeatherJson)?.jul_aug?.max ?? 0
          ),
        },
        sep_oct: {
          min: Number(
            (weather as WeatherJson)?.sep_oct?.min ?? 0
          ),
          max: Number(
            (weather as WeatherJson)?.sep_oct?.max ?? 0
          ),
        },
        nov_dec: {
          min: Number(
            (weather as WeatherJson)?.nov_dec?.min ?? 0
          ),
          max: Number(
            (weather as WeatherJson)?.nov_dec?.max ?? 0
          ),
        },
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
      ratings: new Ratings({
        services: Number((experience.ratings as JsonObject)?.services) || 0,
        location: Number((experience.ratings as JsonObject)?.location) || 0,
        amenities: Number((experience.ratings as JsonObject)?.amenities) || 0,
        prices: Number((experience.ratings as JsonObject)?.prices) || 0,
        food: Number((experience.ratings as JsonObject)?.food) || 0,
        room_comfort_and_quality:
          Number(
            (experience.ratings as JsonObject)?.room_comfort_and_quality
          ) || 0,
      }),
      review_count: experience.review_count,
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
      if (category.travel_count > 0) {
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
          jan_feb: {
            min: Number(
              (weather as WeatherJson)?.jan_feb?.min ?? 0
            ),
            max: Number(
              (weather as WeatherJson)?.jan_feb?.max ?? 0
            ),
          },
          mar_apr: {
            min: Number(
              (weather as WeatherJson)?.mar_apr?.min ?? 0
            ),
            max: Number(
              (weather as WeatherJson)?.mar_apr?.max ?? 0
            ),
          },
          may_jun: {
            min: Number(
              (weather as WeatherJson)?.may_jun?.min ?? 0
            ),
            max: Number(
              (weather as WeatherJson)?.may_jun?.max ?? 0
            ),
          },
          jul_aug: {
            min: Number(
              (weather as WeatherJson)?.jul_aug?.min ?? 0
            ),
            max: Number(
              (weather as WeatherJson)?.jul_aug?.max ?? 0
            ),
          },
          sep_oct: {
            min: Number(
              (weather as WeatherJson)?.sep_oct?.min ?? 0
            ),
            max: Number(
              (weather as WeatherJson)?.sep_oct?.max ?? 0
            ),
          },
          nov_dec: {
            min: Number(
              (weather as WeatherJson)?.nov_dec?.min ?? 0
            ),
            max: Number(
              (weather as WeatherJson)?.nov_dec?.max ?? 0
            ),
          },
        }),
        image: destination.images[0],
      });
      const { updatedDestination, error: updatedDestinationError } =
        await DestinationService.updateDestination(
          destination.id,
          newDestination
        );
      if (updatedDestinationError) {
        return res.status(500).json({ msg: updatedDestinationError });
      }
    }

    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
