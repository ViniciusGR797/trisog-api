import { Request, Response } from "express";
import { NewsletterUpsert } from "../models/newsletterModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { NewsletterService } from "../services/newsletterService";

export class NewsletterController {
  static async getNewsletters(req: Request, res: Response): Promise<Response> {
    const { newsletters, error: getNewslettersError } =
      await NewsletterService.getNewsletters();
    if (getNewslettersError) {
      return res.status(500).json({ msg: getNewslettersError });
    }

    return res.status(200).json(newsletters);
  }

  static async getNewsletterById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const newsletterId = req.params.newsletter_id;
    if (!isValidObjectId(newsletterId)) {
      return res.status(400).json({ msg: "Invalid newsletter ID" });
    }

    const { newsletter, error: getNewsletterError } =
      await NewsletterService.getNewsletterById(newsletterId);
    if (getNewsletterError) {
      return res.status(500).json({ msg: getNewsletterError });
    }
    if (!newsletter) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(newsletter);
  }

  static async createNewsletter(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new NewsletterUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const { createdNewsletterId, error: createNewsletterError } =
      await NewsletterService.createNewsletter(payload);
    if (createNewsletterError) {
      return res.status(500).json({ msg: createNewsletterError });
    }
    if (!createdNewsletterId || createdNewsletterId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { newsletter, error: getNewsletterError } =
      await NewsletterService.getNewsletterById(createdNewsletterId);
    if (getNewsletterError) {
      return res.status(500).json({ msg: getNewsletterError });
    }
    if (!newsletter) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(newsletter);
  }

  static async deleteNewsletter(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const newsletterId = req.params.newsletter_id;
    if (!isValidObjectId(newsletterId)) {
      return res.status(400).json({ msg: "Invalid newsletter ID" });
    }

    const { newsletter, error: getNewsletterError } =
      await NewsletterService.getNewsletterById(newsletterId);
    if (getNewsletterError) {
      return res.status(500).json({ msg: getNewsletterError });
    }
    if (!newsletter) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedNewsletter, error: deletedNewsletterError } =
      await NewsletterService.deleteNewsletter(newsletterId);
    if (deletedNewsletterError) {
      return res.status(500).json({ msg: deletedNewsletterError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
