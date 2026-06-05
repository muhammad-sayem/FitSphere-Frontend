import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

export const productServices = {
  getAllProducts: async (options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get("/products", options);
      return response;
    }

    catch (error) {
      console.error("[productServices.getAllProducts] api error:", error);
      const serverErrorMessage = error || "Failed to fetch products";
      throw serverErrorMessage;
    }
  }
}