/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export interface ICreateTrainerProfilePayload {
  bio?: string;
  specialties: string;
  experience: number;
  feePerHour: number;
}

export const trainerServices = {
  getAllTrainers: async () => {
    try {
      const trainers = await httpClient.get("/trainer-profiles");
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

  createTrainerProfile: async(payload: ICreateTrainerProfilePayload) => {
    try{
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
  }
}