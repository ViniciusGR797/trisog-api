import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

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
 *         - icon
 *         - travel_count
 *         - from_price
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the category
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         name:
 *           type: string
 *           description: Descriptive name of the category
 *           example: "Adventure"
 *         icon:
 *           type: string
 *           description: URL or path to the icon representing the category
 *           example: "https://example.com/icons/adventure.png"
 *         travel_count:
 *           type: integer
 *           description: The number of travels, tours, or activities available at the category
 *           example: 5
 *         from_price:
 *           type: number
 *           description: The minimum price available for this category.
 *           example: 50.0
 */

class Category {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The icon field must be a string" })
  @IsNotEmpty({ message: "The icon field is mandatory" })
  icon: string;

  @Min(0, { message: "The travel_count must be greater than or equal to zero" })
  @IsInt({ message: "The travel_count field must be an integer" })
  @IsNotEmpty({ message: "The travel_count field is mandatory" })
  travel_count: number;

  @IsNumber({}, { message: "The from_price field must be a number" })
  @IsNotEmpty({ message: "The from_price field is mandatory" })
  from_price: number;

  constructor(payload: Category) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.icon =
      typeof payload.icon === "string" ? payload.icon.trim() : payload.icon;
    this.travel_count = payload.travel_count;
    this.from_price = payload.from_price;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryRaw:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - icon
 *         - travel_count
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the category
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         name:
 *           type: string
 *           description: Descriptive name of the category
 *           example: "Adventure"
 *         icon:
 *           type: string
 *           description: URL or path to the icon representing the category
 *           example: "https://example.com/icons/adventure.png"
 *         travel_count:
 *           type: integer
 *           description: The number of travels, tours, or activities available at the category
 *           example: 5
 */

class CategoryRaw {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The icon field must be a string" })
  @IsNotEmpty({ message: "The icon field is mandatory" })
  icon: string;

  @Min(0, { message: "The travel_count must be greater than or equal to zero" })
  @IsInt({ message: "The travel_count field must be an integer" })
  @IsNotEmpty({ message: "The travel_count field is mandatory" })
  travel_count: number;

  constructor(payload: CategoryRaw) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.icon =
      typeof payload.icon === "string" ? payload.icon.trim() : payload.icon;
    this.travel_count = payload.travel_count;
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
 *         - icon
 *       properties:
 *         name:
 *           type: string
 *           description: Descriptive name of the category
 *           example: "Adventure"
 *         icon:
 *           type: string
 *           description: URL or path to the icon representing the category
 *           example: "https://example.com/icons/adventure.png"
 */

class CategoryUpsert {
  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The icon field must be a string" })
  @IsNotEmpty({ message: "The icon field is mandatory" })
  icon: string;

  constructor(payload: CategoryUpsert) {
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.icon =
      typeof payload.icon === "string" ? payload.icon.trim() : payload.icon;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryUpsertExtended:
 *       type: object
 *       required:
 *         - name
 *         - icon
 *         - travel_count
 *       properties:
 *         name:
 *           type: string
 *           description: Descriptive name of the category
 *           example: "Adventure"
 *         icon:
 *           type: string
 *           description: URL or path to the icon representing the category
 *           example: "https://example.com/icons/adventure.png"
 *         travel_count:
 *           type: integer
 *           description: The number of travels, tours, or activities available at the category
 *           example: 5
 */

class CategoryUpsertExtended {
  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The icon field must be a string" })
  @IsNotEmpty({ message: "The icon field is mandatory" })
  icon: string;

  @Min(0, { message: "The travel_count must be greater than or equal to zero" })
  @IsInt({ message: "The travel_count field must be an integer" })
  @IsNotEmpty({ message: "The travel_count field is mandatory" })
  travel_count: number;

  constructor(payload: CategoryUpsertExtended) {
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.icon =
      typeof payload.icon === "string" ? payload.icon.trim() : payload.icon;
    this.travel_count = payload.travel_count;
  }
}

export { Category, CategoryRaw, CategoryUpsert, CategoryUpsertExtended };
