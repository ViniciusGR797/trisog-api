import { Request, Response } from "express";
import { Booking, BookingUpsert, BookingUpsertExtended } from "../models/bookingModel";
import { isValidFirebaseUID, isValidObjectId } from "../utils/validate";
import { validate } from "class-validator";
import { BookingService } from "../services/bookingService";
import { ExperienceService } from "../services/experienceService";

export class BookingController {
  static async getBookings(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const { bookings: bookingRaw, error: getBookingsError } =
      await BookingService.getBookings(userId);
    if (getBookingsError) {
      return res.status(500).json({ msg: getBookingsError });
    }
    if (!bookingRaw) {
      return res.status(200).json([]);
    }

    const bookings: Booking[] = new Array(bookingRaw.length);

    for (let i = 0; i < bookingRaw.length; i++) {
      const { experience_id, ...remainingBookingRaw } = bookingRaw[i];

      const { experience: experienceRaw, error: getExperienceError } =
        await ExperienceService.getExperienceById(experience_id);
      if (getExperienceError) {
        return res.status(500).json({ msg: getExperienceError });
      }
      if (!experienceRaw) {
        return res.status(404).json({ msg: "No data found" });
      }

      bookings[i] = new Booking({
        ...remainingBookingRaw,
        experience: experienceRaw,
      });
    }

    return res.status(200).json(bookings);
  }

  static async getBookingsStatsCount(req: Request, res: Response): Promise<Response> {

    const { bookingsCount, error: getBookingsCountError } =
      await BookingService.getBookingsStatsCount();
    if (getBookingsCountError) {
      return res.status(500).json({ msg: getBookingsCountError });
    }

    return res.status(200).json({ count: bookingsCount });
  }

  static async getBookingById(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const bookingId = req.params.booking_id;
    if (!isValidObjectId(bookingId)) {
      return res.status(400).json({ msg: "Invalid booking ID" });
    }

    const { booking: bookingRaw, error: getBookingError } =
      await BookingService.getBookingById(bookingId);
    if (getBookingError) {
      return res.status(500).json({ msg: getBookingError });
    }
    if (!bookingRaw) {
      return res.status(404).json({ msg: "No data found" });
    }

    if (bookingRaw.user_id !== userId) {
      return res.status(403).json({ msg: "You can only view bookings associated with your own account" });
    }

    const { experience_id, ...remainingBookingRaw } = bookingRaw;

    const { experience: experienceRaw, error: getExperienceError } =
      await ExperienceService.getExperienceById(experience_id);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experienceRaw) {
      return res.status(404).json({ msg: "No data found" });
    }

    const booking = new Booking({
      ...remainingBookingRaw,
      experience: experienceRaw,
    });

    return res.status(200).json(booking);
  }

  static async createBooking(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const payload = new BookingUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    if (!isValidObjectId(payload.experience_id)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }
    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(payload.experience_id);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const newPayload = new BookingUpsertExtended({
      ...payload,
      total_price:
        experience.default_price *
        (Number(payload.ticket.adults) +
          Number(payload.ticket.kids) +
          Number(payload.ticket.children) * 0.5),
      user_id: userId,
    });

    const { createdBookingId, error: createBookingError } =
      await BookingService.createBooking(newPayload);
    if (createBookingError) {
      return res.status(500).json({ msg: createBookingError });
    }
    if (!createdBookingId || createdBookingId === "") {
      return res.status(404).json({ msg: "No data found" });
    }

    const { booking, error: getBookingError } =
      await BookingService.getBookingById(createdBookingId);
    if (getBookingError) {
      return res.status(500).json({ msg: getBookingError });
    }
    if (!booking) {
      return res.status(404).json({ msg: "No data found" });
    }

    return res.status(201).json(booking);
  }

  static async updateBooking(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const bookingId = req.params.booking_id;
    if (!isValidObjectId(bookingId)) {
      return res.status(400).json({ msg: "Invalid booking ID" });
    }

    const { booking, error: getBookingError } =
      await BookingService.getBookingById(bookingId);
    if (getBookingError) {
      return res.status(500).json({ msg: getBookingError });
    }
    if (!booking) {
      return res.status(404).json({ msg: "No data found" });
    }

    const payload = new BookingUpsert(req.body);
    const errors = await validate(payload);
    if (errors.length > 0) {
      const firstError = errors[0];
      const errorMessage = firstError.constraints
        ? Object.values(firstError.constraints)[0]
        : "Invalid and/or incomplete parameters";
      return res.status(400).json({ msg: errorMessage });
    }

    if (!isValidObjectId(payload.experience_id)) {
      return res.status(400).json({ msg: "Invalid experience ID" });
    }
    const { experience, error: getExperienceError } =
      await ExperienceService.getExperienceById(payload.experience_id);
    if (getExperienceError) {
      return res.status(500).json({ msg: getExperienceError });
    }
    if (!experience) {
      return res.status(400).json({
        msg: "The specified experience does not exist, please choose a valid experience",
      });
    }

    const newPayload = new BookingUpsertExtended({
      ...payload,
      total_price:
        experience.default_price *
        (Number(payload.ticket.adults) +
          Number(payload.ticket.kids) +
          Number(payload.ticket.children) * 0.5),
      user_id: userId,
    });

    const { updatedBooking, error: updatedBookingError } =
      await BookingService.updateBooking(bookingId, newPayload);
    if (updatedBookingError) {
      return res.status(500).json({ msg: updatedBookingError });
    }
    if (!updatedBooking) {
      return res.status(404).json({ msg: "No data found" });
    }
    return res.status(200).json(updatedBooking);
  }

  static async deleteBooking(req: Request, res: Response): Promise<Response> {
    const userId = req.user_id;
    if (!isValidFirebaseUID(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const bookingId = req.params.booking_id;
    if (!isValidObjectId(bookingId)) {
      return res.status(400).json({ msg: "Invalid booking ID" });
    }

    const { booking, error: getBookingError } =
      await BookingService.getBookingById(bookingId);
    if (getBookingError) {
      return res.status(500).json({ msg: getBookingError });
    }
    if (!booking) {
      return res.status(404).json({ msg: "No data found" });
    }

    const { deletedBooking, error: deletedBookingError } =
      await BookingService.deleteBooking(bookingId);
    if (deletedBookingError) {
      return res.status(500).json({ msg: deletedBookingError });
    }
    return res.status(200).json({ msg: "Successfully deleted" });
  }
}
