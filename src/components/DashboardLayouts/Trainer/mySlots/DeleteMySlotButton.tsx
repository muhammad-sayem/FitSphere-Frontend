/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { slotServices } from "@/services/slot.services";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface DeleteMySlotButtonProps {
  slotId: string;
  isBooked: boolean;
  refetch?: () => void;
}

const DeleteMySlotButton = ({ slotId, isBooked, refetch }: DeleteMySlotButtonProps) => {

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await slotServices.deleteMySlot(slotId);
      return response;
    },

    onSuccess: (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }

      if (refetch) {
        refetch();
      }
    },

    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Something went wrong.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    }
  });

  const handleDeleteMySlot = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  }

  return (
    <div>
      <div className="flex justify-center w-full">
        <Button
          onClick={handleDeleteMySlot}
          variant="destructive"
          size="sm"
          className="flex items-center gap-2 mx-auto"
          disabled={isBooked}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteMySlotButton;