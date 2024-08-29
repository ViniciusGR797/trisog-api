import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { ExperienceController } from '../controllers/experienceController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Experience
 *   description: Routes for experience manipulation
 */

/**
 * @swagger
 * /experiences:
 *   get:
 *     summary: View all experiences
 *     description: Returns information about all experiences
 *     tags:
 *       - Experience
 *     operationId: get_all_experiences
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: string
 *           default: '1'
 *       - name: limit
 *         in: query
 *         description: Number of experiences per page
 *         required: false
 *         schema:
 *           type: string
 *           default: '10'
 *       - name: title
 *         in: query
 *         description: Title to search for in experiences
 *         required: false
 *         schema:
 *           type: string
 *           example: 'Tour'
 *       - name: price
 *         in: query
 *         description: Maximum price to filter experiences by
 *         required: false
 *         schema:
 *           type: string
 *           example: '150'
 *       - name: categoriesId
 *         in: query
 *         description: Comma-separated list of category IDs to filter by
 *         required: false
 *         schema:
 *           type: string
 *           example: '66ce29934244142ada6b021e,66ce29934244142ada6b021f'
 *       - name: destinationsId
 *         in: query
 *         description: Comma-separated list of destination IDs to filter by
 *         required: false
 *         schema:
 *           type: string
 *           example: '76ce29934244142ada6b021e,76ce29934244142ada6b021f'
 *       - name: rating
 *         in: query
 *         description: Minimum rating to filter experiences by
 *         required: false
 *         schema:
 *           type: string
 *           example: '4'
 *       - name: date
 *         in: query
 *         description: Date to filter experiences by
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: '2024-03-24'
 *       - name: guests
 *         in: query
 *         description: Number of guests to filter by
 *         required: false
 *         schema:
 *           type: string
 *           example: '2'
 *       - name: isActivity
 *         in: query
 *         description: Filter by whether the experience is an activity (true/false)
 *         required: false
 *         schema:
 *           type: string
 *           enum: ['true', 'false']
 *           example: 'false'
 *       - name: sortBy
 *         in: query
 *         description: Field to sort experiences by
 *         required: false
 *         schema:
 *           type: string
 *           example: 'title'
 *       - name: order
 *         in: query
 *         description: Sort order (ascending or descending)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: 'desc'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PaginatedExperiences"
 *       400:
 *         description: BadRequest
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/BadRequest"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', ExperienceController.getExperiences);

/**
 * @swagger
 * /experiences/{experience_id}:
 *   parameters:
 *     - name: experience_id
 *       in: path
 *       required: true
 *       description: ID of the experience that will be displayed
 *       schema:
 *         type: string
 *   get:
 *     summary: View experience by id
 *     description: Returns experience information by id
 *     tags:
 *       - Experience
 *     operationId: get_experience_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
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

router.get('/:experience_id', ExperienceController.getExperienceById);

/**
 * @swagger
 * /experiences:
 *   post:
 *     summary: Create a new experience
 *     description: Creates a new experience based on the data provided in the request body.
 *     tags:
 *       - Experience
 *     operationId: create_experience
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ExperienceUpsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
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

router.post('/', authMiddleware, ExperienceController.createExperience);

/**
 * @swagger
 * /experiences/{experience_id}:
 *   parameters:
 *     - name: experience_id
 *       in: path
 *       required: true
 *       description: Experience ID to be updated
 *       schema:
 *         type: string
 *   put:
 *     summary: Update experience
 *     description: Updates the information of the desired experience
 *     tags:
 *       - Experience
 *     operationId: update_experience
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ExperienceUpsert"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Experience"
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

router.put('/:experience_id', authMiddleware, ExperienceController.updateExperience);

/**
 * @swagger
 * /experiences/{experience_id}:
 *   parameters:
 *     - name: experience_id
 *       in: path
 *       required: true
 *       description: ID of the experience to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove experience
 *     description: Deletes a experience based on the ID provided
 *     tags:
 *       - Experience
 *     operationId: delete_experience
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

router.delete('/:experience_id', authMiddleware, ExperienceController.deleteExperience);

export default router;