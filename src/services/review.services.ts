import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export interface ICreateReviewPayload {
  trainerId: string;
  rating: number;
  comment: string;
}

export const reviewServices = {
  createReview: async (payload: ICreateReviewPayload, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.post("/reviews/create-review", payload, options);
      return response;
    }

    catch (error) {
      console.error("[reviewServices.createReview] api error:", error);
      const serverErrorMessage = error || "Failed to create review";
      throw serverErrorMessage;
    }
  },

  getMyReviews: async (options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get("/reviews/user/my-reviews", options);
      return response;
    }

    catch (error) {
      console.error("[reviewServices.getMyReviews] api error:", error);
      const serverErrorMessage = error || "Failed to fetch reviews";
      throw serverErrorMessage;
    }
  },

  getReviewsForTrainer: async (trainerId: string) => {
    try {
      const response = await httpClient.get(`reviews/trainer/${trainerId}/reviews`);
      return response;
    }

    catch (error) {
      console.error("[reviewServices.getReviewsForTrainer] api error:", error);
      const serverErrorMessage = error || "Failed to fetch reviews for trainer";
      throw serverErrorMessage;
    }
  },

  alreadyReviewedOrNot: async (trainerId: string) => {
    try {
      const response = await httpClient.get(`/reviews/is-already-reviewed/${trainerId}`);
      return response;
    }

    catch (error) {
      console.error("[reviewServices.alreadyReviewedOrNot] api error:", error);
      const serverErrorMessage = error || "Failed to check review status";
      throw serverErrorMessage;
    }
  } 
}