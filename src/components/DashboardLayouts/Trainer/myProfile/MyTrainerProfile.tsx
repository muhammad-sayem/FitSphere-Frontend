"use client";

import { getMe } from "@/services/auth.services";
import { useQuery } from "@tanstack/react-query";
import { User, Mail, Calendar, BookmarkCheck, Star, ShieldCheck, Dumbbell, Award, DollarSign } from "lucide-react";
import Image from "next/image";

const MyTrainerProfile = () => {
  const { data: myProfileResponse } = useQuery({
    queryKey: ["my-profile-trainer"],
    queryFn: () => getMe(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  console.log("My Trainer Profile Response:", myProfileResponse);

  const profile = myProfileResponse?.profile || {};
  const roleData = myProfileResponse?.roleData || {};

  const stats = [
    {
      label: "Total Slots",
      count: roleData.slots?.length || 0,
      icon: Dumbbell,
      bgColor: "bg-orange-50",
      iconColor: "text-primary-01",
    },
    {
      label: "Total Bookings",
      count: roleData.bookings?.length || 0,
      icon: BookmarkCheck,
      bgColor: "bg-neutral-100",
      iconColor: "text-black",
    },
    {
      label: "Average Rating",
      count: roleData.avgRating ? Number(roleData.avgRating).toFixed(1) : "0.0",
      icon: Star,
      bgColor: "bg-orange-50",
      iconColor: "text-primary-01",
    },
    {
      label: "Hourly Fee",
      count: `$${roleData.feePerHour || 0}`,
      icon: DollarSign,
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

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 bg-neutral-50 min-h-screen space-y-6">
      <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-neutral-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-28 h-28 rounded-2xl bg-neutral-50 flex items-center justify-center border-2 border-primary-01/30 p-1 overflow-hidden shrink-0 shadow-sm">
              {profile.image ? (
                <Image
                  width={112}
                  height={112}
                  src={profile.image}
                  alt={profile.name || "Trainer"}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <User className="w-14 h-14 text-secondary-01" />
              )}
            </div>

            <div className="text-center md:text-left space-y-2.5">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <h1 className="text-3xl font-black tracking-tight text-black">{profile.name || "Trainer Name"}</h1>
                <span className="px-3 py-0.5 text-[10px] font-black uppercase tracking-widest bg-primary-01 text-white rounded-md">
                  {profile.role || "TRAINER"}
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
            <div className="text-xs text-secondary-01 font-bold uppercase tracking-wider">Approval Status</div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-black uppercase tracking-widest ${roleData.isApproved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${roleData.isApproved ? "bg-emerald-500" : "bg-amber-500"}`}></span>
              {roleData.isApproved ? "Approved" : "Pending"}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <Award className="w-5 h-5 text-primary-01" />
            <h2 className="text-sm font-black text-black uppercase tracking-wider">Professional Profile</h2>
          </div>
          <div className="space-y-4">
            <div className="space-x-1.5">
              <label className="text-sm font-bold uppercase tracking-wider text-secondary-01">Specialty</label>
              <p className="text-sm font-bold text-primary-01 mt-1 bg-neutral-50 px-3 py-2 rounded-xl border border-primary-01 inline-block">
                {roleData.specialties || "N/A"}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Biography</label>
              <p className="text-sm text-black leading-relaxed mt-1 font-medium">
                {roleData.bio || "No biography provided."}
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 bg-white border border-neutral-200/60 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
            <ShieldCheck className="w-5 h-5 text-black" />
            <h2 className="text-sm font-black text-black uppercase tracking-wider">Account Credentials</h2>
          </div>
          <div className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Experience</label>
              <p className="text-sm font-black text-black mt-0.5">{roleData.experience || 0} Years</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Email Status</label>
              <p className={`text-sm font-bold uppercase tracking-wider mt-0.5 ${profile.emailVerified ? "text-emerald-600" : "text-primary-01"}`}>
                {profile.emailVerified ? "Verified" : "Unverified"}
              </p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-01">Profile Visibility</label>
              <p className="text-sm font-bold text-black mt-0.5">{profile.status || "ACTIVE"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrainerProfile;