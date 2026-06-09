
import MyReceivedReviews from "@/components/DashboardLayouts/Trainer/myReceivedReviews/MyReceivedReviews";
import { reviewServices } from "@/services/review.services";
import { trainerServices } from "@/services/trainer.services";
import { userServices } from "@/services/user.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const MyReviews = async () => {
  const loggedInUser = await userServices.getLoggedInUser();
  console.log("[MyReviews (Trainer)] loggedInUser:", loggedInUser);

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const trainerProfile = await trainerServices.getTrainerProfileByUserId(loggedInUser?.userId, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  console.log("[MyReviews (Trainer)] trainerProfile:", trainerProfile);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-received-reviews-trainer"],
    queryFn: () => reviewServices.getReviewsForTrainer(trainerProfile?.data?.id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyReceivedReviews trainerId={trainerProfile?.data?.id} />
      </HydrationBoundary>
    </div>
  );
};

export default MyReviews;