/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export interface ICreateOrderPayload {
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

  getMyOrders: async (options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get("/orders/user/my-orders", options);
      return response;
    }

    catch (error: any) {
      console.error("[orderServices.getMyOrders] api error:", error);
      const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to fetch orders";
      throw new Error(serverErrorMessage);
    }
  },
};