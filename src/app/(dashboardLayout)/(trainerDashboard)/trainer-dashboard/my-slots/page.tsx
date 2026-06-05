import MySlots from "@/components/DashboardLayouts/Trainer/MySlots";
import { slotServices } from "@/services/slot.services";
import { trainerServices } from "@/services/trainer.services";
import { userServices } from "@/services/user.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const MySlotsPage = async () => {
  const loggedInUser = await userServices.getLoggedInUser();
  console.log("[MySlotsPage] loggedInUser:", loggedInUser);

  const queryClient = new QueryClient();

  if (!loggedInUser?.userId) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const trainerProfile = await trainerServices.getTrainerProfileByUserId(loggedInUser.userId, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  const defaultQueryParams = {
    page: "1",
    limit: "10",
  };

  await queryClient.prefetchQuery({
    queryKey: ["my-slots-trainer", trainerProfile?.data?.id, defaultQueryParams],
    queryFn: () => slotServices.getMySlots(trainerProfile?.data?.id, {
      headers: {
        Cookie: cookieHeader,
      },
      params: defaultQueryParams,
    }),
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MySlots trainerId={trainerProfile?.data?.id} />
      </HydrationBoundary>
    </div>
  );
};

export default MySlotsPage;