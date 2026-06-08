/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usersManagementServices } from "@/services/users-management.services";

interface ChangeUserStatusControlProps {
  userId: string;
  currentStatus: string;
  onSuccessCallback: () => void;
}

const ChangeUserStatusControl = ({ userId, currentStatus, onSuccessCallback }: ChangeUserStatusControlProps) => {

  const { mutate, isPending } = useMutation({
    mutationFn: async (targetStatus: string) => {
      const response = await usersManagementServices.changeUserStatus(userId, targetStatus);
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
      } else {
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

  const handleStatusChange = (chosenStatus: string) => {
    // যদি বর্তমান স্ট্যাটাসই আবার ক্লিক করা হয়, তবে মিউটেশন দরকার নেই
    if (chosenStatus === currentStatus) return;

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change status to ${chosenStatus.toLowerCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(chosenStatus);
      }
    });
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={isPending}>
      <SelectTrigger size="sm" className="h-8 min-w-28 font-bold text-xs rounded-xl text-black">
        <SelectValue placeholder="Change Status" />
      </SelectTrigger>
      <SelectContent align="end" className="rounded-xl min-w-28 bg-white border border-secondary-01/10">
        <SelectItem value="ACTIVE" className="text-emerald-700 font-semibold focus:text-emerald-700 cursor-pointer">
          Active
        </SelectItem>
        <SelectItem value="BANNED" className="text-rose-700 font-semibold focus:text-rose-700 cursor-pointer">
          Banned
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChangeUserStatusControl;