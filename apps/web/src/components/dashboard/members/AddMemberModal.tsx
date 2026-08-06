"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import MemberForm, {
  MemberFormValues,
} from "@/components/dashboard/members/MemberForm";

import { useMembersStore } from "@/store/membersStore";

type AddMemberModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddMemberModal({
  open,
  onClose,
}: Readonly<AddMemberModalProps>) {
  const addMember = useMembersStore(
    (state) => state.addMember
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<MemberFormValues>({
    defaultValues: {
      membership: "Active",
    },
  });

  const onSubmit = (data: MemberFormValues) => {
    console.log("FORM SUBMITTED", data);

    addMember({
      id: Date.now(),

      fullName: data.fullName,

      email: data.email,

      phone: data.phone,

      gender: data.gender,

      dateOfBirth: data.dateOfBirth,

      membership: data.membership as
        | "Active"
        | "Pending"
        | "Expired",

      program: data.program,

      coach: data.coach,

      startDate: data.startDate,

      endDate: data.endDate,

      visits: 0,

      avatar:
        "https://i.pravatar.cc/150?u=" +
        Date.now(),

      notes: data.notes,
    });

    reset();

    onClose();
  };

  const onError = (errors: unknown) => {
    console.log("FORM ERRORS", errors);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 p-4">
      <div className="mx-auto my-10 w-full max-w-5xl rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">

          <h2 className="text-3xl font-bold text-[#022859]">
            Add New Member
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="max-h-[72vh] overflow-y-auto space-y-5 p-5"
        >

          <MemberForm
            register={register}
            errors={errors}
            disabled={isSubmitting}
          />

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
              disabled={isSubmitting}
              className="rounded-xl bg-[#022859] px-6 py-3 font-bold text-[#F2EA79] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Saving..."
                : "Save Member"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}