"use client";

import { LogOut } from "lucide-react";

import type { Attendance } from "@/data/attendance";

type Props = {
  attendance: Attendance[];
  onCheckOut: (id: number) => void;
};

const statusStyles: Record<string, string> = {
  "Checked In":
    "border border-green-200 bg-green-100 text-green-700",

  "Checked Out":
    "border border-blue-200 bg-blue-100 text-blue-700",

  Absent:
    "border border-red-200 bg-red-100 text-red-700",
};

export default function AttendanceTable({
  attendance,
  onCheckOut,
}: Readonly<Props>) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Table Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="text-2xl font-bold text-[#022859]">
            Attendance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Records{" "}
            <span className="font-semibold text-[#022859]">
              ({attendance.length})
            </span>
          </p>
        </div>
      </div>

      {/* Table */}

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
                Coach
              </th>

              <th className="px-6 py-4 text-center">
                Check In
              </th>

              <th className="px-6 py-4 text-center">
                Check Out
              </th>

              <th className="px-6 py-4 text-center">
                Date
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
            {attendance.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-16 text-center text-slate-500"
                >
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendance.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Number */}

                  <td className="px-6 py-5 font-semibold text-slate-500">
                    {index + 1}
                  </td>

                  {/* Member */}

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-[#022859]">
                        {record.memberName}
                      </p>

                      <p className="text-sm text-slate-500">
                        {record.program}
                      </p>
                    </div>
                  </td>

                  {/* Coach */}

                  <td className="px-6 py-5">
                    {record.coach}
                  </td>

                  {/* Check In */}

                  <td className="px-6 py-5 text-center">
                    {record.checkIn || "-"}
                  </td>

                  {/* Check Out */}

                  <td className="px-6 py-5 text-center">
                    {record.checkOut || "-"}
                  </td>

                  {/* Date */}

                  <td className="px-6 py-5 text-center">
                    {record.date}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        statusStyles[record.status] ??
                        "border border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center">
                      {record.status === "Checked In" ? (
                        <button
                          type="button"
                          onClick={() =>
                            onCheckOut(record.id)
                          }
                          className="flex items-center gap-2 rounded-lg bg-[#022859] px-4 py-2 text-sm font-semibold text-[#F2EA79] transition hover:opacity-90"
                        >
                          <LogOut size={16} />
                          Check Out
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
                        >
                          Completed
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}