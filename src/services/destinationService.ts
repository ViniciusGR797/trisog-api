import { Destination, DestinationExtended } from "../models/destinationModel";
import prismaClient from "../utils/database";

export class DestinationService {
  static async getDestinations(): Promise<{
    destinations: Destination[] | null;
    error: string | null;
  }> {
    try {
      const destinations = await prismaClient.destination.findMany();

      return { destinations, error: null };
    } catch (error) {
      console.error("Error retrieving destination: ", error);
      return { destinations: null, error: "Internal Server Error" };
    }
  }

  static async getDestinationById(
    destinationId: string
  ): Promise<{ destination: Destination | null; error: string | null }> {
    try {
      const destination = await prismaClient.destination.findUnique({
        where: {
          id: destinationId,
        },
      });

      if (destination) {
        return { destination, error: null };
      } else {
        return { destination: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for destination by ID: ", error);
      return { destination: null, error: "Internal server error" };
    }
  }
  
  static async countExperiencesByDestination(
    destinationId: string
  ): Promise<{ count: number; error: string | null }> {
    try {
      const count = await prismaClient.experience.count({
        where: {
          destination_id: destinationId,
        },
      });

      return { count, error: null };
    } catch (error) {
      console.error("Error in counting experience by destination: ", error);
      return { count: 0, error: "Internal Server Error" };
    }
  }

  static async createDestination(
    newData: DestinationExtended
  ): Promise<{ createdDestinationId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.destination.create({
        data: {
          name: newData.name,
          about: newData.about,
          continent: newData.continent,
          map_link: newData.map_link,
          language: newData.language,
          currency: newData.currency,
          area: newData.area,
          population: newData.population,
          time_zone: newData.time_zone,
          time_to_travel: newData.time_to_travel,
          images: newData.images,
          weather: {
            jan_fev: newData.weather.jan_fev,
            mar_apr: newData.weather.mar_apr,
            may_jun: newData.weather.may_jun,
            jul_ago: newData.weather.jul_ago,
            sep_oct: newData.weather.sep_oct,
            nov_dec: newData.weather.nov_dec
          },
          travel_count: newData.travel_count
        }
      });

      return { createdDestinationId: result.id, error: null };
    } catch (error) {
      console.error("Error creating destination: ", error);
      return { createdDestinationId: null, error: "Internal server error" };
    }
  }

    static async updateDestination(
      destinationId: string,
      updatedData: DestinationExtended
    ): Promise<{ updatedDestination: Destination | null; error: string | null }> {
      try {
        const result = await prismaClient.destination.update({
          where: {
            id: destinationId
          },
          data: {
            name: updatedData.name,
            about: updatedData.about,
            continent: updatedData.continent,
            map_link: updatedData.map_link,
            language: updatedData.language,
            currency: updatedData.currency,
            area: updatedData.area,
            population: updatedData.population,
            time_zone: updatedData.time_zone,
            time_to_travel: updatedData.time_to_travel,
            images: updatedData.images,
            weather: {
              jan_fev: updatedData.weather.jan_fev,
              mar_apr: updatedData.weather.mar_apr,
              may_jun: updatedData.weather.may_jun,
              jul_ago: updatedData.weather.jul_ago,
              sep_oct: updatedData.weather.sep_oct,
              nov_dec: updatedData.weather.nov_dec
            },
            travel_count: updatedData.travel_count
          }
        });

        return { updatedDestination: result, error: null };
      } catch (error) {
        console.log("Error updating destination:", error);
        return { updatedDestination: null, error: "Internal server error" };
      }
    }

    static async deleteDestination(
      destinationId: string
    ): Promise<{ deletedDestination: Destination | null; error: string | null }> {
      try {
        const result = await prismaClient.destination.delete({
          where: {
            id: destinationId
          },
        });
        return { deletedDestination: result, error: null };
      } catch (error) {
        console.error("Error deleting destination:", error);
        return { deletedDestination: null, error: "Internal server error" };
      }
    }
}
