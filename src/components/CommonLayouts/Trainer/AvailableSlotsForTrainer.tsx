"use client";

import { slotServices } from "@/services/slot.services";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Calendar, ArrowUpDown, Filter, User, Loader2 } from "lucide-react";
import { PaginationState } from "@tanstack/react-table";
import Image from "next/image";
import BookSessionButton from "./BookSessionButton";

export interface ITrainerAvailability {
  id: string;
  trainerId: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  trainer: {
    id: string;
    feePerHour: number;
    user: {
      name: string;
      email: string;
      image?: string;
    };
  };
}

const AvailableSlotsForTrainer = ({ trainerProfileId }: { trainerProfileId: string }) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [customInput, setCustomInput] = useState("10");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [bookingFilter, setBookingFilter] = useState<string>("all");

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
      sortBy: "date",
      sortOrder: sortOrder,
    };

    if (bookingFilter !== "all" && bookingFilter !== "") {
      params.isBooked = bookingFilter;
    }

    return params;
  }, [pagination, sortOrder, bookingFilter]);

  const { data: SlotsResponse, isLoading } = useQuery({
    queryKey: ["individual-trainer-slots", trainerProfileId, queryParams],
    queryFn: () => slotServices.getSlotsByTrainerId(trainerProfileId, { params: queryParams }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const slots = (SlotsResponse?.data as ITrainerAvailability[]) || [];
  const meta = SlotsResponse?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  console.log("Fetched Slots for Trainer:", slots);

  const formatTo12Hour = (timeString: string) => {
    if (!timeString) return "";
    const [hoursStr, minutesStr] = timeString.split(":");
    let hours = parseInt(hoursStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApplyCustomLimit = () => {
    const val = Number(customInput);
    if (val > 0) {
      setPagination({
        pageIndex: 0,
        pageSize: val,
      });
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleBookingFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBookingFilter(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">Available Slots</h1>
          <p className="text-xs sm:text-sm text-secondary-01/80 font-medium">{meta.total} slots found</p>
        </div>

        <div className="w-full lg:w-64">
          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <select
              value={bookingFilter}
              onChange={handleBookingFilterChange}
              disabled={isLoading}
              className="w-full pl-9 pr-8 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="false">Available</option>
              <option value="true">Booked</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-500 w-0 h-0" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-secondary-01/10 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <table className="w-full text-center border-collapse min-w-200 lg:min-w-full table-auto">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-secondary-01/10 text-[11px] lg:text-xs font-black uppercase tracking-wider">
                <th className="px-3 py-4 lg:px-4 text-center w-20">Image</th>
                <th className="px-3 py-4 lg:px-4 text-center">Trainer Name</th>
                <th className="px-3 py-4 lg:px-4 text-center">
                  <button
                    onClick={toggleSortOrder}
                    className="inline-flex items-center gap-1 hover:text-black transition-colors duration-150 mx-auto font-black"
                  >
                    <span>Date</span>
                    <ArrowUpDown className="w-3.5 h-3.5" />
                  </button>
                </th>
                <th className="px-3 py-4 lg:px-4 text-center">Timing</th>
                <th className="px-3 py-4 lg:px-4 text-center">Fee</th>
                <th className="px-3 py-4 lg:px-4 text-center w-24">Booking Status</th>
                <th className="px-3 py-4 lg:px-4 text-center w-64">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary-01/10 text-xs lg:text-sm text-neutral-800 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-primary-01 font-semibold">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-01" />
                      <span>Loading slots...</span>
                    </div>
                  </td>
                </tr>
              ) : slots.length > 0 ? (
                slots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-neutral-50/40 transition-colors duration-150">
                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        {slot.trainer?.user?.image ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-secondary-01/10">
                            <Image
                              src={slot.trainer.user.image}
                              alt={slot.trainer.user.name || "Trainer"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center border border-secondary-01/10 text-neutral-400">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-black font-bold max-w-35 truncate text-center">
                      {slot.trainer?.user?.name}
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-secondary-01 text-center">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-secondary-01/60" />
                        {formatDate(slot.date)}
                      </span>
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-neutral-700 text-center font-semibold">
                      {formatTo12Hour(slot.startTime)} - {formatTo12Hour(slot.endTime)}
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center text-primary-01 font-black">
                      ${slot.trainer?.feePerHour}/hr
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-bold border ${
                          slot.isBooked
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}
                      >
                        {slot.isBooked ? "Booked" : "Available"}
                      </span>
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 flex gap-x-2 whitespace-nowrap text-center items-center justify-center">
                      <BookSessionButton key={slot.id} slot={slot} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-secondary-01 font-semibold">
                    No slots found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-4 lg:px-6 bg-neutral-50/50 border-t border-secondary-01/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Math.max(prev.pageIndex - 1, 0) }))}
              disabled={meta.page === 1 || meta.totalPages <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-secondary-01/20 rounded-xl bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:hover:bg-white transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            {Array.from({ length: meta.totalPages || 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPagination((prev) => ({ ...prev, pageIndex: index }))}
                className={`w-8 h-8 rounded-xl text-sm font-bold border transition-colors duration-200 ${
                  meta.page === index + 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-secondary-01/20 hover:bg-neutral-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Math.min(prev.pageIndex + 1, meta.totalPages - 1) }))}
              disabled={meta.page === meta.totalPages || meta.totalPages <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-secondary-01/20 rounded-xl bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:hover:bg-white transition-colors duration-200"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <select
                value="Custom"
                disabled
                className="pl-3 pr-8 py-1.5 border border-secondary-01/20 rounded-xl text-sm font-medium bg-white text-black appearance-none cursor-not-allowed"
              >
                <option value="Custom">Custom</option>
              </select>
              <span className="text-sm text-neutral-600 font-medium">rows</span>

              <input
                type="number"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                min="1"
                className="w-16 px-2 py-1 border border-secondary-01/20 rounded-xl text-sm font-medium text-center focus:outline-none focus:border-primary-01/40"
              />
              <button
                type="button"
                onClick={handleApplyCustomLimit}
                className="px-3 py-1.5 border border-black rounded-xl bg-white hover:bg-neutral-50 text-sm font-bold text-black transition-colors duration-200"
              >
                Apply
              </button>
            </div>

            <span className="text-sm text-neutral-600 font-semibold whitespace-nowrap">
              Total {meta.total} items, {meta.totalPages || 1} pages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableSlotsForTrainer;