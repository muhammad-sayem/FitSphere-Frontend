"use server";

import { cookies } from "next/headers";
import { paymentServices } from "@/services/payment.services";

//* Called from the client my-payments table. Forwards the Cookie header so
//  the cross-origin backend can authenticate the user. *//
export const getMyPaymentsAction = async (params?: Record<string, unknown>) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await paymentServices.getMyPayments({
      headers: {
        Cookie: cookieHeader,
      },
      params,
    });

    return response;
  }

  catch (error: any) {
    console.error("[getMyPaymentsAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to fetch payments";
    throw new Error(serverErrorMessage);
  }
}