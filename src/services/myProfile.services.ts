/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export interface IEditMyProfilePayload {
  name?: string;
  image?: string;
}

export const myProfileServices = {
  editMyProfile: async (payload: IEditMyProfilePayload, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.patch("/my-profile/edit-my-profile", payload, options);
      return response;
    }

    catch (error: any) {
      console.error("[myProfileServices.editMyProfile] api error:", error);
      const serverErrorMessage = error?.response?.data?.message || error?.message || "Failed to edit profile";
      throw new Error(serverErrorMessage);
    }

  }
}