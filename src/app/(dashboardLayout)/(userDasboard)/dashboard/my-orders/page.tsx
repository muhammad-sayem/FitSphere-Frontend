import MyOrders from "@/components/DashboardLayouts/User/MyOrders";
import { orderServices } from "@/services/order.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const MyOrdersPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-orders"],
    queryFn: () => orderServices.getMyOrders(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyOrders />
      </HydrationBoundary>
    </div>
  );
};

export default MyOrdersPage;
