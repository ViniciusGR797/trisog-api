import { Request, Response } from "express";
import {
  DestinationUpsertExtended,
  DestinationUpsert,
} from "../models/destinationModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { DestinationService } from "../services/destinationService";

export class DestinationController {
  static async getDestinations(req: Request, res: Response): Promise<Response> {
    const { destinations, error: getDestinationsError } =
      await DestinationService.getDestinations();
    if (getDestinationsError) {
      return res.status(500).json({ msg: getDestinationsError });
    }

    return res.status(200).json(destinations);
  }

  static async getDestinationById(
    req: Request,
    res: Response
  ): Promise<Response> {
    const destinationId = req.params.destination_id;
    if (!isValidObjectId(destinationId)) {
      return res.status(400).json({ msg: "Invalid destination ID" });
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(destinationId);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }
    if (!destination) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(200).json(destination);
  }

  static async createDestination(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const payload = new DestinationUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const newPayload = new DestinationUpsertExtended({
      ...payload,
      images: [payload.image] || [],
      travel_count: 0,
    });

    const { createdDestinationId, error: createDestinationError } =
      await DestinationService.createDestination(newPayload);
    if (createDestinationError) {
      return res.status(500).json({ msg: createDestinationError });
    }
    if (!createdDestinationId || createdDestinationId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(createdDestinationId);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }
    if (!destination) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(destination);
  }

  static async updateDestination(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const destinationId = req.params.destination_id;
    if (!isValidObjectId(destinationId)) {
      return res.status(400).json({ msg: "Invalid destination ID" });
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(destinationId);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }
    if (!destination) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new DestinationUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    const newPayload = new DestinationUpsertExtended({
      ...payload,
      images: [payload.image, ...destination.images.slice(1)],
      travel_count: destination.travel_count,
    });

    const { updatedDestination, error: updatedDestinationError } =
      await DestinationService.updateDestination(destinationId, newPayload);
    if (updatedDestinationError) {
      return res.status(500).json({ msg: updatedDestinationError });
    }
    if (!updatedDestination) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedDestination);
  }

  static async deleteDestination(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const destinationId = req.params.destination_id;
    if (!isValidObjectId(destinationId)) {
      return res.status(400).json({ msg: "Invalid destination ID" });
    }

    const { destination, error: getDestinationError } =
      await DestinationService.getDestinationById(destinationId);
    if (getDestinationError) {
      return res.status(500).json({ msg: getDestinationError });
    }
    if (!destination) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedDestination, error: deletedDestinationError } =
      await DestinationService.deleteDestination(destinationId);
    if (deletedDestinationError) {
      return res.status(500).json({ msg: deletedDestinationError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
