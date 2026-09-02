"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PaymentStatus =
  | "Paid"
  | "Pending"
  | "Failed"
  | "Refunded";

export type PaymentMethod =
  | "Cash"
  | "Card"
  | "Bank Transfer"
  | "Online";

export type Payment = {
  id: number;
  member: string;
  description: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  date: string;
};

export type NewPayment = Omit<Payment, "id">;

type PaymentsState = {
  payments: Payment[];

  addPayment: (payment: NewPayment) => void;
  updatePayment: (
    id: number,
    payment: Partial<NewPayment>
  ) => void;
  deletePayment: (id: number) => void;
  updatePaymentStatus: (
    id: number,
    status: PaymentStatus
  ) => void;
  getPaymentById: (
    id: number
  ) => Payment | undefined;
  resetPayments: () => void;
};

const initialPayments: Payment[] = [
  {
    id: 1,
    member: "Ahmed Ali",
    description: "Monthly Membership",
    amount: 1200,
    method: "Cash",
    status: "Paid",
    date: "2026-09-01",
  },
  {
    id: 2,
    member: "Mohamed Hassan",
    description: "Personal Training",
    amount: 1800,
    method: "Card",
    status: "Paid",
    date: "2026-09-01",
  },
  {
    id: 3,
    member: "Omar Khaled",
    description: "Swimming Program",
    amount: 900,
    method: "Online",
    status: "Pending",
    date: "2026-09-02",
  },
  {
    id: 4,
    member: "Youssef Samir",
    description: "Monthly Membership",
    amount: 1200,
    method: "Bank Transfer",
    status: "Paid",
    date: "2026-08-31",
  },
  {
    id: 5,
    member: "Karim Adel",
    description: "Boxing Fitness",
    amount: 750,
    method: "Cash",
    status: "Failed",
    date: "2026-08-30",
  },
  {
    id: 6,
    member: "Mostafa Nabil",
    description: "Functional Training",
    amount: 1000,
    method: "Card",
    status: "Refunded",
    date: "2026-08-29",
  },
];

export const usePaymentsStore =
  create<PaymentsState>()(
    persist(
      (set, get) => ({
        payments: initialPayments,

        addPayment: (payment) => {
          const currentPayments =
            get().payments;

          const nextId =
            currentPayments.length > 0
              ? Math.max(
                  ...currentPayments.map(
                    (item) => item.id
                  )
                ) + 1
              : 1;

          set({
            payments: [
              ...currentPayments,
              {
                ...payment,
                id: nextId,
              },
            ],
          });
        },

        updatePayment: (id, payment) => {
          set((state) => ({
            payments: state.payments.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,
                      ...payment,
                    }
                  : item
            ),
          }));
        },

        deletePayment: (id) => {
          set((state) => ({
            payments: state.payments.filter(
              (item) => item.id !== id
            ),
          }));
        },

        updatePaymentStatus: (
          id,
          status
        ) => {
          set((state) => ({
            payments: state.payments.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,
                      status,
                    }
                  : item
            ),
          }));
        },

        getPaymentById: (id) =>
          get().payments.find(
            (item) => item.id === id
          ),

        resetPayments: () => {
          set({
            payments: initialPayments,
          });
        },
      }),
      {
        name: "vertex-payments-storage",
      }
    )
  );