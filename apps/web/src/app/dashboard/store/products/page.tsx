"use client";

import { useState } from "react";

import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  useStoreStore,
  type ProductStatus,
  type StoreProduct,
} from "@/store/storeStore";

export default function StoreProductsPage() {
  const products = useStoreStore((state) => state.products);
  const removeProduct = useStoreStore(
    (state) => state.removeProduct
  );

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.status.toLowerCase().includes(query)
    );
  });

  const handleRemoveProduct = (product: StoreProduct) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    removeProduct(product.id);
  };

  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79]">
              <Package size={25} />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#022859]">
                Products
              </h1>

              <p className="mt-1 text-slate-500">
                Manage your store products and inventory.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
        >
          <Plus size={18} />
          Add Product
        </button>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ProductSummaryCard
          title="Total Products"
          value={products.length}
          icon={<Package size={22} />}
          iconClassName="bg-[#022859] text-[#F2EA79]"
        />

        <ProductSummaryCard
          title="In Stock"
          value={
            products.filter(
              (product) => product.status === "In Stock"
            ).length
          }
          icon={<CheckCircle2 size={22} />}
          iconClassName="bg-green-100 text-green-700"
        />

        <ProductSummaryCard
          title="Low Stock"
          value={
            products.filter(
              (product) => product.status === "Low Stock"
            ).length
          }
          icon={<AlertTriangle size={22} />}
          iconClassName="bg-yellow-100 text-yellow-700"
        />

        <ProductSummaryCard
          title="Out of Stock"
          value={
            products.filter(
              (product) => product.status === "Out of Stock"
            ).length
          }
          icon={<XCircle size={22} />}
          iconClassName="bg-red-100 text-red-700"
        />
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#022859]">
              Product Catalog
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredProducts.length} product
              {filteredProducts.length === 1 ? "" : "s"} displayed
            </p>
          </div>

          <div className="relative w-full lg:max-w-md">
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
              placeholder="Search products..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-slate-500">
              <Package size={26} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-[#022859]">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Product
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Category
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Price
                  </th>

                  <th className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                    Stock
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
                {filteredProducts.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onRemove={handleRemoveProduct}
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

type ProductSummaryCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClassName: string;
};

function ProductSummaryCard({
  title,
  value,
  icon,
  iconClassName,
}: ProductSummaryCardProps) {
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

type ProductRowProps = {
  product: StoreProduct;
  onRemove: (product: StoreProduct) => void;
};

function ProductRow({
  product,
  onRemove,
}: ProductRowProps) {
  return (
    <tr className="border-b border-slate-100 transition hover:bg-slate-50">
      <td className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2EA79] text-[#022859]">
            <Package size={21} />
          </div>

          <div>
            <p className="font-bold text-[#022859]">
              {product.name}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              ID #{product.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-5 text-sm font-medium text-slate-600">
        {product.category}
      </td>

      <td className="px-4 py-5 text-sm font-bold text-[#022859]">
        ${product.price.toLocaleString("en-US")}
      </td>

      <td className="px-4 py-5 text-sm font-semibold text-slate-700">
        {product.stock.toLocaleString("en-US")}
      </td>

      <td className="px-4 py-5">
        <ProductStatusBadge status={product.status} />
      </td>

      <td className="px-4 py-5">
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#022859] hover:bg-[#022859] hover:text-white"
            aria-label={`Edit ${product.name}`}
          >
            <Pencil size={17} />
          </button>

          <button
            type="button"
            onClick={() => onRemove(product)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
            aria-label={`Delete ${product.name}`}
          >
            <Trash2 size={17} />
          </button>
        </div>
      </td>
    </tr>
  );
}

type ProductStatusBadgeProps = {
  status: ProductStatus;
};

function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  const styles: Record<ProductStatus, string> = {
    "In Stock":
      "border-green-200 bg-green-100 text-green-700",
    "Low Stock":
      "border-yellow-200 bg-yellow-100 text-yellow-700",
    "Out of Stock":
      "border-red-200 bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}