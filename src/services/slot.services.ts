import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const slotServices = {
  getMySlots: async (trainerId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get(`/slots/trainer/${trainerId}`, options);
      return response;
    }
    catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    }
  }
}