import { Request, Response } from "express";
import {
  Category,
  CategoryUpsert,
  CategoryUpsertExtended,
} from "../models/categoryModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { CategoryService } from "../services/categoryService";
import { ExperienceService } from "../services/experienceService";
import {
  createQueryOptions,
  initialQueryOption,
  QueryOptions,
} from "../utils/queryOptions";

export class CategoryController {
  static async getCategories(req: Request, res: Response): Promise<Response> {
    const { categories: categoriesRaw, error: getCategoriesError } =
      await CategoryService.getCategories();
    if (getCategoriesError) {
      return res.status(500).json({ msg: getCategoriesError });
    }

    const categoryMinPrice: { [key: string]: number } = {};

    const { queryOptions, error: _ } = createQueryOptions(initialQueryOption);
    const { experiences: experiencesRaw, error: getExperiencesError } =
      await ExperienceService.getExperiences(queryOptions as QueryOptions);
    if (getExperiencesError) {
      return res.status(500).json({ msg: getExperiencesError });
    }
    if (!experiencesRaw) {
      return res.status(200).json(experiencesRaw);
    }

    experiencesRaw.experiences.forEach((experience) => {
      experience.categories_id.forEach((categoryId) => {
        if (
          !categoryMinPrice[categoryId] ||
          experience.default_price < categoryMinPrice[categoryId]
        ) {
          categoryMinPrice[categoryId] = experience.default_price;
        }
      });
    });

    const categories: Category[] = categoriesRaw
      ? categoriesRaw.map((category) => {
          return {
            ...category,
            from_price: categoryMinPrice[category.id] || 0,
          };
        })
      : [];

    return res.status(200).json(categories);
  }

  static async getCategoryById(req: Request, res: Response): Promise<Response> {
    const categoryId = req.params.category_id;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid category ID" });
    }

    const { category, error: getCategoryError } =
      await CategoryService.getCategoryById(categoryId);
    if (getCategoryError) {
      return res.status(500).json({ msg: getCategoryError });
    }
    if (!category) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(category);
  }

  static async createCategory(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new CategoryUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const newPayload = new CategoryUpsertExtended({
      ...payload,
      travel_count: 0,
    });

    const { createdCategoryId, error: createCategoryError } =
      await CategoryService.createCategory(newPayload);
    if (createCategoryError) {
      return res.status(500).json({ msg: createCategoryError });
    }
    if (!createdCategoryId || createdCategoryId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { category, error: getCategoryError } =
      await CategoryService.getCategoryById(createdCategoryId);
    if (getCategoryError) {
      return res.status(500).json({ msg: getCategoryError });
    }
    if (!category) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(category);
  }

  static async updateCategory(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const categoryId = req.params.category_id;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid category ID" });
    }

    const { category, error: getCategoryError } =
      await CategoryService.getCategoryById(categoryId);
    if (getCategoryError) {
      return res.status(500).json({ msg: getCategoryError });
    }
    if (!category) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new CategoryUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const newPayload = new CategoryUpsertExtended({
      ...payload,
      travel_count: category.travel_count,
    });

    const { updatedCategory, error: updatedCategoryError } =
      await CategoryService.updateCategory(categoryId, newPayload);
    if (updatedCategoryError) {
      return res.status(500).json({ msg: updatedCategoryError });
    }
    if (!updatedCategory) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedCategory);
  }

  static async deleteCategory(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const categoryId = req.params.category_id;
    if (!isValidObjectId(categoryId)) {
      return res.status(400).json({ msg: "Invalid category ID" });
    }

    const { category, error: getCategoryError } =
      await CategoryService.getCategoryById(categoryId);
    if (getCategoryError) {
      return res.status(500).json({ msg: getCategoryError });
    }
    if (!category) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedCategory, error: deletedCategoryError } =
      await CategoryService.deleteCategory(categoryId);
    if (deletedCategoryError) {
      return res.status(500).json({ msg: deletedCategoryError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
