import { IsArray, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteList:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Favorite"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - id
 *         - experience_id
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the favorite record
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the experience being favorited
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 *         user_id:
 *           type: string
 *           description: Firebase UID of the user who marked the favorite
 *           example: "user1234uid"
 */

class Favorite {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  @IsString({ message: "The user_id field must be a string" })
  @IsNotEmpty({ message: "The user_id field is mandatory" })
  user_id: string;

  constructor(payload: Favorite) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
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
 *     FavoriteUpsert:
 *       type: object
 *       required:
 *         - experience_id
 *       properties:
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the favorited experience
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 */

class FavoriteUpsert {
  @IsString({ message: "The experience_id field must be a string" })
  @IsNotEmpty({ message: "The experience_id field is mandatory" })
  experience_id: string;

  constructor(payload: FavoriteUpsert) {
    this.experience_id =
      typeof payload.experience_id === "string"
        ? payload.experience_id.trim()
        : payload.experience_id;
  }
}

export { Favorite, FavoriteUpsert };
