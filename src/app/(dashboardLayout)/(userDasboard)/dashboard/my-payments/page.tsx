import MyPayments from "@/components/DashboardLayouts/User/MyPayments";
import { paymentServices } from "@/services/payment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const MyPaymentsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-payments"],
    queryFn: paymentServices.getMyPayments,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyPayments />
      </HydrationBoundary>
    </div>
  );
};

export default MyPaymentsPage;
