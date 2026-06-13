import AvailableSlotsForTrainer from "@/components/CommonLayouts/Trainer/AvailableSlotsForTrainer";
import { slotServices } from "@/services/slot.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const AvailableSlotForTrainerPage = async ({ params }: { params: Promise<{ trainerProfileId: string }> }) => {

  const { trainerProfileId } = await params;
  console.log("Trainer Profile ID for Available Slots:", trainerProfileId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["individual-trainer-slots", trainerProfileId],
    queryFn: () => slotServices.getSlotsByTrainerId(trainerProfileId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AvailableSlotsForTrainer trainerProfileId={trainerProfileId} />
      </HydrationBoundary>
    </div>
  );
};

export default AvailableSlotForTrainerPage;