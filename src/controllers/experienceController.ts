import { Request, Response } from "express";
import {
  ExperienceUpsert,
  ExperienceUpsertExtended,
} from "../models/experienceModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { ExperienceService } from "../services/experienceService";

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
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
