import AdminDashboardHome from "@/components/DashboardLayouts/Admin/AdminDashboardHome";
import { statServices } from "@/services/stat.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const AdminDashboardPage = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
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
        <AdminDashboardHome />
      </HydrationBoundary>
    </div>
  );
};

export default AdminDashboardPage;