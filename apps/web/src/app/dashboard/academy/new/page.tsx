"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Save,
} from "lucide-react";
import { useState } from "react";

import {
  useAcademyStore,
  type AcademyItemType,
} from "@/store/academyStore";

const itemTypes: AcademyItemType[] = [
  "Program",
  "Course",
  "Certification",
  "Workshop",
];

const defaultHref: Record<
  AcademyItemType,
  string
> = {
  Program: "/academy/programs",
  Course: "/academy/courses",
  Certification: "/academy/certifications",
  Workshop: "/academy/workshops",
};

export default function NewAcademyItemPage() {
  const addItem = useAcademyStore(
    (state) => state.addItem
  );

  const [type, setType] =
    useState<AcademyItemType>("Program");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [topics, setTopics] = useState("");
  const [href, setHref] = useState(
    defaultHref.Program
  );

  const [status, setStatus] = useState<
    "Active" | "Draft"
  >("Active");

  const handleTypeChange = (
    value: AcademyItemType
  ) => {
    setType(value);
    setHref(defaultHref[value]);
  };

  const handleTitleChange = (
    value: string
  ) => {
    setTitle(value);

    if (!slug) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    addItem({
      type,
      title: trimmedTitle,
      slug:
        slug.trim() ||
        trimmedTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      shortDescription:
        shortDescription.trim(),
      description: description.trim(),
      topics: topics
        .split("\n")
        .map((topic) => topic.trim())
        .filter(Boolean),
      href:
        href.trim() ||
        defaultHref[type],
      status,
    });

    window.location.href =
      "/dashboard/academy";
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
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
            <BookOpen size={23} />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-[#022859]">
              Add Academy Item
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Create a new program, course, certification,
              or workshop.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Type */}
        <div>
          <label
            htmlFor="academy-type"
            className="mb-2 block text-sm font-bold text-[#022859]"
          >
            Content Type
          </label>

          <select
            id="academy-type"
            value={type}
            onChange={(event) =>
              handleTypeChange(
                event.target.value as AcademyItemType
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
          >
            {itemTypes.map((itemType) => (
              <option
                key={itemType}
                value={itemType}
              >
                {itemType}
              </option>
            ))}
          </select>
        </div>

        {/* Title + Slug */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="academy-title"
              className="mb-2 block text-sm font-bold text-[#022859]"
            >
              Title
            </label>

            <input
              id="academy-title"
              type="text"
              value={title}
              onChange={(event) =>
                handleTitleChange(
                  event.target.value
                )
              }
              placeholder="Example: Advanced Functional Training"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            />
          </div>

          <div>
            <label
              htmlFor="academy-slug"
              className="mb-2 block text-sm font-bold text-[#022859]"
            >
              Slug
            </label>

            <input
              id="academy-slug"
              type="text"
              value={slug}
              onChange={(event) =>
                setSlug(event.target.value)
              }
              placeholder="advanced-functional-training"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="academy-short-description"
            className="mb-2 block text-sm font-bold text-[#022859]"
          >
            Short Description
          </label>

          <textarea
            id="academy-short-description"
            value={shortDescription}
            onChange={(event) =>
              setShortDescription(
                event.target.value
              )
            }
            placeholder="Write a short description..."
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="academy-description"
            className="mb-2 block text-sm font-bold text-[#022859]"
          >
            Full Description
          </label>

          <textarea
            id="academy-description"
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value
              )
            }
            placeholder="Write the full academy item description..."
            rows={6}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
          />
        </div>

        {/* Topics */}
        <div>
          <label
            htmlFor="academy-topics"
            className="mb-2 block text-sm font-bold text-[#022859]"
          >
            Topics
          </label>

          <textarea
            id="academy-topics"
            value={topics}
            onChange={(event) =>
              setTopics(event.target.value)
            }
            placeholder={
              "Exercise Science Fundamentals\nProgram Design\nCoaching Skills"
            }
            rows={5}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
          />

          <p className="mt-2 text-xs text-slate-400">
            Enter one topic per line.
          </p>
        </div>

        {/* Public Link + Status */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="academy-href"
              className="mb-2 block text-sm font-bold text-[#022859]"
            >
              Public Page
            </label>

            <input
              id="academy-href"
              type="text"
              value={href}
              onChange={(event) =>
                setHref(event.target.value)
              }
              placeholder="/academy/courses"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            />
          </div>

          <div>
            <label
              htmlFor="academy-status"
              className="mb-2 block text-sm font-bold text-[#022859]"
            >
              Status
            </label>

            <select
              id="academy-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as
                    | "Active"
                    | "Draft"
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            >
              <option value="Active">
                Active
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/academy"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-6 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
          >
            <Save size={18} />
            Save Academy Item
          </button>
        </div>
      </form>
    </div>
  );
}