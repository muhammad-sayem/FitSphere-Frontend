/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { slotServices } from "@/services/slot.services";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import { Trash2, CalendarIcon, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/table/DataTable";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import AddNewSlotModal from "./AddNewSlotModal";

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
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      params.date = `${year}-${month}-${day}`;
    }

    return params;
  }, [sorting, pagination, selectedDate]);

  const { data: mySlotsResponse, isLoading, refetch } = useQuery({
    queryKey: ["my-slots-trainer", trainerId, queryParams],
    queryFn: () => slotServices.getMySlots(trainerId,
      { params: queryParams }
    ),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const slotsData = mySlotsResponse?.data || [];
  const metaData = mySlotsResponse?.meta;

  const columns = useMemo<ColumnDef<SlotData>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
          const dateStr = row.original.date;
          return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
      {
        id: "time",
        header: "Time",
        enableSorting: false,
        cell: ({ row }) => {
          const { startTime, endTime } = row.original;
          
          const formatTo12Hour = (timeStr: string) => {
            if (!timeStr) return "";
            const [hourStr, minuteStr] = timeStr.split(":");
            let hour = parseInt(hourStr, 10);
            const ampm = hour >= 12 ? "PM" : "AM";
            hour = hour % 12;
            hour = hour ? hour : 12;
            return `${hour}:${minuteStr} ${ampm}`;
          };

          return `${formatTo12Hour(startTime)} - ${formatTo12Hour(endTime)}`;
        },
      },
      {
        id: "sessionCharge",
        accessorKey: "trainer.feePerHour",
        header: "Session Charge",
        enableSorting: false,
        cell: ({ row }) => {
          const fee = row.original.trainer?.feePerHour || 0;
          return `$${fee}`;
        },
      },
      {
        accessorKey: "isBooked",
        header: "Status",
        cell: ({ row }) => {
          const isBooked = row.original.isBooked;
          return (
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                isBooked
                  ? "bg-green-200 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-200 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              )}
            >
              {isBooked ? "Booked" : "Not Booked"}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: () => {
          return (
            <div className="flex justify-center w-full">
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-2 mx-auto"
                onClick={() => { }}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleClearDate = () => {
    setSelectedDate(undefined);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="space-y-4 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Slots</h1>
          <p className="text-sm text-muted-foreground">
            {metaData?.total || 0} slots available
          </p>
        </div>

        <div>
          <AddNewSlotModal refetch={refetch} />
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal h-9",
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
              // initialFocus
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

      <DataTable
        data={slotsData}
        columns={columns}
        isLoading={isLoading}
        meta={metaData}
        sorting={{
          state: sorting,
          onSortingChange: setSorting,
        }}
        pagination={{
          state: pagination,
          onPaginationChange: setPagination,
        }}
        emptyMessage="No slots found for the selected criteria."
      />
    </div>
  );
};

export default MySlots;