import e from "express";
import {
  Booking,
  BookingRaw,
  BookingUpsert,
  BookingUpsertExtended,
} from "../models/bookingModel";
import prismaClient from "../utils/database";

export class BookingService {
  static async getBookings(userId: string): Promise<{
    bookings: BookingRaw[] | null;
    error: string | null;
  }> {
    try {
      const bookings = await prismaClient.booking.findMany({
        where: {
          user_id: userId,
        },
      });

      return { bookings, error: null };
    } catch (error) {
      console.error("Error retrieving booking: ", error);
      return { bookings: null, error: "Internal Server Error" };
    }
  }

  static async getBookingsStatsCount(): Promise<{
    bookingsCount: number;
    error: string | null;
  }> {
    try {
      const bookingsCount = await prismaClient.booking.count();

      return { bookingsCount, error: null };
    } catch (error) {
      console.error("Error retrieving booking: ", error);
      return { bookingsCount: 0, error: "Internal Server Error" };
    }
  }

  static async getBookingById(
    bookingId: string
  ): Promise<{ booking: BookingRaw | null; error: string | null }> {
    try {
      const booking = await prismaClient.booking.findUnique({
        where: {
          id: bookingId,
        },
      });

      if (booking) {
        return { booking, error: null };
      } else {
        return { booking: null, error: null };
      }
    } catch (error) {
      console.error("Error when searching for booking by ID: ", error);
      return { booking: null, error: "Internal server error" };
    }
  }

  static async createBooking(
    newData: BookingUpsertExtended
  ): Promise<{ createdBookingId: string | null; error: string | null }> {
    try {
      const result = await prismaClient.booking.create({
        data: {
          date: newData.date,
          time: newData.time,
          ticket: {
            adults: newData.ticket.adults,
            kids: newData.ticket.kids,
            children: newData.ticket.children,
          },
          total_price: newData.total_price,
          experience_id: newData.experience_id,
          user_id: newData.user_id,
        },
      });

      return { createdBookingId: result.id, error: null };
    } catch (error) {
      console.error("Error creating booking: ", error);
      return { createdBookingId: null, error: "Internal server error" };
    }
  }

  static async updateBooking(
    bookingId: string,
    updatedData: BookingUpsertExtended
  ): Promise<{ updatedBooking: BookingRaw | null; error: string | null }> {
    try {
      const result = await prismaClient.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          date: updatedData.date,
          time: updatedData.time,
          ticket: {
            adults: updatedData.ticket.adults,
            kids: updatedData.ticket.kids,
            children: updatedData.ticket.children,
          },
          total_price: updatedData.total_price,
          experience_id: updatedData.experience_id,
          user_id: updatedData.user_id,
        },
      });

      return { updatedBooking: result, error: null };
    } catch (error) {
      console.log("Error updating booking:", error);
      return { updatedBooking: null, error: "Internal server error" };
    }
  }

  static async deleteBooking(
    bookingId: string
  ): Promise<{ deletedBooking: BookingRaw | null; error: string | null }> {
    try {
      const result = await prismaClient.booking.delete({
        where: {
          id: bookingId,
        },
      });
      return { deletedBooking: result, error: null };
    } catch (error) {
      console.error("Error deleting booking:", error);
      return { deletedBooking: null, error: "Internal server error" };
    }
  }
}
