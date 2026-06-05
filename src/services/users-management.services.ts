import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const usersManagementServices = {
  getAllUsers: async (options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get("/users", options);
      return response;
    }

    catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  }
}