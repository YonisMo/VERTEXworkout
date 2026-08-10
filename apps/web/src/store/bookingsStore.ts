"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

export type Booking = {
  id: number;

  memberId: number;
  memberName: string;

  program: string;
  coach: string;

  date: string;
  time: string;

  status: BookingStatus;

  notes?: string;
};

type BookingStore = {
  bookings: Booking[];

  search: string;
  status: "All" | BookingStatus;

  setSearch: (value: string) => void;

  setStatus: (value: "All" | BookingStatus) => void;

  addBooking: (booking: Booking) => void;

  updateBooking: (booking: Booking) => void;

  updateBookingStatus: (
    id: number,
    status: BookingStatus
  ) => void;

  cancelBooking: (id: number) => void;

  deleteBooking: (id: number) => void;

  getBooking: (
    id: number
  ) => Booking | undefined;

  resetBookings: () => void;
};

const initialBookings: Booking[] = [
  {
    id: 1,

    memberId: 1,

    memberName: "Ahmed Hassan",

    program: "Weight Loss",

    coach: "Coach Omar",

    date: "2026-08-08",

    time: "08:00",

    status: "Confirmed",

    notes: "",
  },

  {
    id: 2,

    memberId: 2,

    memberName: "Mohamed Ali",

    program: "Swimming",

    coach: "Coach Ahmed",

    date: "2026-08-08",

    time: "10:00",

    status: "Confirmed",

    notes: "",
  },

  {
    id: 3,

    memberId: 3,

    memberName: "Sara Mohamed",

    program: "Functional Training",

    coach: "Coach Mona",

    date: "2026-08-08",

    time: "17:00",

    status: "Pending",

    notes: "",
  },

  {
    id: 4,

    memberId: 4,

    memberName: "Yousef Ibrahim",

    program: "Calisthenics",

    coach: "Coach Ali",

    date: "2026-08-09",

    time: "07:30",

    status: "Completed",

    notes: "",
  },
];

export const useBookingsStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: initialBookings,

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

      addBooking: (newBooking) =>
        set((state) => ({
          bookings: [
            ...state.bookings,
            newBooking,
          ],
        })),

      updateBooking: (updatedBooking) =>
        set((state) => ({
          bookings: state.bookings.map(
            (booking) =>
              booking.id === updatedBooking.id
                ? updatedBooking
                : booking
          ),
        })),

      updateBookingStatus: (
        id,
        status
      ) =>
        set((state) => ({
          bookings: state.bookings.map(
            (booking) =>
              booking.id === id
                ? {
                    ...booking,
                    status,
                  }
                : booking
          ),
        })),

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map(
            (booking) =>
              booking.id === id
                ? {
                    ...booking,
                    status: "Cancelled",
                  }
                : booking
          ),
        })),

      deleteBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.filter(
            (booking) =>
              booking.id !== id
          ),
        })),

      getBooking: (id) =>
        get().bookings.find(
          (booking) =>
            booking.id === id
        ),

      resetBookings: () =>
        set({
          bookings: initialBookings,

          search: "",

          status: "All",
        }),
    }),

    {
      name: "vertex-bookings-storage",
    }
  )
);