import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const statServices = {
  getDashboardStats: async(options?: ApiRequestOptions) => {
    try{
      const response = await httpClient.get("/stats", options)
      return response.data;
    }

    catch (error) {
      console.error("[statServices.getDashboardStats] api error:", error);
      const serverErrorMessage = error || "Failed to fetch dashboard stats";
      throw serverErrorMessage;
    }
  }
}