import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { PlanController } from '../controllers/planController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Plan
 *   description: Routes for plan manipulation
 */

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: View all plans
 *     description: Returns information about all plans
 *     tags:
 *       - Plan
 *     operationId: get_all_plans
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/PlanList"
 *       500:
 *         description: InternalServerError
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalServerError"
 */

router.get('/', PlanController.getPlans);

/**
 * @swagger
 * /plans/{plan_id}:
 *   parameters:
 *     - name: plan_id
 *       in: path
 *       required: true
 *       description: ID of the plan that will be displayed
 *       schema:
 *         type: string
 *   get:
 *     summary: View plan by id
 *     description: Returns plan information by id
 *     tags:
 *       - Plan
 *     operationId: get_plan_by_id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Plan"
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

router.get('/:plan_id', PlanController.getPlanById);

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create a new plan
 *     description: Creates a new plan based on the data provided in the request body.
 *     tags:
 *       - Plan
 *     operationId: create_plan
 *     security:
 *       - jwt: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PlanUpsert"
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Plan"
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

router.post('/', authMiddleware, PlanController.createPlan);

/**
 * @swagger
 * /plans/{plan_id}:
 *   parameters:
 *     - name: plan_id
 *       in: path
 *       required: true
 *       description: Plan ID to be updated
 *       schema:
 *         type: string
 *   put:
 *     summary: Update plan
 *     description: Updates the information of the desired plan
 *     tags:
 *       - Plan
 *     operationId: update_plan
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PlanUpsert"
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Plan"
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

router.put('/:plan_id', authMiddleware, PlanController.updatePlan);

/**
 * @swagger
 * /plans/{plan_id}:
 *   parameters:
 *     - name: plan_id
 *       in: path
 *       required: true
 *       description: ID of the plan to be deleted
 *       schema:
 *         type: string
 *   delete:
 *     summary: Remove plan
 *     description: Deletes a plan based on the ID provided
 *     tags:
 *       - Plan
 *     operationId: delete_plan
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

router.delete('/:plan_id', authMiddleware, PlanController.deletePlan);

export default router;