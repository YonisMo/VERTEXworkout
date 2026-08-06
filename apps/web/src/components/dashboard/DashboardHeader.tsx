"use client";

import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <section className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-4xl font-extrabold text-[#022859]">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="flex items-center gap-4">

        {/* Search */}

        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

        </div>

        {/* Notifications */}

        <button className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">

          <Bell size={22} className="text-[#022859]" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

      </div>

    </section>
  );
}