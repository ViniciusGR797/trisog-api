import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsInt,
  Matches,
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
 *     Price:
 *       type: object
 *       required:
 *         - jan
 *         - feb
 *         - mar
 *         - apr
 *         - may
 *         - jun
 *         - jul
 *         - aug
 *         - sep
 *         - oct
 *         - nov
 *         - dec
 *       properties:
 *         jan:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in January
 *           example: [100, 105, 110, 115, 120, 130, 125, 135, 140, 150, 145, 155, 160, 170, 165, 175, 180, 185, 190, 200, 195, 205, 210, 220, 215, 225, 230, 235, 240, 250, 255]
 *         feb:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in February
 *           example: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380]
 *         mar:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in March
 *           example: [105, 110, 115, 120, 125, 135, 130, 140, 145, 150, 155, 160, 165, 170, 180, 175, 185, 190, 195, 200, 210, 205, 215, 220, 225, 235, 230, 240, 245, 255, 250]
 *         apr:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in April
 *           example: [110, 115, 120, 125, 130, 135, 145, 140, 150, 155, 160, 165, 175, 170, 180, 185, 190, 195, 200, 210, 205, 215, 220, 225, 235, 230, 240, 245, 250, 260]
 *         may:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in May
 *           example: [115, 120, 125, 130, 140, 135, 145, 150, 155, 160, 170, 165, 175, 180, 185, 195, 190, 200, 205, 215, 210, 220, 225, 235, 230, 240, 245, 250, 260, 265, 275]
 *         jun:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in June
 *           example: [120, 125, 130, 140, 135, 145, 150, 155, 160, 170, 165, 175, 180, 185, 195, 190, 200, 210, 205, 215, 225, 220, 230, 235, 245, 240, 250, 255, 265, 260]
 *         jul:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in July
 *           example: [125, 130, 135, 140, 145, 150, 160, 155, 165, 170, 175, 180, 190, 185, 195, 200, 205, 215, 210, 220, 225, 235, 230, 240, 245, 255, 250, 260, 265, 275, 270]
 *         aug:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in August
 *           example: [130, 135, 140, 145, 150, 160, 155, 165, 170, 175, 185, 180, 190, 195, 200, 210, 205, 215, 220, 225, 235, 230, 240, 245, 255, 250, 260, 265, 275, 280, 290]
 *         sep:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in September
 *           example: [135, 140, 145, 150, 160, 155, 165, 170, 175, 185, 180, 190, 195, 200, 210, 205, 215, 220, 230, 225, 235, 240, 245, 255, 250, 260, 265, 275, 280, 285]
 *         oct:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in October
 *           example: [140, 145, 150, 160, 155, 165, 170, 175, 185, 180, 190, 195, 200, 210, 205, 215, 220, 230, 225, 235, 240, 250, 245, 255, 260, 270, 265, 275, 280, 290, 285]
 *         nov:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in November
 *           example: [145, 150, 160, 155, 165, 170, 175, 185, 180, 190, 195, 200, 210, 205, 215, 220, 230, 225, 235, 240, 250, 245, 255, 260, 270, 265, 275, 280, 285, 295]
 *         dec:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of prices for each day in December
 *           example: [150, 160, 155, 165, 170, 180, 175, 185, 190, 200, 195, 205, 210, 220, 215, 225, 230, 240, 235, 245, 250, 260, 255, 265, 270, 280, 275, 285, 290, 300, 295]
 */

class Price {
  @IsArray({ message: "The jan field must be an array of numbers" })
  @IsNotEmpty({ message: "The jan field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in jan must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in jan must be greater than or equal to zero",
  })
  jan: number[];

  @IsArray({ message: "The feb field must be an array of numbers" })
  @IsNotEmpty({ message: "The feb field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in feb must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in feb must be greater than or equal to zero",
  })
  feb: number[];

  @IsArray({ message: "The mar field must be an array of numbers" })
  @IsNotEmpty({ message: "The mar field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in mar must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in mar must be greater than or equal to zero",
  })
  mar: number[];

  @IsArray({ message: "The apr field must be an array of numbers" })
  @IsNotEmpty({ message: "The apr field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in apr must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in apr must be greater than or equal to zero",
  })
  apr: number[];

  @IsArray({ message: "The may field must be an array of numbers" })
  @IsNotEmpty({ message: "The may field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in may must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in may must be greater than or equal to zero",
  })
  may: number[];

  @IsArray({ message: "The jun field must be an array of numbers" })
  @IsNotEmpty({ message: "The jun field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in jun must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in jun must be greater than or equal to zero",
  })
  jun: number[];

  @IsArray({ message: "The jul field must be an array of numbers" })
  @IsNotEmpty({ message: "The jul field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in jul must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in jul must be greater than or equal to zero",
  })
  jul: number[];

  @IsArray({ message: "The aug field must be an array of numbers" })
  @IsNotEmpty({ message: "The aug field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in aug must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in aug must be greater than or equal to zero",
  })
  aug: number[];

  @IsArray({ message: "The sep field must be an array of numbers" })
  @IsNotEmpty({ message: "The sep field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in sep must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in sep must be greater than or equal to zero",
  })
  sep: number[];

  @IsArray({ message: "The oct field must be an array of numbers" })
  @IsNotEmpty({ message: "The oct field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in oct must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in oct must be greater than or equal to zero",
  })
  oct: number[];

  @IsArray({ message: "The nov field must be an array of numbers" })
  @IsNotEmpty({ message: "The nov field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in nov must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in nov must be greater than or equal to zero",
  })
  nov: number[];

  @IsArray({ message: "The dec field must be an array of numbers" })
  @IsNotEmpty({ message: "The dec field is mandatory" })
  @IsNumber({}, { each: true, message: "Each value in dec must be a number" })
  @Min(0, {
    each: true,
    message: "Each value in dec must be greater than or equal to zero",
  })
  dec: number[];

  constructor(payload: Price) {
    this.jan = payload.jan;
    this.feb = payload.feb;
    this.mar = payload.mar;
    this.apr = payload.apr;
    this.may = payload.may;
    this.jun = payload.jun;
    this.jul = payload.jul;
    this.aug = payload.aug;
    this.sep = payload.sep;
    this.oct = payload.oct;
    this.nov = payload.nov;
    this.dec = payload.dec;
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
 *         - duration
 *         - is_activity
 *         - max_people
 *         - min_age
 *         - over_view
 *         - include
 *         - exclude
 *         - rating
 *         - price
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
 *           description: Start date of the experience in ISO 8601 format
 *           example: "2024-03-24T04:42:34.208Z"
 *         duration:
 *           type: string
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
 *         price:
 *           $ref: "#/components/schemas/Price"
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

  @IsString({ message: "The start_date field must be a string" })
  @IsNotEmpty({ message: "The start_date field is mandatory" })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message:
      "Invalid date. The start_date must be a date in ISO 8601 format, like '2024-03-24T04:42:34.208Z'",
  })
  start_date: string;

  @IsNumber({}, { message: "The duration field must be a number" })
  @IsNotEmpty({ message: "The duration field is mandatory" })
  duration: string;

  @IsBoolean({ message: "The is_activity field must be a boolean value" })
  @IsNotEmpty({ message: "The is_activity field is mandatory" })
  is_activity: boolean;

  @IsInt({ message: "The max_people field must be an integer" })
  @IsNotEmpty({ message: "The max_people field is mandatory" })
  @Min(0, { message: "The max_people must be greater than or equal to zero" })
  max_people: string;

  @IsInt({ message: "The min_age field must be an integer" })
  @IsNotEmpty({ message: "The min_age field is mandatory" })
  @Min(0, { message: "The min_age must be greater than or equal to zero" })
  min_age: string;

  @IsString({ message: "The over_view field must be a string" })
  @IsNotEmpty({ message: "The over_view field is mandatory" })
  over_view: string;

  @IsArray({ message: "The include field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the include array must be a string",
  })
  @IsNotEmpty({ message: "The include field is mandatory" })
  include: string;

  @IsArray({ message: "The exclude field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the exclude array must be a string",
  })
  @IsNotEmpty({ message: "The exclude field is mandatory" })
  exclude: string;

  @IsNumber({}, { message: "The rating field must be a number" })
  @IsNotEmpty({ message: "The rating field is mandatory" })
  rating: string;

  @IsNotEmpty({ message: "The price field is mandatory" })
  price: JsonValue;

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
    this.start_date = payload.start_date;
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
    this.price = payload.price;
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
 *     ExperienceUpsert:
 *       type: object
 *         - name
 *         - city
 *         - image
 *         - video
 *         - gallery
 *         - map_link
 *         - start_date
 *         - duration
 *         - is_activity
 *         - max_people
 *         - min_age
 *         - over_view
 *         - include
 *         - exclude
 *         - rating
 *         - price
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
 *           description: Start date of the experience in ISO 8601 format
 *           example: "2024-03-24T04:42:34.208Z"
 *         duration:
 *           type: string
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
 *         price:
 *           $ref: "#/components/schemas/Price"
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

  @IsString({ message: "The start_date field must be a string" })
  @IsNotEmpty({ message: "The start_date field is mandatory" })
  @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/, {
    message:
      "Invalid date. The start_date must be a date in ISO 8601 format, like '2024-03-24T04:42:34.208Z'",
  })
  start_date: string;

  @IsNumber({}, { message: "The duration field must be a number" })
  @IsNotEmpty({ message: "The duration field is mandatory" })
  duration: string;

  @IsBoolean({ message: "The is_activity field must be a boolean value" })
  @IsNotEmpty({ message: "The is_activity field is mandatory" })
  is_activity: boolean;

  @IsInt({ message: "The max_people field must be an integer" })
  @IsNotEmpty({ message: "The max_people field is mandatory" })
  @Min(0, { message: "The max_people must be greater than or equal to zero" })
  max_people: string;

  @IsInt({ message: "The min_age field must be an integer" })
  @IsNotEmpty({ message: "The min_age field is mandatory" })
  @Min(0, { message: "The min_age must be greater than or equal to zero" })
  min_age: string;

  @IsString({ message: "The over_view field must be a string" })
  @IsNotEmpty({ message: "The over_view field is mandatory" })
  over_view: string;

  @IsArray({ message: "The include field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the include array must be a string",
  })
  @IsNotEmpty({ message: "The include field is mandatory" })
  include: string;

  @IsArray({ message: "The exclude field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the exclude array must be a string",
  })
  @IsNotEmpty({ message: "The exclude field is mandatory" })
  exclude: string;

  @IsNumber({}, { message: "The rating field must be a number" })
  @IsNotEmpty({ message: "The rating field is mandatory" })
  rating: string;

  @IsNotEmpty({ message: "The price field is mandatory" })
  price: Price;

  @IsArray({ message: "The categories_id field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the categories_id array must be a string",
  })
  @IsNotEmpty({ message: "The categories_id field is mandatory" })
  categories_id: string[];

  @IsArray({ message: "The plans_id field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the plans_id array must be a string",
  })
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
    this.start_date = payload.start_date;
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
    this.price = new Price(payload.price);
    this.categories_id = payload.categories_id;
    this.plans_id = payload.plans_id;
    this.destination_id =
      typeof payload.destination_id === "string"
        ? payload.destination_id.trim()
        : payload.destination_id;
  }
}

export { Experience, ExperienceUpsert };
