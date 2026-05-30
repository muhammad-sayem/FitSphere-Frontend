/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createTrainerProfileAction } from "@/actions/trainer.action";
import { ICreateTrainerProfilePayload, trainerServices } from "@/services/trainer.services";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CreateTrainerProfileForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: (payload: ICreateTrainerProfilePayload) => trainerServices.createTrainerProfile(payload)
  });

  const form = useForm({
    defaultValues: {
      bio: "",
      specialties: "",
      experience: 0,
      feePerHour: 0,
    },

    onSubmit: async ({ value }) => {
      setServerError(null);
      console.log("[CreateTrainerProfileForm] submit payload:", value);

      try {
        const result = await mutateAsync(value) as any;
        console.log("[CreateTrainerProfileForm] action result:", result);

        if (!result.success) {
          const errorMsg = result.message || "Trainer profile creation failed!";
          console.error("[CreateTrainerProfileForm] failed result:", result);
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-center" });
          return;
        }

        toast.success("Trainer Profile created successfully!", { position: "top-center" });
        router.push("/");
      }

      catch (error: any) {
        console.error("[CreateTrainerProfileForm] error creating trainer profile:", error);
        const errorMsg = `Trainer profile creation failed: ${error.message}`;
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
      }
    }
  })

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-3xl border border-secondary-03 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-8 space-y-2">
          <p className="inline-flex rounded-full border border-primary-02 bg-primary-02/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary-01">
            Trainer Profile
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-secondary-01 md:text-3xl">
            Create trainer profile
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-secondary-02">
            Add your bio, specialties, experience, and fee information in a clean minimal layout.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field name="bio">
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                  Bio <span className="text-secondary-02">(optional)</span>
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Write a short bio about your training style, background, or approach."
                  rows={5}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                />
              </div>
            )}
          </form.Field>

          <div className="grid gap-6 md:grid-cols-2">
            <form.Field name="specialties">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                    Specialties
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g. Strength training, Yoga, HIIT"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="experience">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                    Experience
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type="number"
                    placeholder="e.g. 5 years"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(Number(event.target.value))}
                    className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="feePerHour">
            {(field) => (
              <div className="space-y-2 md:max-w-xs">
                <label htmlFor={field.name} className="text-sm font-medium text-secondary-01">
                  Fee per hour
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type="number"
                  min="0"
                  placeholder="e.g. 1200"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(Number(event.target.value))}
                  className="w-full rounded-2xl border border-secondary-03 bg-secondary-03/20 px-4 py-3 text-sm text-secondary-01 outline-none transition-colors placeholder:text-secondary-02 focus:border-primary-01 focus:ring-2 focus:ring-primary-02/30"
                />
              </div>
            )}
          </form.Field>

          <div className="flex items-center justify-end gap-3 border-t border-secondary-03 pt-6">
            <button
              type="button"
              className="rounded-2xl border border-secondary-03 px-5 py-3 text-sm font-medium text-secondary-01 transition-colors hover:border-primary-02 hover:bg-primary-02/10"
            >
              Cancel
            </button>
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
      </div>
    </div>
  );
};

export default CreateTrainerProfileForm;