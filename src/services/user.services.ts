import { cookies } from "next/headers";

export const userServices = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const accessToken = cookieStore.get("access_token")?.value ?? null;
      const refreshToken = cookieStore.get("refresh_token")?.value ?? null;
      const token = cookieStore.get("better-auth.session_token")?.value ?? null;
      const role = cookieStore.get("role")?.value ?? null;

      return {
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          token,
          role,
        },
        error: null,
      };
    } catch {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};