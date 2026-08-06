"use client";

import { useMemo, useState } from "react";
import {
  members as initialMembers,
  type Member,
} from "@/data/members";

export default function useMembers() {
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const filteredMembers = useMemo(() => {
    let result = [...members];

    if (status !== "All") {
      result = result.filter(
        (member) => member.membership === status
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((member) => {
        return (
          member.fullName.toLowerCase().includes(value) ||
          member.email.toLowerCase().includes(value) ||
          member.program.toLowerCase().includes(value) ||
          member.coach.toLowerCase().includes(value) ||
          member.phone.toLowerCase().includes(value)
        );
      });
    }

    return result;
  }, [members, search, status]);

  function addMember(member: Member) {
    setMembers((prev) => [...prev, member]);
  }

  function updateMember(updatedMember: Member) {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === updatedMember.id
          ? updatedMember
          : member
      )
    );
  }

  function deleteMember(id: number) {
    setMembers((prev) =>
      prev.filter((member) => member.id !== id)
    );
  }

  function getMember(id: number) {
    return members.find((member) => member.id === id);
  }

  return {
    members: filteredMembers,

    allMembers: members,

    search,
    setSearch,

    status,
    setStatus,

    addMember,
    updateMember,
    deleteMember,
    getMember,
  };
}