"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAttendanceStore } from "@/store/attendanceStore";
import { useMembersStore } from "@/store/membersStore";

type AttendanceFormValues = {
  memberId: string;
};

type CheckInModalProps = {
  open: boolean;
  onClose: () => void;

  // اختياري:
  // إذا فتحنا النافذة من صفحة عضو معين
  // يتم تحديد العضو تلقائيًا.
  memberId?: number;
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20";

const labelClass =
  "mb-2 block text-sm font-semibold text-slate-700";

export default function CheckInModal({
  open,
  onClose,
  memberId,
}: Readonly<CheckInModalProps>) {
  const addAttendance = useAttendanceStore(
    (state) => state.addAttendance
  );

  const attendance = useAttendanceStore(
    (state) => state.attendance
  );

  const members = useMembersStore(
    (state) => state.members
  );

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<AttendanceFormValues>({
    defaultValues: {
      memberId: memberId
        ? String(memberId)
        : "",
    },
  });

  const selectedMemberId = watch("memberId");

  const selectedMember = members.find(
    (member) =>
      member.id === Number(selectedMemberId)
  );

  /*
   * عندما تفتح النافذة:
   *
   * إذا جاء memberId من صفحة العضو
   * يتم اختياره تلقائيًا.
   *
   * وإذا لم يوجد memberId
   * تظل النافذة عادية للاختيار اليدوي.
   */
  useEffect(() => {
    if (!open) {
      reset({
        memberId: "",
      });

      return;
    }

    reset({
      memberId: memberId
        ? String(memberId)
        : "",
    });
  }, [open, memberId, reset]);

  const onSubmit = (
    data: AttendanceFormValues
  ) => {
    const member = members.find(
      (item) =>
        item.id === Number(data.memberId)
    );

    if (!member) {
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    /*
     * منع تسجيل Check In جديد
     * إذا كان العضو بالفعل Checked In اليوم.
     *
     * أما إذا كان Checked Out
     * فيسمح بتسجيل زيارة جديدة.
     */
    const alreadyCheckedIn = attendance.some(
      (record) =>
        record.memberId === member.id &&
        record.date === today &&
        record.status === "Checked In"
    );

    if (alreadyCheckedIn) {
      alert(
        "This member is already checked in today."
      );

      return;
    }

    const now = new Date();

    addAttendance({
      id: Date.now(),

      memberId: member.id,

      memberName: member.fullName,

      program: member.program,

      coach: member.coach,

      checkIn: now.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),

      checkOut: "",

      date: today,

      status: "Checked In",
    });

    /*
     * زيادة عدد الزيارات للعضو
     * سيتم تنفيذها في Store الخاص بالأعضاء
     * في الخطوة التالية.
     */

    reset({
      memberId: "",
    });

    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold text-[#022859]">
              Member Check In
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select a member to record today&apos;s
              attendance.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
            aria-label="Close check in modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-8"
        >
          {/* Member */}

          <div>
            <label
              htmlFor="attendance-member"
              className={labelClass}
            >
              Select Member
            </label>

            <select
              id="attendance-member"
              {...register("memberId", {
                required:
                  "Please select a member",
              })}
              className={inputClass}
              disabled={Boolean(memberId)}
            >
              <option value="">
                -- Select Member --
              </option>

              {members.map((member) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.fullName}
                </option>
              ))}
            </select>

            {errors.memberId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.memberId.message}
              </p>
            )}
          </div>

          {/* Program */}

          <div>
            <label
              htmlFor="attendance-program"
              className={labelClass}
            >
              Program
            </label>

            <input
              id="attendance-program"
              type="text"
              value={
                selectedMember?.program ?? ""
              }
              readOnly
              className={`${inputClass} bg-slate-100`}
            />
          </div>

          {/* Coach */}

          <div>
            <label
              htmlFor="attendance-coach"
              className={labelClass}
            >
              Coach
            </label>

            <input
              id="attendance-coach"
              type="text"
              value={
                selectedMember?.coach ?? ""
              }
              readOnly
              className={`${inputClass} bg-slate-100`}
            />
          </div>

          {/* Actions */}

          <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                members.length === 0
              }
              className="rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Checking In..."
                : "Check In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}