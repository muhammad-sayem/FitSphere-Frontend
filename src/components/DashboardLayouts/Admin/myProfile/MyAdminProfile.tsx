"use client";

import { getMe } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { 
  User, 
  Mail, 
  Calendar, 
  BookmarkCheck, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  TrendingUp,
  Activity
} from "lucide-react";
import Image from "next/image";

const MyAdminProfile = () => {
  const { data: myProfileResponse } = useQuery({
    queryKey: ["my-profile-admin"],
    queryFn: () => getMe(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const profile = myProfileResponse?.profile || {};
  const summary = myProfileResponse?.roleData?.summary || {};
  const recent = myProfileResponse?.roleData?.recent || {};

  const stats = [
    {
      label: "Total Users",
      count: summary.userCount || 0,
      icon: Users,
      bgColor: "bg-orange-50",
      iconColor: "text-primary-01",
    },
    {
      label: "Total Trainers",
      count: summary.trainerCount || 0,
      icon: Activity,
      bgColor: "bg-neutral-100",
      iconColor: "text-black",
    },
    {
      label: "Total Bookings",
      count: summary.bookingCount || 0,
      icon: BookmarkCheck,
      bgColor: "bg-orange-50",
      iconColor: "text-primary-01",
    },
    {
      label: "Total Orders",
      count: summary.orderCount || 0,
      icon: ShoppingBag,
      bgColor: "bg-neutral-100",
      iconColor: "text-secondary-01",
    },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-neutral-50 min-h-screen space-y-6">
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-28 h-28 rounded-2xl bg-neutral-50 flex items-center justify-center border-2 border-primary-01/30 p-1 overflow-hidden shrink-0 shadow-sm">
              {profile.image ? (
                <Image
                  width={112}
                  height={112}
                  src={profile.image}
                  alt={profile.name || "Admin"}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <User className="w-14 h-14 text-secondary-01" />
              )}
            </div>

            <div className="text-center md:text-left space-y-2.5">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <h1 className="text-3xl font-black tracking-tight text-black">{profile.name || "Admin Name"}</h1>
                <span className="px-3 py-0.5 text-[10px] font-black uppercase tracking-widest bg-black text-white rounded-md">
                  {profile.role || "ADMIN"}
                </span>
              </div>

              <div className="space-y-1.5 text-sm text-secondary-01 font-medium">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-primary-01" />
                  <span className="text-black">{profile.email || "N/A"}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4 text-secondary-01" />
                  <span>Member Since: {formatDate(profile.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center gap-2 bg-neutral-50 border border-neutral-200 px-4 py-3 rounded-2xl md:text-right w-full md:w-auto justify-center">
            <div className="text-xs text-secondary-01 font-bold uppercase tracking-wider">System Status</div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-500"></span>
              {profile.status || "ACTIVE"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-4 flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">{stat.label}</p>
                  <h3 className="text-xl font-black text-black mt-0.5">{stat.count}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <TrendingUp className="w-5 h-5 text-primary-01" />
              <h2 className="text-sm font-black text-black uppercase tracking-wider">Recent Registered Users</h2>
            </div>
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01">Name</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01">Role</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01 text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 text-sm font-medium text-black">
                  {recent.users?.map((user: any) => (
                    <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-2.5 pr-2 font-bold">
                        <div className="truncate max-w-[140px]">{user.name}</div>
                        <div className="text-[11px] text-secondary-01 font-normal tracking-normal truncate max-w-[140px]">{user.email}</div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <span className={`px-2 py-0.5 text-[9px] font-black rounded uppercase tracking-wider ${user.role === "TRAINER" ? "bg-orange-50 text-primary-01" : "bg-neutral-100 text-black"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-2.5 text-right text-secondary-01 text-xs whitespace-nowrap">{formatDateTime(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <CreditCard className="w-5 h-5 text-primary-01" />
              <h2 className="text-sm font-black text-black uppercase tracking-wider">Recent Transactions</h2>
            </div>
            <div className="overflow-x-auto scrollbar-none">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01">Purpose</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01">Amount</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01">Status</th>
                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-secondary-01 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 text-sm font-medium text-black">
                  {recent.payments?.map((payment: any) => (
                    <tr key={payment.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-3 pr-2 font-bold text-xs max-w-27.5 truncate">{payment.purpose?.replace("_", " ")}</td>
                      <td className="py-3 pr-2 text-secondary-01 font-bold">${payment.amount}</td>
                      <td className="py-3 pr-2">
                        <span className={`px-1.5 py-0.5 text-[9px] font-black rounded uppercase tracking-wider ${payment.status === "SUCCEEDED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                          {payment.status === "SUCCEEDED" ? "Success" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3 text-right text-secondary-01 text-xs whitespace-nowrap">{formatDateTime(payment.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 flex flex-col gap-4">
          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <DollarSign className="w-5 h-5 text-black" />
              <h2 className="text-sm font-black text-black uppercase tracking-wider">Financial Summary</h2>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Total Payments Records</label>
                <p className="text-xl font-black text-black mt-0.5">{summary.paymentCount || 0}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Total Reviews Received</label>
                <p className="text-xl font-black text-black mt-0.5">{summary.reviewCount || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
              <ShieldCheck className="w-5 h-5 text-black" />
              <h2 className="text-sm font-black text-black uppercase tracking-wider">Account Credentials</h2>
            </div>
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Email Status</label>
                <p className={`text-sm font-bold uppercase tracking-wider mt-0.5 ${profile.emailVerified ? "text-emerald-600" : "text-primary-01"}`}>
                  {profile.emailVerified ? "Verified" : "Unverified"}
                </p>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Deleted Status</label>
                <p className="text-sm font-bold text-black mt-0.5">{profile.isDeleted ? "True" : "False"}</p>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Profile Updated At</label>
                <p className="text-sm font-medium text-black mt-0.5 truncate">{formatDateTime(profile.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAdminProfile;