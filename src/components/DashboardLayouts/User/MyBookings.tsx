"use client";

import { getMe } from "@/services/auth.services";
import { bookingServices } from "@/services/booking.services";

import { useQuery } from "@tanstack/react-query";

const MyBookings = () => {
  const {data: loggedInUSerResponse} = useQuery({
    queryKey: ["loggedin-user"],
    queryFn: getMe,
  });

  const loggedInUser = loggedInUSerResponse?.data;

  const {data: myBookingsResponse} = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () =>  bookingServices.getBookingsByUserId(loggedInUser?.userId),
    enabled: !!loggedInUser?.userId,
  });

  const myBookings = myBookingsResponse?.data;

  return (
    <div>
      <h1>My Booked Slots</h1>
      <p> {myBookings?.length} bookings found </p>
    </div>
  );
};

export default MyBookings;