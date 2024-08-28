import { IsArray, IsNotEmpty, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       required:
 *         - id
 *         - experiences_id
 *         - user_id
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the favorite record
 *           example: "60b8d295f1c0d2b0f1b2c3d8"
 *         experiences_id:
 *           type: array
 *           items:
 *             type: string
 *           description: List of experience IDs associated with the favorite
 *           example: ["66ce29934244142ada6b021e", "77ce29934244142ada6b021f"]
 *         user_id:
 *           type: string
 *           description: Firebase UID of the user who marked the favorite
 *           example: "user1234uid"
 */

class Favorite {
  @IsString({ message: "The id field must be a string" })
  @IsNotEmpty({ message: "The id field is mandatory" })
  id: string;

  @IsString({
    each: true,
    message: "Each item in the experiences_id array must be a string",
  })
  @IsArray({ message: "The experiences_id field must be an array of strings" })
  @IsNotEmpty({ message: "The experiences_id field is mandatory" })
  experiences_id: string[];

  @IsString({ message: "The user_id field must be a string" })
  @IsNotEmpty({ message: "The user_id field is mandatory" })
  user_id: string;

  constructor(payload: Favorite) {
    this.id = typeof payload.id === "string" ? payload.id.trim() : payload.id;
    this.experiences_id = payload.experiences_id;
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

/**
 * @swagger
 * components:
 *   schemas:
 *     FavoriteUpsertExtended:
 *       type: object
 *       required:
 *         - experience_id
 *         - experiences_id
 *         - user_id
 *       properties:
 *         experience_id:
 *           type: string
 *           description: Unique identifier for the favorited experience
 *           example: "60b8d295f1c0d2b0f1b2c3d9"
 *         experiences_id:
 *           type: array
 *           items:
 *             type: string
 *           description: List of experience IDs associated with the favorite
 *           example: ["66ce29934244142ada6b021e", "77ce29934244142ada6b021f"]
 *         user_id:
 *           type: string
 *           description: Firebase UID of the user who marked the favorite
 *           example: "user1234uid"
 */

class FavoriteUpsertExtended extends FavoriteUpsert {
  @IsString({
    each: true,
    message: "Each item in the experiences_id array must be a string",
  })
  @IsArray({ message: "The experiences_id field must be an array of strings" })
  @IsNotEmpty({ message: "The experiences_id field is mandatory" })
  experiences_id: string[];
  
  @IsString({ message: "The user_id field must be a string" })
  @IsNotEmpty({ message: "The user_id field is mandatory" })
  user_id: string;

  constructor(payload: FavoriteUpsertExtended) {
    super(payload);
    this.experiences_id = payload.experiences_id;
    this.user_id =
      typeof payload.user_id === "string"
        ? payload.user_id.trim()
        : payload.user_id;
  }
}

export { Favorite, FavoriteUpsert, FavoriteUpsertExtended };
