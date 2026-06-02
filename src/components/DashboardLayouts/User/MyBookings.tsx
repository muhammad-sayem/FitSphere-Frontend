/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { getMe } from "@/services/auth.services";
import { bookingServices } from "@/services/booking.services";
import { useQuery } from "@tanstack/react-query";
import DataTable from "@/components/table/DataTable";
import { DataTableFilterConfig } from "@/components/table/DataTableFilters";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const MyBookings = ({ initialUser }: { initialUser?: any }) => {
  const { data: loggedInUserResponse } = useQuery({
    queryKey: ["loggedin-user"],
    queryFn: getMe,
    initialData: initialUser ? { data: initialUser } : undefined,
  });

  const loggedInUser = loggedInUserResponse?.data || initialUser;

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {
      page: String(pageIndex + 1),
      limit: String(pageSize),
    };

    if (sorting?.length > 0) {
      const s = sorting[0];
      if (s?.id) {
        params.sortBy = s.id;
        params.sortOrder = s.desc ? "desc" : "asc";
      }
    } else {
      params.sortBy = "slot.date";
      params.sortOrder = "desc";
    }

    if (searchTerm) params.searchTerm = searchTerm;

    Object.entries(filters).forEach(([key, val]) => {
      if (val === undefined || val === null || val === "" || val === "all") return;
      if (key !== "status") {
        params[key] = val;
      }
    });

    return params;
  }, [pageIndex, pageSize, searchTerm, sorting, filters]);

  const { data: myBookingsResponse, isFetching } = useQuery({
    queryKey: ["my-bookings", loggedInUser?.userId, queryParams, filters],
    queryFn: () => bookingServices.getBookingsByUserId(loggedInUser?.userId, { params: queryParams }),
    enabled: !!loggedInUser?.userId,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  });
  
  const rawBookings = myBookingsResponse?.data ?? [];
  const meta = myBookingsResponse?.meta ?? { page: 1, limit: 10, total: 0, totalPages: 1 };

  const bookings = useMemo(() => {
    if (filters.status && filters.status !== "all") {
      return rawBookings.filter((b: any) => b.status === filters.status);
    }
    return rawBookings;
  }, [rawBookings, filters.status]);

  useEffect(() => {
    if (meta && pageIndex > Math.max(0, (meta.totalPages || 1) - 1)) {
      setPageIndex(Math.max(0, (meta.totalPages || 1) - 1));
    }
  }, [meta, pageIndex]);

  const columnDefs = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        id: "slot.date",
        header: "Date",
        accessorFn: (row) => row.slot?.date,
        cell: ({ getValue }) => {
          const raw = getValue() as string | undefined;
          if (!raw) return "-";
          const d = new Date(raw);
          return d.toLocaleDateString();
        },
      },
      {
        id: "slot.time",
        header: "Time",
        accessorFn: (row) => `${row.slot?.startTime ?? ""} - ${row.slot?.endTime ?? ""}`,
        cell: ({ getValue }) => getValue() || "-",
        enableSorting: false,
      },
      {
        id: "trainer.user.name",
        header: "Trainer",
        accessorFn: (row) => row.trainer?.user?.name ?? "-",
      },
      {
        id: "status",
        header: "Status",
        accessorFn: (row) => row.status,
        cell: ({ getValue }) => {
          const val = getValue() as string;
          const color =
            val === "PENDING" ? "bg-yellow-100 text-yellow-800" :
            val === "COMPLETED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
          return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{val}</span>;
        },
      },
      {
        id: "feeAmount",
        header: "Fee",
        accessorFn: (row) => row.feeAmount,
        cell: ({ getValue }) => `$${getValue() ?? 0}`,
      },
      {
        id: "paymentStatus",
        header: "Payment",
        accessorFn: (row) => row.paymentStatus,
        cell: ({ getValue }) => {
          const val = getValue() as string;
          const color =
            val === "PENDING" ? "bg-yellow-100 text-yellow-800" :
            val === "SUCCEEDED" ? "bg-green-100 text-green-800" :
            val === "FAILED" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800";
          return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{val}</span>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: () => (
          <Button variant="ghost" size="icon" className="h-8 w-2/3 p-0 text-white bg-red-500 space-x-1 font-bold hover:bg-red-900 hover:text-white hover:cursor-pointer">
            <Trash2 className="h-4 w-4" />
            <p> Delete </p>
          </Button>
        ),
      },
    ],
    [],
  );

  const dtFilters: DataTableFilterConfig[] = [
    {
      id: "paymentStatus",
      label: "Filter by Payment Status",
      type: "single-select",
      options: [
        { label: "PENDING", value: "PENDING" },
        { label: "SUCCEEDED", value: "SUCCEEDED" },
        { label: "FAILED", value: "FAILED" },
      ],
    },
    {
      id: "status",
      label: "Filter by Booking Status",
      type: "single-select",
      options: [
        { label: "PENDING", value: "PENDING" },
        { label: "COMPLETED", value: "COMPLETED" },
      ],
    },
    {
      id: "feeAmount",
      label: "Fee",
      type: "range",
    },
  ];

  const handleFilterChange = (filterId: string, value: any) => {
    setFilters((prev) => ({ ...prev, [filterId]: value }));
    setPageIndex(0);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My Booked Slots</h1>

      <DataTable
        data={bookings}
        columns={columnDefs}
        isLoading={isFetching}
        emptyMessage="No bookings found"
        // meta={{ total: bookings.length, totalPages: meta.totalPages }}
        search={{
          initialValue: searchTerm,
          placeholder: "Search by trainer name or email...",
          onDebouncedChange: (v) => {
            setSearchTerm(v);
            setPageIndex(0);
          },
        }}
        filters={{
          configs: dtFilters,
          values: filters,
          onFilterChange: handleFilterChange,
        }}
        sorting={{
          state: sorting,
          onSortingChange: (next) => {
            setSorting(next);
            setPageIndex(0);
          },
        }}
        pagination={{
          state: { pageIndex, pageSize },
          onPaginationChange: (next) => {
            setPageIndex(next.pageIndex);
            setPageSize(next.pageSize);
          },
        }}
        toolbarAction={<div />}
      />
    </div>
  );
};

export default MyBookings;