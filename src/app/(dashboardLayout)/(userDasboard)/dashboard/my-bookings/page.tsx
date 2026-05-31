import MyBookings from "@/components/DashboardLayouts/User/MyBookings";
import { bookingServices } from "@/services/booking.services";
import { userServices } from "@/services/user.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  // const myBookings = await bookingServices.getBookingsByUserId(loggedInUser.userId, {
  //   headers: {
  //     Cookie: cookieHeader,
  //   },
  // });
  // console.log("[MyBookedSlots] myBookings:", myBookings);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingServices.getBookingsByUserId(loggedInUser.userId, {
      headers: {
        Cookie: cookieHeader,
      },
    }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div>
      <h1>My Booked Slots</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MyBookings />
      </HydrationBoundary>
    </div>
  );
};

export default MyBookedSlots;