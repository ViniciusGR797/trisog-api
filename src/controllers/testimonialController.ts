import { Request, Response } from "express";
import { TestimonialUpsert } from "../models/testimonialModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { TestimonialService } from "../services/testimonialService";

export class TestimonialController {
  static async getTestimonials(req: Request, res: Response): Promise<Response> {
    const { testimonials, error: getgetTestimonialssError } =
      await TestimonialService.getTestimonials();
    if (getgetTestimonialssError) {
      return res.status(500).json({ msg: getgetTestimonialssError });
    }

    return res.status(200).json(testimonials);
  }

  static async getTestimonialById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const testimonialId = req.params.testimonial_id;
    if (!isValidObjectId(testimonialId)) {
      return res.status(400).json({ msg: "Invalid testimonial ID" });
    }

    const { testimonial, error: getTestimonialError } =
      await TestimonialService.getTestimonialById(testimonialId);
    if (getTestimonialError) {
      return res.status(500).json({ msg: getTestimonialError });
    }
    if (!testimonial) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(testimonial);
  }

  static async createTestimonial(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new TestimonialUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdTestimonialId, error: createTestimonialError } =
      await TestimonialService.createTestimonial(payload);
    if (createTestimonialError) {
      return res.status(500).json({ msg: createTestimonialError });
    }
    if (!createdTestimonialId || createdTestimonialId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { testimonial, error: getTestimonialError } =
      await TestimonialService.getTestimonialById(createdTestimonialId);
    if (getTestimonialError) {
      return res.status(500).json({ msg: getTestimonialError });
    }
    if (!testimonial) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(testimonial);
  }

  static async updateTestimonial(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const testimonialId = req.params.testimonial_id;
    if (!isValidObjectId(testimonialId)) {
      return res.status(400).json({ msg: "Invalid testimonial ID" });
    }

    const { testimonial, error: getTestimonialError } =
      await TestimonialService.getTestimonialById(testimonialId);
    if (getTestimonialError) {
      return res.status(500).json({ msg: getTestimonialError });
    }
    if (!testimonial) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new TestimonialUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { updatedTestimonial, error: updatedTestimonialError } =
      await TestimonialService.updateTestimonial(testimonialId, payload);
    if (updatedTestimonialError) {
      return res.status(500).json({ msg: updatedTestimonialError });
    }
    if (!updatedTestimonial) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedTestimonial);
  }

  static async deleteTestimonial(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const testimonialId = req.params.testimonial_id;
    if (!isValidObjectId(testimonialId)) {
      return res.status(400).json({ msg: "Invalid testimonial ID" });
    }

    const { testimonial, error: getTestimonialError } =
      await TestimonialService.getTestimonialById(testimonialId);
    if (getTestimonialError) {
      return res.status(500).json({ msg: getTestimonialError });
    }
    if (!testimonial) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedTestimonial, error: deletedTestimonialError } =
      await TestimonialService.deleteTestimonial(testimonialId);
    if (deletedTestimonialError) {
      return res.status(500).json({ msg: deletedTestimonialError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
