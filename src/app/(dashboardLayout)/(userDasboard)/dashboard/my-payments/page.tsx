import MyPayments from "@/components/DashboardLayouts/User/myPayments/MyPayments";
import { paymentServices } from "@/services/payment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const MyPaymentsPage = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const queryClient = new QueryClient();

  const initialParams = {
    page: "1",
    limit: "10",
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  await queryClient.prefetchQuery({
    queryKey: ["my-payments", initialParams],
    queryFn: () =>
      paymentServices.getMyPayments({
        headers: {
          Cookie: cookieHeader,
        },
        params: initialParams,
      }),
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