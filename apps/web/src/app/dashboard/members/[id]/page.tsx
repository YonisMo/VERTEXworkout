"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  Dumbbell,
} from "lucide-react";

import { useMembersStore } from "@/store/membersStore";

const membershipStyles: Record<string, string> = {
  Active:
    "border border-green-200 bg-green-100 text-green-700",
  Pending:
    "border border-yellow-200 bg-yellow-100 text-yellow-700",
  Expired:
    "border border-red-200 bg-red-100 text-red-700",
};

export default function MemberDetailsPage() {
  const params = useParams();

  const { members } = useMembersStore();

  const member = members.find(
    (m) => m.id === Number(params.id)
  );

  if (!member) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center">

        <h1 className="text-3xl font-bold text-[#022859]">
          Member Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          The requested member does not exist.
        </p>

        <Link
          href="/dashboard/members"
          className="mt-8 rounded-xl bg-[#022859] px-6 py-3 font-semibold text-[#F2EA79]"
        >
          Back to Members
        </Link>

      </main>
    );
  }

  return (
    <main className="space-y-8">

      <Link
        href="/dashboard/members"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 transition hover:bg-slate-100"
      >
        <ArrowLeft size={18} />
        Back
      </Link>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row">

          <Image
            src={member.avatar}
            alt={member.fullName}
            width={180}
            height={180}
            className="rounded-3xl border object-cover"
          />

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-4">

              <h1 className="text-4xl font-bold text-[#022859]">
                {member.fullName}
              </h1>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  membershipStyles[member.membership]
                }`}
              >
                {member.membership}
              </span>

            </div>

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

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">

              <h3 className="mb-2 text-lg font-semibold text-[#022859]">
                Notes
              </h3>

              <p className="text-slate-600">
                {member.notes || "No notes available."}
              </p>

            </div>

          </div>

        </div>

      </div>

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
    <div className="rounded-2xl border border-slate-200 p-4">

      <div className="mb-2 flex items-center gap-2 font-semibold text-[#022859]">
        {icon}
        {title}
      </div>

      <p className="text-slate-600">
        {value || "-"}
      </p>

    </div>
  );
}