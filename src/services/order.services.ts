/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

interface ICreateOrderPayload {
  productId: string;
  quantity: number;
  address: string;
  phone: string;
}

export const orderServices = {
  createOrder: async (payload: ICreateOrderPayload, options?: ApiRequestOptions) => {
    try{
      const response = await httpClient.post("/orders/create-order", payload, options);
      return response;
    }

    catch (error: any) {
      console.error("[orderServices.createOrder] api error:", error);
      const serverErrorMessage = error || "Failed to create order";
      throw new Error(serverErrorMessage);
    }
  },

  getMyOrders: (options?: ApiRequestOptions) => {
    try {
      const response = httpClient.get("/orders/user/my-orders", options);
      return response;
    } 
    
    catch (error) {
      console.error("[orderServices.getMyOrders] api error:", error);
      const serverErrorMessage = error || "Failed to fetch orders";
      throw serverErrorMessage;
    }
  },
};