import { Testimonial, TestimonialUpsert } from "../models/testimonialModel";
import prismaClient from "../utils/database";

export class TestimonialService {
  static async getTestimonials(): Promise<{
    testimonials: Testimonial[] | null;
    error: string | null;
  }> {
    try {
      const testimonials = await prismaClient.testimonial.findMany();

      return { testimonials, error: null };
    } catch (error) {
      console.error("Error retrieving testimonial: ", error);
      return { testimonials: null, error: "Internal Server Error" };
    }
  }

  static async getTestimonialById(
    testimonialId: string
  ): Promise<{ testimonial: Testimonial | null; error: string | null }> {
    try {
      const testimonial = await prismaClient.testimonial.findUnique({
        where: {
          id: testimonialId,
        },
      });

      if (testimonial) {
        return { testimonial, error: null };
      } else {
        return { testimonial: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for testimonial by ID: ", error);
      return { testimonial: null, error: "Internal server error" };
    }
  }

  static async createTestimonial(
    newData: TestimonialUpsert
  ): Promise<{ createdTestimonialId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.testimonial.create({
        data: {
          message: newData.message,
          author: newData.author,
        },
      });

      return { createdTestimonialId: result.id, error: null };
    } catch (error) {
      console.error("Error creating testimonial: ", error);
      return { createdTestimonialId: null, error: "Internal server error" };
    }
  }

  static async updateTestimonial(
    testimonialId: string,
    updatedData: TestimonialUpsert
  ): Promise<{ updatedTestimonial: Testimonial | null; error: string | null }> {
    try {
      const result = await prismaClient.testimonial.update({
        where: {
          id: testimonialId,
        },
        data: {
          message: updatedData.message,
          author: updatedData.author
        },
      });

      return { updatedTestimonial: result, error: null };
    } catch (error) {
      console.log("Error updating testimonial:", error);
      return { updatedTestimonial: null, error: "Internal server error" };
    }
  }

  static async deleteTestimonial(
    testimonialId: string
  ): Promise<{ deletedTestimonial: Testimonial | null; error: string | null }> {
    try {
      const result = await prismaClient.testimonial.delete({
        where: {
          id: testimonialId,
        },
      });
      return { deletedTestimonial: result, error: null };
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      return { deletedTestimonial: null, error: "Internal server error" };
    }
  }
}
