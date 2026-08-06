"use client";

import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

export type MemberFormValues = {
  fullName: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  membership: "Active" | "Pending" | "Expired";
  program: string;
  coach: string;
  startDate: string;
  endDate: string;
  avatar: FileList;
  notes: string;
};

type MemberFormProps = {
  register: UseFormRegister<MemberFormValues>;
  errors: FieldErrors<MemberFormValues>;
  disabled?: boolean;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition-all focus:border-[#022859] focus:ring-2 focus:ring-[#022859]/20 disabled:bg-slate-100";

const labelClass =
  "mb-1 block text-sm font-semibold text-slate-700";

export default function MemberForm({
  register,
  errors,
  disabled = false,
}: Readonly<MemberFormProps>) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

      <div>
        <label className={labelClass}>
          Full Name
        </label>

        <input
          type="text"
          placeholder="Enter full name"
          disabled={disabled}
          {...register("fullName", {
            required: "Full name is required",
          })}
          className={inputClass}
        />

        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Email
        </label>

        <input
          type="email"
          placeholder="example@email.com"
          disabled={disabled}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email address",
            },
          })}
          className={inputClass}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Phone
        </label>

        <input
          type="tel"
          placeholder="+20 100 000 0000"
          disabled={disabled}
          {...register("phone", {
            required: "Phone number is required",
          })}
          className={inputClass}
        />

        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Gender
        </label>

        <select
          disabled={disabled}
          {...register("gender", {
            required: "Gender is required",
          })}
          className={inputClass}
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>
        </select>

        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">
            {errors.gender.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Date of Birth
        </label>

        <input
          type="date"
          disabled={disabled}
          {...register("dateOfBirth", {
            required: "Date of birth is required",
          })}
          className={inputClass}
        />

        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-600">
            {errors.dateOfBirth.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Membership
        </label>

        <select
          disabled={disabled}
          {...register("membership", {
            required: "Membership is required",
          })}
          className={inputClass}
        >
          <option value="">
            Select Membership
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Expired">
            Expired
          </option>
        </select>

        {errors.membership && (
          <p className="mt-1 text-sm text-red-600">
            {errors.membership.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Program
        </label>

        <input
          type="text"
          placeholder="Functional Training"
          disabled={disabled}
          {...register("program", {
            required: "Program is required",
          })}
          className={inputClass}
        />

        {errors.program && (
          <p className="mt-1 text-sm text-red-600">
            {errors.program.message}
          </p>
        )}
      </div>
            <div>
        <label className={labelClass}>
          Coach
        </label>

        <input
          type="text"
          placeholder="Coach Name"
          disabled={disabled}
          {...register("coach", {
            required: "Coach is required",
          })}
          className={inputClass}
        />

        {errors.coach && (
          <p className="mt-1 text-sm text-red-600">
            {errors.coach.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Start Date
        </label>

        <input
          type="date"
          disabled={disabled}
          {...register("startDate", {
            required: "Start date is required",
          })}
          className={inputClass}
        />

        {errors.startDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.startDate.message}
          </p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          End Date
        </label>

        <input
          type="date"
          disabled={disabled}
          {...register("endDate", {
            required: "End date is required",
          })}
          className={inputClass}
        />

        {errors.endDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.endDate.message}
          </p>
        )}
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>
          Avatar
        </label>

        <input
          type="file"
          accept="image/*"
          disabled={disabled}
          {...register("avatar")}
          className={inputClass}
        />
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>
          Notes
        </label>

        <textarea
          rows={3}
          placeholder="Additional notes..."
          disabled={disabled}
          {...register("notes")}
          className={inputClass}
        />
      </div>

    </div>
  );
}