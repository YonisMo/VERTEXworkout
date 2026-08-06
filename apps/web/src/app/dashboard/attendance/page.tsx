"use client";

import {
  CalendarDays,
  Search,
  UserCheck,
  UserMinus,
  Users,
  Plus,
} from "lucide-react";

export default function AttendancePage() {
  return (
    <main className="space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
          Attendance Management
        </h1>

        <p className="max-w-2xl text-slate-500">
          Monitor daily attendance, check members in and out, and manage all
          gym visits from one place.
        </p>
      </header>

      {/* Statistics */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Present Today"
          value="0"
          icon={<Users size={26} />}
        />

        <StatCard
          title="Checked In"
          value="0"
          icon={<UserCheck size={26} />}
        />

        <StatCard
          title="Checked Out"
          value="0"
          icon={<UserMinus size={26} />}
        />

        <StatCard
          title="Absent"
          value="0"
          icon={<CalendarDays size={26} />}
        />
      </section>

      {/* Toolbar */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex flex-1 flex-col gap-4 md:flex-row">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search member..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-[#022859]"
              />
            </div>

            <select className="rounded-xl border border-slate-300 px-4 py-3">
              <option>All</option>
              <option>Checked In</option>
              <option>Checked Out</option>
              <option>Absent</option>
            </select>

            <input
              type="date"
              className="rounded-xl border border-slate-300 px-4 py-3"
            />

          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-6 py-3 font-semibold text-[#F2EA79] transition hover:opacity-90">
            <Plus size={18} />
            Check In
          </button>

        </div>
      </section>

      {/* Attendance Table */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-2xl font-bold text-[#022859]">
            Attendance Records
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr className="text-left text-sm uppercase tracking-wide text-slate-600">

                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Coach</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td
                  colSpan={8}
                  className="py-24 text-center text-slate-500"
                >
                  No attendance records found.
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>
    </main>
  );
}

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

function StatCard({
  title,
  value,
  icon,
}: Readonly<StatCardProps>) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-4xl font-bold text-[#022859]">
            {value}
          </h3>

        </div>

        <div className="rounded-2xl bg-[#022859] p-4 text-[#F2EA79]">
          {icon}
        </div>

      </div>

    </div>
  );
}