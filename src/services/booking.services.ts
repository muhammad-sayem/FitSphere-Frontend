/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const bookingServices = {
  getBookingsByUserId: async (options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get(`/bookings/user/my-bookings`, options);
      return response;
    }

    catch (error) {
      console.error("[bookingServices.getBookingsByUserId] api error:", error);
      const serverErrorMessage = error || "Failed to fetch bookings";

      return {
        data: null,
        error: { message: serverErrorMessage }
      };
    }
  },

  deleteMyBooking: async (bookingId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.delete(`/bookings/delete-booking/${bookingId}`, options);
      return response;
    }

    catch (error: any) {
      console.error("Error creating slot:", error);
      const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to create slot";
      throw new Error(serverErrorMessage);
    }
  }
}