"use server";

import { cookies } from "next/headers";
import { userServices } from "@/services/user.services";
import { usersManagementServices } from "@/services/users-management.services";

export const getLoggedInUser = async () => {
  const result = await userServices.getLoggedInUser();
  return result;
}

export const changeUserStatusAction = async (userId: string, newStatus: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await usersManagementServices.changeUserStatus(userId, newStatus, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[changeUserStatusAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to change user status";
    throw new Error(serverErrorMessage);
  }
}