"use client";

import { useMemo } from "react";

import { useMembersStore } from "@/store/membersStore";
import { useAttendanceStore } from "@/store/attendanceStore";

type Activity = {
  title: string;
  time: string;
  type: "member" | "check-in" | "check-out";
};

export default function RecentActivity() {
  const members = useMembersStore(
    (state) => state.members
  );

  const attendance = useAttendanceStore(
    (state) => state.attendance
  );

  const activities = useMemo<Activity[]>(() => {
    const memberActivities: Activity[] = members
      .slice()
      .sort((a, b) => b.id - a.id)
      .slice(0, 4)
      .map((member) => ({
        title: `${member.fullName} added as a member`,
        time: member.startDate
          ? `Membership started ${member.startDate}`
          : "Recently added",
        type: "member",
      }));

    const attendanceActivities: Activity[] = attendance
      .slice()
      .sort((a, b) => b.id - a.id)
      .slice(0, 6)
      .map((record) => ({
        title:
          record.status === "Checked Out"
            ? `${record.memberName} checked out`
            : `${record.memberName} checked in`,

        time: `${record.date} • ${
          record.status === "Checked Out"
            ? record.checkOut
            : record.checkIn
        }`,

        type:
          record.status === "Checked Out"
            ? "check-out"
            : "check-in",
      }));

    return [
      ...attendanceActivities,
      ...memberActivities,
    ].slice(0, 6);
  }, [members, attendance]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#022859]">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest member and attendance activity.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm font-medium text-slate-500">
            No recent activity.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((item, index) => (
            <div
              key={`${item.title}-${item.time}-${index}`}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
            >
              <div className="min-w-0 pr-4">
                <h3 className="truncate text-sm font-bold text-[#022859]">
                  {item.title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {item.time}
                </p>
              </div>

              <div className="flex shrink-0 items-center">
                <span
                  className={`h-3 w-3 rounded-full ring-4 ring-opacity-20 ${
                    item.type === "check-in"
                      ? "bg-green-500 ring-green-200"
                      : item.type === "check-out"
                        ? "bg-blue-500 ring-blue-200"
                        : "bg-[#F2EA79] ring-yellow-200"
                  }`}
                  aria-label={
                    item.type === "check-in"
                      ? "Check in activity"
                      : item.type === "check-out"
                        ? "Check out activity"
                        : "Member activity"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}