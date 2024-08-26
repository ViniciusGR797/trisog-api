import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  IsObject,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       properties:
 *         jan:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in January
 *           example: [100, 150, 200, ...]
 *         feb:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in February
 *           example: [100, 150, 200, ...]
 *         mar:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in March
 *           example: [100, 150, 200, ...]
 *         apr:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in April
 *           example: [100, 150, 200, ...]
 *         may:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in May
 *           example: [100, 150, 200, ...]
 *         jun:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in June
 *           example: [100, 150, 200, ...]
 *         jul:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in July
 *           example: [100, 150, 200, ...]
 *         aug:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in August
 *           example: [100, 150, 200, ...]
 *         sep:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in September
 *           example: [100, 150, 200, ...]
 *         oct:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in October
 *           example: [100, 150, 200, ...]
 *         nov:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in November
 *           example: [100, 150, 200, ...]
 *         dec:
 *           type: array
 *           items:
 *             type: integer
 *           description: Array of prices for each day in December
 *           example: [100, 150, 200, ...]
 */

class Price {
  @IsArray({ message: "The jan field must be an array of integers" })
  @IsNotEmpty({ message: "The jan field is mandatory" })
  jan: number[];

  @IsArray({ message: "The feb field must be an array of integers" })
  @IsNotEmpty({ message: "The feb field is mandatory" })
  feb: number[];

  @IsArray({ message: "The mar field must be an array of integers" })
  @IsNotEmpty({ message: "The mar field is mandatory" })
  mar: number[];

  @IsArray({ message: "The apr field must be an array of integers" })
  @IsNotEmpty({ message: "The apr field is mandatory" })
  apr: number[];

  @IsArray({ message: "The may field must be an array of integers" })
  @IsNotEmpty({ message: "The may field is mandatory" })
  may: number[];

  @IsArray({ message: "The jun field must be an array of integers" })
  @IsNotEmpty({ message: "The jun field is mandatory" })
  jun: number[];

  @IsArray({ message: "The jul field must be an array of integers" })
  @IsNotEmpty({ message: "The jul field is mandatory" })
  jul: number[];

  @IsArray({ message: "The aug field must be an array of integers" })
  @IsNotEmpty({ message: "The aug field is mandatory" })
  aug: number[];

  @IsArray({ message: "The sep field must be an array of integers" })
  @IsNotEmpty({ message: "The sep field is mandatory" })
  sep: number[];

  @IsArray({ message: "The oct field must be an array of integers" })
  @IsNotEmpty({ message: "The oct field is mandatory" })
  oct: number[];

  @IsArray({ message: "The nov field must be an array of integers" })
  @IsNotEmpty({ message: "The nov field is mandatory" })
  nov: number[];

  @IsArray({ message: "The dec field must be an array of integers" })
  @IsNotEmpty({ message: "The dec field is mandatory" })
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
 *         isActivity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: true
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         duration:
 *           type: string
 *           description: Duration of the experience
 *           example: "Full Day"
 *         price:
 *           type: object
 *           $ref: "#/components/schemas/Price"
 *         destinationId:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class Experience {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  isActivity: boolean;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @ValidateNested()
  @Type(() => Price)
  price: Price;

  @IsString()
  @IsNotEmpty()
  destinationId: string;

  constructor(payload: Experience) {
    this.id = payload.id;
    this.name = payload.name;
    this.city = payload.city;
    this.isActivity = payload.isActivity;
    this.image = payload.image;
    this.duration = payload.duration;
    this.price = new Price(payload.price);
    this.destinationId = payload.destinationId;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienceInsert:
 *       type: object
 *       required:
 *         - name
 *         - city
 *         - isActivity
 *         - image
 *         - duration
 *         - price
 *         - destinationId
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the experience
 *           example: "City Tour"
 *         city:
 *           type: string
 *           description: City where the experience takes place
 *           example: "New York"
 *         isActivity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: true
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         duration:
 *           type: string
 *           description: Duration of the experience
 *           example: "Full Day"
 *         price:
 *           type: object
 *           $ref: "#/components/schemas/Price"
 *         destinationId:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class ExperienceInsert {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  isActivity: boolean;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @ValidateNested()
  @Type(() => Price)
  price: Price;

  @IsString()
  @IsNotEmpty()
  destinationId: string;

  constructor(payload: ExperienceInsert) {
    this.name = payload.name;
    this.city = payload.city;
    this.isActivity = payload.isActivity;
    this.image = payload.image;
    this.duration = payload.duration;
    this.price = new Price(payload.price);
    this.destinationId = payload.destinationId;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ExperienceUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the experience
 *           example: "City Tour"
 *         city:
 *           type: string
 *           description: City where the experience takes place
 *           example: "New York"
 *         isActivity:
 *           type: boolean
 *           description: Indicates if the experience is an activity
 *           example: true
 *         image:
 *           type: string
 *           description: URL to an image representing the experience
 *           example: "https://example.com/image.jpg"
 *         duration:
 *           type: string
 *           description: Duration of the experience
 *           example: "Full Day"
 *         price:
 *           type: object
 *           $ref: "#/components/schemas/Price"
 *         destinationId:
 *           type: string
 *           description: ID of the destination associated with the experience
 *           example: "63f47adf2d7e6b04e4f978c7"
 */

class ExperienceUpdate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  @IsNotEmpty()
  isActivity: boolean;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  duration: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Price)
  price: Price;

  @IsString()
  @IsNotEmpty()
  destinationId: string;

  constructor(payload: ExperienceUpdate) {
    this.name = payload.name;
    this.city = payload.city;
    this.isActivity = payload.isActivity;
    this.image = payload.image;
    this.duration = payload.duration;
    this.price = new Price(payload.price);
    this.destinationId = payload.destinationId;
  }
}

export { Experience, ExperienceInsert, ExperienceUpdate };
