import MyUserProfile from "@/components/DashboardLayouts/User/myProfile/MyUserProfile";
import { getMe } from "@/services/auth.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const MyUserProfilePage = async () => {
  const cookieStore = await cookies();

  const CookieHeader = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join("; ");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-profile-user"],
    queryFn: () => getMe({
      headers: {
        Cookie: CookieHeader,
      },
    }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10, 
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyUserProfile />
      </HydrationBoundary>
    </div>
  );
};

export default MyUserProfilePage;