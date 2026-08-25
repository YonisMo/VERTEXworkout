"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import products from "@/data/store/products";
import type { Product } from "@/types/product";

export type ProductStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

export type OrderStatus =
  | "Completed"
  | "Processing"
  | "Pending";

export type StoreProduct = Product & {
  status: ProductStatus;
};

export type StoreOrder = {
  id: number;
  orderNumber: string;
  customer: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

type AddProductInput = {
  name: string;
  category: string;
  price: number;
  stock: number;
};

type StoreState = {
  products: StoreProduct[];
  orders: StoreOrder[];

  addProduct: (product: AddProductInput) => void;

  updateProduct: (
    id: number,
    updates: Partial<Omit<StoreProduct, "id">>
  ) => void;

  removeProduct: (id: number) => void;

  addOrder: (order: Omit<StoreOrder, "id">) => void;

  updateOrderStatus: (
    id: number,
    status: OrderStatus
  ) => void;

  removeOrder: (id: number) => void;
};

function getProductStatus(stock: number): ProductStatus {
  if (stock <= 0) {
    return "Out of Stock";
  }

  if (stock <= 10) {
    return "Low Stock";
  }

  return "In Stock";
}

function createStoreProducts(): StoreProduct[] {
  return products.map((product) => ({
    ...product,
    status: getProductStatus(product.stock),
  }));
}

const initialProducts = createStoreProducts();

const initialOrders: StoreOrder[] = [
  {
    id: 1,
    orderNumber: "#ORD-1001",
    customer: "Ahmed Ali",
    product: "VERTEX Power Bag 15 KG",
    amount: 1350,
    status: "Completed",
    date: "2026-08-01",
  },
  {
    id: 2,
    orderNumber: "#ORD-1002",
    customer: "Mohamed Hassan",
    product: "VERTEX Power Bag 10 KG",
    amount: 1100,
    status: "Processing",
    date: "2026-08-02",
  },
  {
    id: 3,
    orderNumber: "#ORD-1003",
    customer: "Omar Khaled",
    product: "VERTEX Pro Swim Vest / Life Jacket",
    amount: 750,
    status: "Completed",
    date: "2026-08-03",
  },
  {
    id: 4,
    orderNumber: "#ORD-1004",
    customer: "Youssef Ahmed",
    product: "VERTEX Power Bag 20 KG",
    amount: 1600,
    status: "Pending",
    date: "2026-08-04",
  },
];

export const useStoreStore = create<StoreState>()(
  persist(
    (set) => ({
      products: initialProducts,

      orders: initialOrders,

      addProduct: (product) =>
        set((state) => {
          const nextId =
            state.products.length > 0
              ? Math.max(
                  ...state.products.map(
                    (item) => item.id
                  )
                ) + 1
              : 1;

          const slug = product.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

          const newProduct: StoreProduct = {
            id: nextId,
            sku: `VTX-${String(nextId).padStart(3, "0")}`,
            slug: `${slug}-${nextId}`,
            name: product.name,
            shortDescription: product.name,
            description: product.name,
            category: product.category,
            brand: "VERTEXworkout",
            badge: "NEW",
            price: product.price,
            stock: product.stock,
            featured: false,
            bestseller: false,
            isNew: true,
            rating: 0,
            reviews: 0,
            images: [],
            features: [],
            status: getProductStatus(product.stock),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          return {
            products: [
              ...state.products,
              newProduct,
            ],
          };
        }),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map(
            (product) => {
              if (product.id !== id) {
                return product;
              }

              const updatedProduct = {
                ...product,
                ...updates,
              };

              return {
                ...updatedProduct,
                status: getProductStatus(
                  updatedProduct.stock
                ),
                updatedAt:
                  new Date().toISOString(),
              };
            }
          ),
        })),

      removeProduct: (id) =>
        set((state) => ({
          products: state.products.filter(
            (product) => product.id !== id
          ),
        })),

      addOrder: (order) =>
        set((state) => {
          const nextId =
            state.orders.length > 0
              ? Math.max(
                  ...state.orders.map(
                    (item) => item.id
                  )
                ) + 1
              : 1;

          return {
            orders: [
              ...state.orders,
              {
                ...order,
                id: nextId,
              },
            ],
          };
        }),

      updateOrderStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map(
            (order) =>
              order.id === id
                ? {
                    ...order,
                    status,
                  }
                : order
          ),
        })),

      removeOrder: (id) =>
        set((state) => ({
          orders: state.orders.filter(
            (order) => order.id !== id
          ),
        })),
    }),
    {
      name: "vertexworkout-store",
      partialize: (state) => ({
        products: state.products,
        orders: state.orders,
      }),
    }
  )
);