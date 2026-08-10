"use client";

import { create } from "zustand";

export type ProductStatus =
  | "In Stock"
  | "Low Stock"
  | "Out of Stock";

export type OrderStatus =
  | "Completed"
  | "Processing"
  | "Pending";

export type StoreProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
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

type StoreState = {
  products: StoreProduct[];
  orders: StoreOrder[];

  addProduct: (
    product: Omit<StoreProduct, "id" | "status">
  ) => void;

  updateProduct: (
    id: number,
    updates: Partial<Omit<StoreProduct, "id">>
  ) => void;

  removeProduct: (id: number) => void;

  addOrder: (
    order: Omit<StoreOrder, "id">
  ) => void;

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

const initialProducts: StoreProduct[] = [
  {
    id: 1,
    name: "VERTEX Power Bag 5kg",
    category: "Power Bags",
    price: 35,
    stock: 24,
    status: "In Stock",
  },
  {
    id: 2,
    name: "VERTEX Power Bag 10kg",
    category: "Power Bags",
    price: 65,
    stock: 18,
    status: "In Stock",
  },
  {
    id: 3,
    name: "VERTEX Power Bag 15kg",
    category: "Power Bags",
    price: 85,
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "VERTEX Power Bag 20kg",
    category: "Power Bags",
    price: 110,
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 5,
    name: "Training Bands Set",
    category: "Resistance Bands",
    price: 35,
    stock: 31,
    status: "In Stock",
  },
  {
    id: 6,
    name: "Functional Training Rope",
    category: "Training Equipment",
    price: 45,
    stock: 0,
    status: "Out of Stock",
  },
];

const initialOrders: StoreOrder[] = [
  {
    id: 1,
    orderNumber: "#ORD-1001",
    customer: "Ahmed Ali",
    product: "VERTEX Power Bag 15kg",
    amount: 85,
    status: "Completed",
    date: "2026-08-01",
  },
  {
    id: 2,
    orderNumber: "#ORD-1002",
    customer: "Mohamed Hassan",
    product: "VERTEX Power Bag 10kg",
    amount: 65,
    status: "Processing",
    date: "2026-08-02",
  },
  {
    id: 3,
    orderNumber: "#ORD-1003",
    customer: "Omar Khaled",
    product: "Training Bands Set",
    amount: 35,
    status: "Completed",
    date: "2026-08-03",
  },
  {
    id: 4,
    orderNumber: "#ORD-1004",
    customer: "Youssef Ahmed",
    product: "VERTEX Power Bag 20kg",
    amount: 110,
    status: "Pending",
    date: "2026-08-04",
  },
];

export const useStoreStore = create<StoreState>((set) => ({
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

      return {
        products: [
          ...state.products,
          {
            ...product,
            id: nextId,
            status: getProductStatus(
              product.stock
            ),
          },
        ],
      };
    }),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((product) => {
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
        };
      }),
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
      orders: state.orders.map((order) =>
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
}));