"use server";

import { ICreateTrainerProfilePayload, trainerServices } from "@/services/trainer.services";

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