import AllTrainers from "@/components/CommonLayouts/Trainer/AllTrainers";
import { trainerServices } from "@/services/trainer.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const TrainersPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trainers"],
    queryFn: () => trainerServices.getAllTrainers(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  return (
    <div className="mx-auto w-9/10 px-4 py-8">
      <h1 className="text-2xl md:text-4xl font-black mb-4"> Meet Our <span className="text-primary-01">Trainers</span> </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllTrainers />
      </HydrationBoundary>
    </div>
  );
};

export default TrainersPage;