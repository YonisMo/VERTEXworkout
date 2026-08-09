"use client";

import {
  X,
  CalendarDays,
  Clock,
  User,
  Dumbbell,
  Pencil,
  Trash2,
  Ban,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  useBookingsStore,
  type Booking,
  type BookingStatus,
} from "@/store/bookingsStore";

type ViewBookingModalProps = {
  open: boolean;
  booking: Booking | null;
  onClose: () => void;
};

const statusStyles: Record<BookingStatus, string> = {
  Confirmed:
    "border border-green-200 bg-green-100 text-green-700",

  Pending:
    "border border-yellow-200 bg-yellow-100 text-yellow-700",

  Completed:
    "border border-blue-200 bg-blue-100 text-blue-700",

  Cancelled:
    "border border-red-200 bg-red-100 text-red-700",
};

const statusOptions: BookingStatus[] = [
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

export default function ViewBookingModal({
  open,
  booking,
  onClose,
}: ViewBookingModalProps) {
  const {
    updateBooking,
    updateBookingStatus,
    cancelBooking,
    deleteBooking,
  } = useBookingsStore();

  /*
   * Always read the latest booking directly from Zustand.
   * This makes the modal update immediately when the status
   * or any other booking data changes.
   */
  const currentBooking = useBookingsStore((state) =>
    booking
      ? state.bookings.find(
          (item) => item.id === booking.id
        )
      : undefined
  );

  const [isEditing, setIsEditing] = useState(false);

  const [member, setMember] = useState("");
  const [program, setProgram] = useState("");
  const [coach, setCoach] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!currentBooking) {
      return;
    }

    setMember(currentBooking.member);
    setProgram(currentBooking.program);
    setCoach(currentBooking.coach);
    setDate(currentBooking.date);
    setTime(currentBooking.time);
  }, [currentBooking]);

  useEffect(() => {
    if (!open) {
      setIsEditing(false);
    }
  }, [open]);

  if (!open || !currentBooking) {
    return null;
  }

  const handleSaveEdit = () => {
    if (
      !member.trim() ||
      !program.trim() ||
      !coach.trim() ||
      !date ||
      !time
    ) {
      window.alert(
        "Please complete all booking fields."
      );

      return;
    }

    updateBooking({
      ...currentBooking,
      member: member.trim(),
      program: program.trim(),
      coach: coach.trim(),
      date,
      time,
    });

    setIsEditing(false);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus =
      event.target.value as BookingStatus;

    updateBookingStatus(
      currentBooking.id,
      newStatus
    );
  };

  const handleCancelBooking = () => {
    if (
      currentBooking.status === "Cancelled"
    ) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    cancelBooking(currentBooking.id);
  };

  const handleDeleteBooking = () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    deleteBooking(currentBooking.id);
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#022859]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-[#F2EA79] px-8 py-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#022859]">
              Booking Details
            </h2>

            <p className="mt-1 text-sm text-[#022859]/70">
              View and manage this training session.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#022859] transition hover:bg-white/60"
            aria-label="Close booking details"
          >
            <X size={22} />
          </button>
        </div>

        {/* Member */}

        <div className="border-b border-slate-200 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#022859] text-2xl font-extrabold text-[#F2EA79]">
              {currentBooking.member
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Member
              </p>

              <h3 className="mt-1 text-2xl font-bold text-[#022859]">
                {currentBooking.member}
              </h3>
            </div>
          </div>
        </div>

        {/* Edit Form */}

        {isEditing ? (
          <div className="space-y-5 px-8 py-6">
            {/* Member */}

            <div>
              <label
                htmlFor="edit-booking-member"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Member
              </label>

              <input
                id="edit-booking-member"
                type="text"
                value={member}
                onChange={(event) =>
                  setMember(event.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Program */}

            <div>
              <label
                htmlFor="edit-booking-program"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Program
              </label>

              <input
                id="edit-booking-program"
                type="text"
                value={program}
                onChange={(event) =>
                  setProgram(event.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Coach */}

            <div>
              <label
                htmlFor="edit-booking-coach"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Coach
              </label>

              <input
                id="edit-booking-coach"
                type="text"
                value={coach}
                onChange={(event) =>
                  setCoach(event.target.value)
                }
                className={inputClass}
              />
            </div>

            {/* Date + Time */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="edit-booking-date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Date
                </label>

                <input
                  id="edit-booking-date"
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="edit-booking-time"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Time
                </label>

                <input
                  id="edit-booking-time"
                  type="time"
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Details */}

            <div className="grid gap-4 px-8 py-6 md:grid-cols-2">
              <DetailCard
                icon={<Dumbbell size={20} />}
                label="Program"
                value={currentBooking.program}
              />

              <DetailCard
                icon={<User size={20} />}
                label="Coach"
                value={currentBooking.coach}
              />

              <DetailCard
                icon={<CalendarDays size={20} />}
                label="Date"
                value={currentBooking.date}
              />

              <DetailCard
                icon={<Clock size={20} />}
                label="Time"
                value={currentBooking.time}
              />
            </div>

            {/* Status */}

            <div className="border-t border-slate-200 px-8 py-6">
              <p className="mb-3 text-sm font-semibold text-slate-500">
                Booking Status
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Current Status */}

                <span
                  className={`inline-flex w-fit rounded-full px-5 py-2 text-sm font-bold ${
                    statusStyles[
                      currentBooking.status
                    ]
                  }`}
                >
                  {currentBooking.status}
                </span>

                {/* Change Status */}

                <select
                  value={currentBooking.status}
                  onChange={handleStatusChange}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-[#022859] outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20"
                  aria-label="Change booking status"
                >
                  {statusOptions.map(
                    (statusOption) => (
                      <option
                        key={statusOption}
                        value={statusOption}
                      >
                        {statusOption}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </>
        )}

        {/* Footer */}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-8 py-5">
          {/* Left Actions */}

          <div className="flex flex-wrap gap-3">
            {!isEditing && (
              <button
                type="button"
                onClick={() =>
                  setIsEditing(true)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-[#022859] px-5 py-3 font-semibold text-[#022859] transition hover:bg-[#022859] hover:text-white"
              >
                <Pencil size={17} />
                Edit
              </button>
            )}

            {!isEditing &&
              currentBooking.status !==
                "Cancelled" && (
                <button
                  type="button"
                  onClick={handleCancelBooking}
                  className="inline-flex items-center gap-2 rounded-xl border border-yellow-300 px-5 py-3 font-semibold text-yellow-700 transition hover:bg-yellow-50"
                >
                  <Ban size={17} />
                  Cancel
                </button>
              )}

            {!isEditing && (
              <button
                type="button"
                onClick={handleDeleteBooking}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={17} />
                Delete
              </button>
            )}
          </div>

          {/* Right Actions */}

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setIsEditing(false)
                  }
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Cancel Edit
                </button>

                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type DetailCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function DetailCard({
  icon,
  label,
  value,
}: DetailCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2EA79] text-[#022859]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 font-bold text-[#022859]">
          {value}
        </p>
      </div>
    </div>
  );
}