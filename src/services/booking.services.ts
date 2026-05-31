import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const bookingServices = {
  getBookingsByUserId: async (userId: string, options?: ApiRequestOptions) => {
    try{
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
  }
}