import TrainersManagement from "@/components/DashboardLayouts/Admin/trainersManagement/TrainersManagement";
import { trainerServices } from "@/services/trainer.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const TrainersManagementPage = async () => {
  const cookiStore = await cookies();

  const cookieHeader = cookiStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const queryClient = new QueryClient();

  const defaultParams = {
    page: "1",
    limit: "10",
    sortBy: "name",
    sortOrder: "asc",
  };

  await queryClient.prefetchQuery({
    queryKey: ["admin-trainers-management", defaultParams],
    queryFn: () =>
      trainerServices.getAllTrainersFromUsersSchema({
        params: defaultParams,
        headers: {
          Cookie: cookieHeader,
        },
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  await queryClient.prefetchQuery({
    queryKey: ["not-approved-trainers"],
    queryFn: () =>
      trainerServices.getNotApprovedTrainers({
        headers: {
          Cookie: cookieHeader,
        },
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TrainersManagement />
      </HydrationBoundary>
    </div>
  );
};

export default TrainersManagementPage;