"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  members as initialMembers,
  type Member,
} from "@/data/members";

type MembersStore = {
  members: Member[];

  search: string;
  status: string;

  setSearch: (value: string) => void;
  setStatus: (value: string) => void;

  addMember: (member: Member) => void;
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
        console.log("ADDING MEMBER:", member);

        set((state) => {
          console.log(
            "OLD MEMBERS:",
            state.members.length
          );

          const updatedMembers = [
            ...state.members,
            member,
          ];

          console.log(
            "NEW MEMBERS:",
            updatedMembers.length
          );

          return {
            members: updatedMembers,
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