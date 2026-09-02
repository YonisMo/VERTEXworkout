"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Receipt,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import RecordPaymentModal from "@/components/dashboard/payments/RecordPaymentModal";
import {
  usePaymentsStore,
  type PaymentStatus,
} from "@/store/paymentsStore";

const statusOptions: Array<
  "All" | PaymentStatus
> = [
  "All",
  "Paid",
  "Pending",
  "Failed",
  "Refunded",
];

export default function PaymentsDashboardPage() {
  const payments = usePaymentsStore(
    (state) => state.payments
  );

  const updatePaymentStatus =
    usePaymentsStore(
      (state) => state.updatePaymentStatus
    );

  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<"All" | PaymentStatus>("All");
  const [recordPaymentOpen, setRecordPaymentOpen] =
    useState(false);

  const filteredPayments = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.member
          .toLowerCase()
          .includes(query) ||
        payment.description
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        status === "All" ||
        payment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, status]);

  const paidPayments = payments.filter(
    (payment) => payment.status === "Paid"
  );

  const pendingPayments = payments.filter(
    (payment) => payment.status === "Pending"
  );

  const totalRevenue =
    paidPayments.reduce(
      (total, payment) =>
        total + payment.amount,
      0
    );

  const pendingAmount =
    pendingPayments.reduce(
      (total, payment) =>
        total + payment.amount,
      0
    );

  const averagePayment =
    paidPayments.length > 0
      ? Math.round(
          totalRevenue /
            paidPayments.length
        )
      : 0;

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-EG").format(
      amount
    );

  const stats = [
    {
      title: "Total Revenue",
      value: `${formatAmount(
        totalRevenue
      )} EGP`,
      description:
        "Successful payments",
      icon: DollarSign,
    },
    {
      title: "Pending",
      value: `${formatAmount(
        pendingAmount
      )} EGP`,
      description: `${pendingPayments.length} pending payments`,
      icon: TrendingUp,
    },
    {
      title: "Transactions",
      value: payments.length.toString(),
      description:
        "All recorded payments",
      icon: Receipt,
    },
    {
      title: "Average Payment",
      value: `${formatAmount(
        averagePayment
      )} EGP`,
      description:
        "Average successful transaction",
      icon: Users,
    },
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#022859]"
            >
              <ArrowLeft size={17} />
              Dashboard
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
                <CreditCard size={23} />
              </div>

              <div>
                <h1 className="text-3xl font-extrabold text-[#022859]">
                  Payments
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Track payments, revenue, and
                  transaction status.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setRecordPaymentOpen(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
          >
            <CreditCard size={18} />
            Record Payment
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
                    <Icon size={21} />
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-slate-300"
                  />
                </div>

                <p className="mt-5 text-sm font-semibold text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#022859]">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Payments Table */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#022859]">
                  Payment Transactions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review and manage recorded
                  payments.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search member..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10 sm:w-64"
                  />
                </div>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as
                        | "All"
                        | PaymentStatus
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 outline-none focus:border-[#022859] focus:bg-white"
                >
                  {statusOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option === "All"
                          ? "All Statuses"
                          : option}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4">
                    Member
                  </th>

                  <th className="px-6 py-4">
                    Description
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Method
                  </th>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.map(
                  (payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#022859] text-sm font-extrabold text-[#F2EA79]">
                            {payment.member
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <span className="text-sm font-bold text-[#022859]">
                            {payment.member}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {payment.description}
                      </td>

                      <td className="px-6 py-4 text-sm font-extrabold text-[#022859]">
                        {formatAmount(
                          payment.amount
                        )}{" "}
                        EGP
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">
                        {payment.method}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {payment.date}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            payment.status ===
                            "Paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : payment.status ===
                                  "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : payment.status ===
                                    "Refunded"
                                  ? "bg-slate-100 text-slate-600"
                                  : "bg-red-50 text-red-700"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {payment.status ===
                        "Pending" ? (
                          <button
                            type="button"
                            onClick={() =>
                              updatePaymentStatus(
                                payment.id,
                                "Paid"
                              )
                            }
                            className="rounded-lg bg-[#022859] px-3 py-2 text-xs font-bold text-[#F2EA79] transition hover:opacity-90"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="p-12 text-center">
              <Receipt
                size={28}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-lg font-extrabold text-[#022859]">
                No payments found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or
                status filter.
              </p>
            </div>
          )}
        </div>
      </div>

      <RecordPaymentModal
        open={recordPaymentOpen}
        onClose={() =>
          setRecordPaymentOpen(false)
        }
      />
    </>
  );
}