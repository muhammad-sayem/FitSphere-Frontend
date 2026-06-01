"use client";

import { statServices } from "@/services/stat.services";
import { useQuery } from "@tanstack/react-query";

const UserDashboardHome = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["user-dashboard-data"],
    queryFn: () => statServices.getDashboardStats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  console.log("[UserDashboardHome] dashboardData:", dashboardData);
  return (
    <div>
      <p> My bookings: {dashboardData?.myBookingCount} </p>
      <p> My given reviews: {dashboardData?.myGivenReviewCount} </p>
      <p> My orders: {dashboardData?.myOrderCount} </p>
      <p> My Spent Amount: {dashboardData?.myTotalSpentAmount} </p>

    </div>
  );
};

export default UserDashboardHome;