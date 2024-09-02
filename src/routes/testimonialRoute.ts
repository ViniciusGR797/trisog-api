import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { TestimonialController } from '../controllers/testimonialController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Testimonial
 *   description: Routes for testimonial manipulation
 */

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: View all testimonials
 *     description: Returns information about all testimonials
 *     tags:
 *       - Testimonial
 *     operationId: get_all_testimonials
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/TestimonialList"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', TestimonialController.getTestimonials);

/**
 * @swagger
 * /testimonials/{testimonial_id}:
 *   parameters:
 *     - name: testimonial_id
 *       in: path
 *       required: true
 *       description: ID of the testimonial that will be displayed
 *       schema:
 *         type: string
 *   get:
 *     summary: View testimonial by id
 *     description: Returns testimonial information by id
 *     tags:
 *       - Testimonial
 *     operationId: get_testimonial_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Testimonial"
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

router.get('/:testimonial_id', TestimonialController.getTestimonialById);

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create a new testimonial
 *     description: Creates a new testimonial based on the data provided in the request body.
 *     tags:
 *       - Testimonial
 *     operationId: create_testimonial
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TestimonialUpsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Testimonial"
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

router.post('/', authMiddleware, TestimonialController.createTestimonial);

/**
 * @swagger
 * /testimonials/{testimonial_id}:
 *   parameters:
 *     - name: testimonial_id
 *       in: path
 *       required: true
 *       description: Testimonial ID to be updated
 *       schema:
 *         type: string
 *   put:
 *     summary: Update testimonial
 *     description: Updates the information of the desired testimonial
 *     tags:
 *       - Testimonial
 *     operationId: update_testimonial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/TestimonialUpsert"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Testimonial"
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

router.put('/:testimonial_id', authMiddleware, TestimonialController.updateTestimonial);

/**
 * @swagger
 * /testimonials/{testimonial_id}:
 *   parameters:
 *     - name: testimonial_id
 *       in: path
 *       required: true
 *       description: ID of the testimonial to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove testimonial
 *     description: Deletes a testimonial based on the ID provided
 *     tags:
 *       - Testimonial
 *     operationId: delete_testimonial
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

router.delete('/:testimonial_id', authMiddleware, TestimonialController.deleteTestimonial);

export default router;