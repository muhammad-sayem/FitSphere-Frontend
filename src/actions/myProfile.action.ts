/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IEditMyProfilePayload, myProfileServices } from "@/services/myProfile.services";
import { cookies } from "next/headers";

export const editMyProfileAction = async (payload: IEditMyProfilePayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await myProfileServices.editMyProfile(payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    
    return response;
  }

  catch (error: any) {
    console.error("[editMyProfileAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to edit profile";
    throw new Error(serverErrorMessage);
  }
}