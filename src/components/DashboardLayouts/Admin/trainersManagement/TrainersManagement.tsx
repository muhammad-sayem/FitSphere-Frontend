"use client";

import { trainerServices } from "@/services/trainer.services";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState, useMemo } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { PaginationState } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import ApprovalControl from "./ApprovalControl";
import DeleteTrainerControl from "./DeleteTrainerControl";
import ChangeTrainerStatusControl from "./ChangeTrainerStatusControl";

interface IUser {
  name: string;
  email: string;
  status: string;
  isDeleted: boolean;
  image?: string | null;
}

interface ITrainerProfile {
  id: string;
  userId: string;
  bio: string;
  specialties: string;
  experience: number;
  feePerHour: number;
  avgRating: number;
  isApproved: boolean;
  createdAt: string;
  user: IUser;
}

const TrainersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [customInput, setCustomInput] = useState("10");
  const [isApproveOpen, setIsApproveOpen] = useState(false);

  const queryParams = useMemo(() => {
    const params: Record<string, string> = {
      page: String(pagination.pageIndex + 1),
      limit: String(pagination.pageSize),
      sortBy: "user.name",
      sortOrder: "asc",
    };

    if (searchTerm) {
      params.searchTerm = searchTerm;
    }

    if (statusFilter) {
      params["user.status"] = statusFilter;
    }
    return params;
  }, [searchTerm, statusFilter, pagination]);

  const { data: trainersResponse, refetch } = useQuery({
    queryKey: ["admin-trainers-management", queryParams],
    queryFn: () =>
      trainerServices.getAllTrainers({
        params: queryParams,
      }),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const trainers = (trainersResponse?.data as ITrainerProfile[]) || [];
  const meta = trainersResponse?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };
  console.log("Trainers Data:", trainers);

  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

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
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">Trainers Management</h1>
          <p className="text-xs sm:text-sm text-secondary-01/80 font-medium">{meta.total} trainers found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
          <div className="relative w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full pl-9 pr-8 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium appearance-none cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="BANNED">Banned</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-neutral-500 w-0 h-0" />
          </div>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-01/60" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-4 py-2 border border-secondary-01/20 rounded-xl text-sm focus:outline-none focus:border-primary-01/40 bg-white transition-colors duration-200 text-black font-medium"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-secondary-01/10 rounded-2xl shadow-sm overflow-hidden w-full">
        <div className="w-full overflow-x-auto lg:overflow-x-visible">
          <table className="w-full text-center border-collapse min-w-200 lg:min-w-full table-auto">
            <thead>
              <tr className="bg-neutral-50/80 border-b border-secondary-01/10 text-[11px] lg:text-xs font-black uppercase tracking-wider">
                <th className="px-3 py-4 lg:px-4 text-center w-14">Image</th>
                <th className="px-3 py-4 lg:px-4 text-center">Name</th>
                <th className="px-3 py-4 lg:px-4 text-center">Email</th>
                <th className="px-3 py-4 lg:px-4 text-center w-24">Status</th>
                <th className="px-3 py-4 lg:px-4 text-center w-32">Approve Status</th>
                <th className="px-3 py-4 lg:px-4 text-center w-28">Delete Status</th>
                <th className="px-3 py-4 lg:px-4 text-center w-64">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-secondary-01/10 text-xs lg:text-sm text-neutral-800 font-medium">
              {
                trainers.map((trainer) => (
                  <tr key={trainer.id} className="hover:bg-neutral-50/40 transition-colors duration-150">
                    <td className="px-3 py-2.5 lg:px-4 text-center">
                      <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full overflow-hidden border border-primary-02/30 bg-neutral-50 flex items-center justify-center shrink-0 mx-auto">
                        {trainer.user?.image ? (
                          <Image
                            src={trainer.user.image}
                            alt={trainer.user.name}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-primary-02/40 text-primary-01 flex items-center justify-center text-[10px] lg:text-xs font-black">
                            {getInitials(trainer.user?.name)}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-black font-bold max-w-35 truncate text-center">
                      {trainer.user?.name}
                    </td>
                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-secondary-01 max-w-40 truncate text-center">
                      {trainer.user?.email}
                    </td>
                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-bold border ${trainer.user?.status === "ACTIVE"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                      >
                        {trainer.user?.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                      {
                        trainer.isApproved ? (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 w-12">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-bold bg-rose-50 text-red-600 border border-rose-200 w-12">
                            No
                          </span>
                        )
                      }
                    </td>
                    <td className="px-3 py-2.5 lg:px-4 whitespace-nowrap text-center">
                      {trainer.user?.isDeleted ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          Deleted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] lg:text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                          Not Deleted
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-2.5 lg:px-4 flex gap-x-2 whitespace-nowrap text-center items-center justify-center">
                      <ApprovalControl
                        trainerId={trainer.id}
                        isApproved={trainer.isApproved}
                        onSuccessCallback={refetch}
                      />
                      <ChangeTrainerStatusControl
                        userId={trainer.userId}
                        currentStatus={trainer.user?.status || "ACTIVE"}
                        onSuccessCallback={refetch}
                      />
                      <DeleteTrainerControl 
                        trainerId={trainer.id}
                        onSuccessCallback={refetch}
                      />
                    </td>
                  </tr>
                ))
              }

              {trainers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-secondary-01 font-semibold">
                    No trainers found
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
                className={`w-8 h-8 rounded-xl text-sm font-bold border transition-colors duration-200 ${meta.page === index + 1
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

      <div className="hidden">
        <Dialog open={isApproveOpen} onOpenChange={setIsApproveOpen}>
          <DialogContent className="sm:max-w-3xl lg:max-w-4xl overflow-y-auto max-h-[90vh] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-black tracking-tight">
                Approve Trainer Modal
              </DialogTitle>
              <DialogDescription className="text-sm text-secondary-01/80 font-medium">
                Review and manage pending trainer approval requests.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-end gap-3 pt-2">
              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-xl border border-secondary-01/20 px-5 py-2.5 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={() => setIsApproveOpen(false)}
                className="rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-neutral-900"
              >
                Save Changes
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TrainersManagement;