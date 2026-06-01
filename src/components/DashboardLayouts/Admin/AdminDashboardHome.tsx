"use client";

import { statServices } from "@/services/stat.services";
import { useQuery } from "@tanstack/react-query";

const AdminDashboardHome = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: () => statServices.getDashboardStats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  console.log("[AdminDashboardHome] dashboardData:", dashboardData);

  return (
    <div>
      Admin Dashboard Home
      
      <p>Total Users: {dashboardData?.userCount}</p>
      <p>Total Trainers: {dashboardData?.trainerCount}</p>
      <p>Total Orders: {dashboardData?.orderCount}</p>
      <p>Total Revenue: ${dashboardData?.totalRevenue}</p>
    </div>
  );
};

export default AdminDashboardHome;