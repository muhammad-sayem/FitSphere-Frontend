"use server";

import { cookies } from "next/headers";
import { ICreateProductPayload, IUpdateProductPayload, productServices } from "@/services/product.services";

//* Called from the admin "Create Product" modal. Forwards the Cookie header
//  so the cross-origin backend can authenticate the user via better-auth. *//
export const createProductAction = async (payload: ICreateProductPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await productServices.createProduct(payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[createProductAction] error:", error);
    const serverErrorMessage =
      error?.response?.data?.message || error?.message || "Failed to create product";
    throw new Error(serverErrorMessage);
  }
};

//* Called from the admin products-management delete button. Forwards the Cookie
//  header so the cross-origin backend can authenticate the admin. *//
export const deleteProductAction = async (productId: string) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await productServices.deleteProduct(productId, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[deleteProductAction] error:", error);
    const serverErrorMessage =
      error?.response?.data?.message || error?.message || "Failed to delete product";
    throw new Error(serverErrorMessage);
  }
};

//* Called from the admin products-management edit modal. Forwards the Cookie
//  header so the cross-origin backend can authenticate the admin. *//
export const updateProductAction = async (productId: string, payload: IUpdateProductPayload) => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    const response = await productServices.updateProduct(productId, payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response;
  }

  catch (error: any) {
    console.error("[updateProductAction] error:", error);
    const serverErrorMessage =
      error?.response?.data?.message || error?.message || "Failed to update product";
    throw new Error(serverErrorMessage);
  }
};
