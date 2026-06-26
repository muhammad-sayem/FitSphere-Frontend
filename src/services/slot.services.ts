/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export interface ICreateSlotPayload {
  date: string; // YYYY-MM-DD format (local date, no timezone shift)
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
    } 
    
    catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    }
  },

  getSlotsByTrainerId: async (trainerId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get(`/slots/trainer/${trainerId}`, options);
      return response;
    } 
    catch (error) {
      console.error('Error fetching slots by trainer profile ID:', error);
      throw error;
    }
  },

  updateBookingStatus: async (slotId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.patch(`/slots/update-booking-status/${slotId}`, options);
      return response;
    }
    catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },

  deleteMySlot: async (slotId: string, options?: ApiRequestOptions) => {
    try{
      const response = await httpClient.delete(`/slots/delete-slot/${slotId}`, options);
      return response;
    }

    catch(error){
      console.error('Error deleting slot:', error);
      throw error;
    }
  }
}