"use client";

import { Plus, Search } from "lucide-react";

type AttendanceToolbarProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  onCheckIn: () => void;
};

const filters = [
  "All",
  "Checked In",
  "Checked Out",
  "Absent",
];

export default function AttendanceToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onCheckIn,
}: Readonly<AttendanceToolbarProps>) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
      <div className="flex flex-1 flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search member, program or coach..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20 md:min-w-[170px]"
        >
          {filters.map((filter) => (
            <option key={filter} value={filter}>
              {filter}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onCheckIn}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-6 py-3 font-semibold text-[#F2EA79] transition hover:opacity-90 active:scale-[0.98]"
      >
        <Plus size={18} />
        Check In
      </button>
    </div>
  );
}