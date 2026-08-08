"use client";

import { useMemo } from "react";

import { useAttendanceStore } from "@/store/attendanceStore";

export function useAttendance() {
  const {
    attendance,
    search,
    status,
    setSearch,
    setStatus,
    addAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendance,
    resetAttendance,
  } = useAttendanceStore();

  const filteredAttendance = useMemo(() => {
    let result = [...attendance];

    if (status !== "All") {
      result = result.filter(
        (record) => record.status === status
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((record) => {
        return (
          record.memberName
            .toLowerCase()
            .includes(value) ||
          record.program
            .toLowerCase()
            .includes(value) ||
          record.coach
            .toLowerCase()
            .includes(value)
        );
      });
    }

    return result;
  }, [attendance, search, status]);

  return {
    attendance: filteredAttendance,

    allAttendance: attendance,

    search,
    status,

    setSearch,
    setStatus,

    addAttendance,
    updateAttendance,
    deleteAttendance,
    getAttendance,
    resetAttendance,
  };
}