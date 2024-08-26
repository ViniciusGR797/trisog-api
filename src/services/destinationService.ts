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
    destination_id: string
  ): Promise<{ destination: Destination | null; error: string | null }> {
    try {
      const destination = await prismaClient.destination.findUnique({
        where: {
          id: destination_id,
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
    destination_id: string
  ): Promise<{ count: number; error: string | null }> {
    try {
      const count = await prismaClient.experience.count({
        where: {
          destination_id: destination_id,
        },
      });

      return { count, error: null };
    } catch (error) {
      console.error("Error in counting experience by destination: ", error);
      return { count: 0, error: "Internal Server Error" };
    }
  }

  static async createDestination(
    data: DestinationExtended
  ): Promise<{ createdDestinationId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.destination.create({
        data: {
          name: data.name,
          about: data.about,
          continent: data.continent,
          map_link: data.map_link,
          language: data.language,
          currency: data.currency,
          area: data.area,
          population: data.population,
          time_zone: data.time_zone,
          time_to_travel: data.time_to_travel,
          images: data.images,
          weather: {
            jan_fev: data.weather.jan_fev,
            mar_apr: data.weather.mar_apr,
            may_jun: data.weather.may_jun,
            jul_ago: data.weather.jul_ago,
            sep_oct: data.weather.sep_oct,
            nov_dec: data.weather.nov_dec
          },
          travel_count: data.travel_count
        }
      });

      return { createdDestinationId: result.id, error: null };
    } catch (error) {
      console.error("Error creating destination: ", error);
      return { createdDestinationId: null, error: "Internal server error" };
    }
  }

    static async updateDestination(
      destination_id: string,
      data: DestinationExtended
    ): Promise<{ updatedDestination: Destination | null; error: string | null }> {
      try {
        const result = await prismaClient.destination.update({
          where: {
            id: destination_id
          },
          data: {
            name: data.name,
            about: data.about,
            continent: data.continent,
            map_link: data.map_link,
            language: data.language,
            currency: data.currency,
            area: data.area,
            population: data.population,
            time_zone: data.time_zone,
            time_to_travel: data.time_to_travel,
            images: data.images,
            weather: {
              jan_fev: data.weather.jan_fev,
              mar_apr: data.weather.mar_apr,
              may_jun: data.weather.may_jun,
              jul_ago: data.weather.jul_ago,
              sep_oct: data.weather.sep_oct,
              nov_dec: data.weather.nov_dec
            },
            travel_count: data.travel_count
          }
        });

        return { updatedDestination: result, error: null };
      } catch (error) {
        console.log("Error updating destination:", error);
        return { updatedDestination: null, error: "Internal server error" };
      }
    }

    static async deleteDestination(
      destination_id: string
    ): Promise<{ deletedDestination: Destination | null; error: string | null }> {
      try {
        const result = await prismaClient.destination.delete({
          where: {
            id: destination_id
          },
        });
        return { deletedDestination: result, error: null };
      } catch (error) {
        console.error("Error deleting destination:", error);
        return { deletedDestination: null, error: "Internal server error" };
      }
    }
}
