import UsersManagement from "@/components/DashboardLayouts/Admin/usersManagement/UsersManagement";
import { usersManagementServices } from "@/services/users-management.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const UsersManagementPage = async () => {
  const cookie = await cookies();
  const hasToken = cookie.has("access_token") || cookie.has("better-auth.session_token");
  const queryClient = new QueryClient();

  if (hasToken) {
    const cookieHeader = cookie
      .getAll()
      .map(({ name, value }) => `${name}=${value}`)
      .join("; ");

    await queryClient.prefetchQuery({
      queryKey: ["admin-users-management", "", 1],
      queryFn: () =>
        usersManagementServices.getAllUsers({
          params: {
            page: "1",
            limit: "10",
            sortBy: "createdAt",
            sortOrder: "desc",
          },
          headers: {
            Cookie: cookieHeader,
          },
        }),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  }

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersManagement />
      </HydrationBoundary>
    </div>
  );
};

export default UsersManagementPage;