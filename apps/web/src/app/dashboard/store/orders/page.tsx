"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Package,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";

import {
  useStoreStore,
  type OrderStatus,
  type StoreOrder,
} from "@/store/storeStore";

export default function StoreOrdersPage() {
  const orders = useStoreStore((state) => state.orders);
  const updateOrderStatus = useStoreStore(
    (state) => state.updateOrderStatus
  );
  const removeOrder = useStoreStore(
    (state) => state.removeOrder
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | OrderStatus
  >("All");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders
      .filter((order) => {
        const matchesSearch =
          !query ||
          order.orderNumber
            .toLowerCase()
            .includes(query) ||
          order.customer
            .toLowerCase()
            .includes(query) ||
          order.product
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "All" ||
          order.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .slice()
      .sort((a, b) => b.id - a.id);
  }, [orders, search, statusFilter]);

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const handleStatusChange = (
    order: StoreOrder,
    status: OrderStatus
  ) => {
    updateOrderStatus(order.id, status);
  };

  const handleRemove = (order: StoreOrder) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${order.orderNumber}?`
    );

    if (!confirmed) {
      return;
    }

    removeOrder(order.id);
  };

  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-5">
        <Link
          href="/dashboard/store"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#022859]"
        >
          <ArrowLeft size={17} />
          Back to Store
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79]">
            <Package size={25} />
          </div>

          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
              Orders
            </h1>

            <p className="mt-1 text-slate-500">
              Manage customer orders and order status.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <OrderSummaryCard
          title="Total Orders"
          value={totalOrders}
          icon={<Package size={22} />}
          iconClassName="bg-[#022859] text-[#F2EA79]"
        />

        <OrderSummaryCard
          title="Completed"
          value={completedOrders}
          icon={<CheckCircle2 size={22} />}
          iconClassName="bg-green-100 text-green-700"
        />

        <OrderSummaryCard
          title="Processing"
          value={processingOrders}
          icon={<Clock3 size={22} />}
          iconClassName="bg-blue-100 text-blue-700"
        />

        <OrderSummaryCard
          title="Pending"
          value={pendingOrders}
          icon={<XCircle size={22} />}
          iconClassName="bg-yellow-100 text-yellow-700"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#022859]">
              Order Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredOrders.length} order
              {filteredOrders.length === 1 ? "" : "s"} displayed
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row xl:max-w-2xl">
            <div className="relative flex-1">
              <Search
                size={19}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search orders, customers, products..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as
                    | "All"
                    | OrderStatus
                )
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-500">
              <Package size={26} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#022859]">
              No orders found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or status filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Order
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Customer
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Amount
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <OrderTableRow
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    onRemove={handleRemove}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

type OrderSummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClassName: string;
};

function OrderSummaryCard({
  title,
  value,
  icon,
  iconClassName,
}: OrderSummaryCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#022859]">
            {value.toLocaleString("en-US")}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClassName}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

type OrderTableRowProps = {
  order: StoreOrder;
  onStatusChange: (
    order: StoreOrder,
    status: OrderStatus
  ) => void;
  onRemove: (order: StoreOrder) => void;
};

function OrderTableRow({
  order,
  onStatusChange,
  onRemove,
}: OrderTableRowProps) {
  const statusStyles: Record<OrderStatus, string> = {
    Completed:
      "border-green-200 bg-green-100 text-green-700",

    Processing:
      "border-blue-200 bg-blue-100 text-blue-700",

    Pending:
      "border-yellow-200 bg-yellow-100 text-yellow-700",
  };

  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-4 py-5">
        <p className="text-sm font-bold text-[#022859]">
          {order.orderNumber}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          ID #{order.id}
        </p>
      </td>

      <td className="px-4 py-5 text-sm font-semibold text-slate-700">
        {order.customer}
      </td>

      <td className="max-w-[260px] px-4 py-5 text-sm text-slate-600">
        {order.product}
      </td>

      <td className="px-4 py-5 text-sm font-extrabold text-[#022859]">
        ${order.amount.toLocaleString("en-US")}
      </td>

      <td className="px-4 py-5 text-sm font-medium text-slate-600">
        {order.date}
      </td>

      <td className="px-4 py-5">
        <select
          value={order.status}
          onChange={(event) =>
            onStatusChange(
              order,
              event.target.value as OrderStatus
            )
          }
          className={`rounded-full border px-3 py-2 text-xs font-bold outline-none ${statusStyles[order.status]}`}
          aria-label={`Change status for ${order.orderNumber}`}
        >
          <option value="Completed">Completed</option>
          <option value="Processing">Processing</option>
          <option value="Pending">Pending</option>
        </select>
      </td>

      <td className="px-4 py-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onRemove(order)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
            aria-label={`Delete ${order.orderNumber}`}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}