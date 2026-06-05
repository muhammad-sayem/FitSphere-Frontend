/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiRequestOptions } from "@/lib/axios/httpClient";

export interface ICreateTrainerProfilePayload {
  bio?: string;
  specialties: string;
  experience: number;
  feePerHour: number;
}

export const trainerServices = {
  createTrainerProfile: async (payload: ICreateTrainerProfilePayload) => {
    try {
      console.log("[trainerServices.createTrainerProfile] request payload:", payload);

      const response = await httpClient.post("/trainer-profiles/create-trainer-profile", payload);

      console.log("[trainerServices.createTrainerProfile] api response:", response);

      return {
        success: true,
        data: response.data,
        message: "Trainer profile created successfully"
      };
    }

    catch (error: any) {
      console.error("[trainerServices.createTrainerProfile] api error:", error);

      const serverErrorMessage = error?.response?.data?.message || "Failed to create trainer profile";

      return {
        success: false,
        data: null,
        message: serverErrorMessage
      };
    }
  },

  getAllTrainers: async (options: ApiRequestOptions) => {
    try {
      const trainers = await httpClient.get("/trainer-profiles", options);
      return trainers;
    }

    catch (error) {
      console.error("Error fetching trainers:", error);
      return {
        data: null,
        error: { message: "Failed to fetch trainers" }
      };
    }
  },

  getAllTrainersFromUsersSchema: async (options?: ApiRequestOptions) => {
    try{
      const response = await httpClient.get("/trainer-profiles/from-users", options);

      return response;
    }

    catch(error) {
      console.error("Error fetching trainers from users schema:", error);
      return {
        data: null,
        error: { message: "Failed to fetch trainers from users schema" }
      };
    }
  },

  getTrainerProfileByUserId: async (userId: string, options?: ApiRequestOptions) => {
    try {
      const trainerProfile = await httpClient.get(`/trainer-profiles/userId/${userId}`, options);

      return trainerProfile;
    }

    catch (error) {
      console.error("Error fetching trainer profile:", error);
      return {
        data: null,
        error: { message: "Failed to fetch trainer profile" }
      };
    }
  }
}