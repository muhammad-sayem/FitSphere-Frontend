import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const paymentServices = {
  getMyPayments: (options?: ApiRequestOptions) => {
    try{
      const response = httpClient.get("/payments/my-payments", options);
      return response;
    }

    catch (error) {
      console.error("[paymentServices.getMyPayments] api error:", error);
      const serverErrorMessage = error || "Failed to fetch payments";
      throw serverErrorMessage;
    }
  }
}