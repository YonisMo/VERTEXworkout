"use client";

import { X } from "lucide-react";
import { useState } from "react";
import {
  usePaymentsStore,
  type PaymentMethod,
  type PaymentStatus,
} from "@/store/paymentsStore";

type RecordPaymentModalProps = {
  open: boolean;
  onClose: () => void;
};

const paymentMethods: PaymentMethod[] = [
  "Cash",
  "Card",
  "Bank Transfer",
  "Online",
];

const paymentStatuses: PaymentStatus[] = [
  "Paid",
  "Pending",
  "Failed",
  "Refunded",
];

const getToday = () =>
  new Date().toISOString().split("T")[0];

export default function RecordPaymentModal({
  open,
  onClose,
}: RecordPaymentModalProps) {
  const addPayment = usePaymentsStore(
    (state) => state.addPayment
  );

  const [member, setMember] = useState("");
  const [description, setDescription] =
    useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] =
    useState<PaymentMethod>("Cash");
  const [status, setStatus] =
    useState<PaymentStatus>("Paid");
  const [date, setDate] = useState(getToday);

  if (!open) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (
      !member.trim() ||
      !description.trim() ||
      !numericAmount ||
      numericAmount <= 0 ||
      !date
    ) {
      return;
    }

    addPayment({
      member: member.trim(),
      description: description.trim(),
      amount: numericAmount,
      method,
      status,
      date,
    });

    setMember("");
    setDescription("");
    setAmount("");
    setMethod("Cash");
    setStatus("Paid");
    setDate(getToday());

    onClose();
  };

  const handleClose = () => {
    setMember("");
    setDescription("");
    setAmount("");
    setMethod("Cash");
    setStatus("Paid");
    setDate(getToday());

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-extrabold text-[#022859]">
              Record Payment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new payment transaction.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-[#022859]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="payment-member"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Member
            </label>

            <input
              id="payment-member"
              type="text"
              value={member}
              onChange={(event) =>
                setMember(event.target.value)
              }
              placeholder="Member name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
              required
            />
          </div>

          <div>
            <label
              htmlFor="payment-description"
              className="mb-2 block text-sm font-bold text-slate-700"
            >
              Description
            </label>

            <input
              id="payment-description"
              type="text"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="e.g. Monthly Membership"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="payment-amount"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Amount (EGP)
              </label>

              <input
                id="payment-amount"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value
                  )
                }
                placeholder="1200"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="payment-date"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Date
              </label>

              <input
                id="payment-date"
                type="date"
                value={date}
                onChange={(event) =>
                  setDate(
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
                required
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="payment-method"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Payment Method
              </label>

              <select
                id="payment-method"
                value={method}
                onChange={(event) =>
                  setMethod(
                    event.target.value as PaymentMethod
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
              >
                {paymentMethods.map(
                  (paymentMethod) => (
                    <option
                      key={paymentMethod}
                      value={paymentMethod}
                    >
                      {paymentMethod}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="payment-status"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Status
              </label>

              <select
                id="payment-status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as PaymentStatus
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
              >
                {paymentStatuses.map(
                  (paymentStatus) => (
                    <option
                      key={paymentStatus}
                      value={paymentStatus}
                    >
                      {paymentStatus}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
            >
              Save Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}