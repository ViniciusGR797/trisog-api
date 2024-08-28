import { Request, Response } from "express";
import { PlanUpsert } from "../models/planModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { PlanService } from "../services/planService";

export class PlanController {
  static async getPlans(req: Request, res: Response): Promise<Response> {
    const { plans, error: getPlansError } =
      await PlanService.getPlans();
    if (getPlansError) {
      return res.status(500).json({ msg: getPlansError });
    }

    return res.status(200).json(plans);
  }

  static async getPlanById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const planId = req.params.plan_id;
    if (!isValidObjectId(planId)) {
      return res.status(400).json({ msg: "Invalid plan ID" });
    }

    const { plan, error: getPlanError } =
      await PlanService.getPlanById(planId);
    if (getPlanError) {
      return res.status(500).json({ msg: getPlanError });
    }
    if (!plan) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(plan);
  }

  static async createPlan(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new PlanUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdPlanId, error: createPlanError } =
      await PlanService.createPlan(payload);
    if (createPlanError) {
      return res.status(500).json({ msg: createPlanError });
    }
    if (!createdPlanId || createdPlanId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { plan, error: getPlanError } =
      await PlanService.getPlanById(createdPlanId);
    if (getPlanError) {
      return res.status(500).json({ msg: getPlanError });
    }
    if (!plan) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(plan);
  }

  static async updatePlan(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const planId = req.params.plan_id;
    if (!isValidObjectId(planId)) {
      return res.status(400).json({ msg: "Invalid plan ID" });
    }

    const { plan, error: getPlanError } =
      await PlanService.getPlanById(planId);
    if (getPlanError) {
      return res.status(500).json({ msg: getPlanError });
    }
    if (!plan) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new PlanUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { updatedPlan, error: updatedPlanError } =
      await PlanService.updatePlan(planId, payload);
    if (updatedPlanError) {
      return res.status(500).json({ msg: updatedPlanError });
    }
    if (!updatedPlan) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedPlan);
  }

  static async deletePlan(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const planId = req.params.plan_id;
    if (!isValidObjectId(planId)) {
      return res.status(400).json({ msg: "Invalid plan ID" });
    }

    const { plan, error: getPlanError } =
      await PlanService.getPlanById(planId);
    if (getPlanError) {
      return res.status(500).json({ msg: getPlanError });
    }
    if (!plan) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedPlan, error: deletedPlanError } =
      await PlanService.deletePlan(planId);
    if (deletedPlanError) {
      return res.status(500).json({ msg: deletedPlanError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
