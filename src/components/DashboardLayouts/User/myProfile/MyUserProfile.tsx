"use client";

import { getMe } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { User, Mail, Calendar, ShoppingBag, BookmarkCheck, CreditCard, Star, ShieldCheck, Activity } from "lucide-react";

const MyUserProfile = () => {
  const { data: myProfileResponse } = useQuery({
    queryKey: ["my-profile-user"],
    queryFn: () => getMe(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const profile = myProfileResponse?.profile || {};
  const roleData = myProfileResponse?.roleData || {};

  const stats = [
    {
      label: "Total Bookings",
      count: roleData.bookings?.length || 0,
      icon: BookmarkCheck,
      bgColor: "bg-orange-50",
      iconColor: "text-primary-01",
    },
    {
      label: "Product Orders",
      count: roleData.orders?.length || 0,
      icon: ShoppingBag,
      bgColor: "bg-neutral-100",
      iconColor: "text-black",
    },
    {
      label: "Payments Made",
      count: roleData.payments?.length || 0,
      icon: CreditCard,
      bgColor: "bg-neutral-100",
      iconColor: "text-[#717274]",
    },
    {
      label: "Submitted Reviews",
      count: roleData.reviews?.length || 0,
      icon: Star,
      bgColor: "bg-orange-50",
      iconColor: "text-primary-01",
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

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-neutral-50 min-h-screen space-y-6">
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-28 h-28 rounded-2xl bg-neutral-50 flex items-center justify-center border-2 border-primary-01/30 p-1 overflow-hidden shrink-0 shadow-sm">
              {profile.image ? (
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <User className="w-14 h-14 text-[#717274]" />
              )}
            </div>

            <div className="text-center md:text-left space-y-2.5">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <h1 className="text-3xl font-black tracking-tight text-black">{profile.name || "User Name"}</h1>
                <span className="px-3 py-0.5 text-[10px] font-black uppercase tracking-widest bg-primary-01 text-white rounded-md">
                  {profile.role || "USER"}
                </span>
              </div>

              <div className="space-y-1.5 text-sm text-[#717274] font-medium">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4 text-primary-01" />
                  <span className="text-black">{profile.email || "N/A"}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-4 h-4 text-[#717274]" />
                  <span>Member Since: {formatDate(profile.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col items-center gap-2 bg-neutral-50 border border-neutral-200 px-4 py-3 rounded-2xl md:text-right w-full md:w-auto justify-center">
            <div className="text-xs text-[#717274] font-bold uppercase tracking-wider">Account Status</div>
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 text-xs font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
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
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#717274]">{stat.label}</p>
                  <h3 className="text-xl font-black text-black mt-0.5">{stat.count}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <ShieldCheck className="w-5 h-5 text-primary-01" />
            <h2 className="text-sm font-black text-black uppercase tracking-wider">Verification Status</h2>
          </div>
          <div className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#717274]">Email Status</label>
              <p className={`text-sm font-bold uppercase tracking-wider mt-1 ${profile.emailVerified ? "text-emerald-600" : "text-primary-01"}`}>
                {profile.emailVerified ? "Verified" : "Unverified"}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#717274]">Access Controls</label>
              <p className="text-xs text-black font-medium mt-1">
                Full privileges granted as per the {profile.role || "USER"} role specifications.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <Activity className="w-5 h-5 text-black" />
            <h2 className="text-sm font-black text-black uppercase tracking-wider">System Log Info</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#717274]">Profile Created At</label>
              <p className="text-sm font-bold text-black mt-1">{formatDate(profile.createdAt)}</p>
            </div>
            <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#717274]">Last Account Update</label>
              <p className="text-sm font-bold text-black mt-1">{formatDate(profile.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyUserProfile;