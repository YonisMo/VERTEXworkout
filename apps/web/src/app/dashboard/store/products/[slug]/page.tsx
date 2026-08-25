"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Package,
  Pencil,
  ShoppingBag,
  Trash2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import {
  useStoreStore,
  type ProductStatus,
  type StoreProduct,
} from "@/store/storeStore";

import AddProductModal from "@/components/dashboard/store/AddProductModal";

export default function StoreProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const products = useStoreStore((state) => state.products);
  const removeProduct = useStoreStore(
    (state) => state.removeProduct
  );

  const [editingProduct, setEditingProduct] =
    useState<StoreProduct | null>(null);

  const product = products.find(
    (item) => item.slug === slug
  );

  const handleDelete = () => {
    if (!product) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to remove "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    removeProduct(product.id);
    router.push("/dashboard/store/products");
  };

  if (!product) {
    return (
      <main className="space-y-6">
        <Link
          href="/dashboard/store/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#022859] transition hover:opacity-70"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <XCircle size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-[#022859]">
            Product Not Found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            The product you are looking for does not exist or
            may have been removed.
          </p>

          <Link
            href="/dashboard/store/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] transition hover:opacity-90"
          >
            <Package size={18} />
            View Products
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <main className="space-y-8">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/dashboard/store/products"
              className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#022859]"
            >
              <ArrowLeft size={17} />
              Back to Products
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#022859] text-[#F2EA79]">
                <Package size={27} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-slate-400">
                  Product Details
                </p>

                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#022859]">
                  {product.name}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  SKU: {product.sku}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                setEditingProduct(product)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-[#022859] shadow-sm transition hover:border-[#022859] hover:bg-[#022859] hover:text-white"
            >
              <Pencil size={18} />
              Edit Product
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <ProductInfoCard
            title="Price"
            value={`EGP ${product.price.toLocaleString(
              "en-US"
            )}`}
            icon={<ShoppingBag size={22} />}
            iconClassName="bg-[#022859] text-[#F2EA79]"
          />

          <ProductInfoCard
            title="Stock"
            value={product.stock.toLocaleString("en-US")}
            icon={<Package size={22} />}
            iconClassName="bg-green-100 text-green-700"
          />

          <ProductInfoCard
            title="Category"
            value={product.category}
            icon={<ShoppingBag size={22} />}
            iconClassName="bg-yellow-100 text-yellow-700"
          />

          <ProductInfoCard
            title="Status"
            value={product.status}
            icon={getStatusIcon(product.status)}
            iconClassName={getStatusIconClass(
              product.status
            )}
          />
        </section>

        <div className="grid gap-6 xl:grid-cols-3">
          <section className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#022859]">
                Product Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Detailed information about this product.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <InfoItem
                label="Product Name"
                value={product.name}
              />

              <InfoItem
                label="SKU"
                value={product.sku}
              />

              <InfoItem
                label="Category"
                value={product.category}
              />

              <InfoItem
                label="Brand"
                value={product.brand}
              />

              <InfoItem
                label="Price"
                value={`EGP ${product.price.toLocaleString(
                  "en-US"
                )}`}
              />

              {product.oldPrice !== undefined && (
                <InfoItem
                  label="Old Price"
                  value={`EGP ${product.oldPrice.toLocaleString(
                    "en-US"
                  )}`}
                />
              )}

              {product.discount !== undefined && (
                <InfoItem
                  label="Discount"
                  value={`${product.discount}%`}
                />
              )}

              <InfoItem
                label="Stock"
                value={product.stock.toLocaleString(
                  "en-US"
                )}
              />

              {product.weight && (
                <InfoItem
                  label="Weight"
                  value={product.weight}
                />
              )}

              {product.size && (
                <InfoItem
                  label="Size"
                  value={product.size}
                />
              )}

              {product.color && (
                <InfoItem
                  label="Color"
                  value={product.color}
                />
              )}

              <InfoItem
                label="Slug"
                value={product.slug}
              />
            </div>

            <div className="mt-8 border-t border-slate-200 pt-6">
              <h3 className="text-lg font-bold text-[#022859]">
                Short Description
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {product.shortDescription}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#022859]">
                Description
              </h3>

              <p className="mt-2 leading-7 text-slate-600">
                {product.description}
              </p>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#022859]">
                Product Status
              </h2>

              <div className="mt-5">
                <ProductStatusBadge
                  status={product.status}
                />
              </div>

              <div className="mt-5 space-y-4">
                <StatusLine
                  label="Featured"
                  active={product.featured}
                />

                <StatusLine
                  label="Bestseller"
                  active={product.bestseller}
                />

                <StatusLine
                  label="New Product"
                  active={product.isNew}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#022859]">
                Reviews
              </h2>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-4xl font-extrabold text-[#022859]">
                  {product.rating}
                </span>

                <span className="pb-1 text-sm text-slate-500">
                  / 5
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Based on{" "}
                <span className="font-bold text-slate-700">
                  {product.reviews.toLocaleString(
                    "en-US"
                  )}
                </span>{" "}
                reviews
              </p>
            </section>

            {product.features.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#022859]">
                  Features
                </h2>

                <ul className="mt-5 space-y-3">
                  {product.features.map(
                    (feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 shrink-0 text-green-600"
                        />

                        <span>{feature}</span>
                      </li>
                    )
                  )}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </main>

      <AddProductModal
        open={editingProduct !== null}
        product={editingProduct}
        onClose={() =>
          setEditingProduct(null)
        }
      />
    </>
  );
}

type ProductInfoCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconClassName: string;
};

function ProductInfoCard({
  title,
  value,
  icon,
  iconClassName,
}: ProductInfoCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 truncate text-xl font-extrabold text-[#022859]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconClassName}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

type StatusLineProps = {
  label: string;
  active: boolean;
};

function StatusLine({
  label,
  active,
}: StatusLineProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-semibold text-slate-600">
        {label}
      </span>

      {active ? (
        <CheckCircle2
          size={20}
          className="text-green-600"
        />
      ) : (
        <XCircle
          size={20}
          className="text-slate-300"
        />
      )}
    </div>
  );
}

function getStatusIcon(
  status: ProductStatus
) {
  if (status === "In Stock") {
    return <CheckCircle2 size={22} />;
  }

  if (status === "Low Stock") {
    return <AlertTriangle size={22} />;
  }

  return <XCircle size={22} />;
}

function getStatusIconClass(
  status: ProductStatus
) {
  if (status === "In Stock") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Low Stock") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-red-100 text-red-700";
}

type ProductStatusBadgeProps = {
  status: ProductStatus;
};

function ProductStatusBadge({
  status,
}: ProductStatusBadgeProps) {
  const styles: Record<
    ProductStatus,
    string
  > = {
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