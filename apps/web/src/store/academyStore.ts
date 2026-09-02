"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AcademyItemType =
  | "Program"
  | "Course"
  | "Certification"
  | "Workshop";

export type AcademyStatus =
  | "Active"
  | "Draft"
  | "Archived";

export type AcademyItem = {
  id: number;
  type: AcademyItemType;

  title: string;
  slug: string;

  shortDescription: string;
  description: string;

  topics: string[];

  href: string;

  status: AcademyStatus;
};

type AcademyStore = {
  items: AcademyItem[];

  search: string;
  type: "All" | AcademyItemType;
  status: "All" | AcademyStatus;

  setSearch: (value: string) => void;
  setType: (
    value: "All" | AcademyItemType
  ) => void;
  setStatus: (
    value: "All" | AcademyStatus
  ) => void;

  addItem: (
    item: Omit<AcademyItem, "id">
  ) => void;

  updateItem: (
    item: AcademyItem
  ) => void;

  deleteItem: (
    id: number
  ) => void;

  updateItemStatus: (
    id: number,
    status: AcademyStatus
  ) => void;

  getItem: (
    id: number
  ) => AcademyItem | undefined;

  getItemBySlug: (
    slug: string
  ) => AcademyItem | undefined;

  resetAcademy: () => void;
};

const initialAcademyItems: AcademyItem[] = [
  {
    id: 1,
    type: "Program",
    title: "Personal Trainer Program",
    slug: "personal-trainer",
    shortDescription:
      "A complete educational pathway covering exercise science, training principles, client assessment, coaching skills, and professional practice.",
    description:
      "The VERTEXworkout Personal Trainer Program is designed to help aspiring coaches understand human movement, training principles, program design, and professional coaching practices.",
    topics: [
      "Exercise Science Fundamentals",
      "Client Assessment & Goal Setting",
      "Training Program Design",
      "Strength & Conditioning Principles",
      "Coaching Communication Skills",
      "Injury Prevention Fundamentals",
    ],
    href: "/academy/programs/personal-trainer",
    status: "Active",
  },

  {
    id: 2,
    type: "Program",
    title: "Functional Training Program",
    slug: "functional-training",
    shortDescription:
      "Learn how to create effective functional training systems focused on strength, mobility, stability, conditioning, and athletic performance.",
    description:
      "This program focuses on understanding human movement and building professional training systems that improve strength, mobility, stability, conditioning, and athletic performance.",
    topics: [
      "Functional Movement Fundamentals",
      "Mobility & Stability Training",
      "Strength Development Methods",
      "Conditioning & Energy Systems",
      "Exercise Selection & Progressions",
      "Functional Program Design",
    ],
    href: "/academy/programs/functional-training",
    status: "Active",
  },

  {
    id: 3,
    type: "Program",
    title: "Sports Performance Program",
    slug: "sports-performance",
    shortDescription:
      "Advanced performance education covering strength development, speed, power, conditioning, and athlete preparation.",
    description:
      "The VERTEXworkout Sports Performance Program helps coaches understand athletic development, performance principles, and how to create structured training plans for different sports and performance goals.",
    topics: [
      "Athlete Performance Fundamentals",
      "Strength & Power Development",
      "Speed & Agility Training",
      "Sports Conditioning Systems",
      "Performance Testing Methods",
      "Athlete Program Design",
    ],
    href: "/academy/programs/sports-performance",
    status: "Active",
  },

  {
    id: 4,
    type: "Program",
    title: "Swimming Coach Program",
    slug: "swimming-coach",
    shortDescription:
      "A structured pathway for developing swimming coaching skills, programming methods, technique analysis, and athlete development.",
    description:
      "The VERTEXworkout Swimming Coach Program is designed to help coaches understand swimming technique, training principles, programming methods, and athlete development from beginner to advanced levels.",
    topics: [
      "Swimming Technique Analysis",
      "Training Program Design",
      "Beginner to Advanced Progressions",
      "Endurance & Performance Development",
      "Swimming Coaching Methodology",
      "Athlete Assessment & Improvement",
    ],
    href: "/academy/programs/swimming-coach",
    status: "Active",
  },

  {
    id: 5,
    type: "Program",
    title: "Boxing Fitness Coach Program",
    slug: "boxing-fitness",
    shortDescription:
      "Learn how to design boxing fitness sessions combining conditioning, technique, coordination, and performance training.",
    description:
      "The VERTEXworkout Boxing Fitness Coach Program develops the skills needed to design effective boxing-based workouts focused on endurance, coordination, power, movement quality, and client performance.",
    topics: [
      "Boxing Fitness Fundamentals",
      "Technique & Movement Principles",
      "Conditioning Program Design",
      "Speed, Agility & Reaction Training",
      "Pad Work & Coaching Methods",
      "Boxing Fitness Session Planning",
    ],
    href: "/academy/programs/boxing-fitness",
    status: "Active",
  },

  {
    id: 6,
    type: "Program",
    title: "Corrective Exercise Program",
    slug: "corrective-exercise",
    shortDescription:
      "Understand movement assessment, mobility training, stability exercises, and injury prevention principles.",
    description:
      "The VERTEXworkout Corrective Exercise Program teaches coaches how to understand movement limitations, improve mobility and stability, and create safer training experiences for different populations.",
    topics: [
      "Movement Assessment Fundamentals",
      "Posture & Movement Analysis",
      "Mobility Training Methods",
      "Stability & Core Development",
      "Injury Prevention Principles",
      "Corrective Program Design",
    ],
    href: "/academy/programs/corrective-exercise",
    status: "Active",
  },

  {
    id: 7,
    type: "Course",
    title: "Fitness Fundamentals",
    slug: "fitness-fundamentals",
    shortDescription:
      "Build a strong foundation in exercise science, training principles, movement patterns, and coaching basics.",
    description:
      "Build a strong foundation in exercise science, training principles, movement patterns, and coaching basics.",
    topics: [],
    href: "/academy/courses",
    status: "Active",
  },

  {
    id: 8,
    type: "Course",
    title: "Functional Training Coach",
    slug: "functional-training-coach",
    shortDescription:
      "Learn how to design functional training programs that improve strength, mobility, conditioning, and athletic performance.",
    description:
      "Learn how to design functional training programs that improve strength, mobility, conditioning, and athletic performance.",
    topics: [],
    href: "/academy/courses",
    status: "Active",
  },

  {
    id: 9,
    type: "Course",
    title: "Performance Coaching",
    slug: "performance-coaching",
    shortDescription:
      "Develop advanced coaching skills for athletes and performance-focused training environments.",
    description:
      "Develop advanced coaching skills for athletes and performance-focused training environments.",
    topics: [],
    href: "/academy/courses",
    status: "Active",
  },

  {
    id: 10,
    type: "Certification",
    title: "Personal Trainer Certification",
    slug: "personal-trainer-certification",
    shortDescription:
      "Develop the essential knowledge and practical skills required to coach clients safely and effectively.",
    description:
      "Develop the essential knowledge and practical skills required to coach clients safely and effectively.",
    topics: [],
    href: "/academy/certifications",
    status: "Active",
  },

  {
    id: 11,
    type: "Certification",
    title: "Functional Training Certification",
    slug: "functional-training-certification",
    shortDescription:
      "Learn functional movement concepts, exercise selection, and program design for different performance goals.",
    description:
      "Learn functional movement concepts, exercise selection, and program design for different performance goals.",
    topics: [],
    href: "/academy/certifications",
    status: "Active",
  },

  {
    id: 12,
    type: "Certification",
    title: "Sports Performance Certification",
    slug: "sports-performance-certification",
    shortDescription:
      "Enhance your ability to train athletes through performance-based methods and advanced coaching principles.",
    description:
      "Enhance your ability to train athletes through performance-based methods and advanced coaching principles.",
    topics: [],
    href: "/academy/certifications",
    status: "Active",
  },

  {
    id: 13,
    type: "Workshop",
    title: "Functional Training Workshop",
    slug: "functional-training-workshop",
    shortDescription:
      "Practical sessions covering movement patterns, exercise progression, equipment usage, and functional program design.",
    description:
      "Practical sessions covering movement patterns, exercise progression, equipment usage, and functional program design.",
    topics: [],
    href: "/academy/workshops",
    status: "Active",
  },

  {
    id: 14,
    type: "Workshop",
    title: "Coaching Skills Workshop",
    slug: "coaching-skills-workshop",
    shortDescription:
      "Improve communication, coaching techniques, client assessment, and professional training delivery.",
    description:
      "Improve communication, coaching techniques, client assessment, and professional training delivery.",
    topics: [],
    href: "/academy/workshops",
    status: "Active",
  },

  {
    id: 15,
    type: "Workshop",
    title: "Performance Workshop",
    slug: "performance-workshop",
    shortDescription:
      "Explore advanced training concepts for strength, conditioning, athletic performance, and injury prevention.",
    description:
      "Explore advanced training concepts for strength, conditioning, athletic performance, and injury prevention.",
    topics: [],
    href: "/academy/workshops",
    status: "Active",
  },
];

export const useAcademyStore =
  create<AcademyStore>()(
    persist(
      (set, get) => ({
        items: initialAcademyItems,

        search: "",
        type: "All",
        status: "All",

        setSearch: (value) =>
          set({
            search: value,
          }),

        setType: (value) =>
          set({
            type: value,
          }),

        setStatus: (value) =>
          set({
            status: value,
          }),

        addItem: (newItem) =>
          set((state) => {
            const nextId =
              state.items.reduce(
                (maxId, item) =>
                  Math.max(maxId, item.id),
                0
              ) + 1;

            return {
              items: [
                ...state.items,
                {
                  ...newItem,
                  id: nextId,
                },
              ],
            };
          }),

        updateItem: (updatedItem) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === updatedItem.id
                ? updatedItem
                : item
            ),
          })),

        deleteItem: (id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.id !== id
            ),
          })),

        updateItemStatus: (
          id,
          status
        ) =>
          set((state) => ({
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    status,
                  }
                : item
            ),
          })),

        getItem: (id) =>
          get().items.find(
            (item) => item.id === id
          ),

        getItemBySlug: (slug) =>
          get().items.find(
            (item) => item.slug === slug
          ),

        resetAcademy: () =>
          set({
            items: initialAcademyItems,
            search: "",
            type: "All",
            status: "All",
          }),
      }),
      {
        name: "vertex-academy-storage",
      }
    )
  );