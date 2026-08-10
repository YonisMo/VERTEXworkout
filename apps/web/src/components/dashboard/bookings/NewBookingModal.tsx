"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import type { BookingStatus } from "@/store/bookingsStore";

export type BookingFormValues = {
  memberId: number;
  memberName: string;
  program: string;
  coach: string;
  date: string;
  time: string;
  status: BookingStatus;
  notes: string;
};

type NewBookingModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (data: BookingFormValues) => void;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

export default function NewBookingModal({
  open,
  onClose,
  onCreate,
}: Readonly<NewBookingModalProps>) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      memberId: 0,
      memberName: "",
      program: "",
      coach: "",
      date: "",
      time: "",
      status: "Confirmed",
      notes: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: BookingFormValues) => {
    onCreate(data);
    reset();
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#022859]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-[#F2EA79] px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-[#022859]">
              New Booking
            </h2>

            <p className="mt-1 text-sm text-[#022859]/70">
              Create a new training session booking.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-xl p-2 text-[#022859] transition hover:bg-white/60 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="Close new booking modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-h-[75vh] space-y-5 overflow-y-auto p-8"
        >
          {/* Member ID */}

          <div>
            <label
              htmlFor="booking-member-id"
              className={labelClass}
            >
              Member ID
            </label>

            <input
              id="booking-member-id"
              type="number"
              min="1"
              placeholder="Enter member ID"
              {...register("memberId", {
                valueAsNumber: true,
                required: "Member ID is required",
                min: {
                  value: 1,
                  message: "Member ID must be greater than 0",
                },
              })}
              className={inputClass}
            />

            {errors.memberId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.memberId.message}
              </p>
            )}
          </div>

          {/* Member Name */}

          <div>
            <label
              htmlFor="booking-member-name"
              className={labelClass}
            >
              Member Name
            </label>

            <input
              id="booking-member-name"
              type="text"
              placeholder="Enter member name"
              {...register("memberName", {
                required: "Member name is required",
              })}
              className={inputClass}
            />

            {errors.memberName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.memberName.message}
              </p>
            )}
          </div>

          {/* Program */}

          <div>
            <label
              htmlFor="booking-program"
              className={labelClass}
            >
              Program
            </label>

            <input
              id="booking-program"
              type="text"
              placeholder="e.g. Weight Loss"
              {...register("program", {
                required: "Program is required",
              })}
              className={inputClass}
            />

            {errors.program && (
              <p className="mt-1 text-sm text-red-600">
                {errors.program.message}
              </p>
            )}
          </div>

          {/* Coach */}

          <div>
            <label
              htmlFor="booking-coach"
              className={labelClass}
            >
              Coach
            </label>

            <input
              id="booking-coach"
              type="text"
              placeholder="e.g. Coach Omar"
              {...register("coach", {
                required: "Coach is required",
              })}
              className={inputClass}
            />

            {errors.coach && (
              <p className="mt-1 text-sm text-red-600">
                {errors.coach.message}
              </p>
            )}
          </div>

          {/* Date + Time */}

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="booking-date"
                className={labelClass}
              >
                Date
              </label>

              <input
                id="booking-date"
                type="date"
                {...register("date", {
                  required: "Date is required",
                })}
                className={inputClass}
              />

              {errors.date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="booking-time"
                className={labelClass}
              >
                Time
              </label>

              <input
                id="booking-time"
                type="time"
                {...register("time", {
                  required: "Time is required",
                })}
                className={inputClass}
              />

              {errors.time && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.time.message}
                </p>
              )}
            </div>
          </div>

          {/* Status */}

          <div>
            <label
              htmlFor="booking-status"
              className={labelClass}
            >
              Status
            </label>

            <select
              id="booking-status"
              {...register("status")}
              className={inputClass}
            >
              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>

          {/* Notes */}

          <div>
            <label
              htmlFor="booking-notes"
              className={labelClass}
            >
              Notes
            </label>

            <textarea
              id="booking-notes"
              rows={4}
              placeholder="Optional booking notes..."
              {...register("notes")}
              className={inputClass}
            />
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Creating..."
                : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}