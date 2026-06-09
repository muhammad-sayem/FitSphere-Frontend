import MyPayments from "@/components/DashboardLayouts/Trainer/myPayments/MyPayments";
import { paymentServices } from "@/services/payment.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";

const MyPaymentsPage = async () => {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  await queryClient.prefetchQuery({
    queryKey: ["my-payments-trainer"],
    queryFn: () => paymentServices.getMyPayments({
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
        <MyPayments />
      </HydrationBoundary>
    </div>
  );
};

export default MyPaymentsPage;