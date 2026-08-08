"use client";

import { useCallback, useMemo, useState } from "react";

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

  const [openCheckIn, setOpenCheckIn] = useState(false);

  const filteredAttendance = useMemo(() => {
    let result = [...attendance];

    if (status !== "All") {
      result = result.filter(
        (record) => record.status === status
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase().trim();

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

  const checkedIn = attendance.filter(
    (record) => record.status === "Checked In"
  ).length;

  const checkedOut = attendance.filter(
    (record) => record.status === "Checked Out"
  ).length;

  const absent = attendance.filter(
    (record) => record.status === "Absent"
  ).length;

  const handleOpen = useCallback(() => {
    setOpenCheckIn(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpenCheckIn(false);
  }, []);

  const handleCheckOut = useCallback(
    (id: number) => {
      if (window.confirm("Check out this member?")) {
        checkOutAttendance(id);
      }
    },
    [checkOutAttendance]
  );

  return (
    <main className="space-y-8">
      {/* Page Header */}

      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
          Attendance Management
        </h1>

        <p className="max-w-2xl text-slate-500">
          Monitor member attendance, check-in/check-out
          and manage daily visits.
        </p>
      </header>

      {/* Attendance Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
      </div>

      {/* Toolbar */}

      <AttendanceToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onCheckIn={handleOpen}
      />

      {/* Attendance Table */}

      <AttendanceTable
        attendance={filteredAttendance}
        onCheckOut={handleCheckOut}
      />

      {/* Check In Modal */}

      <CheckInModal
        open={openCheckIn}
        onClose={handleClose}
      />
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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-[#022859]">
        {value}
      </h2>
    </div>
  );
}