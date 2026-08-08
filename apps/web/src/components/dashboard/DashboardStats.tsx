"use client";

import {
  Users,
  ShoppingBag,
  GraduationCap,
  DollarSign,
  CalendarDays,
  Package,
  UserCheck,
  UserX,
} from "lucide-react";

import StatsCard from "./StatsCard";

import { useMembersStore } from "@/store/membersStore";
import { useAttendanceStore } from "@/store/attendanceStore";

export default function DashboardStats() {
  const members = useMembersStore((state) => state.members);

  const attendance = useAttendanceStore(
    (state) => state.attendance
  );

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.membership === "Active"
  ).length;

  const pendingMembers = members.filter(
    (member) => member.membership === "Pending"
  ).length;

  const expiredMembers = members.filter(
    (member) => member.membership === "Expired"
  ).length;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const todayAttendance = attendance.filter(
    (record) => record.date === today
  );

  const checkedInToday = todayAttendance.filter(
    (record) => record.status === "Checked In"
  ).length;

  const checkedOutToday = todayAttendance.filter(
    (record) => record.status === "Checked Out"
  ).length;

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <StatsCard
        title="Total Members"
        value={totalMembers.toString()}
        change={`${activeMembers} Active Members`}
        color="#022859"
        icon={<Users size={30} />}
      />

      <StatsCard
        title="Active Members"
        value={activeMembers.toString()}
        change={`${pendingMembers} Pending`}
        color="#15803D"
        icon={<UserCheck size={30} />}
      />

      <StatsCard
        title="Today's Check In"
        value={checkedInToday.toString()}
        change={`${checkedOutToday} Checked Out`}
        color="#0F766E"
        icon={<CalendarDays size={30} />}
      />

      <StatsCard
        title="Checked Out Today"
        value={checkedOutToday.toString()}
        change={`${todayAttendance.length} Total Visits`}
        color="#7C3AED"
        icon={<UserCheck size={30} />}
      />

      <StatsCard
        title="Pending Members"
        value={pendingMembers.toString()}
        change="Awaiting Activation"
        color="#F2C94C"
        icon={<GraduationCap size={30} />}
      />

      <StatsCard
        title="Expired Members"
        value={expiredMembers.toString()}
        change="Membership Expired"
        color="#DC2626"
        icon={<UserX size={30} />}
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