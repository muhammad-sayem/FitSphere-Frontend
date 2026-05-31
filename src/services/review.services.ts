import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const reviewServices = {
  getMyReviews: (options?: ApiRequestOptions) => {
    try {
      const response = httpClient.get("/reviews/user/my-reviews", options);
      return response;
    }

    catch (error) {
      console.error("[reviewServices.getMyReviews] api error:", error);
      const serverErrorMessage = error || "Failed to fetch reviews";
      throw serverErrorMessage;
    }
  },

  getReviewsForTrainer: (trainerId: string) => {
    try {
      const response = httpClient.get(`reviews/trainer/${trainerId}/reviews`);
      return response;
    }

    catch (error) {
      console.error("[reviewServices.getReviewsForTrainer] api error:", error);
      const serverErrorMessage = error || "Failed to fetch reviews for trainer";
      throw serverErrorMessage;
    }
  }
}