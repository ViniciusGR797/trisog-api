import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { ReviewController } from '../controllers/reviewController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Routes for review manipulation
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: View all reviews
 *     description: Returns information about all reviews
 *     tags:
 *       - Review
 *     operationId: get_all_reviews
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ReviewList"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', ReviewController.getReviews);

/**
 * @swagger
 * /reviews/{review_id}:
 *   parameters:
 *     - name: review_id
 *       in: path
 *       required: true
 *       description: ID of the review that will be displayed
 *       schema:
 *         type: string
 *   get:
 *     summary: View review by id
 *     description: Returns review information by id
 *     tags:
 *       - Review
 *     operationId: get_review_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
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

router.get('/:review_id', ReviewController.getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Creates a new review based on the data provided in the request body.
 *     tags:
 *       - Review
 *     operationId: create_review
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReviewUpsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
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

router.post('/', authMiddleware, ReviewController.createReview);

/**
 * @swagger
 * /reviews/{review_id}:
 *   parameters:
 *     - name: review_id
 *       in: path
 *       required: true
 *       description: Review ID to be updated
 *       schema:
 *         type: string
 *   put:
 *     summary: Update review
 *     description: Updates the information of the desired review
 *     tags:
 *       - Review
 *     operationId: update_review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ReviewUpsert"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Review"
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

router.put('/:review_id', authMiddleware, ReviewController.updateReview);

/**
 * @swagger
 * /reviews/{review_id}:
 *   parameters:
 *     - name: review_id
 *       in: path
 *       required: true
 *       description: ID of the review to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove review
 *     description: Deletes a review based on the ID provided
 *     tags:
 *       - Review
 *     operationId: delete_review
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DeleteSuccess"
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

router.delete('/:review_id', authMiddleware, ReviewController.deleteReview);

export default router;