import {
  ExperienceRaw,
  ExperienceUpsertExtended,
} from "../models/experienceModel";
import prismaClient from "../utils/database";

export class ExperienceService {
  static async getExperiences(): Promise<{
    experiences: ExperienceRaw[] | null;
    error: string | null;
  }> {
    try {
      const experiences = await prismaClient.experience.findMany();

      return { experiences, error: null };
    } catch (error) {
      console.error("Error retrieving experience: ", error);
      return { experiences: null, error: "Internal Server Error" };
    }
  }

  static async getExperienceById(
    experienceId: string
  ): Promise<{ experience: ExperienceRaw | null; error: string | null }> {
    try {
      const experience = await prismaClient.experience.findUnique({
        where: {
          id: experienceId,
        },
      });

      if (experience) {
        return { experience, error: null };
      } else {
        return { experience: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for experience by ID: ", error);
      return { experience: null, error: "Internal server error" };
    }
  }

  static async createExperience(
    newData: ExperienceUpsertExtended
  ): Promise<{ createdExperienceId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.experience.create({
        data: {
          name: newData.name,
          city: newData.city,
          image: newData.image,
          video: newData.video,
          gallery: newData.gallery,
          map_link: newData.map_link,
          start_date: newData.start_date,
          end_date: newData.end_date,
          duration: newData.duration,
          is_activity: newData.is_activity,
          max_people: newData.max_people,
          min_age: newData.min_age,
          over_view: newData.over_view,
          include: newData.include,
          exclude: newData.exclude,
          rating: newData.rating,
          default_price: newData.default_price,
          custom_prices: newData.custom_prices?.map(({ date, price }) => ({
            date,
            price,
          })),
          categories_id: newData.categories_id,
          plans_id: newData.plans_id,
          destination_id: newData.destination_id,
        },
      });

      return { createdExperienceId: result.id, error: null };
    } catch (error) {
      console.error("Error creating experience: ", error);
      return { createdExperienceId: null, error: "Internal server error" };
    }
  }

  static async updateExperience(
    experienceId: string,
    updatedData: ExperienceUpsertExtended
  ): Promise<{
    updatedExperience: ExperienceRaw | null;
    error: string | null;
  }> {
    try {
      const result = await prismaClient.experience.update({
        where: {
          id: experienceId,
        },
        data: {
          name: updatedData.name,
          city: updatedData.city,
          image: updatedData.image,
          video: updatedData.video,
          gallery: updatedData.gallery,
          map_link: updatedData.map_link,
          start_date: updatedData.start_date,
          end_date: updatedData.end_date,
          duration: updatedData.duration,
          is_activity: updatedData.is_activity,
          max_people: updatedData.max_people,
          min_age: updatedData.min_age,
          over_view: updatedData.over_view,
          include: updatedData.include,
          exclude: updatedData.exclude,
          rating: updatedData.rating,
          default_price: updatedData.default_price,
          custom_prices: updatedData.custom_prices?.map(({ date, price }) => ({
            date,
            price,
          })),
          categories_id: updatedData.categories_id,
          plans_id: updatedData.plans_id,
          destination_id: updatedData.destination_id,
        },
      });

      return { updatedExperience: result, error: null };
    } catch (error) {
      console.log("Error updating experience:", error);
      return { updatedExperience: null, error: "Internal server error" };
    }
  }

  static async deleteExperience(experienceId: string): Promise<{
    deletedExperience: ExperienceRaw | null;
    error: string | null;
  }> {
    try {
      const result = await prismaClient.experience.delete({
        where: {
          id: experienceId,
        },
      });
      return { deletedExperience: result, error: null };
    } catch (error) {
      console.error("Error deleting experience:", error);
      return { deletedExperience: null, error: "Internal server error" };
    }
  }
}
