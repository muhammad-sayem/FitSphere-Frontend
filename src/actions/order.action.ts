"use server";

import { cookies } from "next/headers";
import { ICreateOrderPayload, orderServices } from "@/services/order.services";

//* Called from the client buy-product modal. Forwards the Cookie header so
//  the cross-origin backend can authenticate the user. *//
export const createOrderAction = async (payload: ICreateOrderPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await orderServices.createOrder(payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[createOrderAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to create order";
    throw new Error(serverErrorMessage);
  }
};

//* Called from the user/trainer MyOrders client components. Forwards the
//  Cookie header so the cross-origin backend can authenticate the user. *//
export const getMyOrdersAction = async (
  params?: Record<string, unknown>
) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await orderServices.getMyOrders({
      headers: {
        Cookie: cookieHeader,
      },
      params,
    });

    return response;
  }

  catch (error: any) {
    console.error("[getMyOrdersAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to fetch orders";
    throw new Error(serverErrorMessage);
  }
};