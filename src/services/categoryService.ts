import { Category, CategoryUpsert, CategoryUpsertExtended } from "../models/categoryModel";
import prismaClient from "../utils/database";

export class CategoryService {
  static async getCategories(): Promise<{
    categories: Category[] | null;
    error: string | null;
  }> {
    try {
      const categories = await prismaClient.category.findMany();

      return { categories, error: null };
    } catch (error) {
      console.error("Error retrieving category: ", error);
      return { categories: null, error: "Internal Server Error" };
    }
  }

  static async getCategoryById(
    categoryId: string
  ): Promise<{ category: Category | null; error: string | null }> {
    try {
      const category = await prismaClient.category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (category) {
        return { category, error: null };
      } else {
        return { category: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for category by ID: ", error);
      return { category: null, error: "Internal server error" };
    }
  }

  static async createCategory(
    newData: CategoryUpsertExtended
  ): Promise<{ createdCategoryId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.category.create({
        data: {
          name: newData.name,
          icon: newData.icon,
          travel_count: newData.travel_count
        }
      });

      return { createdCategoryId: result.id, error: null };
    } catch (error) {
      console.error("Error creating category: ", error);
      return { createdCategoryId: null, error: "Internal server error" };
    }
  }

    static async updateCategory(
      categoryId: string,
      updatedData: CategoryUpsertExtended
    ): Promise<{ updatedCategory: Category | null; error: string | null }> {
      try {
        const result = await prismaClient.category.update({
          where: {
            id: categoryId
          },
          data: {
            name: updatedData.name,    
            icon: updatedData.icon,
            travel_count: updatedData.travel_count    
          }
        });

        return { updatedCategory: result, error: null };
      } catch (error) {
        console.log("Error updating category:", error);
        return { updatedCategory: null, error: "Internal server error" };
      }
    }

    static async deleteCategory(
      categoryId: string
    ): Promise<{ deletedCategory: Category | null; error: string | null }> {
      try {
        const result = await prismaClient.category.delete({
          where: {
            id: categoryId
          },
        });
        return { deletedCategory: result, error: null };
      } catch (error) {
        console.error("Error deleting category:", error);
        return { deletedCategory: null, error: "Internal server error" };
      }
    }
}
