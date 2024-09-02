import { JsonValue } from "@prisma/client/runtime/library";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Booking"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - adults
 *         - kids
 *         - children
 *       properties:
 *         adults:
 *           type: integer
 *           description: Number of adult tickets
 *           example: 2
 *         kids:
 *           type: integer
 *           description: Number of kid tickets
 *           example: 1
 *         children:
 *           type: integer
 *           description: Number of children tickets
 *           example: 1
 */

class Ticket {
  @Min(0, { message: "The adults must be greater than or equal to zero" })
  @IsInt({ message: "The adults field must be an integer" })
  @IsNotEmpty({ message: "The adults field is mandatory" })
  adults: string;

  @Min(0, { message: "The kids must be greater than or equal to zero" })
  @IsInt({ message: "The kids field must be an integer" })
  @IsNotEmpty({ message: "The kids field is mandatory" })
  kids: string;

  @Min(0, { message: "The children must be greater than or equal to zero" })
  @IsInt({ message: "The children field must be an integer" })
  @IsNotEmpty({ message: "The children field is mandatory" })
  children: string;

  constructor(payload: Ticket) {
    this.adults = payload.adults;
    this.kids = payload.kids;
    this.children = payload.children;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - id
 *         - date
 *         - time
 *         - ticket
 *         - total_price
 *         - experience_id
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the booking
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the booking
 *           example: "2024-08-31"
 *         time:
 *           type: string
 *           format: time
 *           description: Time of the booking
 *           example: "14:00"
 *         ticket:
 *           $ref: '#/components/schemas/Ticket'
 *           description: Ticket details for the booking, including the number of adults, kids, and children
 *         total_price:
 *           type: number
 *           description: The total price of this reservation
 *           example: 4.5
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being favorited
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 *         user_id:
 *           type: string
 *           description: Unique identifier for the user who made the booking
 *           example: "12345"
 */

class Booking {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsDate({ message: "The date field must be a valid date" })
  @IsNotEmpty({ message: "The date field is mandatory" })
  date: Date;

  @IsString({ message: "The time field must be a string" })
  @IsNotEmpty({ message: "The time field is mandatory" })
  time: string;

  @IsNotEmpty({ message: "The ticket field is mandatory" })
  ticket: JsonValue;

  @IsNumber({}, { message: "The total_price field must be a number" })
  @IsNotEmpty({ message: "The total_price field is mandatory" })
  total_price: number;

  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  @IsString({ message: "The user_id field must be a string" })
  @IsNotEmpty({ message: "The user_id field is mandatory" })
  user_id: string;

  constructor(payload: Booking) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.date = new Date(payload.date);
    this.time =
      typeof payload.time === "string" ? payload.time.trim() : payload.time;
    this.ticket = payload.ticket;
    this.total_price = payload.total_price;
    this.experience_id = typeof payload.experience_id === "string" ? payload.experience_id.trim() : payload.experience_id;
    this.user_id =
      typeof payload.user_id === "string"
        ? payload.user_id.trim()
        : payload.user_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingUpsert:
 *       type: object
 *       required:
 *         - date
 *         - time
 *         - ticket
 *         - total_price
 *         - experience_id
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the booking
 *           example: "2024-08-31"
 *         time:
 *           type: string
 *           format: time
 *           description: Time of the booking
 *           example: "14:00"
 *         ticket:
 *           $ref: '#/components/schemas/Ticket'
 *           description: Ticket details for the booking, including the number of adults, kids, and children
 *         total_price:
 *           type: number
 *           description: The total price of this reservation
 *           example: 4.5
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being favorited
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 */

class BookingUpsert {
  @IsDate({ message: "The date field must be a valid date" })
  @IsNotEmpty({ message: "The date field is mandatory" })
  date: Date;

  @IsString({ message: "The time field must be a string" })
  @IsNotEmpty({ message: "The time field is mandatory" })
  time: string;

  @ValidateNested()
  @IsNotEmptyObject(
    { nullable: false },
    { message: "The ticket field is mandatory" }
  )
  ticket: Ticket;

  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  constructor(payload: BookingUpsert) {
    this.date = new Date(payload.date);
    this.time =
      typeof payload.time === "string" ? payload.time.trim() : payload.time;
    this.ticket = new Ticket(payload.ticket);
    this.experience_id = typeof payload.experience_id === "string" ? payload.experience_id.trim() : payload.experience_id;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     BookingUpsertExtended:
 *       type: object
 *       required:
 *         - date
 *         - time
 *         - ticket
 *         - total_price
 *         - experience_id
 *         - user_id
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the booking
 *           example: "2024-08-31"
 *         time:
 *           type: string
 *           format: time
 *           description: Time of the booking
 *           example: "14:00"
 *         ticket:
 *           $ref: '#/components/schemas/Ticket'
 *           description: Ticket details for the booking, including the number of adults, kids, and children
 *         total_price:
 *           type: number
 *           description: The total price of this reservation
 *           example: 4.5
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being favorited
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 *         user_id:
 *           type: string
 *           description: Unique identifier for the user who made the booking
 *           example: "12345"
 */

class BookingUpsertExtended extends BookingUpsert {
  @IsNumber({}, { message: "The total_price field must be a number" })
  @IsNotEmpty({ message: "The total_price field is mandatory" })
  total_price: number;

  @IsString({ message: "The user_id field must be a string" })
  @IsNotEmpty({ message: "The user_id field is mandatory" })
  user_id: string;

  constructor(payload: BookingUpsertExtended) {
    super(payload);
    this.total_price = payload.total_price;
    this.user_id =
      typeof payload.user_id === "string"
        ? payload.user_id.trim()
        : payload.user_id;
  }
}

export { Booking, BookingUpsert, BookingUpsertExtended };
