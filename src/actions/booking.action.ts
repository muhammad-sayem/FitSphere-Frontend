/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { IBookingSlotPayload, bookingServices } from "@/services/booking.services";

//* Called from the client book-session button. Forwards the Cookie header so
//  the cross-origin backend can authenticate the user. *//
export const createBookingAction = async (payload: IBookingSlotPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await bookingServices.createBooking(payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[createBookingAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to create booking";
    throw new Error(serverErrorMessage);
  }
}

//* Called from the client my-bookings table. Forwards the Cookie header so
//  the cross-origin backend can authenticate the user. *//
export const getMyBookingsAction = async (params?: Record<string, unknown>) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await bookingServices.getBookingsByUserId({
      headers: {
        Cookie: cookieHeader,
      },
      params,
    });

    return response;
  }

  catch (error: any) {
    console.error("[getMyBookingsAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to fetch bookings";
    throw new Error(serverErrorMessage);
  }
}
