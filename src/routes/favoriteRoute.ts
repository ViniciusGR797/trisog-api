import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { FavoriteController } from '../controllers/favoriteController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: Routes for favorite manipulation
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: View all favorites of a user
 *     description: Returns a list of all favorite experiences for the specified user
 *     tags:
 *       - Favorite
 *     operationId: get_favorites_by_user
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Favorite"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', authMiddleware, FavoriteController.getFavorite);

/**
 * @swagger
 * /favorites:
 *   post:
 *     summary: Add a new favorite
 *     description: Add a new favorite based on the data provided in the request body.
 *     tags:
 *       - Favorite
 *     operationId: create_favorite
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FavoriteUpsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Favorite"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.post('/', authMiddleware, FavoriteController.addFavorite);

/**
 * @swagger
 * /favorites/{experience_id}:
 *   parameters:
 *     - name: experience_id
 *       in: path
 *       required: true
 *       description: Experience ID to be removed from favorites
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove experience from favorites
 *     description: Remove experience from favorites based on the ID provided
 *     tags:
 *       - Favorite
 *     operationId: delete_favorite
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FavoriteDeleteSuccess"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Unauthorized"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Forbidden"
 *       404:
 *         description: NotFound
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NotFound"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.delete('/:experience_id', authMiddleware, FavoriteController.removeFavorite);

export default router;