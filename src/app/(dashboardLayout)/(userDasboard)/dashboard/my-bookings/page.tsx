import MyBookings from "@/components/DashboardLayouts/User/myBookings/MyBookings";
import { bookingServices } from "@/services/booking.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { userServices } from "@/services/user.services";

const MyBookedSlots = async () => {
  const loggedInUser = await userServices.getLoggedInUser();
  if (!loggedInUser?.userId) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const queryClient = new QueryClient();

  const initialQueryParams = {
    page: "1",
    limit: "10",
    sortBy: "slot.date",
    sortOrder: "desc",
  };

  await queryClient.prefetchQuery({
    queryKey: ["my-bookings", initialQueryParams],
    queryFn: () =>
      bookingServices.getBookingsByUserId({
        headers: {
          Cookie: cookieHeader,
        },
        params: initialQueryParams,
      }),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyBookings />
      </HydrationBoundary>
    </div>
  );
};

export default MyBookedSlots;