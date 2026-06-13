/* eslint-disable @typescript-eslint/no-explicit-any */
import { usersManagementServices } from "@/services/users-management.services";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

interface DeleteUserControlProps {
  userId: string;
  onSuccessCallback: () => void;
}

const DeleteUserControl = ({ userId, onSuccessCallback }: DeleteUserControlProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await usersManagementServices.deleteUser(userId);
      return response;
    },
    onSuccess: (response: any) => {
      if (response?.data?.success || response?.success !== false) {
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
        });
      }

      if (onSuccessCallback) {
        onSuccessCallback();
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

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors duration-200"
      >
        <Trash2 className="w-3.5 h-3.5" />
        <span>Delete</span>
      </button>
    </div>
  );
};

export default DeleteUserControl;