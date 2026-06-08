"use client";

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
    mutationFn: async() => {
      const response = await usersManagementServices.changeUserStatus(userId, newStatus);
      return response;
    },

    onSuccess: (data) => {
      if (data && onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  const handleStatusChange = () => {
    mutate();
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