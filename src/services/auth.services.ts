"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { deleteCookie } from "@/lib/cookieUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { loginZodSchema, registerZodSchema } from "@/zod/auth.validation";

interface ILoginPayload {
  email: string;
  password: string;
}

export const registerAction = async (formData: FormData) => {
  const rawPayload = {
    name: formData.get("name"),
    role: formData.get("role"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const image = formData.get("image");
  const parsedPayload = registerZodSchema.safeParse(rawPayload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";

    return {
      success: false,
      message: firstError
    }
  }

  try {
    const requestPayload = new FormData();
    requestPayload.append("data", JSON.stringify(parsedPayload.data));

    if (image instanceof File) {
      requestPayload.append("file", image);
    }

    const response = await httpClient.post("/auth/register", requestPayload);
    const responseBody = response?.data ?? response;
    const responseData = responseBody?.data ?? responseBody;

    const { access_token, refresh_token, token, user } = responseData;
    const role = user?.role;

    await setTokenInCookies("access_token", access_token);
    await setTokenInCookies("refresh_token", refresh_token);
    await setTokenInCookies("better-auth.session_token", token, 60 * 60 * 24 * 7)    //* 7 days;

    return {
      success: true,
      message: "Registration successful",
      role
    };

  }

  catch (error: any) {
    const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
    return {
      success: false,
      message: errorMessage
    };
  }
}

export const loginAction = async (payload: ILoginPayload) => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";

    return {
      success: false,
      message: firstError
    }
  }

  try {
    const response = await httpClient.post("/auth/login", parsedPayload.data);
    const responseBody = response?.data ?? response;
    const responseData = responseBody?.data ?? responseBody;

    const { access_token, refresh_token, token, user } = responseData;
    const role = user?.role;


    await setTokenInCookies("access_token", access_token);
    await setTokenInCookies("refresh_token", refresh_token);
    await setTokenInCookies("better-auth.session_token", token, 60 * 60 * 24 * 7)    //* 7 days;

    return {
      success: true,
      message: "Login successful",
      role
    };

  }

  catch (error: any) {
    const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
    return {
      success: false,
      message: errorMessage
    };
  }

}

export const logoutAction = async () => {
  try {
    const response = await httpClient.post("/auth/logout", {});

    await deleteCookie("access_token");
    await deleteCookie("refresh_token");
    await deleteCookie("better-auth.session_token");

    return response.data ?? response;
  }

  catch (error: any) {
    const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
    return {
      success: false,
      message: errorMessage
    };
  }
}