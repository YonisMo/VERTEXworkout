"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Header Content */}

      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Header Actions */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm transition focus-within:border-[#022859] focus-within:ring-2 focus-within:ring-[#022859]/10">
          <Search
            size={18}
            className="shrink-0 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            aria-label="Search dashboard"
          />
        </div>

        {/* Notifications */}

        <button
          type="button"
          className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#022859]/20 hover:shadow-md"
          aria-label="Notifications"
        >
          <Bell
            size={22}
            className="text-[#022859]"
          />

          <span
            className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"
            aria-hidden="true"
          />
        </button>
      </div>
    </section>
  );
}