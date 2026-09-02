"use client";

import Link from "next/link";
import {
  UserPlus,
  LogIn,
  ShoppingBag,
  GraduationCap,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Add Member",
    description: "Register a new gym member",
    href: "/dashboard/members?action=add",
    icon: UserPlus,
  },
  {
    title: "Check In",
    description: "Record today's member attendance",
    href: "/dashboard/attendance?action=check-in",
    icon: LogIn,
  },
  {
    title: "Store",
    description: "Manage products & orders",
    href: "/dashboard/store",
    icon: ShoppingBag,
  },
  {
    title: "Academy",
    description: "Manage courses & students",
    href: "/academy",
    icon: GraduationCap,
  },
  {
    title: "Analytics",
    description: "View reports and statistics",
    href: "/dashboard",
    icon: BarChart3,
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#022859]">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quickly access the most common dashboard actions.
        </p>
      </div>

      <div className="grid gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:border-[#F2EA79] hover:bg-[#FFFBE5] hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#022859] text-white transition-all duration-300 group-hover:bg-[#F2EA79] group-hover:text-[#022859]">
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-[#022859]">
                    {action.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>

              <span className="text-xl font-bold text-slate-300 transition group-hover:text-[#022859]">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}