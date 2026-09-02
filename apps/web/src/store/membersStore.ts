"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  members as initialMembers,
  type Member,
} from "@/data/members";

type NewMember = Omit<Member, "id" | "avatar"> & {
  avatar?: string;
};

type MembersStore = {
  members: Member[];

  search: string;
  status: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;

  addMember: (member: NewMember) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: number) => void;

  getMember: (id: number) => Member | undefined;

  resetMembers: () => void;
};

export const useMembersStore = create<MembersStore>()(
  persist(
    (set, get) => ({
      members: initialMembers,

      search: "",

      status: "All",

      setSearch: (value) =>
        set({
          search: value,
        }),

      setStatus: (value) =>
        set({
          status: value,
        }),

      addMember: (member) => {
        set((state) => {
          const nextId =
            state.members.reduce(
              (maxId, currentMember) =>
                Math.max(maxId, currentMember.id),
              0
            ) + 1;

          const newMember: Member = {
            ...member,

            id: nextId,

            avatar:
              member.avatar ??
              `https://i.pravatar.cc/150?u=${nextId}`,
          };

          return {
            members: [
              ...state.members,
              newMember,
            ],
          };
        });
      },

      updateMember: (updatedMember) =>
        set((state) => ({
          members: state.members.map((member) =>
            member.id === updatedMember.id
              ? updatedMember
              : member
          ),
        })),

      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter(
            (member) => member.id !== id
          ),
        })),

      getMember: (id) =>
        get().members.find(
          (member) => member.id === id
        ),

      resetMembers: () =>
        set({
          members: initialMembers,
        }),
    }),
    {
      name: "vertex-members-storage",
    }
  )
);