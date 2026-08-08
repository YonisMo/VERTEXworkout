"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  attendance as initialAttendance,
  type Attendance,
} from "@/data/attendance";

type AttendanceStore = {
  attendance: Attendance[];

  search: string;

  status: string;

  setSearch: (value: string) => void;

  setStatus: (value: string) => void;

  addAttendance: (attendance: Attendance) => void;

  updateAttendance: (attendance: Attendance) => void;

  checkOutAttendance: (id: number) => void;

  deleteAttendance: (id: number) => void;

  getAttendance: (id: number) => Attendance | undefined;

  resetAttendance: () => void;
};

export const useAttendanceStore = create<AttendanceStore>()(
  persist(
    (set, get) => ({
      attendance: initialAttendance,

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

      addAttendance: (newAttendance) =>
        set((state) => ({
          attendance: [
            ...state.attendance,
            newAttendance,
          ],
        })),

      updateAttendance: (updatedAttendance) =>
        set((state) => ({
          attendance: state.attendance.map(
            (record) =>
              record.id === updatedAttendance.id
                ? updatedAttendance
                : record
          ),
        })),

      checkOutAttendance: (id) =>
        set((state) => ({
          attendance: state.attendance.map(
            (record) => {
              if (record.id !== id) {
                return record;
              }

              return {
                ...record,

                checkOut:
                  new Date().toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  ),

                status: "Checked Out",
              };
            }
          ),
        })),

      deleteAttendance: (id) =>
        set((state) => ({
          attendance: state.attendance.filter(
            (record) => record.id !== id
          ),
        })),

      getAttendance: (id) =>
        get().attendance.find(
          (record) => record.id === id
        ),

      resetAttendance: () =>
        set({
          attendance: initialAttendance,

          search: "",

          status: "All",
        }),
    }),

    {
      name: "vertex-attendance-storage",
    }
  )
);