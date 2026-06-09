/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export interface ICreateSlotPayload {
  date: Date;
  startTime: string;
  endTime: string;
}

export const slotServices = {
  createSlot: async (payload: ICreateSlotPayload, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.post("/slots/create-slot", payload, options);
      return response;
    } 
    catch (error: any) {
      console.error("Error creating slot:", error);
      const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to create slot";
      throw new Error(serverErrorMessage);
    }
  },

  getMySlots: async (trainerId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get(`/slots/trainer/${trainerId}`, options);
      return response;
    } catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    }
  }
}