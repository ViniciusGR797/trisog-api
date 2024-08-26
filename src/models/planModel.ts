import { IsArray, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     PlanList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Plan"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Plan:
 *       type: object
 *       required:
 *         - id
 *         - time
 *         - title
 *         - description
 *         - topics
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the plan
 *           example: "60b8d295f1c0d2b0f1b2c3d6"
 *         time:
 *           type: string
 *           description: Time associated with the plan
 *           example: "2024-08-26T14:30:00Z"
 *         title:
 *           type: string
 *           description: Title of the plan
 *           example: "City Tour"
 *         description:
 *           type: string
 *           description: Description of the plan
 *           example: "A detailed tour around the city's historical landmarks."
 *         topics:
 *           type: array
 *           items:
 *             type: string
 *           description: List of topics covered in the plan
 *           example: ["History", "Architecture", "Culture"]
 */

class Plan {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The time field must be a string" })
  @IsNotEmpty({ message: "The time field is mandatory" })
  time: string;

  @IsString({ message: "The title field must be a string" })
  @IsNotEmpty({ message: "The title field is mandatory" })
  title: string;

  @IsString({ message: "The description field must be a string" })
  @IsNotEmpty({ message: "The description field is mandatory" })
  description: string;

  @IsArray({ message: "The topics field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the topics array must be a string",
  })
  @IsNotEmpty({ message: "The topics field is mandatory" })
  topics: string[];

  constructor(payload: Plan) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.time =
      typeof payload.time === "string" ? payload.time.trim() : payload.time;
    this.title =
      typeof payload.title === "string" ? payload.title.trim() : payload.title;
    this.description =
      typeof payload.description === "string"
        ? payload.description.trim()
        : payload.description;
    this.topics = payload.topics;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PlanUpsert:
 *       type: object
 *       required:
 *         - time
 *         - title
 *         - description
 *         - topics
 *       properties:
 *         time:
 *           type: string
 *           description: Time associated with the plan
 *           example: "2024-08-26T14:30:00Z"
 *         title:
 *           type: string
 *           description: Title of the plan
 *           example: "City Tour"
 *         description:
 *           type: string
 *           description: Description of the plan
 *           example: "A detailed tour around the city's historical landmarks."
 *         topics:
 *           type: array
 *           items:
 *             type: string
 *           description: List of topics covered in the plan
 *           example: ["History", "Architecture", "Culture"]
 */

class PlanUpsert {
  @IsString({ message: "The time field must be a string" })
  @IsNotEmpty({ message: "The time field is mandatory" })
  time: string;

  @IsString({ message: "The title field must be a string" })
  @IsNotEmpty({ message: "The title field is mandatory" })
  title: string;

  @IsString({ message: "The description field must be a string" })
  @IsNotEmpty({ message: "The description field is mandatory" })
  description: string;

  @IsArray({ message: "The topics field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the topics array must be a string",
  })
  @IsNotEmpty({ message: "The topics field is mandatory" })
  topics: string[];

  constructor(payload: PlanUpsert) {
    this.time =
      typeof payload.time === "string" ? payload.time.trim() : payload.time;
    this.title =
      typeof payload.title === "string" ? payload.title.trim() : payload.title;
    this.description =
      typeof payload.description === "string"
        ? payload.description.trim()
        : payload.description;
    this.topics = payload.topics;
  }
}

export { Plan, PlanUpsert };
