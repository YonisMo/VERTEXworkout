"use client";

import Link from "next/link";
import {
  BookOpen,
  Award,
  Wrench,
  GraduationCap,
  Plus,
  ArrowRight,
} from "lucide-react";

import { useAcademyStore } from "@/store/academyStore";

export default function AcademyDashboardPage() {
  const items = useAcademyStore((state) => state.items);

  const programs = items.filter(
    (item) => item.type === "Program"
  );

  const courses = items.filter(
    (item) => item.type === "Course"
  );

  const certifications = items.filter(
    (item) => item.type === "Certification"
  );

  const workshops = items.filter(
    (item) => item.type === "Workshop"
  );

  const activeItems = items.filter(
    (item) => item.status === "Active"
  );

  const stats = [
    {
      title: "Programs",
      value: programs.length,
      description: "Professional training pathways",
      icon: GraduationCap,
      href: "/dashboard/academy/programs",
    },
    {
      title: "Courses",
      value: courses.length,
      description: "Educational courses",
      icon: BookOpen,
      href: "/dashboard/academy/courses",
    },
    {
      title: "Certifications",
      value: certifications.length,
      description: "Professional certifications",
      icon: Award,
      href: "/dashboard/academy/certifications",
    },
    {
      title: "Workshops",
      value: workshops.length,
      description: "Practical learning sessions",
      icon: Wrench,
      href: "/dashboard/academy/workshops",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#A68986]">
            VERTEXworkout Academy
          </p>

          <h1 className="text-3xl font-extrabold text-[#022859] sm:text-4xl">
            Academy Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage programs, courses, certifications, and
            workshops from one place.
          </p>
        </div>

        <Link
          href="/dashboard/academy/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Academy Item
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#F2EA79] hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
                  <Icon size={22} />
                </div>

                <ArrowRight
                  size={19}
                  className="text-slate-300 transition group-hover:text-[#022859]"
                />
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-500">
                {stat.title}
              </p>

              <p className="mt-1 text-3xl font-extrabold text-[#022859]">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {stat.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Overview */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-[#022859]">
                Academy Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current academy content and publishing status.
              </p>
            </div>

            <span className="rounded-full bg-[#F2EA79] px-3 py-1 text-xs font-extrabold text-[#022859]">
              {activeItems.length} Active
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
              <span>Type</span>
              <span>Items</span>
              <span>Status</span>
            </div>

            {[
              {
                label: "Programs",
                count: programs.length,
              },
              {
                label: "Courses",
                count: courses.length,
              },
              {
                label: "Certifications",
                count: certifications.length,
              },
              {
                label: "Workshops",
                count: workshops.length,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-3 items-center border-b border-slate-100 px-4 py-4 last:border-b-0"
              >
                <span className="text-sm font-bold text-[#022859]">
                  {row.label}
                </span>

                <span className="text-sm font-semibold text-slate-600">
                  {row.count}
                </span>

                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-3xl bg-[#022859] p-6 text-white shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-[#F2EA79]">
              Manage Academy
            </h2>

            <p className="mt-1 text-sm leading-6 text-white/70">
              Quickly access each academy content section.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Programs",
                href: "/dashboard/academy/programs",
                icon: GraduationCap,
              },
              {
                title: "Courses",
                href: "/dashboard/academy/courses",
                icon: BookOpen,
              },
              {
                title: "Certifications",
                href: "/dashboard/academy/certifications",
                icon: Award,
              },
              {
                title: "Workshops",
                href: "/dashboard/academy/workshops",
                icon: Wrench,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className="text-[#F2EA79]"
                    />

                    <span className="text-sm font-bold">
                      {item.title}
                    </span>
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-white/50"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-[#022859]">
            Academy Content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Recently available academy items.
          </p>
        </div>

        <div className="space-y-3">
          {items.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-bold text-[#022859]">
                    {item.title}
                  </h3>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                    {item.type}
                  </span>
                </div>

                <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                  {item.shortDescription}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                  item.status === "Active"
                    ? "bg-emerald-50 text-emerald-700"
                    : item.status === "Draft"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}