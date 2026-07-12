"use client";

import { getMyOrdersAction } from "@/actions/order.action";
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

type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

type MyOrder = {
  id: string;
  phone: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: OrderStatus;
  product?: {
    name?: string;
  };
};

type RangeValue = { gte?: string; lte?: string };

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "PAID":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "DELIVERED":
      return "bg-green-50 text-green-600 border-green-200";
    case "CANCELLED":
      return "bg-red-50 text-red-600 border-red-200";
    case "SHIPPED":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "PENDING":
      return "bg-primary-02/20 text-primary-01 border-primary-01";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const columns: ColumnDef<MyOrder>[] = [
  {
    accessorKey: "product.name",
    header: "Product",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-black font-bold">
        {row.original.product?.name ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-secondary-01">{row.original.phone}</span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-black font-bold">{row.original.quantity}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-black font-black">${row.original.price}</span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-black font-black">
        ${row.original.totalAmount}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
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
];

const SORTABLE_HEADER_CLASS =
  "h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0 flex items-center justify-center mx-auto text-[11px] lg:text-xs font-black uppercase tracking-wider";

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [totalAmountRange, setTotalAmountRange] = useState<RangeValue>({});
  const [quantityRange, setQuantityRange] = useState<RangeValue>({});

  const [localTotalGte, setLocalTotalGte] = useState("");
  const [localTotalLte, setLocalTotalLte] = useState("");
  const [localQtyGte, setLocalQtyGte] = useState("");
  const [localQtyLte, setLocalQtyLte] = useState("");

  useEffect(() => {
    setLocalTotalGte(totalAmountRange.gte ?? "");
    setLocalTotalLte(totalAmountRange.lte ?? "");
  }, [totalAmountRange]);

  useEffect(() => {
    setLocalQtyGte(quantityRange.gte ?? "");
    setLocalQtyLte(quantityRange.lte ?? "");
  }, [quantityRange]);

  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
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

    if (totalAmountRange.gte) {
      params["totalAmount[gte]"] = totalAmountRange.gte;
    }
    if (totalAmountRange.lte) {
      params["totalAmount[lte]"] = totalAmountRange.lte;
    }

    if (quantityRange.gte) {
      params["quantity[gte]"] = quantityRange.gte;
    }
    if (quantityRange.lte) {
      params["quantity[lte]"] = quantityRange.lte;
    }

    return params;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    searchTerm,
    statusFilter,
    totalAmountRange.gte,
    totalAmountRange.lte,
    quantityRange.gte,
    quantityRange.lte,
  ]);

  const { data: myOrdersResponse, isPending, isFetching, refetch } = useQuery({
    queryKey: ["my-orders", queryParams],
    queryFn: () => getMyOrdersAction(queryParams),
    placeholderData: keepPreviousData,
    staleTime: 5 * 1000,
  });

  const myOrders = (myOrdersResponse?.data?.data as MyOrder[]) ?? [];
  const meta = myOrdersResponse?.data?.meta ?? {
    page: 1,
    limit: pagination.pageSize,
    total: 0,
    totalPages: 1,
  };

  const isLoading = isPending || isFetching;

  const table = useReactTable({
    data: myOrders,
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

  const handleApplyCustomLimit = () => {
    const val = Number(customInput);
    if (val > 0) {
      setPagination({ pageIndex: 0, pageSize: val });
    }
  };

  const hasActiveFilters =
    Boolean(statusFilter) ||
    Boolean(totalAmountRange.gte) ||
    Boolean(totalAmountRange.lte) ||
    Boolean(quantityRange.gte) ||
    Boolean(quantityRange.lte);

  const handleClearAllFilters = () => {
    setStatusFilter("");
    setTotalAmountRange({});
    setQuantityRange({});
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-secondary-01/80 font-medium">
            {meta.total ?? 0} orders found
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
              <option value="PAID">Paid</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-500 w-0 h-0" />
          </div>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium placeholder:text-black/40"
            />
          </div>

          <div className="w-full">
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5">
              Total Amount Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Min"
                value={localTotalGte}
                disabled={isLoading}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setLocalTotalGte(onlyDigits);
                }}
                onBlur={() => {
                  setTotalAmountRange((prev) => ({
                    ...prev,
                    gte: localTotalGte || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setTotalAmountRange((prev) => ({
                      ...prev,
                      gte: localTotalGte || undefined,
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
                value={localTotalLte}
                disabled={isLoading}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setLocalTotalLte(onlyDigits);
                }}
                onBlur={() => {
                  setTotalAmountRange((prev) => ({
                    ...prev,
                    lte: localTotalLte || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setTotalAmountRange((prev) => ({
                      ...prev,
                      lte: localTotalLte || undefined,
                    }));
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                  }
                }}
                className="w-full px-3 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white text-black font-medium placeholder:text-black/40 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="w-full">
            <label className="block text-[12px] font-bold uppercase tracking-wider mb-1.5">
              Quantity Range
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Min"
                value={localQtyGte}
                disabled={isLoading}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setLocalQtyGte(onlyDigits);
                }}
                onBlur={() => {
                  setQuantityRange((prev) => ({
                    ...prev,
                    gte: localQtyGte || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuantityRange((prev) => ({
                      ...prev,
                      gte: localQtyGte || undefined,
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
                value={localQtyLte}
                disabled={isLoading}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/[^0-9]/g, "");
                  setLocalQtyLte(onlyDigits);
                }}
                onBlur={() => {
                  setQuantityRange((prev) => ({
                    ...prev,
                    lte: localQtyLte || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setQuantityRange((prev) => ({
                      ...prev,
                      lte: localQtyLte || undefined,
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
            {(totalAmountRange.gte || totalAmountRange.lte) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-primary-01 bg-primary-02/20 text-primary-01">
                Total: {totalAmountRange.gte ?? "*"} - {totalAmountRange.lte ?? "*"}
                <button
                  type="button"
                  onClick={() => setTotalAmountRange({})}
                  className="hover:text-primary-01/70 transition-colors"
                  aria-label="Clear total amount filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(quantityRange.gte || quantityRange.lte) && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border border-primary-01 bg-primary-02/20 text-primary-01">
                Quantity: {quantityRange.gte ?? "*"} - {quantityRange.lte ?? "*"}
                <button
                  type="button"
                  onClick={() => setQuantityRange({})}
                  className="hover:text-primary-01/70 transition-colors"
                  aria-label="Clear quantity filter"
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
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : myOrders.length > 0 ? (
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
                    No orders found
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

export default MyOrders;