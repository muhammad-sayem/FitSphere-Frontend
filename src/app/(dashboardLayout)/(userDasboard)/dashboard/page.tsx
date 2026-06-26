import UserDashboardHome from "@/components/DashboardLayouts/User/UserDashboardHome";
import { statServices } from "@/services/stat.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const UserDashboardPage = async () => {
  const cookieStore = await cookies();

  //* Logout er por cookie clear hoye thake. Auth nai tokhon /stats e hit
  //  korle backend 500 dey — tai loggedInUser null hole seedha /login e
  //  pathiye dibo. *//
  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    redirect("/login");
  }

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user-dashboard-data"],
    queryFn: () => statServices.getDashboardStats({
      headers: {
        Cookie: cookieHeader,
      },
    }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserDashboardHome />
      </HydrationBoundary>
    </div>
  );
};

export default UserDashboardPage;