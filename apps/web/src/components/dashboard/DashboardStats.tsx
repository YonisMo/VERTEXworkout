"use client";

import {
  Users,
  ShoppingBag,
  GraduationCap,
  DollarSign,
  CalendarDays,
  Package,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function DashboardStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

      <StatsCard
        title="Total Members"
        value="248"
        change="+12% this month"
        color="#022859"
        icon={<Users size={30} />}
      />

      <StatsCard
        title="Academy Students"
        value="64"
        change="+5 New Students"
        color="#F2C94C"
        icon={<GraduationCap size={30} />}
      />

      <StatsCard
        title="Store Orders"
        value="81"
        change="+18 Orders"
        color="#0F766E"
        icon={<ShoppingBag size={30} />}
      />

      <StatsCard
        title="Revenue"
        value="$12,850"
        change="+8.2%"
        color="#15803D"
        icon={<DollarSign size={30} />}
      />

      <StatsCard
        title="Bookings"
        value="34"
        change="Today's Sessions"
        color="#7C3AED"
        icon={<CalendarDays size={30} />}
      />

      <StatsCard
        title="Products"
        value="126"
        change="In Stock"
        color="#DC2626"
        icon={<Package size={30} />}
      />

    </section>
  );
}