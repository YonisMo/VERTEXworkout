"use client";

import { X, CalendarDays, Clock, User, Dumbbell } from "lucide-react";

type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

type Booking = {
  id: number;
  member: string;
  program: string;
  coach: string;
  date: string;
  time: string;
  status: BookingStatus;
};

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

export default function ViewBookingModal({
  open,
  booking,
  onClose,
}: ViewBookingModalProps) {
  if (!open || !booking) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#022859]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
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
              View training session information.
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
              {booking.member.charAt(0).toUpperCase()}
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Member
              </p>

              <h3 className="mt-1 text-2xl font-bold text-[#022859]">
                {booking.member}
              </h3>
            </div>
          </div>
        </div>

        {/* Details */}

        <div className="grid gap-4 px-8 py-6 md:grid-cols-2">
          <DetailCard
            icon={<Dumbbell size={20} />}
            label="Program"
            value={booking.program}
          />

          <DetailCard
            icon={<User size={20} />}
            label="Coach"
            value={booking.coach}
          />

          <DetailCard
            icon={<CalendarDays size={20} />}
            label="Date"
            value={booking.date}
          />

          <DetailCard
            icon={<Clock size={20} />}
            label="Time"
            value={booking.time}
          />
        </div>

        {/* Status */}

        <div className="border-t border-slate-200 px-8 py-6">
          <p className="mb-3 text-sm font-semibold text-slate-500">
            Booking Status
          </p>

          <span
            className={`inline-flex rounded-full px-5 py-2 text-sm font-bold ${
              statusStyles[booking.status]
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-8 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90"
          >
            Close
          </button>
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2EA79] text-[#022859]">
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
    </div>
  );
}