/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { PlusCircle, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format, isBefore, startOfDay } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { ICreateSlotPayload, slotServices } from "@/services/slot.services";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

interface AddNewSlotModalProps {
  refetch?: () => void;
}

const AddNewSlotModal = ({ refetch }: AddNewSlotModalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const disabledDays = (day: Date) => {
    return isBefore(startOfDay(day), startOfDay(new Date()));
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (payload: ICreateSlotPayload) => {
      const response = await slotServices.createSlot(payload);
      return response;
    },
  });

  const form = useForm({
    defaultValues: {
      date: undefined as Date | undefined,
      startTime: "",
      endTime: "",
    },
    onSubmit: async ({ value }) => {
      if (!value.date) {
        toast.error("Please select a date", { position: "top-center" });
        return;
      }
      if (!value.startTime || !value.endTime) {
        toast.error("Please select both start and end times", { position: "top-center" });
        return;
      }

      setServerError(null);

      try {
        const result = await mutateAsync(value) as any;

        if (result && !result.success) {
          const errorMsg = result.message || "Failed to create slot!";
          setServerError(errorMsg);
          toast.error(errorMsg, { position: "top-center" });
          return;
        }

        toast.success("Slot created successfully!", { position: "top-center" });
        form.reset();
        setIsOpen(false);
        if (refetch) refetch();
      } catch (error: any) {
        const errorMsg = error?.message || "Failed to create slot";
        setServerError(errorMsg);
        toast.error(errorMsg, { position: "top-center" });
      }
    },
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-md font-bold text-primary-01 border border-primary-01 hover:bg-primary-01 hover:text-white hover:cursor-pointer rounded-xl transition-colors duration-200">
            <PlusCircle className="w-4 h-4" />
            <span>Add New Slot</span>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md border border-neutral-200 bg-white shadow-xl rounded-2xl overflow-auto p-6">
          <DialogHeader className="pb-2 border-b border-neutral-100">
            <DialogTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary-01 rounded-full"></span>
              Create a New Slot
            </DialogTitle>
          </DialogHeader>

          {serverError && (
            <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-600">
              {serverError}
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid gap-5 py-4">
              <form.Field name="date">
                {(field) => (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 hover:border-primary-01 rounded-xl text-left transition-all duration-150 focus:outline-none group"
                    >
                      <CalendarIcon className="w-5 h-5 text-neutral-500 group-hover:text-primary-01 transition-colors" />
                      <span className={`text-sm ${field.state.value ? "text-neutral-900 font-medium" : "text-neutral-400"}`}>
                        {field.state.value ? format(field.state.value, "PPPP") : "Choose date"}
                      </span>
                    </button>

                    {isCalendarOpen && (
                      <div className="absolute z-50 mt-2 left-0 right-0 mx-auto w-fit bg-white border border-neutral-200 shadow-xl rounded-xl p-2 animate-in fade-in-50 zoom-in-95">
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(selectedDate) => {
                            field.handleChange(selectedDate);
                            setIsCalendarOpen(false);
                          }}
                          disabled={disabledDays}
                        />
                      </div>
                    )}
                  </div>
                )}
              </form.Field>

              <div className="grid grid-cols-2 gap-4">
                <form.Field name="startTime">
                  {(field) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor={field.name} className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-primary-01" />
                        Start Time
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="time"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        className="h-11 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 px-3 focus-visible:border-primary-01 focus-visible:ring-primary-01/20 transition-all [appearance:textfield] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                    </div>
                  )}
                </form.Field>

                <form.Field name="endTime">
                  {(field) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor={field.name} className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-900" />
                        End Time
                      </label>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="time"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) => field.handleChange(event.target.value)}
                        className="h-11 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 px-3 focus-visible:border-neutral-900 focus-visible:ring-neutral-900/20 transition-all [appearance:textfield] [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            <DialogFooter className="mt-2 pt-4 border-t border-neutral-100 flex items-center justify-end gap-2">
              <form.Subscribe selector={(state) => state.isSubmitting}>
                {(isSubmitting) => (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-sm font-bold bg-primary-01 hover:bg-black text-white rounded-xl transition-colors duration-200 shadow-md shadow-primary-01/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Creating..." : "Create Slot"}
                  </button>
                )}
              </form.Subscribe>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewSlotModal;