import { JsonValue } from "@prisma/client/runtime/library";
import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Review"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ratings:
 *       type: object
 *       required:
 *         - services
 *         - location
 *         - amenities
 *         - prices
 *         - food
 *         - room_comfort_and_quality
 *       properties:
 *         services:
 *           type: number
 *           description: Rating for services
 *           example: 4
 *         location:
 *           type: number
 *           description: Rating for location
 *           example: 5
 *         amenities:
 *           type: number
 *           description: Rating for amenities
 *           example: 3
 *         prices:
 *           type: number
 *           description: Rating for prices
 *           example: 4
 *         food:
 *           type: number
 *           description: Rating for food
 *           example: 5
 *         room_comfort_and_quality:
 *           type: number
 *           description: Rating for room comfort and quality
 *           example: 5
 */

class Ratings {
  @Min(0, { message: "The services must be greater than or equal to zero" })
  @IsInt({ message: "The services field must be an integer" })
  @IsNotEmpty({ message: "The services field is mandatory" })
  services: number;

  @Min(0, { message: "The location must be greater than or equal to zero" })
  @IsInt({ message: "The location field must be an integer" })
  @IsNotEmpty({ message: "The location field is mandatory" })
  location: number;

  @Min(0, { message: "The amenities must be greater than or equal to zero" })
  @IsInt({ message: "The amenities field must be an integer" })
  @IsNotEmpty({ message: "The amenities field is mandatory" })
  amenities: number;

  @Min(0, { message: "The prices must be greater than or equal to zero" })
  @IsInt({ message: "The prices field must be an integer" })
  @IsNotEmpty({ message: "The prices field is mandatory" })
  prices: number;

  @Min(0, { message: "The food must be greater than or equal to zero" })
  @IsInt({ message: "The food field must be an integer" })
  @IsNotEmpty({ message: "The food field is mandatory" })
  food: number;

  @Min(0, {
    message:
      "The room_comfort_and_quality must be greater than or equal to zero",
  })
  @IsInt({ message: "The room_comfort_and_quality field must be an integer" })
  @IsNotEmpty({ message: "The room_comfort_and_quality field is mandatory" })
  room_comfort_and_quality: number;

  constructor(payload: Ratings) {
    this.services = payload.services;
    this.location = payload.location;
    this.amenities = payload.amenities;
    this.prices = payload.prices;
    this.food = payload.food;
    this.room_comfort_and_quality = payload.room_comfort_and_quality;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - comment
 *         - image
 *         - ratings
 *         - user_review_count
 *         - created_at
 *         - experience_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the review
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         name:
 *           type: string
 *           description: Name of the person who wrote the review
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Email address of the person who wrote the review
 *           example: "johndoe@example.com"
 *         comment:
 *           type: string
 *           description: The content of the review
 *           example: "The tour was fantastic and exceeded my expectations!"
 *         image:
 *           type: string
 *           description: URL to an image related to the review
 *           example: "https://example.com/review-image.jpg"
 *         ratings:
 *           $ref: '#/components/schemas/Ratings'
 *           description: Object containing individual ratings for various categories
 *         user_review_count:
 *           type: integer
 *           description: Number of reviews submitted by the user
 *           example: 5
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 *           example: "2024-08-27T14:30:00Z"
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being reviewed
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 */

class Review {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "The email field is mandatory" })
  email: string;

  @IsString({ message: "The comment field must be a string" })
  @IsNotEmpty({ message: "The comment field is mandatory" })
  comment: string;

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  @Matches(
    /^(https:\/\/firebasestorage\.googleapis\.com|https:\/\/graph\.facebook\.com|https:\/\/avatars\.githubusercontent\.com|https:\/\/lh3\.googleusercontent\.com|\/images\/)/,
    { message: "The image URL must start with a valid domain" }
  )
  image: string;

  @IsNotEmpty({ message: "The ratings field is mandatory" })
  ratings: JsonValue;

  @Min(0, {
    message: "The user_review_count must be greater than or equal to zero",
  })
  @IsInt({ message: "The user_review_count field must be an integer" })
  @IsNotEmpty({ message: "The user_review_count field is mandatory" })
  user_review_count: number;

  @IsDate({ message: "The created_at field must be a valid date" })
  @IsNotEmpty({ message: "The created_at field is mandatory" })
  created_at: Date;

  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  constructor(payload: Review) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.email =
      typeof payload.email === "string" ? payload.email.trim() : payload.email;
    this.comment =
      typeof payload.comment === "string"
        ? payload.comment.trim()
        : payload.comment;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
    this.ratings = payload.ratings;
    this.user_review_count = payload.user_review_count;
    this.created_at = new Date(payload.created_at);
    this.experience_id =
      typeof payload.experience_id === "string"
        ? payload.experience_id.trim()
        : payload.experience_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewRaw:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - comment
 *         - image
 *         - ratings
 *         - created_at
 *         - experience_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the review
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         name:
 *           type: string
 *           description: Name of the person who wrote the review
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Email address of the person who wrote the review
 *           example: "johndoe@example.com"
 *         comment:
 *           type: string
 *           description: The content of the review
 *           example: "The tour was fantastic and exceeded my expectations!"
 *         image:
 *           type: string
 *           description: URL to an image related to the review
 *           example: "https://example.com/review-image.jpg"
 *         ratings:
 *           $ref: '#/components/schemas/Ratings'
 *           description: Object containing individual ratings for various categories
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was created
 *           example: "2024-08-27T14:30:00Z"
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being reviewed
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 */

class ReviewRaw {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "The email field is mandatory" })
  email: string;

  @IsString({ message: "The comment field must be a string" })
  @IsNotEmpty({ message: "The comment field is mandatory" })
  comment: string;

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  @Matches(
    /^(https:\/\/firebasestorage\.googleapis\.com|https:\/\/graph\.facebook\.com|https:\/\/avatars\.githubusercontent\.com|https:\/\/lh3\.googleusercontent\.com|\/images\/)/,
    { message: "The image URL must start with a valid domain" }
  )
  image: string;

  @IsNotEmpty({ message: "The ratings field is mandatory" })
  ratings: JsonValue;

  @IsDate({ message: "The created_at field must be a valid date" })
  @IsNotEmpty({ message: "The created_at field is mandatory" })
  created_at: Date;

  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  constructor(payload: ReviewRaw) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.email =
      typeof payload.email === "string" ? payload.email.trim() : payload.email;
    this.comment =
      typeof payload.comment === "string"
        ? payload.comment.trim()
        : payload.comment;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
    this.ratings = payload.ratings;
    this.created_at = new Date(payload.created_at);
    this.experience_id =
      typeof payload.experience_id === "string"
        ? payload.experience_id.trim()
        : payload.experience_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewUpsert:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - comment
 *         - image
 *         - ratings
 *         - experience_id
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the person who wrote the review
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Email address of the person who wrote the review
 *           example: "johndoe@example.com"
 *         comment:
 *           type: string
 *           description: The content of the review
 *           example: "The tour was fantastic and exceeded my expectations!"
 *         image:
 *           type: string
 *           description: URL to an image related to the review
 *           example: "https://example.com/review-image.jpg"
 *         ratings:
 *           $ref: '#/components/schemas/Ratings'
 *           description: Object containing individual ratings for various categories
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being reviewed
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 */

class ReviewUpsert {
  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "The email field is mandatory" })
  email: string;

  @IsString({ message: "The comment field must be a string" })
  @IsNotEmpty({ message: "The comment field is mandatory" })
  comment: string;

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  @Matches(
    /^(https:\/\/firebasestorage\.googleapis\.com|https:\/\/graph\.facebook\.com|https:\/\/avatars\.githubusercontent\.com|https:\/\/lh3\.googleusercontent\.com|\/images\/)/,
    { message: "The image URL must start with a valid domain" }
  )
  image: string;

  @ValidateNested()
  @IsNotEmptyObject(
    { nullable: false },
    { message: "The ratings field is mandatory" }
  )
  ratings: Ratings;

  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  constructor(payload: ReviewUpsert) {
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.email =
      typeof payload.email === "string" ? payload.email.trim() : payload.email;
    this.comment =
      typeof payload.comment === "string"
        ? payload.comment.trim()
        : payload.comment;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
    this.ratings = new Ratings(payload.ratings);
    this.experience_id =
      typeof payload.experience_id === "string"
        ? payload.experience_id.trim()
        : payload.experience_id;
  }
}

export { Ratings, Review, ReviewRaw, ReviewUpsert };
