import { IsEmail, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     NewsletterList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Newsletter"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Newsletter:
 *       type: object
 *       required:
 *         - id
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the newsletter subscription
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         email:
 *           type: string
 *           description: Email address used for receiving notifications and updates
 *           example: "johndoe@example.com"
 */

class Newsletter {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "O campo email é obrigatório" })
  email: string;

  constructor(payload: Newsletter) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.email =
      typeof payload.email === "string" ? payload.email.trim() : payload.email;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Newsletter:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Email address used for receiving notifications and updates
 *           example: "johndoe@example.com"
 */

class NewsletterUpsert {
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "O campo email é obrigatório" })
  email: string;

  constructor(payload: NewsletterUpsert) {
    this.email =
      typeof payload.email === "string" ? payload.email.trim() : payload.email;
  }
}

export { Newsletter, NewsletterUpsert };
