"use client";

import Link from "next/link";
import {
  UserPlus,
  ShoppingBag,
  GraduationCap,
  BarChart3,
} from "lucide-react";

const actions = [
  {
    title: "Add Member",
    description: "Register a new gym member",
    href: "/dashboard/members",
    icon: UserPlus,
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
    href: "/dashboard/academy",
    icon: GraduationCap,
  },
  {
    title: "Analytics",
    description: "View reports and statistics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-[#022859]">
        Quick Actions
      </h2>

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