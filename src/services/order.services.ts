import { httpClient } from "@/lib/axios/httpClient";

export const orderServices = {
  getMyOrders: () => {
    try{
      const response = httpClient.get("/orders/user/my-orders");
      return response;
    }

    catch (error) {
      console.error("[orderServices.getMyOrders] api error:", error);
      const serverErrorMessage = error || "Failed to fetch orders";
      throw serverErrorMessage;
    }
  }
}