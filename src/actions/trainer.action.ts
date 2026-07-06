"use server";

import { ICreateTrainerProfilePayload, trainerServices } from "@/services/trainer.services";
import { cookies } from "next/headers";
import { ICreateSlotPayload, slotServices } from "@/services/slot.services";
import { usersManagementServices } from "@/services/users-management.services";

export const createTrainerProfileAction = async (payload: ICreateTrainerProfilePayload) => {
  try {
    console.log("[createTrainerProfileAction] payload:", payload);
    const response = await trainerServices.createTrainerProfile(payload);
    console.log("[createTrainerProfileAction] response:", response);
    return response;
  }

  catch (error) {
    console.error("[createTrainerProfileAction] error:", error);
    throw error;
  }
}

export const createSlotAction = async (payload: ICreateSlotPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await slotServices.createSlot(payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[createSlotAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to create slot";
    throw new Error(serverErrorMessage);
  }
}

export const deleteMySlotAction = async (slotId: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await slotServices.deleteMySlot(slotId, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[deleteMySlotAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to delete slot";
    throw new Error(serverErrorMessage);
  }
}

//* Called from the client approval control. Forwards the Cookie header so the
//  cross-origin backend can authenticate the admin. *//
export const approveTrainerAction = async (trainerId: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await trainerServices.approveTrainer(trainerId, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[approveTrainerAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to approve trainer";
    throw new Error(serverErrorMessage);
  }
}

//* Called from the client delete control. Forwards the Cookie header so the
//  cross-origin backend can authenticate the admin. *//
export const deleteTrainerAction = async (trainerId: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await trainerServices.deleteTrainer(trainerId, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[deleteTrainerAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to delete trainer";
    throw new Error(serverErrorMessage);
  }
}

//* Called from the client users-management table. Forwards the Cookie header
//  so the cross-origin backend can authenticate the admin. *//
export const getAllUsersAction = async (params?: Record<string, unknown>) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await usersManagementServices.getAllUsers({
      headers: {
        Cookie: cookieHeader,
      },
      params,
    });

    return response;
  }

  catch (error: any) {
    console.error("[getAllUsersAction] error:", error);
    const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to fetch users";
    throw new Error(serverErrorMessage);
  }
}

