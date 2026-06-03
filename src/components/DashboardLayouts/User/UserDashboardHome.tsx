"use client";

import { statServices } from "@/services/stat.services";
import { useQuery } from "@tanstack/react-query";
import { 
  CalendarDays, 
  ShoppingBag, 
  Star, 
  DollarSign 
} from "lucide-react";

const UserDashboardHome = () => {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["user-dashboard-data"],
    queryFn: () => statServices.getDashboardStats(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const stats = [
    {
      id: "bookings",
      title: "Total Bookings",
      value: dashboardData?.myBookingCount ?? 0,
      icon: CalendarDays,
      iconColor: "text-blue-600",
      cardBg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      borderColor: "border-blue-200/60",
    },
    {
      id: "orders",
      title: "Total Orders",
      value: dashboardData?.myOrderCount ?? 0,
      icon: ShoppingBag,
      iconColor: "text-emerald-600",
      cardBg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      borderColor: "border-emerald-200/60",
    },
    {
      id: "reviews",
      title: "Reviews Given",
      value: dashboardData?.myGivenReviewCount ?? 0,
      icon: Star,
      iconColor: "text-amber-600",
      cardBg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      borderColor: "border-amber-200/60",
    },
    {
      id: "spent",
      title: "Total Spent",
      value: dashboardData?.myTotalSpentAmount !== undefined 
        ? `$${dashboardData.myTotalSpentAmount}` 
        : "$0",
      icon: DollarSign,
      iconColor: "text-purple-600",
      cardBg: "bg-gradient-to-br from-purple-50 to-purple-100/50",
      borderColor: "border-purple-200/60",
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 w-full animate-pulse space-y-8">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl border border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 w-full min-h-screen bg-gray-50/40 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Monitor your activity, orders, bookings and recent updates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`${item.cardBg} ${item.borderColor} p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group relative overflow-hidden`}
            >
              <div className="space-y-2.5 relative z-10">
                <span className="text-xs font-bold text-gray-500/80 uppercase tracking-wider block">
                  {item.title}
                </span>
                <span className="text-2xl md:text-3xl font-extrabold text-gray-900 block tracking-tight">
                  {item.value}
                </span>
              </div>
              
              <div className="p-3 rounded-xl bg-white shadow-sm border border-white/60 relative z-10 transition-transform group-hover:scale-105 duration-300">
                <IconComponent className={`w-5 h-5 ${item.iconColor}`} strokeWidth={2.5} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboardHome;