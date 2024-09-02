import { Favorite, FavoriteUpsert } from "../models/favoriteModel";
import prismaClient from "../utils/database";

export class FavoriteService {
  static async getFavoritesByUser(
    userId: string
  ): Promise<{ favorites: Favorite[] | null; error: string | null }> {
    try {
      const favorites = await prismaClient.favorite.findMany({
        where: {
          user_id: userId,
        },
      });

      return { favorites, error: null };
    } catch (error) {
      console.error("Error when searching for favorite by user: ", error);
      return { favorites: null, error: "Internal server error" };
    }
  }

  static async getFavoriteByUser(
    experienceId: string,
    userId: string
  ): Promise<{ favorite: Favorite | null; error: string | null }> {
    try {
      const favorite = await prismaClient.favorite.findFirst({
        where: {
          experience_id: experienceId,
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

  static async getFavoriteById(
    favoriteId: string
  ): Promise<{ favorite: Favorite | null; error: string | null }> {
    try {
      const favorite = await prismaClient.favorite.findUnique({
        where: {
          id: favoriteId,
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
    newData: FavoriteUpsert,
    userId: string
  ): Promise<{ createdFavoriteId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.favorite.create({
        data: {
          experience_id: newData.experience_id,
          user_id: userId,
        },
      });

      return { createdFavoriteId: result.id, error: null };
    } catch (error) {
      console.error("Error saving favorite: ", error);
      return { createdFavoriteId: null, error: "Internal server error" };
    }
  }

  static async deleteFavorite(
    favoriteId: string
  ): Promise<{ deletedFavorite: Favorite | null; error: string | null }> {
    try {
      const result = await prismaClient.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
      return { deletedFavorite: result, error: null };
    } catch (error) {
      console.error("Error deleting favorite:", error);
      return { deletedFavorite: null, error: "Internal server error" };
    }
  }
}
