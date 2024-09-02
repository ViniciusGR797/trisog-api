import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { NewsletterController } from '../controllers/newsletterController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Newsletter
 *   description: Routes for newsletter manipulation
 */

/**
 * @swagger
 * /newsletters:
 *   get:
 *     summary: View all newsletters
 *     description: Returns information about all newsletters
 *     tags:
 *       - Newsletter
 *     operationId: get_all_newsletters
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NewsletterList"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', authMiddleware, NewsletterController.getNewsletters);

/**
 * @swagger
 * /newsletters/{newsletter_id}:
 *   parameters:
 *     - name: newsletter_id
 *       in: path
 *       required: true
 *       description: ID of the newsletter that will be displayed
 *       schema:
 *         type: string
 *   get:
 *     summary: View newsletter by id
 *     description: Returns newsletter information by id
 *     tags:
 *       - Newsletter
 *     operationId: get_newsletter_by_id
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Newsletter"
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

router.get('/:newsletter_id', authMiddleware, NewsletterController.getNewsletterById);

/**
 * @swagger
 * /newsletters:
 *   post:
 *     summary: Create a new newsletter
 *     description: Creates a new newsletter based on the data provided in the request body.
 *     tags:
 *       - Newsletter
 *     operationId: create_newsletter
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewsletterUpsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Newsletter"
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

router.post('/', NewsletterController.createNewsletter);

/**
 * @swagger
 * /newsletters/{newsletter_id}:
 *   parameters:
 *     - name: newsletter_id
 *       in: path
 *       required: true
 *       description: ID of the newsletter to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove newsletter
 *     description: Deletes a newsletter based on the ID provided
 *     tags:
 *       - Newsletter
 *     operationId: delete_newsletter
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

router.delete('/:newsletter_id', NewsletterController.deleteNewsletter);

export default router;