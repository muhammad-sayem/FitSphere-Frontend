import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const orderServices = {
  getMyOrders: (options?: ApiRequestOptions) => {
    try{
      const response = httpClient.get("/orders/user/my-orders", options);
      return response;
    }

    catch (error) {
      console.error("[orderServices.getMyOrders] api error:", error);
      const serverErrorMessage = error || "Failed to fetch orders";
      throw serverErrorMessage;
    }
  }
}