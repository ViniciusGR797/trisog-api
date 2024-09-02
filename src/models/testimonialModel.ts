import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     TestimonialList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Testimonial"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - id
 *         - message
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the testimonial
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         message:
 *           type: string
 *           description: The testimonial message provided by a customer
 *           example: "The tour was amazing! Our guide was very knowledgeable and made the experience unforgettable."
 *         author:
 *           type: string
 *           description: The name of the person who provided the testimonial
 *           example: "John Doe"
 */

class Testimonial {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The message field must be a string" })
  @IsNotEmpty({ message: "The message field is mandatory" })
  message: string;

  @IsString({ message: "The author field must be a string" })
  @IsNotEmpty({ message: "The author field is mandatory" })
  author: string;

  constructor(payload: Testimonial) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.message =
      typeof payload.message === "string" ? payload.message.trim() : payload.message;
    this.author =
      typeof payload.author === "string" ? payload.author.trim() : payload.author;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     TestimonialUpsert:
 *       type: object
 *       required:
 *         - message
 *         - author
 *       properties:
 *         message:
 *           type: string
 *           description: The testimonial message provided by a customer
 *           example: "The tour was amazing! Our guide was very knowledgeable and made the experience unforgettable."
 *         author:
 *           type: string
 *           description: The name of the person who provided the testimonial
 *           example: "John Doe"
 */

class TestimonialUpsert {
    @IsString({ message: "The message field must be a string" })
    @IsNotEmpty({ message: "The message field is mandatory" })
    message: string;
  
    @IsString({ message: "The author field must be a string" })
    @IsNotEmpty({ message: "The author field is mandatory" })
    author: string;
  
    constructor(payload: TestimonialUpsert) {
      this.message =
        typeof payload.message === "string" ? payload.message.trim() : payload.message;
      this.author =
        typeof payload.author === "string" ? payload.author.trim() : payload.author;
    }
  }

export { Testimonial, TestimonialUpsert };
