import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { DestinationController } from '../controllers/destinationController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Destination
 *   description: Routes for destination manipulation
 */

/**
 * @swagger
 * /destinations:
 *   get:
 *     summary: View all destinations
 *     description: Returns information about all destinations
 *     tags:
 *       - Destination
 *     operationId: get_all_destinations
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/DestinationList"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', DestinationController.getDestinations);

/**
 * @swagger
 * /destinations/{destination_id}:
 *   parameters:
 *     - name: destination_id
 *       in: path
 *       required: true
 *       description: ID of the destination that will be displayed
 *       schema:
 *         type: string
 *   get:
 *     summary: View destination by id
 *     description: Returns destination information by id
 *     tags:
 *       - Destination
 *     operationId: get_destination_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Destination"
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

router.get('/:destination_id', DestinationController.getDestinationById);

/**
 * @swagger
 * /destinations:
 *   post:
 *     summary: Create a new destination
 *     description: Creates a new destination based on the data provided in the request body.
 *     tags:
 *       - Destination
 *     operationId: create_destination
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/DestinationInsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Destination"
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

// router.post('/', authMiddleware, DestinationController.createDestination);
router.post('/', DestinationController.createDestination);

/**
 * @swagger
 * /destinations/{destination_id}:
 *   parameters:
 *     - name: destination_id
 *       in: path
 *       required: true
 *       description: Destination ID to be updated
 *       schema:
 *         type: string
 *   put:
 *     summary: Update destination
 *     description: Updates the information of the desired destination
 *     tags:
 *       - Destination
 *     operationId: update_destination
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/DestinationUpdate"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Destination"
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

// router.put('/:destination_id', authMiddleware, DestinationController.updateDestination);
router.put('/:destination_id', DestinationController.updateDestination);

/**
 * @swagger
 * /destinations/{destination_id}:
 *   parameters:
 *     - name: destination_id
 *       in: path
 *       required: true
 *       description: ID of the destination to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove destination
 *     description: Deletes a destination based on the ID provided
 *     tags:
 *       - Destination
 *     operationId: delete_destination
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

// router.delete('/:destination_id', authMiddleware, DestinationController.deleteDestination);
router.delete('/:destination_id', DestinationController.deleteDestination);

export default router;