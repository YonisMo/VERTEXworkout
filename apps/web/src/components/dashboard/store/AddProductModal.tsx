"use client";

import { FormEvent, useState } from "react";
import { X, Package, Plus, Pencil } from "lucide-react";

import {
  useStoreStore,
  type StoreProduct,
} from "@/store/storeStore";

type AddProductModalProps = {
  open: boolean;
  product: StoreProduct | null;
  onClose: () => void;
};

const categories = [
  "Power Bags",
  "Resistance Bands",
  "Training Equipment",
  "Swim Vests",
  "Running Bags",
  "Sports Bags",
];

export default function AddProductModal({
  open,
  product,
  onClose,
}: AddProductModalProps) {
  const addProduct = useStoreStore(
    (state) => state.addProduct
  );

  const updateProduct = useStoreStore(
    (state) => state.updateProduct
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState(
    categories[0]
  );
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const isEditing = product !== null;

  const handleClose = () => {
    setName("");
    setCategory(categories[0]);
    setPrice("");
    setStock("");
    onClose();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const numericPrice = Number(price);
    const numericStock = Number(stock);

    if (!trimmedName) {
      return;
    }

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice < 0
    ) {
      return;
    }

    if (
      !Number.isFinite(numericStock) ||
      numericStock < 0
    ) {
      return;
    }

    if (product) {
      updateProduct(product.id, {
        name: trimmedName,
        category,
        price: numericPrice,
        stock: numericStock,
      });
    } else {
      addProduct({
        name: trimmedName,
        category,
        price: numericPrice,
        stock: numericStock,
      });
    }

    handleClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#022859] text-[#F2EA79]">
              {isEditing ? (
                <Pencil size={21} />
              ) : (
                <Package size={21} />
              )}
            </div>

            <div>
              <h2
                id="product-modal-title"
                className="text-xl font-extrabold text-[#022859]"
              >
                {isEditing
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {isEditing
                  ? "Update product information and inventory."
                  : "Add a new product to your store."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-[#022859]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="product-name"
              className="mb-2 block text-sm font-bold text-[#022859]"
            >
              Product Name
            </label>

            <input
              id="product-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Example: VERTEX Power Bag 25kg"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            />
          </div>

          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block text-sm font-bold text-[#022859]"
            >
              Category
            </label>

            <select
              id="product-category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="product-price"
                className="mb-2 block text-sm font-bold text-[#022859]"
              >
                Price
              </label>

              <div className="relative">
                <input
                  id="product-price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  placeholder="900"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  EGP
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="product-stock"
                className="mb-2 block text-sm font-bold text-[#022859]"
              >
                Stock
              </label>

              <input
                id="product-stock"
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(event) =>
                  setStock(event.target.value)
                }
                placeholder="20"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-[#022859] focus:bg-white focus:ring-2 focus:ring-[#022859]/10"
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#022859] px-5 py-3 text-sm font-bold text-[#F2EA79] shadow-sm transition hover:opacity-90"
            >
              {isEditing ? (
                <Pencil size={18} />
              ) : (
                <Plus size={18} />
              )}

              {isEditing
                ? "Save Changes"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}