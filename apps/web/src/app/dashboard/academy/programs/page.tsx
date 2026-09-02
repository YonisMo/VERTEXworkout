"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Plus,
  Search,
} from "lucide-react";
import { useMemo } from "react";

import {
  useAcademyStore,
  type AcademyItem,
} from "@/store/academyStore";

export default function AcademyProgramsPage() {
  const items = useAcademyStore((state) => state.items);
  const search = useAcademyStore((state) => state.search);
  const setSearch = useAcademyStore(
    (state) => state.setSearch
  );

  const programs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      if (item.type !== "Program") {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        item.title.toLowerCase().includes(query) ||
        item.shortDescription
          .toLowerCase()
          .includes(query)
      );
    });
  }, [items, search]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/dashboard/academy"
            className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#022859]"
          >
            <ArrowLeft size={17} />
            Academy Dashboard
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
              <Dumbbell size={23} />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-[#022859]">
                Academy Programs
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage professional training programs.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/dashboard/academy/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Program
        </Link>
      </div>

      {/* Toolbar */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="relative max-w-xl">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search programs..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
          />
        </div>
      </div>

      {/* Programs */}
      {programs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Dumbbell size={25} />
          </div>

          <h2 className="mt-5 text-xl font-extrabold text-[#022859]">
            No programs found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Try another search term or add a new academy
            program.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type ProgramCardProps = {
  program: AcademyItem;
};

function ProgramCard({
  program,
}: Readonly<ProgramCardProps>) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#F2EA79] hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
          <Dumbbell size={22} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            program.status === "Active"
              ? "bg-emerald-50 text-emerald-700"
              : program.status === "Draft"
                ? "bg-amber-50 text-amber-700"
                : "bg-slate-100 text-slate-500"
          }`}
        >
          {program.status}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-extrabold text-[#022859]">
        {program.title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {program.shortDescription}
      </p>

      {program.topics.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {program.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 border-t border-slate-100 pt-5">
        <Link
          href={program.href}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#022859] transition group-hover:text-[#A68986]"
        >
          View Program
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}