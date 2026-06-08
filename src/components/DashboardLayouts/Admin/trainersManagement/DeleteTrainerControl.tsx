/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { trainerServices } from "@/services/trainer.services";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface DeleteTrainerControlProps {
  trainerId: string;
  onSuccessCallback?: () => void;
}

const DeleteTrainerControl = ({ trainerId, onSuccessCallback }: DeleteTrainerControlProps) => {

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await trainerServices.deleteTrainer(trainerId);
      return response;
    },

    onSuccess: (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        Swal.fire({
          title: "Deleted!",
          text: "The trainer has been successfully deleted.",
          icon: "success",
        });

        if(onSuccessCallback) {
          onSuccessCallback();
        }
      }

      else {
        Swal.fire({
          title: "Error!",
          text: response?.message || "Failed to delete the trainer.",
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
  })

  const handleDeleteTrainer = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this trainer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#10b981",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  }

  return (
    <div>
      <button
        onClick={handleDeleteTrainer}
        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] lg:text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors duration-200 h-7 shrink-0">
        <Trash2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
        <span> {isPending ? "Deleting..." : "Delete"} </span>
      </button>
    </div>
  );
};

export default DeleteTrainerControl;