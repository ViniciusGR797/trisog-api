import { Plan, PlanUpsert } from "../models/planModel";
import prismaClient from "../utils/database";

export class PlanService {
  static async getPlans(): Promise<{
    plans: Plan[] | null;
    error: string | null;
  }> {
    try {
      const plans = await prismaClient.plan.findMany();

      return { plans, error: null };
    } catch (error) {
      console.error("Error retrieving plan: ", error);
      return { plans: null, error: "Internal Server Error" };
    }
  }

  static async getPlanById(
    planId: string
  ): Promise<{ plan: Plan | null; error: string | null }> {
    try {
      const plan = await prismaClient.plan.findUnique({
        where: {
          id: planId,
        },
      });

      if (plan) {
        return { plan, error: null };
      } else {
        return { plan: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for plan by ID: ", error);
      return { plan: null, error: "Internal server error" };
    }
  }

  static async createPlan(
    newData: PlanUpsert
  ): Promise<{ createdPlanId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.plan.create({
        data: {
          time: newData.time,
          title: newData.title,
          description: newData.description,
          topics: newData.topics,
        },
      });

      return { createdPlanId: result.id, error: null };
    } catch (error) {
      console.error("Error creating plan: ", error);
      return { createdPlanId: null, error: "Internal server error" };
    }
  }

  static async updatePlan(
    planId: string,
    updatedData: PlanUpsert
  ): Promise<{ updatedPlan: Plan | null; error: string | null }> {
    try {
      const result = await prismaClient.plan.update({
        where: {
          id: planId,
        },
        data: {
          time: updatedData.time,
          title: updatedData.title,
          description: updatedData.description,
          topics: updatedData.topics,
        },
      });

      return { updatedPlan: result, error: null };
    } catch (error) {
      console.log("Error updating plan:", error);
      return { updatedPlan: null, error: "Internal server error" };
    }
  }

  static async deletePlan(
    planId: string
  ): Promise<{ deletedPlan: Plan | null; error: string | null }> {
    try {
      const result = await prismaClient.plan.delete({
        where: {
          id: planId,
        },
      });
      return { deletedPlan: result, error: null };
    } catch (error) {
      console.error("Error deleting plan:", error);
      return { deletedPlan: null, error: "Internal server error" };
    }
  }
}
