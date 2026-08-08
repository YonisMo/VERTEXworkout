"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Member } from "@/data/members";

type MembersTableProps = {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: number) => void;
};

const membershipStyles: Record<string, string> = {
  Active:
    "border border-green-200 bg-green-100 text-green-700",

  Pending:
    "border border-yellow-200 bg-yellow-100 text-yellow-700",

  Expired:
    "border border-red-200 bg-red-100 text-red-700",
};

export default function MembersTable({
  members,
  onEdit,
  onDelete,
}: Readonly<MembersTableProps>) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="text-2xl font-bold text-[#022859]">
            Members
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Total Members{" "}
            <span className="font-semibold text-[#022859]">
              ({members.length})
            </span>
          </p>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr className="text-sm uppercase tracking-wide text-slate-600">
              <th className="px-6 py-4 text-left">
                #
              </th>

              <th className="px-6 py-4 text-left">
                Member
              </th>

              <th className="px-6 py-4 text-left">
                Program
              </th>

              <th className="px-6 py-4 text-left">
                Coach
              </th>

              <th className="px-6 py-4 text-center">
                Visits
              </th>

              <th className="px-6 py-4 text-center">
                Membership
              </th>

              <th className="px-6 py-4 text-center">
                End Date
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-16 text-center text-slate-500"
                >
                  No members found.
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr
                  key={member.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50"
                >
                  {/* Number */}

                  <td className="px-6 py-5 font-semibold text-slate-500">
                    {index + 1}
                  </td>

                  {/* Member */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={member.avatar}
                        alt={member.fullName}
                        width={48}
                        height={48}
                        className="rounded-full border border-slate-200 object-cover"
                      />

                      <div>
                        <p className="font-semibold text-[#022859]">
                          {member.fullName}
                        </p>

                        <p className="text-sm text-slate-500">
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Program */}

                  <td className="px-6 py-5">
                    {member.program}
                  </td>

                  {/* Coach */}

                  <td className="px-6 py-5">
                    {member.coach}
                  </td>

                  {/* Visits */}

                  <td className="px-6 py-5 text-center font-semibold text-[#022859]">
                    {member.visits}
                  </td>

                  {/* Membership */}

                  <td className="px-6 py-5 text-center">
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        membershipStyles[member.membership] ??
                        "border border-slate-200 bg-slate-100 text-slate-600"
                      }`}
                    >
                      {member.membership}
                    </span>
                  </td>

                  {/* End Date */}

                  <td className="px-6 py-5 text-center">
                    {member.endDate}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-2">
                      {/* View */}

                      <Link
                        href={`/dashboard/members/${member.id}`}
                        aria-label={`View ${member.fullName}`}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
                      >
                        <Eye size={18} />
                      </Link>

                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() => onEdit(member)}
                        aria-label={`Edit ${member.fullName}`}
                        className="rounded-lg border border-slate-200 p-2 text-blue-600 transition hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() => onDelete(member.id)}
                        aria-label={`Delete ${member.fullName}`}
                        className="rounded-lg border border-slate-200 p-2 text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}