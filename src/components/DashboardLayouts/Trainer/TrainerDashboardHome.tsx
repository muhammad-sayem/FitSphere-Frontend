"use client";

import { statServices } from "@/services/stat.services";
import { useQuery } from "@tanstack/react-query";

const TrainerDashboardHome = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["trainer-dashboard-data"],
    queryFn: () => statServices.getDashboardStats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  console.log("[TrainerDashboardHome] dashboardData:", dashboardData);

  return (
    <div>
      <p> Available Slots: {dashboardData?.availableSlotCount} </p>
      <p> Booked Slots: {dashboardData?.bookingCount} </p>
      <p> My Received Reviews: {dashboardData?.myReceivedReviewCount} </p>

    </div>
  );
};

export default TrainerDashboardHome;