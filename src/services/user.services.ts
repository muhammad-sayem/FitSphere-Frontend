import { jwtUtils } from "@/lib/jwtUtils";
import { cookies } from "next/headers";

export const userServices = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const accessToken = cookieStore.get("access_token")?.value ?? null;
      const refreshToken = cookieStore.get("refresh_token")?.value ?? null;
      const token = cookieStore.get("better-auth.session_token")?.value ?? null;

      return {
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          token,
        },
        error: null,
      };
    } catch {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getLoggedInUser: async function () {
    // const cookieStore = await cookies();
    // const userCookie = cookieStore.get("user")?.value ?? null;
    // return userCookie ? JSON.parse(userCookie) : null;

    const cookieStore = await cookies();
    const access_token = cookieStore.get("access_token")?.value;

    if (!access_token) {
      return null;
    }

    const secret = process.env.JWT_ACCESS_SECRET;
    
    if (!secret) {
      console.error("JWT Secret is missing in environment variables.");
      return null;
    }

    const result = jwtUtils.verifyToken(access_token, secret);

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  }
};