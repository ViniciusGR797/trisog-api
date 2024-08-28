import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsInt,
  IsDate,
  ValidateNested,
  IsOptional,
} from "class-validator";
import { JsonValue } from "@prisma/client/runtime/library";

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienceList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Experience"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomPrice:
 *       type: object
 *       required:
 *         - date
 *         - price
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: The date for which the price is specified.
 *           example: "2024-08-01"
 *         price:
 *           type: number
 *           format: float
 *           description: The price for the specified date.
 *           example: 120
 */

class CustomPrice {
  @IsDate({ message: "The date field in custom price must be a valid date" })
  @IsNotEmpty({ message: "The date field in custom price  is mandatory" })
  date: Date;

  @Min(0, {
    message: "The price in custom price must be greater than or equal to zero",
  })
  @IsNumber(
    {},
    { message: "The price field in custom price must be a number" }
  )
  @IsNotEmpty({ message: "The price field in custom price  is mandatory" })
  price: number;

  constructor(payload: CustomPrice) {
    this.date = new Date(payload?.date);
    this.price = payload?.price;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - city
 *         - image
 *         - video
 *         - gallery
 *         - map_link
 *         - start_date
 *         - end_date
 *         - duration
 *         - is_activity
 *         - max_people
 *         - min_age
 *         - over_view
 *         - include
 *         - exclude
 *         - rating
 *         - default_price
 *         - categories
 *         - plans
 *         - destination_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 *         name:
 *           type: string
 *           description: Name of the experience
 *           example: "City Tour"
 *         city:
 *           type: string
 *           description: City where the experience takes place
 *           example: "New York"
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         video:
 *           type: string
 *           description: URL to a video related to the experience
 *           example: "https://example.com/video.mp4"
 *         gallery:
 *           type: string
 *           description: URL to a gallery related to the experience
 *           example: "https://example.com/gallery"
 *         map_link:
 *           type: string
 *           description: URL to the map location of the experience
 *           example: "https://example.com/map"
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         duration:
 *           type: number
 *           description: Duration of the experience
 *           example: 24
 *         is_activity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: false
 *         max_people:
 *           type: integer
 *           description: Maximum number of people allowed for the experience
 *           example: 30
 *         min_age:
 *           type: integer
 *           description: Minimum age required for participation in the experience
 *           example: 18
 *         over_view:
 *           type: string
 *           description: Overview of the experience
 *           example: "A comprehensive tour of the city with stops at major landmarks."
 *         include:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items included in the experience
 *           example: ["Lunch", "Guide"]
 *         exclude:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items excluded from the experience
 *           example: ["Transportation"]
 *         rating:
 *           type: number
 *           description: Average rating score for the experience
 *           example: 4.5
 *         default_price:
 *           type: number
 *           description: The default price applied when no custom price is specified
 *           example: 4.5
 *         custom_prices:
 *           type: array
 *           description: An array of custom prices for specific dates
 *           items:
 *             $ref: "#/components/schemas/CustomPrice"
 *         categories:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Category"
 *         plans:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Plan"
 *         destination_id:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class Experience {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The city field must be a string" })
  @IsNotEmpty({ message: "The city field is mandatory" })
  city: string;

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  image: string;

  @IsString({ message: "The video field must be a string" })
  @IsNotEmpty({ message: "The video field is mandatory" })
  video: string;

  @IsString({ message: "The gallery field must be a string" })
  @IsNotEmpty({ message: "The gallery field is mandatory" })
  gallery: string;

  @IsString({ message: "The map_link field must be a string" })
  @IsNotEmpty({ message: "The map_link field is mandatory" })
  map_link: string;

  @IsDate({ message: "The start_date field must be a valid date" })
  @IsNotEmpty({ message: "The start_date field is mandatory" })
  start_date: Date;

  @IsDate({ message: "The end_date field must be a valid date" })
  @IsNotEmpty({ message: "The end_date field is mandatory" })
  end_date: Date;

  @IsNumber({}, { message: "The duration field must be a number" })
  @IsNotEmpty({ message: "The duration field is mandatory" })
  duration: number;

  @IsBoolean({ message: "The is_activity field must be a boolean value" })
  @IsNotEmpty({ message: "The is_activity field is mandatory" })
  is_activity: boolean;

  @Min(0, { message: "The max_people must be greater than or equal to zero" })
  @IsInt({ message: "The max_people field must be an integer" })
  @IsNotEmpty({ message: "The max_people field is mandatory" })
  max_people: number;

  @Min(0, { message: "The min_age must be greater than or equal to zero" })
  @IsInt({ message: "The min_age field must be an integer" })
  @IsNotEmpty({ message: "The min_age field is mandatory" })
  min_age: number;

  @IsString({ message: "The over_view field must be a string" })
  @IsNotEmpty({ message: "The over_view field is mandatory" })
  over_view: string;

  @IsString({
    each: true,
    message: "Each item in the include array must be a string",
  })
  @IsArray({ message: "The include field must be an array of strings" })
  @IsNotEmpty({ message: "The include field is mandatory" })
  include: string[];

  @IsString({
    each: true,
    message: "Each item in the exclude array must be a string",
  })
  @IsArray({ message: "The exclude field must be an array of strings" })
  @IsNotEmpty({ message: "The exclude field is mandatory" })
  exclude: string[];

  @IsNumber({}, { message: "The rating field must be a number" })
  @IsNotEmpty({ message: "The rating field is mandatory" })
  rating: number;

  @IsNumber({}, { message: "The default_price field must be a number" })
  @IsNotEmpty({ message: "The default_price field is mandatory" })
  default_price: number;

  @IsOptional()
  custom_prices: JsonValue;

  @IsNotEmpty({ message: "The categories field is mandatory" })
  categories: JsonValue;

  @IsNotEmpty({ message: "The plans field is mandatory" })
  plans: JsonValue;

  @IsString({ message: "The destination_id field must be a string" })
  @IsNotEmpty({ message: "The destination_id field is mandatory" })
  destination_id: string;

  constructor(payload: Experience) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.city =
      typeof payload.city === "string" ? payload.city.trim() : payload.city;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
    this.video =
      typeof payload.video === "string" ? payload.video.trim() : payload.video;
    this.gallery =
      typeof payload.gallery === "string"
        ? payload.gallery.trim()
        : payload.gallery;
    this.map_link =
      typeof payload.gallery === "string"
        ? payload.gallery.trim()
        : payload.gallery;
    this.start_date = new Date(payload.start_date);
    this.end_date = new Date(payload.end_date);
    this.duration = payload.duration;
    this.is_activity = payload.is_activity;
    this.max_people = payload.max_people;
    this.min_age = payload.min_age;
    this.over_view =
      typeof payload.over_view === "string"
        ? payload.over_view.trim()
        : payload.over_view;
    this.include = payload.include;
    this.exclude = payload.exclude;
    this.rating = payload.rating;
    this.default_price = payload.default_price;
    this.custom_prices = payload.custom_prices;
    this.categories = payload.categories;
    this.plans = payload.plans;
    this.destination_id =
      typeof payload.destination_id === "string"
        ? payload.destination_id.trim()
        : payload.destination_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienceRaw:
 *       type: object
 *         - id
 *         - name
 *         - city
 *         - image
 *         - video
 *         - gallery
 *         - map_link
 *         - start_date
 *         - end_date
 *         - duration
 *         - is_activity
 *         - max_people
 *         - min_age
 *         - over_view
 *         - include
 *         - exclude
 *         - rating
 *         - default_price
 *         - custom_prices
 *         - categories_id
 *         - plans_id
 *         - destination_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 *         name:
 *           type: string
 *           description: Name of the experience
 *           example: "City Tour"
 *         city:
 *           type: string
 *           description: City where the experience takes place
 *           example: "New York"
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         video:
 *           type: string
 *           description: URL to a video related to the experience
 *           example: "https://example.com/video.mp4"
 *         gallery:
 *           type: string
 *           description: URL to a gallery related to the experience
 *           example: "https://example.com/gallery"
 *         map_link:
 *           type: string
 *           description: URL to the map location of the experience
 *           example: "https://example.com/map"
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         duration:
 *           type: number
 *           description: Duration of the experience
 *           example: 24
 *         is_activity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: false
 *         max_people:
 *           type: integer
 *           description: Maximum number of people allowed for the experience
 *           example: 30
 *         min_age:
 *           type: integer
 *           description: Minimum age required for participation in the experience
 *           example: 18
 *         over_view:
 *           type: string
 *           description: Overview of the experience
 *           example: "A comprehensive tour of the city with stops at major landmarks."
 *         include:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items included in the experience
 *           example: ["Lunch", "Guide"]
 *         exclude:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items excluded from the experience
 *           example: ["Transportation"]
 *         rating:
 *           type: number
 *           description: Average rating score for the experience
 *           example: 4.5
 *         default_price:
 *           type: number
 *           description: The default price applied when no custom price is specified
 *           example: 4.5
 *         custom_prices:
 *           type: array
 *           description: An array of custom prices for specific dates
 *           items:
 *             $ref: "#/components/schemas/CustomPrice"
 *         categories_id:
 *           type: array
 *           items:
 *             type: string
 *             description: List of category IDs associated with the experience
 *           description: List of category IDs associated with the experience
 *           example: ["60b8d295f1c0d2b0f1b2c3d4", "60b8d295f1c0d2b0f1b2c3d5"]
 *         plans_id:
 *           type: array
 *           items:
 *             type: string
 *           description: List of plan IDs associated with the experience
 *           example: ["60b8d295f1c0d2b0f1b2c3d6", "60b8d295f1c0d2b0f1b2c3d7"]
 *         destination_id:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class ExperienceRaw {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The city field must be a string" })
  @IsNotEmpty({ message: "The city field is mandatory" })
  city: string;

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  image: string;

  @IsString({ message: "The video field must be a string" })
  @IsNotEmpty({ message: "The video field is mandatory" })
  video: string;

  @IsString({ message: "The gallery field must be a string" })
  @IsNotEmpty({ message: "The gallery field is mandatory" })
  gallery: string;

  @IsString({ message: "The map_link field must be a string" })
  @IsNotEmpty({ message: "The map_link field is mandatory" })
  map_link: string;

  @IsDate({ message: "The start_date field must be a valid date" })
  @IsNotEmpty({ message: "The start_date field is mandatory" })
  start_date: Date;

  @IsDate({ message: "The end_date field must be a valid date" })
  @IsNotEmpty({ message: "The end_date field is mandatory" })
  end_date: Date;

  @IsNumber({}, { message: "The duration field must be a number" })
  @IsNotEmpty({ message: "The duration field is mandatory" })
  duration: number;

  @IsBoolean({ message: "The is_activity field must be a boolean value" })
  @IsNotEmpty({ message: "The is_activity field is mandatory" })
  is_activity: boolean;

  @Min(0, { message: "The max_people must be greater than or equal to zero" })
  @IsInt({ message: "The max_people field must be an integer" })
  @IsNotEmpty({ message: "The max_people field is mandatory" })
  max_people: number;

  @Min(0, { message: "The min_age must be greater than or equal to zero" })
  @IsInt({ message: "The min_age field must be an integer" })
  @IsNotEmpty({ message: "The min_age field is mandatory" })
  min_age: number;

  @IsString({ message: "The over_view field must be a string" })
  @IsNotEmpty({ message: "The over_view field is mandatory" })
  over_view: string;

  @IsString({
    each: true,
    message: "Each item in the include array must be a string",
  })
  @IsArray({ message: "The include field must be an array of strings" })
  @IsNotEmpty({ message: "The include field is mandatory" })
  include: string[];

  @IsString({
    each: true,
    message: "Each item in the exclude array must be a string",
  })
  @IsArray({ message: "The exclude field must be an array of strings" })
  @IsNotEmpty({ message: "The exclude field is mandatory" })
  exclude: string[];

  @IsNumber({}, { message: "The default_price field must be a number" })
  @IsNotEmpty({ message: "The default_price field is mandatory" })
  default_price: number;

  @IsOptional()
  custom_prices: JsonValue;

  @IsNumber({}, { message: "The rating field must be a number" })
  @IsNotEmpty({ message: "The rating field is mandatory" })
  rating: number;

  @IsString({
    each: true,
    message: "Each item in the categories_id array must be a string",
  })
  @IsArray({ message: "The categories_id field must be an array of strings" })
  @IsNotEmpty({ message: "The categories_id field is mandatory" })
  categories_id: string[];

  @IsString({
    each: true,
    message: "Each item in the plans_id array must be a string",
  })
  @IsArray({ message: "The plans_id field must be an array of strings" })
  @IsNotEmpty({ message: "The plans_id field is mandatory" })
  plans_id: string[];

  @IsString({ message: "The destination_id field must be a string" })
  @IsNotEmpty({ message: "The destination_id field is mandatory" })
  destination_id: string;

  constructor(payload: ExperienceRaw) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.city =
      typeof payload.city === "string" ? payload.city.trim() : payload.city;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
    this.video =
      typeof payload.video === "string" ? payload.video.trim() : payload.video;
    this.gallery =
      typeof payload.gallery === "string"
        ? payload.gallery.trim()
        : payload.gallery;
    this.map_link =
      typeof payload.gallery === "string"
        ? payload.gallery.trim()
        : payload.gallery;
    this.start_date = new Date(payload.start_date);
    this.end_date = new Date(payload.end_date);
    this.duration = payload.duration;
    this.is_activity = payload.is_activity;
    this.max_people = payload.max_people;
    this.min_age = payload.min_age;
    this.over_view =
      typeof payload.over_view === "string"
        ? payload.over_view.trim()
        : payload.over_view;
    this.include = payload.include;
    this.exclude = payload.exclude;
    this.rating = payload.rating;
    this.default_price = payload.default_price;
    this.custom_prices = payload.custom_prices;
    this.categories_id = payload.categories_id;
    this.plans_id = payload.plans_id;
    this.destination_id =
      typeof payload.destination_id === "string"
        ? payload.destination_id.trim()
        : payload.destination_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienceUpsert:
 *       type: object
 *       required:
 *         - name
 *         - city
 *         - image
 *         - video
 *         - gallery
 *         - map_link
 *         - start_date
 *         - end_date
 *         - duration
 *         - is_activity
 *         - max_people
 *         - min_age
 *         - over_view
 *         - include
 *         - exclude
 *         - default_price
 *         - categories_id
 *         - plans_id
 *         - destination_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the experience
 *           example: "City Tour"
 *         city:
 *           type: string
 *           description: City where the experience takes place
 *           example: "New York"
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         video:
 *           type: string
 *           description: URL to a video related to the experience
 *           example: "https://example.com/video.mp4"
 *         gallery:
 *           type: string
 *           description: URL to a gallery related to the experience
 *           example: "https://example.com/gallery"
 *         map_link:
 *           type: string
 *           description: URL to the map location of the experience
 *           example: "https://example.com/map"
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         duration:
 *           type: number
 *           description: Duration of the experience
 *           example: 24
 *         is_activity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: false
 *         max_people:
 *           type: integer
 *           description: Maximum number of people allowed for the experience
 *           example: 30
 *         min_age:
 *           type: integer
 *           description: Minimum age required for participation in the experience
 *           example: 18
 *         over_view:
 *           type: string
 *           description: Overview of the experience
 *           example: "A comprehensive tour of the city with stops at major landmarks."
 *         include:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items included in the experience
 *           example: ["Lunch", "Guide"]
 *         exclude:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items excluded from the experience
 *           example: ["Transportation"]
 *         default_price:
 *           type: number
 *           description: The default price applied when no custom price is specified
 *           example: 4.5
 *         custom_prices:
 *           type: array
 *           description: An array of custom prices for specific dates
 *           items:
 *             $ref: "#/components/schemas/CustomPrice"
 *         categories_id:
 *           type: array
 *           items:
 *             type: string
 *             description: List of category IDs associated with the experience
 *           description: List of category IDs associated with the experience
 *           example: ["60b8d295f1c0d2b0f1b2c3d4", "60b8d295f1c0d2b0f1b2c3d5"]
 *         plans_id:
 *           type: array
 *           items:
 *             type: string
 *           description: List of plan IDs associated with the experience
 *           example: ["60b8d295f1c0d2b0f1b2c3d6", "60b8d295f1c0d2b0f1b2c3d7"]
 *         destination_id:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class ExperienceUpsert {
  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The city field must be a string" })
  @IsNotEmpty({ message: "The city field is mandatory" })
  city: string;

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  image: string;

  @IsString({ message: "The video field must be a string" })
  @IsNotEmpty({ message: "The video field is mandatory" })
  video: string;

  @IsString({ message: "The gallery field must be a string" })
  @IsNotEmpty({ message: "The gallery field is mandatory" })
  gallery: string;

  @IsString({ message: "The map_link field must be a string" })
  @IsNotEmpty({ message: "The map_link field is mandatory" })
  map_link: string;

  @IsDate({ message: "The start_date field must be a valid date" })
  @IsNotEmpty({ message: "The start_date field is mandatory" })
  start_date: Date;

  @IsDate({ message: "The end_date field must be a valid date" })
  @IsNotEmpty({ message: "The end_date field is mandatory" })
  end_date: Date;

  @Min(0, { message: "The duration must be greater than or equal to zero" })
  @IsNumber({}, { message: "The duration field must be a number" })
  @IsNotEmpty({ message: "The duration field is mandatory" })
  duration: number;

  @IsBoolean({ message: "The is_activity field must be a boolean value" })
  @IsNotEmpty({ message: "The is_activity field is mandatory" })
  is_activity: boolean;
  
  @Min(0, { message: "The max_people must be greater than or equal to zero" })
  @IsInt({ message: "The max_people field must be an integer" })
  @IsNotEmpty({ message: "The max_people field is mandatory" })
  max_people: number;

  @Min(0, { message: "The min_age must be greater than or equal to zero" })
  @IsInt({ message: "The min_age field must be an integer" })
  @IsNotEmpty({ message: "The min_age field is mandatory" })
  min_age: number;

  @IsString({ message: "The over_view field must be a string" })
  @IsNotEmpty({ message: "The over_view field is mandatory" })
  over_view: string;

  @IsString({
    each: true,
    message: "Each item in the include array must be a string",
  })
  @IsArray({ message: "The include field must be an array of strings" })
  @IsNotEmpty({ message: "The include field is mandatory" })
  include: string[];

  @IsString({
    each: true,
    message: "Each item in the exclude array must be a string",
  })
  @IsArray({ message: "The exclude field must be an array of strings" })
  @IsNotEmpty({ message: "The exclude field is mandatory" })
  exclude: string[];

  @IsNumber({}, { message: "The default_price field must be a number" })
  @IsNotEmpty({ message: "The default_price field is mandatory" })
  default_price: number;

  @ValidateNested({ each: true })
  @IsOptional()
  custom_prices: CustomPrice[];

  @IsString({
    each: true,
    message: "Each item in the categories_id array must be a string",
  })
  @IsArray({ message: "The categories_id field must be an array of strings" })
  @IsNotEmpty({ message: "The categories_id field is mandatory" })
  categories_id: string[];

  @IsString({
    each: true,
    message: "Each item in the plans_id array must be a string",
  })
  @IsArray({ message: "The plans_id field must be an array of strings" })
  @IsNotEmpty({ message: "The plans_id field is mandatory" })
  plans_id: string[];

  @IsString({ message: "The destination_id field must be a string" })
  @IsNotEmpty({ message: "The destination_id field is mandatory" })
  destination_id: string;

  constructor(payload: ExperienceUpsert) {
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.city =
      typeof payload.city === "string" ? payload.city.trim() : payload.city;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
    this.video =
      typeof payload.video === "string" ? payload.video.trim() : payload.video;
    this.gallery =
      typeof payload.gallery === "string"
        ? payload.gallery.trim()
        : payload.gallery;
    this.map_link =
      typeof payload.gallery === "string"
        ? payload.gallery.trim()
        : payload.gallery;
    this.start_date = new Date(payload.start_date);
    this.end_date = new Date(payload.end_date);
    this.duration = payload.duration;
    this.is_activity = payload.is_activity;
    this.max_people = payload.max_people;
    this.min_age = payload.min_age;
    this.over_view =
      typeof payload.over_view === "string"
        ? payload.over_view.trim()
        : payload.over_view;
    this.include = payload.include;
    this.exclude = payload.exclude;
    this.default_price = payload.default_price;
    this.custom_prices = payload.custom_prices?.map(item => new CustomPrice(item));
    this.categories_id = payload.categories_id;
    this.plans_id = payload.plans_id;
    this.destination_id =
      typeof payload.destination_id === "string"
        ? payload.destination_id.trim()
        : payload.destination_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienceUpsertExtended:
 *       type: object
 *         - name
 *         - city
 *         - image
 *         - video
 *         - gallery
 *         - map_link
 *         - start_date
 *         - end_date
 *         - duration
 *         - is_activity
 *         - max_people
 *         - min_age
 *         - over_view
 *         - include
 *         - exclude
 *         - default_price
 *         - custom_prices
 *         - categories_id
 *         - plans_id
 *         - destination_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the experience
 *           example: "City Tour"
 *         city:
 *           type: string
 *           description: City where the experience takes place
 *           example: "New York"
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         video:
 *           type: string
 *           description: URL to a video related to the experience
 *           example: "https://example.com/video.mp4"
 *         gallery:
 *           type: string
 *           description: URL to a gallery related to the experience
 *           example: "https://example.com/gallery"
 *         map_link:
 *           type: string
 *           description: URL to the map location of the experience
 *           example: "https://example.com/map"
 *         start_date:
 *           type: string
 *           format: date-time
 *           description: Start date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         end_date:
 *           type: string
 *           format: date-time
 *           description: End date of the availability period YYYY-MM-DD
 *           example: "2024-03-24"
 *         duration:
 *           type: number
 *           description: Duration of the experience
 *           example: 24
 *         is_activity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: false
 *         max_people:
 *           type: integer
 *           description: Maximum number of people allowed for the experience
 *           example: 30
 *         min_age:
 *           type: integer
 *           description: Minimum age required for participation in the experience
 *           example: 18
 *         over_view:
 *           type: string
 *           description: Overview of the experience
 *           example: "A comprehensive tour of the city with stops at major landmarks."
 *         include:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items included in the experience
 *           example: ["Lunch", "Guide"]
 *         exclude:
 *           type: array
 *           items:
 *             type: string
 *           description: List of items excluded from the experience
 *           example: ["Transportation"]
 *         rating:
 *           type: number
 *           description: Average rating score for the experience
 *           example: 4.5
 *         default_price:
 *           type: number
 *           description: The default price applied when no custom price is specified
 *           example: 4.5
 *         custom_prices:
 *           type: array
 *           description: An array of custom prices for specific dates
 *           items:
 *             $ref: "#/components/schemas/CustomPrice"
 *         categories_id:
 *           type: array
 *           items:
 *             type: string
 *             description: List of category IDs associated with the experience
 *           description: List of category IDs associated with the experience
 *           example: ["60b8d295f1c0d2b0f1b2c3d4", "60b8d295f1c0d2b0f1b2c3d5"]
 *         plans_id:
 *           type: array
 *           items:
 *             type: string
 *           description: List of plan IDs associated with the experience
 *           example: ["60b8d295f1c0d2b0f1b2c3d6", "60b8d295f1c0d2b0f1b2c3d7"]
 *         destination_id:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class ExperienceUpsertExtended extends ExperienceUpsert {
  @IsNumber({}, { message: "The rating field must be a number" })
  @IsNotEmpty({ message: "The rating field is mandatory" })
  rating: number;

  constructor(payload: ExperienceUpsertExtended) {
    super(payload);
    this.rating = payload.rating;
  }
}

export {
  Experience,
  ExperienceRaw,
  ExperienceUpsert,
  ExperienceUpsertExtended,
};
