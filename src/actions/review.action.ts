"use server";

import { cookies } from "next/headers";
import { ICreateReviewPayload, reviewServices } from "@/services/review.services";

//* Called from the user "Give Review" modal on the trainer profile page.
//  Forwards the Cookie header so the cross-origin backend can authenticate
//  the user via better-auth. *//
export const createReviewAction = async (payload: ICreateReviewPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await reviewServices.createReview(payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[createReviewAction] error:", error);
    const serverErrorMessage =
      error?.response?.data?.message || error?.message || "Failed to create review";
    throw new Error(serverErrorMessage);
  }
};