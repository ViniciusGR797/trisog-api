import { Request, Response } from "express";
import { ReviewUpsert } from "../models/reviewModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { ReviewService } from "../services/reviewService";
import { ExperienceService } from "../services/experienceService";

export class ReviewController {
  static async getReviews(req: Request, res: Response): Promise<Response> {
    const { reviews, error: getReviewsError } =
      await ReviewService.getReviews();
    if (getReviewsError) {
      return res.status(500).json({ msg: getReviewsError });
    }

    return res.status(200).json(reviews);
  }

  static async getReviewById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const reviewId = req.params.review_id;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const { review, error: getReviewError } =
      await ReviewService.getReviewById(reviewId);
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!review) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(review);
  }

  static async createReview(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new ReviewUpsert(req.body);
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

    const { createdReviewId, error: createReviewError } =
      await ReviewService.createReview(payload);
    if (createReviewError) {
      return res.status(500).json({ msg: createReviewError });
    }
    if (!createdReviewId || createdReviewId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { review, error: getReviewError } =
      await ReviewService.getReviewById(createdReviewId);
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!review) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(review);
  }

  static async updateReview(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const reviewId = req.params.review_id;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const { review, error: getReviewError } =
      await ReviewService.getReviewById(reviewId);
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!review) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new ReviewUpsert(req.body);
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

    const { updatedReview, error: updatedReviewError } =
      await ReviewService.updateReview(reviewId, payload);
    if (updatedReviewError) {
      return res.status(500).json({ msg: updatedReviewError });
    }
    if (!updatedReview) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedReview);
  }

  static async deleteReview(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const reviewId = req.params.review_id;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const { review, error: getReviewError } =
      await ReviewService.getReviewById(reviewId);
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!review) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedReview, error: deletedReviewError } =
      await ReviewService.deleteReview(reviewId);
    if (deletedReviewError) {
      return res.status(500).json({ msg: deletedReviewError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
