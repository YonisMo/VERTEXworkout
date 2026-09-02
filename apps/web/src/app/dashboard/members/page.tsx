"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import MembersToolbar from "@/components/dashboard/members/MembersToolbar";
import MembersTable from "@/components/dashboard/members/MembersTable";
import AddMemberModal from "@/components/dashboard/members/AddMemberModal";
import EditMemberModal from "@/components/dashboard/members/EditMemberModal";

import { useMembersStore } from "@/store/membersStore";

import type { Member } from "@/data/members";

function MembersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    members,
    search,
    setSearch,
    status,
    setStatus,
    deleteMember,
  } = useMembersStore();

  const openAdd = searchParams.get("action") === "add";

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
    router.push("/dashboard/members?action=add");
  }, [router]);

  const handleCloseAdd = useCallback(() => {
    router.replace("/dashboard/members");
  }, [router]);

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
      {/* Header */}

      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
          Members Management
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Manage gym members, monitor subscriptions, and keep your
          database organized from one place.
        </p>
      </header>

      {/* Toolbar */}

      <MembersToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAdd={handleOpenAdd}
      />

      {/* Members Table */}

      <MembersTable
        members={filteredMembers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add Member Modal */}

      <AddMemberModal
        open={openAdd}
        onClose={handleCloseAdd}
      />

      {/* Edit Member Modal */}

      <EditMemberModal
        open={openEdit}
        member={selectedMember}
        onClose={handleCloseEdit}
      />
    </main>
  );
}

function MembersPageFallback() {
  return (
    <main className="space-y-8">
      <header>
        <div className="h-10 w-72 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded-lg bg-slate-100" />
      </header>

      <div className="h-20 animate-pulse rounded-3xl bg-slate-100" />

      <div className="h-96 animate-pulse rounded-3xl bg-slate-100" />
    </main>
  );
}

export default function MembersPage() {
  return (
    <Suspense fallback={<MembersPageFallback />}>
      <MembersPageContent />
    </Suspense>
  );
}