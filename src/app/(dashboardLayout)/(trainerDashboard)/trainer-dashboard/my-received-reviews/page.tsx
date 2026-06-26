
import MyReceivedReviews from "@/components/DashboardLayouts/Trainer/myReceivedReviews/MyReceivedReviews";
import { reviewServices } from "@/services/review.services";
import { trainerServices } from "@/services/trainer.services";
import { userServices } from "@/services/user.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const MyReviews = async () => {
  const loggedInUser = await userServices.getLoggedInUser();
  console.log("[MyReviews (Trainer)] loggedInUser:", loggedInUser);

  //* Logout er por cookie already clear hoye thake, tokhon loggedInUser
  //  null ashe. Backend e "userId/undefined" pathano rokte eta guard. *//
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
  console.log("[MyReviews (Trainer)] trainerProfile:", trainerProfile);

  const trainerProfileId = trainerProfile?.data?.id;

  const queryClient = new QueryClient();

  //* Trainer profile na thakle prefetch skip koro — karon undefined trainerId
  //  diye backend call korle 404/500 ashe. *//
  if (trainerProfileId) {
    await queryClient.prefetchQuery({
      queryKey: ["my-received-reviews-trainer", trainerProfileId],
      queryFn: () => reviewServices.getReviewsForTrainer(trainerProfileId),
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });
  }

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyReceivedReviews trainerId={trainerProfileId} />
      </HydrationBoundary>
    </div>
  );
};

export default MyReviews;