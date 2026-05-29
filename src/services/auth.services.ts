"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";
import { setCookie } from "@/lib/cookieUtils";
import { setTokenInCookies } from "@/lib/tokenUtils";
import { loginZodSchema } from "@/zod/auth.validation";

interface ILoginPayload {
  email: string;
  password: string;
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

    const { access_token, refresh_token, token } = response.data;
    const role = response.data.user?.role;

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