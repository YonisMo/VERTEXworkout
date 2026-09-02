"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Dumbbell,
  GraduationCap,
  ShoppingBag,
  CalendarDays,
  CreditCard,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Programs",
    href: "/programs",
    icon: Dumbbell,
  },
  {
    title: "Academy",
    href: "/dashboard/academy",
    icon: GraduationCap,
  },
  {
    title: "Store",
    href: "/dashboard/store",
    icon: ShoppingBag,
  },
  {
    title: "Bookings",
    href: "/dashboard/bookings",
    icon: CalendarDays,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col">
      {/* Logo */}

      <div className="flex justify-center border-b border-[#E5D85A] bg-[#F2EA79] px-6 py-6">
        <Image
          src="/images/logo/logo-blue.png"
          alt="VERTEXworkout"
          width={180}
          height={70}
          priority
          className="h-auto w-auto object-contain"
        />
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {menu.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-[#022859] text-white shadow-lg"
                  : "text-[#022859] hover:bg-[#022859] hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={`transition-all duration-300 ${
                  active
                    ? "text-white"
                    : "text-[#022859] group-hover:text-white"
                }`}
              />

              <span
                className={`text-[15px] font-semibold ${
                  active
                    ? "text-white"
                    : "text-[#022859] group-hover:text-white"
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="border-t border-[#E5D85A] bg-[#F2EA79] p-5 text-center">
        <p className="text-xs font-semibold text-[#022859]/70">
          VERTEXworkout Dashboard
        </p>

        <p className="mt-1 text-[11px] font-bold text-[#022859]">
          Version 1.1.0
        </p>
      </div>
    </aside>
  );
}