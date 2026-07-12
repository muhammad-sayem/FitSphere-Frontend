"use client";

import { getMyBookingsAction } from "@/actions/booking.action";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import DeleteMyBookingButton from "./DeleteMyBookingButton";

type TrainerUser = {
  name: string;
};

type Trainer = {
  id: string;
  user: TrainerUser | null;
};

type Slot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
};

type BookingStatus = "PENDING" | "COMPLETED" | "CANCELLED";
type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED";

type MyBooking = {
  id: string;
  slotId: string;
  trainerId: string;
  status: BookingStatus;
  feeAmount: number;
  paymentStatus: PaymentStatus;
  slot: Slot | null;
  trainer: Trainer | null;
};

type RangeValue = { gte?: string; lte?: string };

const getStatusStyles = (status: BookingStatus) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-50 text-green-600 border-green-200";
    case "PENDING":
      return "bg-primary-02/20 text-primary-01 border-primary-01";
    case "CANCELLED":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const getPaymentStyles = (status: PaymentStatus) => {
  switch (status) {
    case "SUCCEEDED":
      return "bg-green-50 text-green-600 border-green-200";
    case "PENDING":
      return "bg-primary-02/20 text-primary-01 border-primary-01";
    case "FAILED":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

//* Module-level refetch handle so the columns array can stay referentially
//  stable (declared once at module load) without re-creating on every render.
//  The component assigns the live refetch from useQuery at the top of its body. *//
let refetchTable: (() => void) | undefined = undefined;

const columns: ColumnDef<MyBooking>[] = [
  {
    accessorFn: (row) => row.slot?.date,
    id: "slot.date",
    header: "Date",
    enableSorting: true,
    cell: ({ row }) => {
      const raw = row.original.slot?.date;
      if (!raw) return <span className="text-secondary-01/60">-</span>;
      const d = new Date(raw);
      return <span className="text-secondary-01">{d.toLocaleDateString()}</span>;
    },
  },
  {
    id: "slot.time",
    header: "Time",
    enableSorting: false,
    cell: ({ row }) => {
      const slot = row.original.slot;
      const value = slot ? `${slot.startTime ?? ""} - ${slot.endTime ?? ""}` : "";
      return (
        <span className="text-secondary-01">
          {value || "-"}
        </span>
      );
    },
  },
  {
    accessorFn: (row) => row.trainer?.user?.name,
    id: "trainer.user.name",
    header: "Trainer",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-black font-bold">
        {row.original.trainer?.user?.name ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Booking Status",
    enableSorting: true,
    cell: ({ row }) => {
      const currentStatus = row.original.status;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border capitalize ${getStatusStyles(
            currentStatus
          )}`}
        >
          {currentStatus?.toLowerCase()}
        </span>
      );
    },
  },
  {
    accessorKey: "feeAmount",
    header: "Fee",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = Number(row.original.feeAmount);
      return (
        <span className="text-black font-black">${amount.toFixed(2)}</span>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    enableSorting: true,
    cell: ({ row }) => {
      const currentStatus = row.original.paymentStatus;
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-md border capitalize ${getPaymentStyles(
            currentStatus
          )}`}
        >
          {currentStatus?.toLowerCase()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }) => (
      <DeleteMyBookingButton
        bookingId={row.original.id}
        paymentStatus={row.original.paymentStatus}
        refetch={refetchTable}
      />
    ),
  },
];

const SORTABLE_HEADER_CLASS =
  "h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0 flex items-center justify-center mx-auto text-[11px] lg:text-xs font-black uppercase tracking-wider";

const MyBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [feeRange, setFeeRange] = useState<RangeValue>({});

  const [localFeeGte, setLocalFeeGte] = useState("");
  const [localFeeLte, setLocalFeeLte] = useState("");

  useEffect(() => {
    setLocalFeeGte(feeRange.gte ?? "");
    setLocalFeeLte(feeRange.lte ?? "");
  }, [feeRange]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: "slot.date", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [customInput, setCustomInput] = useState("10");

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
    };

    if (sorting.length > 0) {
      params.sortBy = sorting[0].id;
      params.sortOrder = sorting[0].desc ? "desc" : "asc";
    }

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    if (statusFilter) {
      params.status = statusFilter;
    }

    if (paymentStatusFilter) {
      params.paymentStatus = paymentStatusFilter;
    }

    if (feeRange.gte) {
      params["feeAmount[gte]"] = feeRange.gte;
    }
    if (feeRange.lte) {
      params["feeAmount[lte]"] = feeRange.lte;
    }

    return params;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    searchTerm,
    statusFilter,
    paymentStatusFilter,
    feeRange.gte,
    feeRange.lte,
  ]);

  const { data: myBookingsResponse, isPending, isFetching, refetch } = useQuery({
    queryKey: ["my-bookings", queryParams],
    queryFn: () =>
      /*
       * Route through a server action so the Cookie header can be attached
       * server-side. The browser can't send httpOnly cookies cross-origin,
       * so calling bookingServices.getBookingsByUserId directly from the
       * client loses auth.
       */
      getMyBookingsAction(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000,
  });

  //* Expose refetch to the columns array (declared at module scope) so the
  //  DeleteMyBookingButton cells can stay referentially stable. *//
  refetchTable = refetch;

  const myBookings = (myBookingsResponse?.data as MyBooking[]) ?? [];
  const meta = myBookingsResponse?.meta ?? {
    page: 1,
    limit: pagination.pageSize,
    total: 0,
    totalPages: 1,
  };

  //* Client-side filter: the backend doesn't honor ?status=, so narrow the
  //  already-fetched page here. Only affects the current page view; counts in
  //  meta remain as returned by the server. *//
  const visibleBookings = useMemo(() => {
    if (!statusFilter) return myBookings;
    return myBookings.filter((b) => b.status === statusFilter);
  }, [myBookings, statusFilter]);

  const isLoading = isPending || isFetching;

  const table = useReactTable({
    data: visibleBookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    autoResetPageIndex: false,
    pageCount: meta.totalPages ? Math.max(meta.totalPages, 1) : 1,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(next);
    },
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handlePaymentStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentStatusFilter(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleApplyCustomLimit = () => {
    const val = Number(customInput);
    if (val > 0) {
      setPagination({ pageIndex: 0, pageSize: val });
    }
  };

  const hasActiveFilters =
    Boolean(statusFilter) ||
    Boolean(paymentStatusFilter) ||
    Boolean(feeRange.gte) ||
    Boolean(feeRange.lte);

  const handleClearAllFilters = () => {
    setStatusFilter("");
    setPaymentStatusFilter("");
    setFeeRange({});
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            My Booked Slots
          </h1>
          <p className="text-xs sm:text-sm text-secondary-01/80 font-medium">
            {meta.total ?? 0} bookings found
          </p>
        </div>
      </div>

      <div className="bg-white border border-secondary-01/10 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full pl-9 pr-8 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-500 w-0 h-0" />
          </div>

          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <select
              value={paymentStatusFilter}
              onChange={handlePaymentStatusChange}
              className="w-full pl-9 pr-8 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium appearance-none cursor-pointer"
            >
              <option value="">All Payment Status</option>
              <option value="PENDING">Pending</option>
              <option value="SUCCEEDED">Succeeded</option>
              <option value="FAILED">Failed</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-500 w-0 h-0" />
          </div>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <input
              type="text"
              placeholder="Search by trainer name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium placeholder:text-black/40"
            />
          </div>

          <div className="w-full">
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5">
              Fee Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Min"
                value={localFeeGte}
                disabled={isLoading}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setLocalFeeGte(onlyDigits);
                }}
                onBlur={() => {
                  setFeeRange((prev) => ({
                    ...prev,
                    gte: localFeeGte || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFeeRange((prev) => ({
                      ...prev,
                      gte: localFeeGte || undefined,
                    }));
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }
                }}
                className="w-full px-3 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white text-black font-medium placeholder:text-black/40 disabled:opacity-50"
              />
              <span className="text-neutral-500 text-sm font-bold">-</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Max"
                value={localFeeLte}
                disabled={isLoading}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setLocalFeeLte(onlyDigits);
                }}
                onBlur={() => {
                  setFeeRange((prev) => ({
                    ...prev,
                    lte: localFeeLte || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setFeeRange((prev) => ({
                      ...prev,
                      lte: localFeeLte || undefined,
                    }));
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }
                }}
                className="w-full px-3 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white text-black font-medium placeholder:text-black/40 disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-secondary-01/10">
            {statusFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-primary-01 bg-primary-02/20 text-primary-01">
                Status: {statusFilter.toLowerCase()}
                <button
                  type="button"
                  onClick={() => setStatusFilter("")}
                  className="hover:text-primary-01/70 transition-colors"
                  aria-label="Clear status filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {paymentStatusFilter && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-primary-01 bg-primary-02/20 text-primary-01">
                Payment: {paymentStatusFilter.toLowerCase()}
                <button
                  type="button"
                  onClick={() => setPaymentStatusFilter("")}
                  className="hover:text-primary-01/70 transition-colors"
                  aria-label="Clear payment filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(feeRange.gte || feeRange.lte) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-primary-01 bg-primary-02/20 text-primary-01">
                Fee: {feeRange.gte ?? "*"} - {feeRange.lte ?? "*"}
                <button
                  type="button"
                  onClick={() => setFeeRange({})}
                  className="hover:text-primary-01/70 transition-colors"
                  aria-label="Clear fee filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="text-xs font-bold text-neutral-600 hover:text-black underline transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="bg-white border border-secondary-01/10 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-center border-collapse min-w-200 table-auto">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-secondary-01/10 text-[11px] lg:text-xs font-black uppercase tracking-wider">
                {table.getHeaderGroups().map((hg) =>
                  hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-3 py-4 lg:px-4 text-center"
                    >
                      <div className="flex items-center justify-center w-full">
                        {header.isPlaceholder
                          ? null
                          : header.column.getCanSort() ? (
                              <button
                                type="button"
                                className={SORTABLE_HEADER_CLASS}
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getIsSorted() === "asc" ? (
                                  <ArrowUp className="ml-1 h-3.5 w-3.5 shrink-0" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ArrowDown className="ml-1 h-3.5 w-3.5 shrink-0" />
                                ) : (
                                  <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-50 shrink-0" />
                                )}
                              </button>
                            ) : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            )}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary-01/10 text-xs lg:text-sm text-neutral-800 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 text-primary-01 font-semibold">
                      <Loader2 className="w-8 h-8 animate-spin text-primary-01" />
                      <span>Loading bookings...</span>
                    </div>
                  </td>
                </tr>
              ) : visibleBookings.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-neutral-50/40 transition-colors duration-150"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-3 py-2.5 lg:px-4 text-center"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-10 text-center text-secondary-01 font-semibold"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-4 lg:px-6 bg-neutral-50/50 border-t border-secondary-01/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.max(prev.pageIndex - 1, 0),
                }))
              }
              disabled={
                isLoading ||
                meta.page === 1 ||
                !table.getCanPreviousPage()
              }
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-secondary-01/20 rounded-xl bg-white hover:bg-neutral-50 text-sm font-medium text-neutral-700 disabled:opacity-50 disabled:hover:bg-white transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            {Array.from({ length: meta.totalPages || 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setPagination((prev) => ({ ...prev, pageIndex: index }))
                }
                disabled={isLoading}
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
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pageIndex: Math.min(
                    prev.pageIndex + 1,
                    (meta.totalPages || 1) - 1
                  ),
                }))
              }
              disabled={
                isLoading ||
                meta.page === meta.totalPages ||
                !table.getCanNextPage()
              }
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
                disabled={isLoading}
                className="w-16 px-2 py-1 border border-secondary-01/20 rounded-xl text-sm font-medium text-center focus:outline-none focus:border-primary-01/40 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleApplyCustomLimit}
                disabled={isLoading}
                className="px-3 py-1.5 border border-black rounded-xl bg-white hover:bg-neutral-50 text-sm font-bold text-black transition-colors duration-200 disabled:opacity-50"
              >
                Apply
              </button>
            </div>

            <span className="text-sm text-neutral-600 font-semibold whitespace-nowrap">
              Total {meta.total ?? 0} items, {meta.totalPages || 1} pages
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
