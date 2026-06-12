import { ApiRequestOptions, httpClient } from "@/lib/axios/httpClient";

enum ProductCategories {
  TRADEMILL = "TRADEMILL",
  MASSAGER = "MASSAGER",
  DUMMBBELL = "DUMMBBELL",
  BENCHES = "BENCHES",
  FLOOR_MAT = "FLOOR_MAT",
  EXERCISE_BIKE = "EXERCISE_BIKE",
  OTHER = "OTHER"
}

export interface ICreateProductPayload {
  name: string;
  description: string;
  price: number;
  category: ProductCategories;
  remainingStock: number;
  image?: string;
}

export interface IUpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: ProductCategories;
  remainingStock?: number;
  image?: string;
}

export const productServices = {
  createProduct: async (payload: ICreateProductPayload) => {
    try {
      const response = await httpClient.post("/products/create-product", payload);
      return response;
    }

    catch (error) {
      console.error("[productServices.createProduct] api error:", error);
      const serverErrorMessage = error || "Failed to create product";
      throw serverErrorMessage;
    }
  },

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
  },

  getProductById: async (productId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.get(`/products/${productId}`, options);
      return response;
    }

    catch (error) {
      console.error("[productServices.getProductById] api error:", error);
      const serverErrorMessage = error || "Failed to fetch product details";
      throw serverErrorMessage;
    }
  },

  updateProduct: async (productId: string, payload: IUpdateProductPayload) => {
    try {
      const response = await httpClient.patch(`/products/update-product/${productId}`, payload);
      return response;
    }

    catch (error) {
      console.error("[productServices.updateProduct] api error:", error);
      const serverErrorMessage = error || "Failed to update product";
      throw serverErrorMessage;
    }
  },

  deleteProduct: async (productId: string, options?: ApiRequestOptions) => {
    try {
      const response = await httpClient.delete(`/products/delete-product/${productId}`, options);
      return response;
    }

    catch (error) {
      console.error("[productServices.deleteProduct] api error:", error);
      const serverErrorMessage = error || "Failed to delete product";
      throw serverErrorMessage;
    }
  }
}