/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { slotServices } from "@/services/slot.services";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { CalendarIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import CreateNewSlotModal from "./CreateNewSlotModal";
import DeleteMySlotButton from "./DeleteMySlotButton";

interface SlotData {
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
    };
  };
}

const MySlots = ({ trainerId }: { trainerId: string }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [customInput, setCustomInput] = useState("10");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
    };

    if (sorting.length > 0) {
      params.sortBy = sorting[0].id;
      params.sortOrder = sorting[0].desc ? "desc" : "asc";
    }

    if (selectedDate) {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      params["date[gte]"] = startOfDay.toISOString();
      params["date[lte]"] = endOfDay.toISOString();
    }

    return params;
  }, [sorting, pagination, selectedDate]);

  const { data: mySlotsResponse, isLoading, refetch } = useQuery({
    queryKey: ["my-slots-trainer", trainerId, queryParams],
    queryFn: () => slotServices.getMySlots(trainerId, { params: queryParams }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const slotsData = (mySlotsResponse?.data as SlotData[]) || [];
  const metaData = mySlotsResponse?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  const formatTo12Hour = (timeStr: string) => {
    if (!timeStr) return "";
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${minuteStr} ${ampm}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleClearDate = () => {
    setSelectedDate(undefined);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
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

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">My Slots</h1>
          <p className="text-xs sm:text-sm text-secondary-01/80 font-medium">
            {metaData.total} slots available
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div>
            <CreateNewSlotModal refetch={refetch} />
          </div>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal h-9 w-full sm:w-auto",
                    !selectedDate && "text-primary-01 border border-primary-01 text-lg",
                    selectedDate && "border-primary text-primary"
                  )}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    selectedDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  ) : (
                    <span>Filter by Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                />
              </PopoverContent>
            </Popover>

            {selectedDate && (
              <Button
                type="button"
                variant="ghost"
                className="h-9 gap-1"
                onClick={handleClearDate}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-secondary-01/10 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <table className="w-full text-center border-collapse min-w-200 lg:min-w-full table-auto">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-secondary-01/10 text-[11px] lg:text-xs font-black uppercase tracking-wider">
                <th className="px-3 py-4 lg:px-4 text-center">Date</th>
                <th className="px-3 py-4 lg:px-4 text-center">Time</th>
                <th className="px-3 py-4 lg:px-4 text-center">Session Charge</th>
                <th className="px-3 py-4 lg:px-4 text-center w-24">Status</th>
                <th className="px-3 py-4 lg:px-4 text-center w-64">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary-01/10 text-xs lg:text-sm text-neutral-800 font-medium">
              {slotsData.map((slot) => (
                <tr key={slot.id} className="hover:bg-neutral-50/40 transition-colors duration-150">
                  <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                    {new Date(slot.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                    {`${formatTo12Hour(slot.startTime)} - ${formatTo12Hour(slot.endTime)}`}
                  </td>

                  <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                    {`$${slot.trainer?.feePerHour || 0}`}
                  </td>

                  <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        slot.isBooked
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-rose-50 text-rose-700 border-rose-200"
                      )}
                    >
                      {slot.isBooked ? "Booked" : "Not Booked"}
                    </span>
                  </td>

                  <td className="px-3 py-2.5 lg:px-4 flex whitespace-nowrap text-center items-center justify-center">
                    <DeleteMySlotButton
                      isBooked={slot.isBooked}
                      slotId={slot.id}
                      refetch={refetch}
                    />
                  </td>
                </tr>
              ))}

              {slotsData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-secondary-01 font-semibold">
                    No slots found for the selected criteria.
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
              disabled={metaData.page === 1 || metaData.totalPages <= 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-secondary-01/20 rounded-xl bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:hover:bg-white transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            {Array.from({ length: metaData.totalPages || 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setPagination((prev) => ({ ...prev, pageIndex: index }))}
                className={`w-8 h-8 rounded-xl text-sm font-bold border transition-colors duration-200 ${
                  metaData.page === index + 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-neutral-700 border-secondary-01/20 hover:bg-neutral-50"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setPagination((prev) => ({ ...prev, pageIndex: Math.min(prev.pageIndex + 1, metaData.totalPages - 1) }))}
              disabled={metaData.page === metaData.totalPages || metaData.totalPages <= 1}
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
              Total {metaData.total} items, {metaData.totalPages || 1} pages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySlots;