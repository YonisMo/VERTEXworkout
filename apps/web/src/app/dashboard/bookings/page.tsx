"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  User,
  Dumbbell,
  Plus,
} from "lucide-react";

import {
  useBookingsStore,
  type BookingStatus,
} from "@/store/bookingsStore";

import NewBookingModal from "@/components/dashboard/bookings/NewBookingModal";
import ViewBookingModal from "@/components/dashboard/bookings/ViewBookingModal";

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

export default function BookingsPage() {
  const { bookings, addBooking } = useBookingsStore();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [openNewBooking, setOpenNewBooking] = useState(false);

  const [openViewBooking, setOpenViewBooking] = useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState<(typeof bookings)[number] | null>(null);

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (status !== "All") {
      result = result.filter(
        (booking) => booking.status === status
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((booking) => {
        return (
          booking.member.toLowerCase().includes(value) ||
          booking.program.toLowerCase().includes(value) ||
          booking.coach.toLowerCase().includes(value)
        );
      });
    }

    return result;
  }, [bookings, search, status]);

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const handleCreateBooking = (data: {
    member: string;
    program: string;
    coach: string;
    date: string;
    time: string;
    status: BookingStatus;
  }) => {
    addBooking({
      id: Date.now(),
      ...data,
    });
  };

  const handleViewBooking = (
    booking: (typeof bookings)[number]
  ) => {
    setSelectedBooking(booking);
    setOpenViewBooking(true);
  };

  const handleCloseViewBooking = () => {
    setOpenViewBooking(false);
    setSelectedBooking(null);
  };

  return (
    <main className="space-y-8">

      {/* Header */}

      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
            Bookings Management
          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">
            Manage training sessions, appointments, coaches,
            and member bookings from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenNewBooking(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90"
        >
          <Plus size={18} />
          New Booking
        </button>

      </header>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Bookings"
          value={bookings.length}
          icon={<CalendarDays size={24} />}
        />

        <StatCard
          title="Confirmed"
          value={confirmed}
          icon={<Clock size={24} />}
        />

        <StatCard
          title="Pending"
          value={pending}
          icon={<User size={24} />}
        />

        <StatCard
          title="Completed"
          value={completed}
          icon={<Dumbbell size={24} />}
        />

      </div>

      {/* Filters */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row">

          <div className="flex-1">

            <input
              type="text"
              placeholder="Search member, program or coach..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20"
            />

          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20"
          >

            <option value="All">
              All Statuses
            </option>

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

      </section>

      {/* Bookings Table */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-2xl font-bold text-[#022859]">
            Bookings
          </h2>

          <p className="mt-1 text-sm text-slate-500">

            Total Records{" "}

            <span className="font-semibold text-[#022859]">
              ({filteredBookings.length})
            </span>

          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr className="text-sm uppercase tracking-wide text-slate-600">

                <th className="px-6 py-4 text-left">
                  #
                </th>

                <th className="px-6 py-4 text-left">
                  Member
                </th>

                <th className="px-6 py-4 text-left">
                  Program
                </th>

                <th className="px-6 py-4 text-left">
                  Coach
                </th>

                <th className="px-6 py-4 text-center">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Time
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredBookings.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="py-16 text-center text-slate-500"
                  >
                    No bookings found.
                  </td>

                </tr>

              ) : (

                filteredBookings.map(
                  (booking, index) => (

                    <tr
                      key={booking.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >

                      {/* Number */}

                      <td className="px-6 py-5 font-semibold text-slate-500">
                        {index + 1}
                      </td>

                      {/* Member */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#022859] text-sm font-bold text-[#F2EA79]">

                            {booking.member
                              .charAt(0)
                              .toUpperCase()}

                          </div>

                          <span className="font-semibold text-[#022859]">
                            {booking.member}
                          </span>

                        </div>

                      </td>

                      {/* Program */}

                      <td className="px-6 py-5">
                        {booking.program}
                      </td>

                      {/* Coach */}

                      <td className="px-6 py-5">
                        {booking.coach}
                      </td>

                      {/* Date */}

                      <td className="px-6 py-5 text-center">
                        {booking.date}
                      </td>

                      {/* Time */}

                      <td className="px-6 py-5 text-center font-semibold text-[#022859]">
                        {booking.time}
                      </td>

                      {/* Status */}

                      <td className="px-6 py-5 text-center">

                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                            statusStyles[booking.status]
                          }`}
                        >
                          {booking.status}
                        </span>

                      </td>

                      {/* Actions */}

                      <td className="px-6 py-5 text-center">

                        <button
                          type="button"
                          onClick={() =>
                            handleViewBooking(booking)
                          }
                          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#022859] transition hover:bg-slate-100"
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* New Booking Modal */}

      <NewBookingModal
        open={openNewBooking}
        onClose={() =>
          setOpenNewBooking(false)
        }
        onCreate={handleCreateBooking}
      />

      {/* View Booking Modal */}

      <ViewBookingModal
        open={openViewBooking}
        booking={selectedBooking}
        onClose={handleCloseViewBooking}
      />

    </main>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-[#022859]">
            {value}
          </h2>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2EA79] text-[#022859] transition group-hover:scale-110">
          {icon}
        </div>

      </div>

    </div>
  );
}