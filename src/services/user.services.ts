import { cookies } from "next/headers";

export const userServices = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();   // For capturing cookies //
      console.log("Cookie Store", cookieStore, process.env.NEXT_PUBLIC_AUTH_URL);

      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString()
        },
        cache: "no-store"
      });

      const session = await res.json();

      if (session?.data === null) {
        return { data: null, error: { message: "Session Not Found" } }
      }
      return { data: session, error: null };
    }

    catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something Went Wrong" } }
    }
  },
}