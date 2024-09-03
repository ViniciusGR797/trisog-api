import { Destination, DestinationUpsertExtended } from "../models/destinationModel";
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
    newData: DestinationUpsertExtended
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
            jan_feb: {
              min: newData.weather.jan_feb.min,
              max: newData.weather.jan_feb.max,
            },
            mar_apr: {
              min: newData.weather.mar_apr.min,
              max: newData.weather.mar_apr.max,
            },
            may_jun: {
              min: newData.weather.may_jun.min,
              max: newData.weather.may_jun.max,
            },
            jul_aug: {
              min: newData.weather.jul_aug.min,
              max: newData.weather.jul_aug.max,
            },
            sep_oct: {
              min: newData.weather.sep_oct.min,
              max: newData.weather.sep_oct.max,
            },
            nov_dec: {
              min: newData.weather.nov_dec.min,
              max: newData.weather.nov_dec.max,
            }
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
      updatedData: DestinationUpsertExtended
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
              jan_feb: {
                min: updatedData.weather.jan_feb.min,
                max: updatedData.weather.jan_feb.max,
              },
              mar_apr: {
                min: updatedData.weather.mar_apr.min,
                max: updatedData.weather.mar_apr.max,
              },
              may_jun: {
                min: updatedData.weather.may_jun.min,
                max: updatedData.weather.may_jun.max,
              },
              jul_aug: {
                min: updatedData.weather.jul_aug.min,
                max: updatedData.weather.jul_aug.max,
              },
              sep_oct: {
                min: updatedData.weather.sep_oct.min,
                max: updatedData.weather.sep_oct.max,
              },
              nov_dec: {
                min: updatedData.weather.nov_dec.min,
                max: updatedData.weather.nov_dec.max,
              }
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
