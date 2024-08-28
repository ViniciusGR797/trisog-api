import { Request, Response } from "express";
import {
  FavoriteUpsert,
  FavoriteUpsertExtended,
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
      await FavoriteService.getFavoriteByUser(userId);
    if (getFavoriteError) {
      return res.status(500).json({ msg: getFavoriteError });
    }
    return res.status(200).json(favorite);
  }

  static async addFavorite(req: Request, res: Response): Promise<Response> {
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

    const { favorite: previousFavorite, error: getPreviousFavoriteError } =
      await FavoriteService.getFavoriteByUser(userId);
    if (getPreviousFavoriteError) {
      return res.status(500).json({ msg: getPreviousFavoriteError });
    }

    if (
      previousFavorite &&
      previousFavorite.experiences_id.includes(payload.experience_id)
    ) {
      return res.status(400).json({
        msg: "The specified experience already exists in the favorites list",
      });
    }

    const experienceId = payload.experience_id;
    if (!isValidObjectId(experienceId)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }
    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(experienceId);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const newPayload = new FavoriteUpsertExtended({
      ...payload,
      experiences_id: previousFavorite
        ? [...previousFavorite.experiences_id, payload.experience_id]
        : [payload.experience_id],
      user_id: userId,
    });

    const { favorite: upsertFavorite, error: upsertFavoriteError } =
      previousFavorite
        ? await FavoriteService.updateFavorite(previousFavorite.id, newPayload)
        : await FavoriteService.createFavorite(newPayload);
    if (upsertFavoriteError) {
      return res.status(500).json({ msg: upsertFavoriteError });
    }
    if (!upsertFavorite) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { favorite, error: getFavoriteError } =
      await FavoriteService.getFavoriteByUser(userId);
    if (getFavoriteError) {
      return res.status(500).json({ msg: getFavoriteError });
    }
    if (!favorite) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(favorite);
  }

  static async removeFavorite(req: Request, res: Response): Promise<Response> {
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
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const { favorite: previousFavorite, error: getPreviousFavoriteError } =
      await FavoriteService.getFavoriteByUser(userId);
    if (getPreviousFavoriteError) {
      return res.status(500).json({ msg: getPreviousFavoriteError });
    }
    if (!previousFavorite) {
      return res.status(400).json({
        msg: "No data found",
      });
    }
    if (previousFavorite.experiences_id.indexOf(experienceId) === -1) {
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const newPayload = new FavoriteUpsertExtended({
      ...previousFavorite,
      experience_id: experienceId,
      experiences_id: previousFavorite.experiences_id.filter(
        (experience_id: string) => experience_id !== experienceId
      ),
    });

    const { favorite: addedFavorite, error: addFavoriteError } =
      await FavoriteService.updateFavorite(previousFavorite.id, newPayload);
    if (addFavoriteError) {
      return res.status(500).json({ msg: addFavoriteError });
    }
    if (!addedFavorite) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json({ msg: "Successfully deleted from favorites" });
  }
}
