import { Review, ReviewUpsert } from "../models/reviewModel";
import prismaClient from "../utils/database";

export class ReviewService {
  static async getReviews(): Promise<{
    reviews: Review[] | null;
    error: string | null;
  }> {
    try {
      const reviews = await prismaClient.review.findMany();

      return { reviews, error: null };
    } catch (error) {
      console.error("Error retrieving review: ", error);
      return { reviews: null, error: "Internal Server Error" };
    }
  }

  static async getReviewById(
    reviewId: string
  ): Promise<{ review: Review | null; error: string | null }> {
    try {
      const review = await prismaClient.review.findUnique({
        where: {
          id: reviewId,
        },
      });

      if (review) {
        return { review, error: null };
      } else {
        return { review: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for review by ID: ", error);
      return { review: null, error: "Internal server error" };
    }
  }

  static async createReview(
    newData: ReviewUpsert
  ): Promise<{ createdReviewId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.review.create({
        data: {
          name: newData.name,
          email: newData.email,
          comment: newData.comment,
          image: newData.image,
          score: newData.score,
          experience_id: newData.experience_id,
        },
      });

      return { createdReviewId: result.id, error: null };
    } catch (error) {
      console.error("Error creating review: ", error);
      return { createdReviewId: null, error: "Internal server error" };
    }
  }

  static async updateReview(
    reviewId: string,
    updatedData: ReviewUpsert
  ): Promise<{ updatedReview: Review | null; error: string | null }> {
    try {
      const result = await prismaClient.review.update({
        where: {
          id: reviewId,
        },
        data: {
          name: updatedData.name,
          email: updatedData.email,
          comment: updatedData.comment,
          image: updatedData.image,
          score: updatedData.score,
          experience_id: updatedData.experience_id,
        },
      });

      return { updatedReview: result, error: null };
    } catch (error) {
      console.log("Error updating review:", error);
      return { updatedReview: null, error: "Internal server error" };
    }
  }

  static async deleteReview(
    reviewId: string
  ): Promise<{ deletedReview: Review | null; error: string | null }> {
    try {
      const result = await prismaClient.review.delete({
        where: {
          id: reviewId,
        },
      });
      return { deletedReview: result, error: null };
    } catch (error) {
      console.error("Error deleting review:", error);
      return { deletedReview: null, error: "Internal server error" };
    }
  }
}
