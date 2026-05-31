import MyOrders from "@/components/DashboardLayouts/Trainer/MyOrders";
import { orderServices } from "@/services/order.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const MyOrdersPageTrainer = async () => {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  await queryClient.prefetchQuery({
    queryKey: ["my-orders-trainer"],
    queryFn: () => orderServices.getMyOrders({
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
        <MyOrders />
      </HydrationBoundary>
    </div>
  );
};

export default MyOrdersPageTrainer;