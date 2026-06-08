/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { trainerServices } from "@/services/trainer.services";

interface ApprovalControlProps {
  trainerId: string;
  isApproved: boolean;
  onSuccessCallback?: () => void;
}

const ApprovalControl = ({ trainerId, isApproved, onSuccessCallback }: ApprovalControlProps) => {
  
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await trainerServices.approveTrainer(trainerId);
      return response;
    },
    
    onSuccess: (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        Swal.fire({
          title: "Approved!",
          text: "The trainer has been successfully approved.",
          icon: "success",
        });
        if (onSuccessCallback) {
          onSuccessCallback();
        }
      } 
      
      else {
        Swal.fire({
          title: "Error!",
          text: response?.message || "Failed to approve the trainer.",
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

  const handleApproval = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this trainer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={handleApproval}
        disabled={isApproved || isPending}
        className={`inline-flex items-center gap-1 px-2 py-1 text-[11px] lg:text-xs font-bold rounded-lg transition-colors duration-200 h-7 shrink-0 ${
          isApproved
            ? "bg-green-700 text-white cursor-not-allowed"
            : "text-emerald-700 bg-emerald-50 border border-green-200 hover:bg-emerald-100 disabled:opacity-50"
        }`}
      >
        <CheckCircle className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
        <span>{isPending ? "Approving..." : isApproved ? "Approved" : "Approve"}</span>
      </button>
    </div>
  );
};

export default ApprovalControl;