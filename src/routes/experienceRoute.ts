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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ExperienceList"
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