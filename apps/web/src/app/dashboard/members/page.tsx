"use client";

import { useCallback, useMemo, useState } from "react";

import MembersToolbar from "@/components/dashboard/members/MembersToolbar";
import MembersTable from "@/components/dashboard/members/MembersTable";
import AddMemberModal from "@/components/dashboard/members/AddMemberModal";
import EditMemberModal from "@/components/dashboard/members/EditMemberModal";

import { useMembersStore } from "@/store/membersStore";

import type { Member } from "@/data/members";

export default function MembersPage() {
  const {
    members,
    search,
    setSearch,
    status,
    setStatus,
    deleteMember,
  } = useMembersStore();

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

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
          member.phone.toLowerCase().includes(value) ||
          member.program.toLowerCase().includes(value) ||
          member.coach.toLowerCase().includes(value)
        );
      });
    }

    return result;
  }, [members, search, status]);

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const handleEdit = useCallback((member: Member) => {
    setSelectedMember(member);
    setOpenEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
    setSelectedMember(null);
  }, []);

  const handleDelete = useCallback(
    (id: number) => {
      if (window.confirm("Delete this member?")) {
        deleteMember(id);
      }
    },
    [deleteMember]
  );

  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
          Members Management
        </h1>

        <p className="max-w-2xl text-slate-500">
          Manage gym members, monitor subscriptions, and keep your database
          organized from one place.
        </p>
      </header>

      <MembersToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAdd={handleOpenAdd}
      />

      <MembersTable
        members={filteredMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
            <AddMemberModal
        open={openAdd}
        onClose={handleCloseAdd}
      />

      <EditMemberModal
        open={openEdit}
        member={selectedMember}
        onClose={handleCloseEdit}
      />
    </main>
  );
}