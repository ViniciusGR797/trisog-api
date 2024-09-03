import e, { Request, Response } from "express";
import { Ratings, Review, ReviewUpsert } from "../models/reviewModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { ReviewService } from "../services/reviewService";
import { ExperienceService } from "../services/experienceService";
import {
  CustomPrice,
  ExperienceUpsertExtended,
} from "../models/experienceModel";
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";

export class ReviewController {
  static async getReviews(req: Request, res: Response): Promise<Response> {
    const { reviews, error: getReviewsError } =
      await ReviewService.getReviews();
    if (getReviewsError) {
      return res.status(500).json({ msg: getReviewsError });
    }

    const emailCountMap: { [key: string]: number } = reviews
      ? reviews.reduce((acc: { [key: string]: number }, review) => {
          acc[review.email] = (acc[review.email] || 0) + 1;
          return acc;
        }, {})
      : {};

    const updatedReviews = reviews ? reviews.map((review) => ({
      ...review,
      user_review_count: emailCountMap[review.email],
    })) : [];

    return res.status(200).json(updatedReviews);
  }

  static async getReviewById(req: Request, res: Response): Promise<Response> {
    const reviewId = req.params.review_id;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const { review: reviewRaw, error: getReviewError } =
      await ReviewService.getReviewById(reviewId);
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!reviewRaw) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { reviews, error: getReviewsError } =
      await ReviewService.getReviews();
    if (getReviewsError) {
      return res.status(500).json({ msg: getReviewsError });
    }

    const emailCountMap: { [key: string]: number } = reviews
      ? reviews.reduce((acc: { [key: string]: number }, review) => {
          acc[review.email] = (acc[review.email] || 0) + 1;
          return acc;
        }, {})
      : {};

    const review = new Review({
      ...reviewRaw,
      user_review_count: emailCountMap[reviewRaw.email],
    });

    return res.status(200).json(review);
  }

  static async getReviewsByExperience(
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
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const { reviews, error: getReviewError } =
      await ReviewService.getReviewsByExperience(experienceId);
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!reviews) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { reviews: allReviews, error: getReviewsError } =
      await ReviewService.getReviews();
    if (getReviewsError) {
      return res.status(500).json({ msg: getReviewsError });
    }

    const emailCountMap: { [key: string]: number } = allReviews
      ? allReviews.reduce((acc: { [key: string]: number }, review) => {
          acc[review.email] = (acc[review.email] || 0) + 1;
          return acc;
        }, {})
      : {};

    const updatedReviews = reviews.map((review) => ({
      ...review,
      user_review_count: emailCountMap[review.email],
    }));

    return res.status(200).json(updatedReviews);
  }

  static async createReview(req: Request, res: Response): Promise<Response> {
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

    const newRating =
      experience.review_count === 0
        ? new Ratings({
            services: payload.ratings.services,
            location: payload.ratings.location,
            amenities: payload.ratings.amenities,
            prices: payload.ratings.prices,
            food: payload.ratings.food,
            room_comfort_and_quality: payload.ratings.room_comfort_and_quality,
          })
        : new Ratings({
            services:
              (Number((experience.ratings as JsonObject)?.services) *
                experience.review_count +
                payload.ratings.services) /
                experience.review_count +
              1,
            location:
              (Number((experience.ratings as JsonObject)?.location) *
                experience.review_count +
                payload.ratings.location) /
                experience.review_count +
              1,
            amenities:
              (Number((experience.ratings as JsonObject)?.amenities) *
                experience.review_count +
                payload.ratings.amenities) /
                experience.review_count +
              1,
            prices:
              (Number((experience.ratings as JsonObject)?.prices) *
                experience.review_count +
                payload.ratings.prices) /
                experience.review_count +
              1,
            food:
              (Number((experience.ratings as JsonObject)?.food) *
                experience.review_count +
                payload.ratings.food) /
                experience.review_count +
              1,
            room_comfort_and_quality:
              (Number(
                (experience.ratings as JsonObject)?.room_comfort_and_quality
              ) *
                experience.review_count +
                payload.ratings.room_comfort_and_quality) /
                experience.review_count +
              1,
          });

    const newExperience = new ExperienceUpsertExtended({
      ...experience,
      ratings: newRating,
      custom_prices: (experience.custom_prices as JsonArray)?.map((value) => {
        if (
          typeof value === "object" &&
          value !== null &&
          "date" in value &&
          "price" in value
        ) {
          return new CustomPrice({
            date: new Date(value.date as string),
            price: Number(value.price),
          });
        } else {
          return new CustomPrice({ date: new Date(), price: 0 });
        }
      }),
      review_count: experience.review_count + 1,
    });

    const { updatedExperience, error: updatedExperienceError } =
      await ExperienceService.updateExperience(experienceId, newExperience);
    if (updatedExperienceError) {
      return res.status(500).json({ msg: updatedExperienceError });
    }
    if (!updatedExperience) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { createdReviewId, error: createReviewError } =
      await ReviewService.createReview(payload);
    if (createReviewError) {
      return res.status(500).json({ msg: createReviewError });
    }
    if (!createdReviewId || createdReviewId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { review, error: getReviewError } = await ReviewService.getReviewById(
      createdReviewId
    );
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!review) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(review);
  }

  static async updateReview(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const reviewId = req.params.review_id;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const { review, error: getReviewError } = await ReviewService.getReviewById(
      reviewId
    );
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

  static async deleteReview(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const reviewId = req.params.review_id;
    if (!isValidObjectId(reviewId)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const { review, error: getReviewError } = await ReviewService.getReviewById(
      reviewId
    );
    if (getReviewError) {
      return res.status(500).json({ msg: getReviewError });
    }
    if (!review) {
      return res.status(404).json({ msg: "No data found" });
    }

    const experienceId = review.experience_id;
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

    const { reviews, error: getReviewsError } =
      await ReviewService.getReviewsByExperience(experienceId);
    if (getReviewsError) {
      return res.status(500).json({ msg: getReviewsError });
    }
    if (!reviews) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedReview, error: deletedReviewError } =
      await ReviewService.deleteReview(reviewId);
    if (deletedReviewError) {
      return res.status(500).json({ msg: deletedReviewError });
    }

    const totalRatings: Ratings = {
      services: 0,
      location: 0,
      amenities: 0,
      prices: 0,
      food: 0,
      room_comfort_and_quality: 0,
    };

    reviews.forEach((review) => {
      totalRatings.services += Number((review.ratings as JsonObject)?.services);
      totalRatings.location += Number((review.ratings as JsonObject)?.location);
      totalRatings.amenities += Number(
        (review.ratings as JsonObject)?.amenities
      );
      totalRatings.prices += Number((review.ratings as JsonObject)?.prices);
      totalRatings.food += Number((review.ratings as JsonObject)?.food);
      totalRatings.room_comfort_and_quality += Number(
        (review.ratings as JsonObject)?.room_comfort_and_quality
      );
    });

    const numberOfReviews = reviews.length;

    const newRating =
      experience.review_count <= 1
        ? new Ratings({
            services: 0,
            location: 0,
            amenities: 0,
            prices: 0,
            food: 0,
            room_comfort_and_quality: 0,
          })
        : new Ratings({
            services: totalRatings.services / numberOfReviews,
            location: totalRatings.location / numberOfReviews,
            amenities: totalRatings.amenities / numberOfReviews,
            prices: totalRatings.prices / numberOfReviews,
            food: totalRatings.food / numberOfReviews,
            room_comfort_and_quality:
              totalRatings.room_comfort_and_quality / numberOfReviews,
          });

    const newExperience = new ExperienceUpsertExtended({
      ...experience,
      ratings: newRating,
      custom_prices: (experience.custom_prices as JsonArray)?.map((value) => {
        if (
          typeof value === "object" &&
          value !== null &&
          "date" in value &&
          "price" in value
        ) {
          return new CustomPrice({
            date: new Date(value.date as string),
            price: Number(value.price),
          });
        } else {
          return new CustomPrice({ date: new Date(), price: 0 });
        }
      }),
      review_count: experience.review_count - 1,
    });

    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
