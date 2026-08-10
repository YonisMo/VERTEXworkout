"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock,
  Eye,
  Filter,
  Plus,
  Search,
  Users,
} from "lucide-react";

import {
  useBookingsStore,
  type BookingStatus,
  type Booking,
} from "@/store/bookingsStore";

import NewBookingModal, {
  type BookingFormValues,
} from "@/components/dashboard/bookings/NewBookingModal";

import ViewBookingModal from "@/components/dashboard/bookings/ViewBookingModal";

const statusOptions: Array<"All" | BookingStatus> = [
  "All",
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
];

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
  const {
    bookings,
    addBooking,
    setSearch,
    setStatus,
  } = useBookingsStore();

  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatusValue] = useState<
    "All" | BookingStatus
  >("All");

  const [openNewBooking, setOpenNewBooking] =
    useState(false);

  const [openViewBooking, setOpenViewBooking] =
    useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    const value = searchValue.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        value === "" ||
        booking.memberName
          .toLowerCase()
          .includes(value) ||
        booking.program
          .toLowerCase()
          .includes(value) ||
        booking.coach
          .toLowerCase()
          .includes(value);

      const matchesStatus =
        statusValue === "All" ||
        booking.status === statusValue;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchValue, statusValue]);

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelledCount = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setSearch(value);
  };

  const handleStatusChange = (
    value: "All" | BookingStatus
  ) => {
    setStatusValue(value);
    setStatus(value);
  };

  const handleCreateBooking = (
    data: BookingFormValues
  ) => {
    const nextId =
      bookings.length > 0
        ? Math.max(
            ...bookings.map(
              (booking) => booking.id
            )
          ) + 1
        : 1;

    const newBooking: Booking = {
      id: nextId,
      memberId: data.memberId,
      memberName: data.memberName,
      program: data.program,
      coach: data.coach,
      date: data.date,
      time: data.time,
      status: data.status,
      notes: data.notes,
    };

    addBooking(newBooking);

    setOpenNewBooking(false);
  };

  const handleViewBooking = (
    booking: Booking
  ) => {
    setSelectedBooking(booking);
    setOpenViewBooking(true);
  };

  const handleCloseView = () => {
    setOpenViewBooking(false);
    setSelectedBooking(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#022859]">
              Bookings Management
            </h1>

            <p className="mt-2 text-slate-500">
              Manage training session bookings,
              schedules, and booking status.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setOpenNewBooking(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-5 py-3 font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
          >
            <Plus size={19} />
            New Booking
          </button>
        </div>

        {/* Statistics */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<CalendarDays size={20} />}
            title="Total Bookings"
            value={bookings.length}
          />

          <StatCard
            icon={<Users size={20} />}
            title="Confirmed"
            value={confirmedCount}
          />

          <StatCard
            icon={<Clock size={20} />}
            title="Pending"
            value={pendingCount}
          />

          <StatCard
            icon={<Eye size={20} />}
            title="Completed"
            value={completedCount}
          />
        </section>

        {/* Secondary Statistics */}

        <section className="grid gap-4 sm:grid-cols-2">
          <StatCard
            icon={<Filter size={20} />}
            title="Cancelled"
            value={cancelledCount}
          />

          <StatCard
            icon={<CalendarDays size={20} />}
            title="Showing"
            value={filteredBookings.length}
          />
        </section>

        {/* Toolbar */}

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}

            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={searchValue}
                onChange={(event) =>
                  handleSearch(
                    event.target.value
                  )
                }
                placeholder="Search member, program or coach..."
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20"
              />
            </div>

            {/* Status */}

            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => {
                const active =
                  statusValue === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        option
                      )
                    }
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-[#022859] text-[#F2EA79]"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Table */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Member
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Program
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Coach
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <CalendarDays
                            size={25}
                          />
                        </div>

                        <h3 className="mt-4 text-lg font-bold text-[#022859]">
                          No bookings found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          Try changing your
                          search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(
                    (booking) => (
                      <tr
                        key={booking.id}
                        className="border-b border-slate-100 transition hover:bg-slate-50"
                      >
                        {/* Member */}

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold text-[#022859]">
                              {
                                booking.memberName
                              }
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              Member #
                              {
                                booking.memberId
                              }
                            </p>
                          </div>
                        </td>

                        {/* Program */}

                        <td className="px-6 py-5">
                          <span className="font-medium text-slate-700">
                            {
                              booking.program
                            }
                          </span>
                        </td>

                        {/* Coach */}

                        <td className="px-6 py-5">
                          <span className="text-slate-600">
                            {
                              booking.coach
                            }
                          </span>
                        </td>

                        {/* Date */}

                        <td className="px-6 py-5">
                          <span className="text-slate-600">
                            {booking.date}
                          </span>
                        </td>

                        {/* Time */}

                        <td className="px-6 py-5">
                          <span className="font-semibold text-[#022859]">
                            {booking.time}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
                              statusStyles[
                                booking.status
                              ]
                            }`}
                          >
                            {
                              booking.status
                            }
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewBooking(
                                booking
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-[#022859] transition hover:bg-slate-100"
                          >
                            <Eye size={17} />
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
      </div>

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
        onClose={handleCloseView}
      />
    </main>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: number;
};

function StatCard({
  icon,
  title,
  value,
}: Readonly<StatCardProps>) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2EA79] text-[#022859]">
          {icon}
        </div>

        <span className="text-2xl font-extrabold text-[#022859]">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-500">
        {title}
      </p>
    </div>
  );
}