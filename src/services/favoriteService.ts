import { Favorite, FavoriteUpsertExtended } from "../models/favoriteModel";
import prismaClient from "../utils/database";

export class FavoriteService {
  static async getFavoriteByUser(
    userId: string
  ): Promise<{ favorite: Favorite | null; error: string | null }> {
    try {
      const favorite = await prismaClient.favorite.findFirst({
        where: {
          user_id: userId,
        },
      });

      if (favorite) {
        return { favorite, error: null };
      } else {
        return { favorite: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for favorite by ID: ", error);
      return { favorite: null, error: "Internal server error" };
    }
  }

  static async createFavorite(
    newData: FavoriteUpsertExtended
  ): Promise<{ favorite: Favorite | null; error: string | null }> {
    try {
      const result = await prismaClient.favorite.create({
        data: {
          experiences_id: newData.experiences_id,
          user_id: newData.user_id,
        },
      });

      return { favorite: result, error: null };
    } catch (error) {
      console.error("Error saving favorite: ", error);
      return { favorite: null, error: "Internal server error" };
    }
  }

  static async updateFavorite(
    favoriteId: string,
    updatedData: FavoriteUpsertExtended
  ): Promise<{ favorite: Favorite | null; error: string | null }> {
    try {
      const result = await prismaClient.favorite.update({
        where: {
          id: favoriteId,
        },
        data: {
          experiences_id: updatedData.experiences_id,
          user_id: updatedData.user_id,
        },
      });

      return { favorite: result, error: null };
    } catch (error) {
      console.error("Error updating favorite: ", error);
      return { favorite: null, error: "Internal server error" };
    }
  }
}
