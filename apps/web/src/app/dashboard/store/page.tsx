"use client";

import {
BarChart3,
Package,
ShoppingBag,
Tags,
TrendingUp,
AlertTriangle,
} from "lucide-react";

import {
useStoreStore,
type OrderStatus,
} from "@/store/storeStore";

export default function StoreDashboardPage() {
const products = useStoreStore((state) => state.products);
const orders = useStoreStore((state) => state.orders);

const totalProducts = products.length;
const totalOrders = orders.length;

const totalRevenue = orders.reduce(
(total, order) => total + order.amount,
0
);

const lowStockProducts = products.filter(
(product) => product.status === "Low Stock"
);

const outOfStockProducts = products.filter(
(product) => product.status === "Out of Stock"
);

const inStockProducts = products.filter(
(product) => product.status === "In Stock"
);

const totalInventoryProducts = products.length;

const inStockPercentage =
totalInventoryProducts > 0
? Math.round(
(inStockProducts.length / totalInventoryProducts) * 100
)
: 0;

const lowStockPercentage =
totalInventoryProducts > 0
? Math.round(
(lowStockProducts.length / totalInventoryProducts) * 100
)
: 0;

const outOfStockPercentage =
totalInventoryProducts > 0
? Math.round(
(outOfStockProducts.length / totalInventoryProducts) * 100
)
: 0;

const recentOrders = orders
.slice()
.sort((a, b) => b.id - a.id)
.slice(0, 6);

return ( <main className="space-y-10"> <header className="flex flex-col gap-2"> <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
Store </h1>

    <p className="max-w-2xl text-slate-500">
      Manage products, inventory, orders, and store performance.
    </p>
  </header>

  <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    <StoreStatCard
      title="Total Products"
      value={String(totalProducts)}
      description="Products in catalog"
      icon={<Package size={28} />}
      color="#022859"
    />

    <StoreStatCard
      title="Total Orders"
      value={String(totalOrders)}
      description="Orders in store"
      icon={<ShoppingBag size={28} />}
      color="#0F766E"
    />

    <StoreStatCard
      title="Revenue"
      value={`$${totalRevenue}`}
      description="Total recorded revenue"
      icon={<TrendingUp size={28} />}
      color="#15803D"
    />

    <StoreStatCard
      title="Low Stock"
      value={String(lowStockProducts.length)}
      description="Products need attention"
      icon={<AlertTriangle size={28} />}
      color="#DC2626"
    />
  </section>

  <section className="grid gap-8 xl:grid-cols-2">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#022859]">
            Sales Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Store sales performance
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2EA79] text-[#022859]">
          <BarChart3 size={24} />
        </div>
      </div>

      <div className="flex h-[260px] items-end gap-4">
        {[45, 60, 52, 75, 68, 88, 96].map(
          (height, index) => (
            <div
              key={index}
              className="flex flex-1 flex-col items-center gap-3"
            >
              <div className="flex h-[220px] w-full items-end">
                <div
                  className="w-full rounded-t-xl bg-[#022859] transition-all duration-300 hover:bg-[#F2EA79]"
                  style={{
                    height: `${height}%`,
                  }}
                />
              </div>

              <span className="text-xs font-medium text-slate-400">
                {
                  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                    index
                  ]
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#022859]">
            Inventory Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current inventory status
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2EA79] text-[#022859]">
          <Tags size={24} />
        </div>
      </div>

      <div className="space-y-5">
        <InventoryRow
          label="In Stock"
          value={String(inStockProducts.length)}
          percentage={inStockPercentage}
          className="bg-green-500"
        />

        <InventoryRow
          label="Low Stock"
          value={String(lowStockProducts.length)}
          percentage={lowStockPercentage}
          className="bg-yellow-400"
        />

        <InventoryRow
          label="Out of Stock"
          value={String(outOfStockProducts.length)}
          percentage={outOfStockPercentage}
          className="bg-red-500"
        />
      </div>
    </div>
  </section>

  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#022859]">
          Recent Orders
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest store orders and transactions
        </p>
      </div>

      <button
        type="button"
        className="w-fit rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] transition hover:opacity-90"
      >
        View All Orders
      </button>
    </div>

    {recentOrders.length === 0 ? (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-sm font-medium text-slate-500">
          No orders available.
        </p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
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
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <OrderRow
                key={order.id}
                order={order.orderNumber}
                customer={order.customer}
                product={order.product}
                amount={`$${order.amount}`}
                status={order.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>

  <section>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-[#022859]">
        Quick Actions
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Quickly manage your store.
      </p>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StoreAction
        title="Add Product"
        description="Create a new product"
        icon={<Package size={24} />}
      />

      <StoreAction
        title="Products"
        description="Manage your catalog"
        icon={<Tags size={24} />}
      />

      <StoreAction
        title="Orders"
        description="Manage customer orders"
        icon={<ShoppingBag size={24} />}
      />

      <StoreAction
        title="Analytics"
        description="View store performance"
        icon={<BarChart3 size={24} />}
      />
    </div>
  </section>
</main>

);
}

type StoreStatCardProps = {
title: string;
value: string;
description: string;
icon: React.ReactNode;
color: string;
};

function StoreStatCard({
title,
value,
description,
icon,
color,
}: StoreStatCardProps) {
return ( <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"> <div className="flex items-start justify-between gap-4"> <div className="min-w-0"> <p className="text-sm font-semibold text-slate-500">
{title} </p>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#022859]">
        {value}
      </h2>

      <p className="mt-2 text-sm font-medium text-slate-500">
        {description}
      </p>
    </div>

    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {icon}
    </div>
  </div>
</div>

);
}

type InventoryRowProps = {
label: string;
value: string;
percentage: number;
className: string;
};

function InventoryRow({
label,
value,
percentage,
className,
}: InventoryRowProps) {
return ( <div> <div className="mb-2 flex items-center justify-between"> <span className="text-sm font-semibold text-slate-700">
{label} </span>

    <span className="text-sm font-bold text-[#022859]">
      {value}
    </span>
  </div>

  <div className="h-3 overflow-hidden rounded-full bg-slate-100">
    <div
      className={`h-full rounded-full ${className}`}
      style={{
        width: `${percentage}%`,
      }}
    />
  </div>

  <p className="mt-1 text-right text-xs text-slate-400">
    {percentage}%
  </p>
</div>

);
}

type OrderRowProps = {
order: string;
customer: string;
product: string;
amount: string;
status: OrderStatus;
};

function OrderRow({
order,
customer,
product,
amount,
status,
}: OrderRowProps) {
const statusStyles: Record<OrderStatus, string> = {
Completed:
"border-green-200 bg-green-100 text-green-700",
Processing:
"border-blue-200 bg-blue-100 text-blue-700",
Pending:
"border-yellow-200 bg-yellow-100 text-yellow-700",
};

return ( <tr className="border-b border-slate-100 transition hover:bg-slate-50"> <td className="px-4 py-5 text-sm font-bold text-[#022859]">
{order} </td>

  <td className="px-4 py-5 text-sm font-medium text-slate-700">
    {customer}
  </td>

  <td className="px-4 py-5 text-sm text-slate-600">
    {product}
  </td>

  <td className="px-4 py-5 text-sm font-bold text-[#022859]">
    {amount}
  </td>

  <td className="px-4 py-5">
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[status]}`}
    >
      {status}
    </span>
  </td>
</tr>

);
}

type StoreActionProps = {
title: string;
description: string;
icon: React.ReactNode;
};

function StoreAction({
title,
description,
icon,
}: StoreActionProps) {
return ( <button
   type="button"
   className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F2EA79] hover:bg-[#FFFBE5] hover:shadow-md"
 > <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#022859] text-white transition-all duration-300 group-hover:bg-[#F2EA79] group-hover:text-[#022859]">
{icon} </div>

  <div>
    <h3 className="font-bold text-[#022859]">
      {title}
    </h3>

    <p className="mt-1 text-sm text-slate-500">
      {description}
    </p>
  </div>
</button>

);
}
