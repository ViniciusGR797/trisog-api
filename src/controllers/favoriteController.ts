import { Request, Response } from "express";
import {
  FavoriteUpsert,
} from "../models/favoriteModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { FavoriteService } from "../services/favoriteService";
import { ExperienceService } from "../services/experienceService";

export class FavoriteController {
  static async getFavorite(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const { favorite, error: getFavoriteError } =
      await FavoriteService.getFavoritesByUser(userId);
    if (getFavoriteError) {
      return res.status(500).json({ msg: getFavoriteError });
    }
    return res.status(200).json(favorite);
  }

  static async createFavorite(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new FavoriteUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const experienceId = payload.experience_id;
    if (!isValidObjectId(experienceId)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }
    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(payload.experience_id);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const { favorite: previousFavorite, error: getPreviousError } =
      await FavoriteService.getFavoriteByUser(payload.experience_id, userId);
    if (getPreviousError) {
      return res.status(500).json({ msg: getPreviousError });
    }
    if (previousFavorite) {
      return res.status(400).json({
        msg: "The specified experience already exists in the favorites list",
      });
    }

    const { createdFavoriteId, error: createFavoriteError } =
      await FavoriteService.createFavorite(payload, userId);
    if (createFavoriteError) {
      return res.status(500).json({ msg: createFavoriteError });
    }
    if (!createdFavoriteId || createdFavoriteId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { favorite, error: getFavoriteError } =
      await FavoriteService.getFavoriteById(createdFavoriteId);
    if (getFavoriteError) {
      return res.status(500).json({ msg: getFavoriteError });
    }
    if (!favorite) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(favorite);
  }

  static async deleteFavorite(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const experienceId = req.params.experience_id;
    if (!isValidObjectId(experienceId)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }

    const { favorite, error: getFavoriteError } =
      await FavoriteService.getFavoriteByUser(experienceId, userId);
    if (getFavoriteError) {
      return res.status(500).json({ msg: getFavoriteError });
    }
    if (!favorite) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedFavorite, error: deletedFavoriteError } =
      await FavoriteService.deleteFavorite(favorite.id);
    if (deletedFavoriteError) {
      return res.status(500).json({ msg: deletedFavoriteError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
