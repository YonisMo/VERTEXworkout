"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

type Props = {
  memberId: number;
  onEdit: () => void;
  onDelete: () => void;
};

export default function MemberActions({
  memberId,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/dashboard/members/${memberId}`}
        className="rounded-xl bg-slate-100 p-2 transition hover:bg-[#F2EA79] hover:text-[#022859]"
      >
        <Eye size={18} />
      </Link>

      <button
        type="button"
        onClick={onEdit}
        className="rounded-xl bg-slate-100 p-2 transition hover:bg-blue-100 hover:text-blue-700"
      >
        <Pencil size={18} />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="rounded-xl bg-slate-100 p-2 transition hover:bg-red-100 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}