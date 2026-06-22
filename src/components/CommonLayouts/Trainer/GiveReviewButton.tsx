/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { reviewServices } from "@/services/review.services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface GiveReviewButtonProps {
  trainerProfileId: string;
  currentUser: any | null;
}

interface ICreateReviewPayload {
  trainerId: string;
  rating: number;
  comment: string;
}

const GiveReviewButton = ({ trainerProfileId, currentUser }: GiveReviewButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const isUserRole = currentUser?.role === "USER";
  console.log("Current user data from trainer details:", currentUser);
  console.log("User role from trainer details:", isUserRole);

  const { data: alreadyReviewedData } = useQuery({
    queryKey: ["already-reviewed", trainerProfileId, currentUser?.id],
    queryFn: async () => {
      const res = await reviewServices.alreadyReviewedOrNot(trainerProfileId);
      return res?.data ?? false;
    },
    enabled: !!currentUser && isUserRole,
  });

  const hasReviewed = !!alreadyReviewedData;
  const isButtonDisabled = !currentUser || !isUserRole || hasReviewed;

  const getButtonText = () => {
    if (!currentUser) {
      return "Login to Review";
    };

    if (!isUserRole) {
      return "Only Users Can Review";
    };

    if (hasReviewed) {
      return "Already Reviewed";
    };

    return "Give Review";
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: ICreateReviewPayload) => {
      const res = await reviewServices.createReview(payload);
      return res;
    },
  });

  const form = useForm({
    defaultValues: {
      rating: "",
      comment: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const ratingNum = Number(value.rating);
      if (ratingNum < 1 || ratingNum > 5) {
        const errorMsg = "Rating must be between 1 and 5";
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
        return;
      }

      const payload = {
        trainerId: trainerProfileId,
        rating: ratingNum,
        comment: value.comment,
      };

      try {
        const result = (await mutateAsync(payload)) as any;

        if (result && result.success === false) {
          const errorMsg = result.message || "Review submission failed!";
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-center" });
          return;
        }

        toast.success("Review submitted successfully!", { position: "top-center" });
        form.reset();
        setIsOpen(false);

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["reviews", trainerProfileId] }),
          queryClient.invalidateQueries({ queryKey: ["trainer", trainerProfileId] }),
          queryClient.invalidateQueries({ queryKey: ["already-reviewed", trainerProfileId, currentUser?.id] })
        ]);
      }
      catch (error: any) {
        const errorMsg = error?.message || "Review submission failed";
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
      }
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          disabled={isButtonDisabled}
          className="bg-primary-01 text-white text-xs md:text-sm font-bold py-2 px-4 rounded-xl transition-all active:scale-[0.98] duration-200 hover:bg-orange-500 hover:cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-01"
        >
          {getButtonText()}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl lg:max-w-4xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <div className="mb-2">
            <p className="inline-flex rounded-full border border-primary-02 bg-primary-02/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-01">
              Feedback
            </p>
          </div>
          <DialogTitle className="text-2xl font-semibold tracking-tight text-secondary-01 md:text-3xl">
            Leave a Review
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-sm leading-6 text-secondary-02">
            Share your experience with this trainer by leaving a rating and a comment in a clean minimal layout.
          </DialogDescription>
        </DialogHeader>

        {serverError && (
          <div className="mb-2 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-600">
            {serverError}
          </div>
        )}

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="rating">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                  Rating (1-5)
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="e.g. 4.5"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                  required
                />
              </div>
            )}
          </form.Field>

          <form.Field name="comment">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                  Comment
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Write a detailed review about your training experience, communication, and outcomes."
                  rows={5}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                  required
                />
              </div>
            )}
          </form.Field>

          <div className="flex items-center justify-end gap-3 border-t border-secondary-03 pt-6">
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-2xl border border-secondary-03 px-5 py-3 text-sm font-medium text-secondary-01 transition-colors hover:border-primary-02 hover:bg-primary-02/10"
              >
                Cancel
              </button>
            </DialogClose>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <button
                  type="submit"
                  className="rounded-2xl bg-primary-01 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-01/90 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GiveReviewButton;