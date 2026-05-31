import { httpClient } from "@/lib/axios/httpClient";

export const paymentServices = {
  getMyPayments: () => {
    try{
      const response = httpClient.get("/payments/my-payments");
      return response;
    }

    catch (error) {
      console.error("[paymentServices.getMyPayments] api error:", error);
      const serverErrorMessage = error || "Failed to fetch payments";
      throw serverErrorMessage;
    }
  }
}