"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import AttendanceToolbar from "@/components/dashboard/attendance/AttendanceToolbar";
import AttendanceTable from "@/components/dashboard/attendance/AttendanceTable";
import CheckInModal from "@/components/dashboard/attendance/CheckInModal";

import { useAttendanceStore } from "@/store/attendanceStore";

export default function AttendancePage() {
  const {
    attendance,
    search,
    status,
    setSearch,
    setStatus,
    checkOutAttendance,
  } = useAttendanceStore();

  const [openCheckIn, setOpenCheckIn] =
    useState(false);

  const filteredAttendance = useMemo(() => {
    let result = [...attendance];

    /*
     * Status Filter
     */

    if (status !== "All") {
      result = result.filter(
        (record) => record.status === status
      );
    }

    /*
     * Search Filter
     */

    if (search.trim()) {
      const value = search
        .toLowerCase()
        .trim();

      result = result.filter((record) => {
        return (
          record.memberName
            .toLowerCase()
            .includes(value) ||
          record.program
            .toLowerCase()
            .includes(value) ||
          record.coach
            .toLowerCase()
            .includes(value)
        );
      });
    }

    return result;
  }, [attendance, search, status]);

  /*
   * Attendance Statistics
   */

  const checkedIn = attendance.filter(
    (record) =>
      record.status === "Checked In"
  ).length;

  const checkedOut = attendance.filter(
    (record) =>
      record.status === "Checked Out"
  ).length;

  const absent = attendance.filter(
    (record) =>
      record.status === "Absent"
  ).length;

  /*
   * Check In Modal
   */

  const handleOpen = useCallback(() => {
    setOpenCheckIn(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenCheckIn(false);
  }, []);

  /*
   * Check Out
   */

  const handleCheckOut = useCallback(
    (id: number) => {
      const confirmed = window.confirm(
        "Check out this member?"
      );

      if (!confirmed) {
        return;
      }

      checkOutAttendance(id);
    },
    [checkOutAttendance]
  );

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page Header */}

        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
            Attendance Management
          </h1>

          <p className="max-w-2xl text-slate-500">
            Monitor member attendance,
            check-in/check-out and manage daily
            visits.
          </p>
        </header>

        {/* Attendance Statistics */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total"
            value={attendance.length}
          />

          <StatCard
            title="Checked In"
            value={checkedIn}
          />

          <StatCard
            title="Checked Out"
            value={checkedOut}
          />

          <StatCard
            title="Absent"
            value={absent}
          />
        </section>

        {/* Toolbar */}

        <section>
          <AttendanceToolbar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            onCheckIn={handleOpen}
          />
        </section>

        {/* Attendance Table */}

        <section>
          <AttendanceTable
            attendance={filteredAttendance}
            onCheckOut={handleCheckOut}
          />
        </section>

        {/* Check In Modal */}

        <CheckInModal
          open={openCheckIn}
          onClose={handleClose}
        />
      </div>
    </main>
  );
}

type StatCardProps = {
  title: string;
  value: number;
};

function StatCard({
  title,
  value,
}: Readonly<StatCardProps>) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-semibold text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#022859]">
        {value}
      </h2>
    </div>
  );
}