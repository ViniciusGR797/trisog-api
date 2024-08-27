import {
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
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
 *     Review:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - comment
 *         - image
 *         - score
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
 *         score:
 *           type: integer
 *           format: int32
 *           description: Rating score given by the reviewer, typically on a scale of 1 to 5
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
  image: string;

  @Min(0, { message: "The score must be greater than or equal to zero" })
  @IsInt({ message: "The score field must be an integer" })
  @IsNotEmpty({ message: "The score field is mandatory" })
  score: number;

  @IsDate({ message: "The created_at field must be a valid date" })
  @IsNotEmpty({ message: "The created_at field is mandatory" })
  created_at: Date;

  @IsString({ message: "The experiense_id field must be a string" })
  @IsNotEmpty({ message: "The experiense_id field is mandatory" })
  experiense_id: string;

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
    this.score = payload.score;
    this.created_at = new Date(payload.created_at);
    this.experiense_id =
      typeof payload.experiense_id === "string"
        ? payload.experiense_id.trim()
        : payload.experiense_id;
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
 *         - score
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
 *         score:
 *           type: integer
 *           format: int32
 *           description: Rating score given by the reviewer, typically on a scale of 1 to 5
 *           example: 5
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
    image: string;
  
    @Min(0, { message: "The score must be greater than or equal to zero" })
    @IsInt({ message: "The score field must be an integer" })
    @IsNotEmpty({ message: "The score field is mandatory" })
    score: number;
  
    @IsString({ message: "The experiense_id field must be a string" })
    @IsNotEmpty({ message: "The experiense_id field is mandatory" })
    experiense_id: string;
  
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
      this.score = payload.score;
      this.experiense_id =
        typeof payload.experiense_id === "string"
          ? payload.experiense_id.trim()
          : payload.experiense_id;
    }
  }

export { Review, ReviewUpsert };
