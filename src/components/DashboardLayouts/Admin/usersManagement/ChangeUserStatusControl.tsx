/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { changeUserStatusAction } from "@/actions/user.action";

interface ChangeUserStatusControlProps {
  userId: string;
  currentStatus: string;
  onSuccessCallback: () => void;
}

const ChangeUserStatusControl = ({ userId, currentStatus, onSuccessCallback }: ChangeUserStatusControlProps) => {

  const { mutate, isPending } = useMutation({
    mutationFn: async (targetStatus: string) => {
      const response = await changeUserStatusAction(userId, targetStatus);
      return response;
    },

    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "The user status has been successfully updated.",
        icon: "success",
      });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.message || "Something went wrong.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    },
  });

  const handleStatusChange = (chosenStatus: string) => {

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