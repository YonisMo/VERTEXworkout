"use client";

import { useMemo } from "react";
import { Plus, Search } from "lucide-react";

type Props = {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onAdd: () => void;
};

export default function MembersToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onAdd,
}: Readonly<Props>) {
  const filters = useMemo(
    () => ["All", "Active", "Pending", "Expired"],
    []
  );

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            autoComplete="off"
            aria-label="Search members"
            placeholder="Search members..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-[#022859] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#F2EA79]"
          />
        </div>

        {/* Filters + Add */}
        <div className="flex flex-wrap items-center gap-3">
          {filters.map((filter) => {
            const active = status === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setStatus(filter)}
                className={`rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "border-[#022859] bg-[#022859] text-[#F2EA79] shadow-sm"
                    : "border-slate-200 bg-white text-[#022859] hover:border-[#022859] hover:bg-[#F8F8F8]"
                }`}
              >
                {filter}
              </button>
            );
          })}

          <button
            type="button"
            onClick={onAdd}
            className="ml-0 flex items-center gap-2 rounded-xl bg-[#F2EA79] px-5 py-3 font-bold text-[#022859] transition-all duration-200 hover:bg-[#F2DF80] hover:shadow-md lg:ml-2"
          >
            <Plus size={18} />
            <span>Add Member</span>
          </button>
        </div>
      </div>
    </div>
  );
}