import { JsonValue } from "@prisma/client/runtime/library";
import { IsArray, IsNotEmpty, IsString, Matches, IsInt } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     DestinationList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Destination"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Weather:
 *       type: object
 *       properties:
 *         jan_fev:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: Minimum temperature for January-February in degrees Celsius
 *               example: 10
 *             max:
 *               type: number
 *               description: Maximum temperature for January-February in degrees Celsius
 *               example: 16
 *         mar_apr:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: Minimum temperature for March-April in degrees Celsius
 *               example: 12
 *             max:
 *               type: number
 *               description: Maximum temperature for March-April in degrees Celsius
 *               example: 18
 *         may_jun:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: Minimum temperature for May-June in degrees Celsius
 *               example: 15
 *             max:
 *               type: number
 *               description: Maximum temperature for May-June in degrees Celsius
 *               example: 22
 *         jul_ago:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: Minimum temperature for July-August in degrees Celsius
 *               example: 18
 *             max:
 *               type: number
 *               description: Maximum temperature for July-August in degrees Celsius
 *               example: 25
 *         sep_oct:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: Minimum temperature for September-October in degrees Celsius
 *               example: 14
 *             max:
 *               type: number
 *               description: Maximum temperature for September-October in degrees Celsius
 *               example: 20
 *         nov_dec:
 *           type: object
 *           properties:
 *             min:
 *               type: number
 *               description: Minimum temperature for November-December in degrees Celsius
 *               example: 10
 *             max:
 *               type: number
 *               description: Maximum temperature for November-December in degrees Celsius
 *               example: 16
 */

class Weather {
  @IsInt({ message: "The jan_fev field must be an integer" })
  @IsNotEmpty({ message: "The jan_fev field is mandatory" })
  jan_fev: number;

  @IsInt({ message: "The mar_apr field must be an integer" })
  @IsNotEmpty({ message: "The mar_apr field is mandatory" })
  mar_apr: number;

  @IsInt({ message: "The may_jun field must be an integer" })
  @IsNotEmpty({ message: "The may_jun field is mandatory" })
  may_jun: number;

  @IsInt({ message: "The jul_ago field must be an integer" })
  @IsNotEmpty({ message: "The jul_ago field is mandatory" })
  jul_ago: number;

  @IsInt({ message: "The sep_oct field must be an integer" })
  @IsNotEmpty({ message: "The sep_oct field is mandatory" })
  sep_oct: number;

  @IsInt({ message: "The nov_dec field must be an integer" })
  @IsNotEmpty({ message: "The nov_dec field is mandatory" })
  nov_dec: number;

  constructor(payload: Weather) {
    this.jan_fev = payload.jan_fev;
    this.mar_apr = payload.mar_apr;
    this.may_jun = payload.may_jun;
    this.jul_ago = payload.jul_ago;
    this.sep_oct = payload.sep_oct;
    this.nov_dec = payload.nov_dec;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Destination:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - about
 *         - country
 *         - continent
 *         - map_link
 *         - weather
 *         - language
 *         - currency
 *         - area
 *         - population
 *         - time_zone
 *         - time_to_travel
 *         - images
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the destination
 *           example: "63f47adf2d7e6b04e4f978c7"
 *         name:
 *           type: string
 *           description: Name of the destination
 *           example: "Paris"
 *         about:
 *           type: string
 *           description: Description of the destination
 *           example: "Capital city of France, known for its art, fashion, and culture."
 *         continent:
 *           type: string
 *           description: Continent where the destination is located
 *           example: "Europe"
 *         map_link:
 *           type: string
 *           description: Google Maps URL for the destination
 *           example: "https://www.google.com/maps/place/Paris"
 *         weather:
 *           type: object
 *           $ref: "#/components/schemas/Weather"
 *         language:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of languages spoken at the destination
 *           example: ["French"]
 *         currency:
 *           type: string
 *           description: Currency used in the destination
 *           example: "Euro"
 *         area:
 *           type: integer
 *           description: Area of the destination in square miles
 *           example: 248573
 *         population:
 *           type: integer
 *           description: Population of the destination in number of inhabitants
 *           example: 67000000
 *         time_zone:
 *           type: string
 *           description: Time zone of the destination
 *           example: "UTC+1"
 *         time_to_travel:
 *           type: array
 *           items:
 *             type: string
 *           description: Best months to travel to the destination
 *           example: ["May", "June", "July", "August"]
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs related to the destination
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         travel_count:
 *           type: integer
 *           description: The number of travels, tours, or activities available at the destination
 *           example: 5
 */

class Destination {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The about field must be a string" })
  @IsNotEmpty({ message: "The about field is mandatory" })
  about: string;

  @IsString({ message: "The continent field must be a string" })
  @IsNotEmpty({ message: "The continent field is mandatory" })
  continent: string;

  @IsString({ message: "The map_link field must be a string" })
  @IsNotEmpty({ message: "The map_link field is mandatory" })
  map_link: string;

  @IsNotEmpty({ message: "The weather field is mandatory" })
  weather: JsonValue;

  @IsArray({ message: "The language field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the language array must be a string",
  })
  @IsNotEmpty({ message: "The language field is mandatory" })
  language: string[];

  @IsString({ message: "The currency field must be a string" })
  @IsNotEmpty({ message: "The currency field is mandatory" })
  currency: string;

  @IsInt({ message: "The area field must be an integer" })
  @IsNotEmpty({ message: "The area field is mandatory" })
  area: number;

  @IsInt({ message: "The population field must be an integer" })
  @IsNotEmpty({ message: "The population field is mandatory" })
  population: number;

  @IsString({ message: "The time_zone field must be a string" })
  @IsNotEmpty({ message: "The time_zone field is mandatory" })
  time_zone: string;

  @IsArray({ message: "The time_to_travel field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the time_to_travel array must be a string",
  })
  @IsNotEmpty({ message: "The time_to_travel field is mandatory" })
  time_to_travel: string[];

  @IsArray({ message: "The images field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the images array must be a string",
  })
  @IsNotEmpty({ message: "The images field is mandatory" })
  images: string[];

  @IsInt({ message: "The travel_count field must be an integer" })
  @IsNotEmpty({ message: "The travel_count field is mandatory" })
  travel_count: number;

  constructor(payload: Destination) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.about =
      typeof payload.about === "string" ? payload.about.trim() : payload.about;
    this.continent =
      typeof payload.continent === "string"
        ? payload.continent.trim()
        : payload.continent;
    this.map_link =
      typeof payload.map_link === "string"
        ? payload.map_link.trim()
        : payload.map_link;
    this.weather = payload.weather;
    this.language = payload.language;
    this.currency =
      typeof payload.currency === "string"
        ? payload.currency.trim()
        : payload.currency;
    this.area = payload.area;
    this.population = payload.population;
    this.time_zone =
      typeof payload.time_zone === "string"
        ? payload.time_zone.trim()
        : payload.time_zone;
    this.time_to_travel = payload.time_to_travel;
    this.images = payload.images;
    this.travel_count = payload.travel_count;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     DestinationUpsert:
 *       type: object
 *       required:
 *         - name
 *         - about
 *         - country
 *         - continent
 *         - map_link
 *         - weather
 *         - language
 *         - currency
 *         - area
 *         - population
 *         - time_zone
 *         - time_to_travel
 *         - image
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the destination
 *           example: "Paris"
 *         about:
 *           type: string
 *           description: Description of the destination
 *           example: "Capital city of France, known for its art, fashion, and culture."
 *         continent:
 *           type: string
 *           description: Continent where the destination is located
 *           example: "Europe"
 *         map_link:
 *           type: string
 *           description: Google Maps URL for the destination
 *           example: "https://www.google.com/maps/place/Paris"
 *         weather:
 *           type: object
 *           $ref: "#/components/schemas/Weather"
 *         language:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of languages spoken at the destination
 *           example: ["French"]
 *         currency:
 *           type: string
 *           description: Currency used in the destination
 *           example: "Euro"
 *         area:
 *           type: integer
 *           description: Area of the destination in square miles
 *           example: 248573
 *         population:
 *           type: integer
 *           description: Population of the destination in number of inhabitants
 *           example: 67000000
 *         time_zone:
 *           type: string
 *           description: Time zone of the destination
 *           example: "UTC+1"
 *         time_to_travel:
 *           type: array
 *           items:
 *             type: string
 *           description: Best months to travel to the destination
 *           example: ["May", "June", "July", "August"]
 *         image:
 *           type: string
 *           description: Image URL related to the destination
 *           example: "https://example.com/image1.jpg"
 */

class DestinationUpsert {
  @IsString({ message: "The name field must be a string" })
  @IsNotEmpty({ message: "The name field is mandatory" })
  name: string;

  @IsString({ message: "The about field must be a string" })
  @IsNotEmpty({ message: "The about field is mandatory" })
  about: string;

  @IsString({ message: "The continent field must be a string" })
  @IsNotEmpty({ message: "The continent field is mandatory" })
  continent: string;

  @IsString({ message: "The map_link field must be a string" })
  @IsNotEmpty({ message: "The map_link field is mandatory" })
  map_link: string;

  @IsNotEmpty({ message: "The weather field is mandatory" })
  weather: Weather;

  @IsArray({ message: "The language field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the language array must be a string",
  })
  @IsNotEmpty({ message: "The language field is mandatory" })
  language: string[];

  @IsString({ message: "The currency field must be a string" })
  @IsNotEmpty({ message: "The currency field is mandatory" })
  currency: string;

  @IsInt({ message: "The area field must be an integer" })
  @IsNotEmpty({ message: "The area field is mandatory" })
  area: number;

  @IsInt({ message: "The population field must be an integer" })
  @IsNotEmpty({ message: "The population field is mandatory" })
  population: number;

  @IsString({ message: "The time_zone field must be a string" })
  @IsNotEmpty({ message: "The time_zone field is mandatory" })
  time_zone: string;

  @IsArray({ message: "The time_to_travel field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the time_to_travel array must be a string",
  })
  @IsNotEmpty({ message: "The time_to_travel field is mandatory" })
  time_to_travel: string[];

  @IsString({ message: "The image field must be a string" })
  @IsNotEmpty({ message: "The image field is mandatory" })
  image: string;

  constructor(payload: DestinationUpsert) {
    this.name =
      typeof payload.name === "string" ? payload.name.trim() : payload.name;
    this.about =
      typeof payload.about === "string" ? payload.about.trim() : payload.about;
    this.continent =
      typeof payload.continent === "string"
        ? payload.continent.trim()
        : payload.continent;
    this.map_link =
      typeof payload.map_link === "string"
        ? payload.map_link.trim()
        : payload.map_link;
    this.weather = new Weather(payload.weather);
    this.language = payload.language;
    this.currency =
      typeof payload.currency === "string"
        ? payload.currency.trim()
        : payload.currency;
    this.area = payload.area;
    this.population = payload.population;
    this.time_zone =
      typeof payload.time_zone === "string"
        ? payload.time_zone.trim()
        : payload.time_zone;
    this.time_to_travel = payload.time_to_travel;
    this.image =
      typeof payload.image === "string" ? payload.image.trim() : payload.image;
  }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     DestinationExtended:
 *       type: object
 *       required:
 *         - name
 *         - about
 *         - country
 *         - continent
 *         - map_link
 *         - weather
 *         - language
 *         - currency
 *         - area
 *         - population
 *         - time_zone
 *         - time_to_travel
 *         - images
 *         - travel_count
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the destination
 *           example: "Paris"
 *         about:
 *           type: string
 *           description: Description of the destination
 *           example: "Capital city of France, known for its art, fashion, and culture."
 *         continent:
 *           type: string
 *           description: Continent where the destination is located
 *           example: "Europe"
 *         map_link:
 *           type: string
 *           description: Google Maps URL for the destination
 *           example: "https://www.google.com/maps/place/Paris"
 *         weather:
 *           type: object
 *           $ref: "#/components/schemas/Weather"
 *         language:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of languages spoken at the destination
 *           example: ["French"]
 *         currency:
 *           type: string
 *           description: Currency used in the destination
 *           example: "Euro"
 *         area:
 *           type: integer
 *           description: Area of the destination in square miles
 *           example: 248573
 *         population:
 *           type: integer
 *           description: Population of the destination in number of inhabitants
 *           example: 67000000
 *         time_zone:
 *           type: string
 *           description: Time zone of the destination
 *           example: "UTC+1"
 *         time_to_travel:
 *           type: array
 *           items:
 *             type: string
 *           description: Best months to travel to the destination
 *           example: ["May", "June", "July", "August"]
 *         image:
 *           type: string
 *           description: Image URL related to the destination
 *           example: "https://example.com/image1.jpg"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs related to the destination
 *           example: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 *         travel_count:
 *           type: integer
 *           description: The number of travels, tours, or activities available at the destination
 *           example: 5
 */

class DestinationExtended extends DestinationUpsert {
  @IsArray({ message: "The images field must be an array of strings" })
  @IsString({
    each: true,
    message: "Each item in the images array must be a string",
  })
  @IsNotEmpty({ message: "The images field is mandatory" })
  images: string[];

  @IsInt({ message: "The travel_count field must be an integer" })
  @IsNotEmpty({ message: "The travel_count field is mandatory" })
  travel_count: number;

  constructor(payload: DestinationExtended) {
    super(payload);
    this.images = payload.images;
    this.travel_count = payload.travel_count;
  }
}

export { Destination, DestinationUpsert, DestinationExtended };
