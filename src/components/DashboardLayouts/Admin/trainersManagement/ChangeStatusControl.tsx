/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usersManagementServices } from "@/services/users-management.services";

interface ChangeStatusControlProps {
  currentStatus: string;
  userId: string;
  onSuccessCallback?: () => void;
}

const ChangeStatusControl = ({ currentStatus, userId, onSuccessCallback }: ChangeStatusControlProps) => {

  const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await usersManagementServices.changeUserStatus(userId, newStatus);
      return response;
    },

    onSuccess: (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        Swal.fire({
          title: "Updated!",
          text: "The user status has been successfully updated.",
          icon: "success",
        });
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      } 
      
      else {
        Swal.fire({
          title: "Error!",
          text: response?.message || "Failed to update user status.",
          icon: "error",
        });
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    },
  });

  const handleStatusChange = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change status to ${newStatus.toLowerCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={isPending}>
      <SelectTrigger size="sm" className="h-8 min-w-28 font-bold text-xs rounded-xl">
        <SelectValue placeholder="Change Status" />
      </SelectTrigger>
      <SelectContent align="end" className="rounded-xl min-w-28">
        <SelectItem value="ACTIVE" className="text-emerald-700 font-semibold focus:text-emerald-700">
          Active
        </SelectItem>
        <SelectItem value="BANNED" className="text-rose-700 font-semibold focus:text-rose-700">
          Banned
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChangeStatusControl;