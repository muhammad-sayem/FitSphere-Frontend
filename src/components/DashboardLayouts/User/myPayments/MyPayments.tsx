/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ColumnDef, PaginationState, SortingState } from "@tanstack/react-table";
import { format } from "date-fns";
import { paymentServices } from "@/services/payment.services";
import { Badge } from "@/components/ui/badge";
import { DataTableFilterConfig, DataTableFilterValues } from "@/components/table/DataTableFilters";
import DataTable from "@/components/table/DataTable";

interface Product {
  name: string;
}

interface Order {
  id: string;
  productId: string;
  price: number;
  quantity: number;
  totalAmount: number;
  status: string;
  product: Product | null;
}

interface TrainerUser {
  name: string;
}

interface Trainer {
  id: string;
  user: TrainerUser | null;
}

interface BookingSlot {
  id: string;
  status: string;
  paymentStatus: string;
  trainer: Trainer | null;
}

interface PaymentRecord {
  id: string;
  userId: string;
  bookingSlotId: string | null;
  orderId: string | null;
  provider: string;
  purpose: "TRAINER_BOOKING" | "PRODUCT_ORDER";
  status: "PENDING" | "SUCCEEDED" | "FAILED";
  amount: number;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  order: Order | null;
  bookingSlot: BookingSlot | null;
}

const MyPayments = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filterValues, setFilterValues] = useState<DataTableFilterValues>({});

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
      sortBy: sorting[0]?.id || "createdAt",
      sortOrder: sorting[0]?.desc ? "desc" : "asc",
    };

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    Object.entries(filterValues).forEach(([key, val]) => {
      if (typeof val === "string" && val.trim().length > 0) {
        params[key] = val;
      } else if (Array.isArray(val) && val.length > 0) {
        params[key] = val.join(",");
      }
    });

    return params;
  }, [pagination, sorting, searchTerm, filterValues]);

  const { data: myPaymentsResponse, isLoading } = useQuery({
    queryKey: ["my-payments", queryParams],
    queryFn: () => paymentServices.getMyPayments({ params: queryParams }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const myPayments = (myPaymentsResponse?.data ?? []) as PaymentRecord[];
  const meta = myPaymentsResponse?.meta;
  console.log("myPayments", myPayments);

  const columns = useMemo<ColumnDef<PaymentRecord>[]>(() => [
    {
      accessorKey: "purpose",
      header: "Purpose",
      cell: ({ row }) => {
        const purpose = row.original.purpose;
        return (
          <p className="font-bold"> {purpose === "TRAINER_BOOKING" ? "Trainer Appointment" : "Product Purchase"} </p>
        );
      },
    },
    {
      id: "itemDetails",
      header: "Item Name",
      cell: ({ row }) => {
        const record = row.original;
        if (record.purpose === "PRODUCT_ORDER") {
          return <span className="font-medium text-slate-700">{record.order?.product?.name || "Unknown Product"}</span>;
        }
        if (record.purpose === "TRAINER_BOOKING") {
          return (
            <span className="font-medium text-slate-700">
              Session with {record.bookingSlot?.trainer?.user?.name || "Instructor"}
            </span>
          );
        }
        return <span className="text-muted-foreground">-</span>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = Number(row.getValue("amount"));
        return <span className="font-bold">${amount.toFixed(2)}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Payment Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const colorMap: Record<string, string> = {
          SUCCEEDED: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
          PENDING: "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100",
          FAILED: "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-100",
        };
        return (
          <Badge className={colorMap[status] || "bg-slate-100 text-slate-800"}>
            {status}
          </Badge>
        );
      },
    },
    // {
    //   id: "lifecycleStatus",
    //   header: "Booking / Order Status",
    //   cell: ({ row }) => {
    //     const record = row.original;
    //     const targetStatus = record.purpose === "TRAINER_BOOKING"
    //       ? record.bookingSlot?.status
    //       : record.order?.status;

    //     if (!targetStatus) return <span className="text-muted-foreground">-</span>;

    //     const lifecycleColorMap: Record<string, string> = {
    //       PENDING: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",
    //       COMPLETED: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
    //       PAID: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
    //       SHIPPED: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-50",
    //       DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",
    //       CANCELLED: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-50",
    //     };

    //     return (
    //       <Badge variant="outline" className={`uppercase tracking-wider ${lifecycleColorMap[targetStatus] || "bg-slate-50 text-slate-700"}`}>
    //         {targetStatus}
    //       </Badge>
    //     );
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: ({ row }) => {
        const dateString = row.getValue("createdAt") as string;
        if (!dateString) return "-";
        return <span className="text-xs text-slate-500">{format(new Date(dateString), "PP pp")}</span>;
      },
    },
  ], []);

  const filterConfigs: DataTableFilterConfig[] = [
    {
      id: "purpose",
      label: "Purpose",
      type: "single-select",
      options: [
        { label: "Trainer Appointment", value: "TRAINER_BOOKING" },
        { label: "Product Order", value: "PRODUCT_ORDER" },
      ],
    },
    {
      id: "status",
      label: "Payment Status",
      type: "single-select",
      options: [
        { label: "Succeeded", value: "SUCCEEDED" },
        { label: "Pending", value: "PENDING" },
        { label: "Failed", value: "FAILED" },
      ],
    },
  ];

  const handleFilterChange = (filterId: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [filterId]: value,
    }));
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const handleClearAllFilters = () => {
    setFilterValues({});
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-black">My Payments Ledger</h1>
        <p className="text-sm text-muted-foreground">
          Review and audit historical transactions, product deliveries, and trainer sessions.
        </p>
      </div>

      <DataTable
        data={myPayments}
        columns={columns}
        isLoading={isLoading}
        meta={meta}
        search={{
          initialValue: searchTerm,
          placeholder: "Search transactions...",
          onDebouncedChange: (value) => {
            setSearchTerm(value);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          },
        }}
        sorting={{
          state: sorting,
          onSortingChange: (updater) => {
            const nextState = typeof updater === "function" ? updater(sorting) : updater;
            setSorting(nextState);
            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
          },
        }}
        pagination={{
          state: pagination,
          onPaginationChange: setPagination,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValues,
          onFilterChange: handleFilterChange,
          onClearAll: handleClearAllFilters,
        }}
        emptyMessage="No historical payments records matching the criteria."
      />
    </div>
  );
};

export default MyPayments;