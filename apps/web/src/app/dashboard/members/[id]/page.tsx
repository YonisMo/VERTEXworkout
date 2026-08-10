"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  Dumbbell,
  Pencil,
  Trash2,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  Timer,
} from "lucide-react";

import { useMembersStore } from "@/store/membersStore";
import { useAttendanceStore } from "@/store/attendanceStore";

import EditMemberModal from "@/components/dashboard/members/EditMemberModal";

import type { Member } from "@/data/members";
import type { AttendanceStatus } from "@/data/attendance";

const membershipStyles: Record<string, string> = {
  Active:
    "border border-green-200 bg-green-100 text-green-700",

  Pending:
    "border border-yellow-200 bg-yellow-100 text-yellow-700",

  Expired:
    "border border-red-200 bg-red-100 text-red-700",
};

const membershipOptions: Member["membership"][] = [
  "Active",
  "Pending",
  "Expired",
];

const attendanceStatusStyles: Record<
  AttendanceStatus,
  string
> = {
  "Checked In":
    "border border-blue-200 bg-blue-100 text-blue-700",

  "Checked Out":
    "border border-green-200 bg-green-100 text-green-700",

  Absent:
    "border border-red-200 bg-red-100 text-red-700",
};

export default function MemberDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const {
    members,
    updateMember,
    deleteMember,
  } = useMembersStore();

  const { attendance } = useAttendanceStore();

  const [openEdit, setOpenEdit] = useState(false);
  const [openStatusMenu, setOpenStatusMenu] =
    useState(false);

  const memberId = Number(params.id);

  const member = members.find(
    (item) => item.id === memberId
  );

  /*
   * Attendance records belonging to this member.
   */
  const memberAttendance = useMemo(() => {
    return attendance
      .filter(
        (record) => record.memberId === memberId
      )
      .sort((a, b) =>
        b.date.localeCompare(a.date)
      );
  }, [attendance, memberId]);

  /*
   * Attendance statistics.
   */
  const attendanceStats = useMemo(() => {
    const total = memberAttendance.length;

    const checkedIn = memberAttendance.filter(
      (record) => record.status === "Checked In"
    ).length;

    const checkedOut = memberAttendance.filter(
      (record) => record.status === "Checked Out"
    ).length;

    const absent = memberAttendance.filter(
      (record) => record.status === "Absent"
    ).length;

    return {
      total,
      checkedIn,
      checkedOut,
      absent,
    };
  }, [memberAttendance]);

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleStatusChange = (
    newStatus: Member["membership"]
  ) => {
    if (!member) {
      return;
    }

    updateMember({
      ...member,
      membership: newStatus,
    });

    setOpenStatusMenu(false);
  };

  const handleDelete = () => {
    if (!member) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${member.fullName}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    deleteMember(member.id);

    router.push("/dashboard/members");
  };

  if (!member) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-extrabold text-[#022859]">
            Member Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The requested member does not exist.
          </p>

          <Link
            href="/dashboard/members"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#022859] px-6 py-3 font-semibold text-[#F2EA79] transition hover:opacity-90"
          >
            <ArrowLeft size={18} />
            Back to Members
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Back + Actions */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Link
            href="/dashboard/members"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-[#022859] shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back to Members
          </Link>

          <div className="flex flex-wrap gap-3">
            {/* Edit */}

            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-[#022859] shadow-sm transition hover:bg-slate-100"
            >
              <Pencil size={18} />
              Edit Member
            </button>

            {/* Membership Status */}

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenStatusMenu(
                    (value) => !value
                  )
                }
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                  membershipStyles[
                    member.membership
                  ]
                }`}
              >
                {member.membership}

                <ChevronDown size={17} />
              </button>

              {openStatusMenu && (
                <div className="absolute right-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Change Status
                  </p>

                  {membershipOptions.map(
                    (option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            option
                          )
                        }
                        className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-slate-100 ${
                          option ===
                          member.membership
                            ? "bg-slate-100 text-[#022859]"
                            : "text-slate-700"
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Delete */}

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* Member Card */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Avatar */}

            <div className="shrink-0">
              <Image
                src={member.avatar}
                alt={member.fullName}
                width={180}
                height={180}
                className="rounded-3xl border border-slate-200 object-cover"
              />
            </div>

            {/* Main Information */}

            <div className="flex-1">
              {/* Name + Membership */}

              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-4xl font-bold text-[#022859]">
                  {member.fullName}
                </h1>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    membershipStyles[
                      member.membership
                    ] ??
                    "border border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  {member.membership}
                </span>
              </div>

              <p className="mt-2 text-slate-500">
                Member ID: #{member.id}
              </p>

              {/* Information Grid */}

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Info
                  icon={<Mail size={18} />}
                  title="Email"
                  value={member.email}
                />

                <Info
                  icon={<Phone size={18} />}
                  title="Phone"
                  value={member.phone}
                />

                <Info
                  icon={<User size={18} />}
                  title="Gender"
                  value={member.gender}
                />

                <Info
                  icon={<Calendar size={18} />}
                  title="Date of Birth"
                  value={member.dateOfBirth}
                />

                <Info
                  icon={<Dumbbell size={18} />}
                  title="Program"
                  value={member.program}
                />

                <Info
                  icon={<User size={18} />}
                  title="Coach"
                  value={member.coach}
                />

                <Info
                  icon={<Calendar size={18} />}
                  title="Start Date"
                  value={member.startDate}
                />

                <Info
                  icon={<Calendar size={18} />}
                  title="End Date"
                  value={member.endDate}
                />

                <Info
                  icon={<Calendar size={18} />}
                  title="Visits"
                  value={member.visits.toString()}
                />
              </div>

              {/* Notes */}

              <div className="mt-8 rounded-2xl bg-slate-50 p-5">
                <h3 className="mb-2 text-lg font-semibold text-[#022859]">
                  Notes
                </h3>

                <p className="text-slate-600">
                  {member.notes ||
                    "No notes available."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Overview */}

        <section className="grid gap-6 md:grid-cols-4">
          <OverviewCard
            title="Membership"
            value={member.membership}
            description={`${member.startDate} → ${member.endDate}`}
          />

          <OverviewCard
            title="Training Program"
            value={member.program}
            description={`Assigned to ${member.coach}`}
          />

          <OverviewCard
            title="Total Visits"
            value={member.visits.toString()}
            description="Recorded member visits"
          />

          <OverviewCard
            title="Attendance Records"
            value={attendanceStats.total.toString()}
            description="Attendance records"
          />
        </section>

        {/* Attendance Summary */}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#022859]">
                Attendance History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Attendance records for{" "}
                {member.fullName}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <AttendanceSummary
                icon={
                  <CheckCircle2 size={17} />
                }
                label="Checked Out"
                value={attendanceStats.checkedOut}
                className="text-green-700"
              />

              <AttendanceSummary
                icon={<Timer size={17} />}
                label="Checked In"
                value={attendanceStats.checkedIn}
                className="text-blue-700"
              />

              <AttendanceSummary
                icon={<XCircle size={17} />}
                label="Absent"
                value={attendanceStats.absent}
                className="text-red-700"
              />
            </div>
          </div>

          {/* Attendance Table */}

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
            {memberAttendance.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Calendar
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-lg font-bold text-[#022859]">
                  No Attendance Records
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  There are no attendance records
                  for this member yet.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Date
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Program
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Coach
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Check In
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Check Out
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {memberAttendance.map(
                      (record) => (
                        <tr
                          key={record.id}
                          className="transition hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 font-semibold text-[#022859]">
                              <Calendar
                                size={16}
                                className="text-slate-400"
                              />

                              {record.date}
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-slate-700">
                            {record.program}
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {record.coach}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <Clock
                                size={16}
                                className="text-slate-400"
                              />

                              {record.checkIn ||
                                "-"}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                              <Clock
                                size={16}
                                className="text-slate-400"
                              />

                              {record.checkOut ||
                                "-"}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${
                                attendanceStatusStyles[
                                  record.status
                                ]
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Edit Modal */}

      <EditMemberModal
        open={openEdit}
        member={member}
        onClose={handleCloseEdit}
      />
    </main>
  );
}

type InfoProps = {
  icon: ReactNode;
  title: string;
  value: string;
};

function Info({
  icon,
  title,
  value,
}: Readonly<InfoProps>) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F2EA79] text-[#022859]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {title}
        </p>

        <p className="mt-1 font-semibold text-slate-700">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}

type OverviewCardProps = {
  title: string;
  value: string;
  description: string;
};

function OverviewCard({
  title,
  value,
  description,
}: Readonly<OverviewCardProps>) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-2xl font-extrabold text-[#022859]">
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}

type AttendanceSummaryProps = {
  icon: ReactNode;
  label: string;
  value: number;
  className: string;
};

function AttendanceSummary({
  icon,
  label,
  value,
  className,
}: Readonly<AttendanceSummaryProps>) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <span className={className}>
        {icon}
      </span>

      <span className="text-xs font-semibold text-slate-500">
        {label}
      </span>

      <span className={`font-extrabold ${className}`}>
        {value}
      </span>
    </div>
  );
}