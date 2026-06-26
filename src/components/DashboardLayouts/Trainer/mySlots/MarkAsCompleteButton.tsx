/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { slotServices } from "@/services/slot.services";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

interface MarkAsCompleteButtonProps {
  slotId: string;
  isBooked: boolean;
  isCompleted?: boolean;
  onCompleted?: () => void;
  refetch?: () => void;
}

const MarkAsCompleteButton = ({ slotId, isBooked, isCompleted, onCompleted, refetch }: MarkAsCompleteButtonProps) => {

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await slotServices.updateBookingStatus(slotId);
      return response;
    },

    onSuccess: (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        Swal.fire("Completed!", "The slot has been marked as complete.", "success");
        if (onCompleted) {
          onCompleted();
        }
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

  const handleMarkAsComplete = () => {
    Swal.fire({
      title: "Mark as Complete?",
      text: "Are you sure you want to mark this slot as complete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  }

  return (
    <div>
      <div className="flex justify-center w-full">
        {isCompleted ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            Completed
          </span>
        ) : (
          <Button
            onClick={handleMarkAsComplete}
            variant="default"
            size="sm"
            className="flex items-center gap-2 mx-auto"
            disabled={!isBooked}
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark as Complete
          </Button>
        )}
      </div>
    </div>
  );
};

export default MarkAsCompleteButton;