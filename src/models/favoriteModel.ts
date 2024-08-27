import { IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Category"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the category
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         name:
 *           type: string
 *           description: Descriptive name of the category
 *           example: "Adventure"
 */

class Category {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  constructor(payload: Category) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryUpsert:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Descriptive name of the category
 *           example: "Adventure"
 */

class CategoryUpsert {
    @IsString({ message: "The name field must be a string" })
    @IsNotEmpty({ message: "The name field is mandatory" })
    name: string;
  
    constructor(payload: CategoryUpsert) {
      this.name =
        typeof payload.name === "string" ? payload.name.trim() : payload.name;
    }
  }

export { Category, CategoryUpsert };
