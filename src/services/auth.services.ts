"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { setCookie } from "@/lib/cookieUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { UserRoles } from "@/types/auth.types";
import { loginZodSchema, registerZodSchema } from "@/zod/auth.validation";

interface IRegisterPayload {
  name: string;
  image?: File | null;
  role: UserRoles["USER"] | UserRoles["TRAINER"];
  email: string;
  password: string;
}

interface ILoginPayload {
  email: string;
  password: string;
}

export const registerAction = async (payload: IRegisterPayload) => {
  const { image, ...rest } = payload;
  const parsedPayload = registerZodSchema.safeParse(rest);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "Invalid input";

    return {
      success: false,
      message: firstError
    }
  }

  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(parsedPayload.data));

    if (image instanceof File) {
      formData.append("file", image);
    }

    const response = await httpClient.post("/auth/register", formData);
    const responseBody = response?.data ?? response;
    const responseData = responseBody?.data ?? responseBody;

    const { access_token, refresh_token, token, user } = responseData;
    const role = user?.role;

    await setTokenInCookies("access_token", access_token);
    await setTokenInCookies("refresh_token", refresh_token);
    await setTokenInCookies("better-auth.session_token", token, 60 * 60 * 24 * 7)    //* 7 days;

    if (role) {
      await setCookie("role", role, 60 * 60 * 24 * 7);
    }

    return {
      success: true,
      message: "Registration successful"
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

    if (role) {
      await setCookie("role", role, 60 * 60 * 24 * 7);
    }

    return {
      success: true,
      message: "Login successful"
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