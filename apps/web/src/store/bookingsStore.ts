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
  member: string;
  program: string;
  coach: string;
  date: string;
  time: string;
  status: BookingStatus;
};

type BookingStore = {
  bookings: Booking[];

  addBooking: (booking: Booking) => void;

  updateBooking: (booking: Booking) => void;

  updateBookingStatus: (
    id: number,
    status: BookingStatus
  ) => void;

  cancelBooking: (id: number) => void;

  deleteBooking: (id: number) => void;

  getBooking: (id: number) => Booking | undefined;

  resetBookings: () => void;
};

const initialBookings: Booking[] = [
  {
    id: 1,
    member: "Ahmed Hassan",
    program: "Weight Loss",
    coach: "Coach Omar",
    date: "2026-08-08",
    time: "08:00",
    status: "Confirmed",
  },
  {
    id: 2,
    member: "Mohamed Ali",
    program: "Swimming",
    coach: "Coach Ahmed",
    date: "2026-08-08",
    time: "10:00",
    status: "Confirmed",
  },
  {
    id: 3,
    member: "Sara Mohamed",
    program: "Functional Training",
    coach: "Coach Mona",
    date: "2026-08-08",
    time: "17:00",
    status: "Pending",
  },
  {
    id: 4,
    member: "Yousef Ibrahim",
    program: "Calisthenics",
    coach: "Coach Ali",
    date: "2026-08-09",
    time: "07:30",
    status: "Completed",
  },
];

export const useBookingsStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: initialBookings,

      addBooking: (newBooking) =>
        set((state) => ({
          bookings: [
            ...state.bookings,
            newBooking,
          ],
        })),

      updateBooking: (updatedBooking) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
            booking.id === updatedBooking.id
              ? updatedBooking
              : booking
          ),
        })),

      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((booking) =>
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
          bookings: state.bookings.map((booking) =>
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
            (booking) => booking.id !== id
          ),
        })),

      getBooking: (id) =>
        get().bookings.find(
          (booking) => booking.id === id
        ),

      resetBookings: () =>
        set({
          bookings: initialBookings,
        }),
    }),
    {
      name: "vertex-bookings-storage",
    }
  )
);