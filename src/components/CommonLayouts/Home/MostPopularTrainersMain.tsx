import { trainerServices } from "@/services/trainer.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import MostPopularTrainers from "./MostPopularTrainers";

const MostPopularTrainersMain = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trainers-home"],
    queryFn: () => trainerServices.getAllTrainers(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div className="mx-auto w-9/10">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MostPopularTrainers />
      </HydrationBoundary>
    </div>
  );
};

export default MostPopularTrainersMain;