import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    sku: "VPB-005",
    slug: "vertex-power-bag-5kg",
    name: "VERTEX Power Bag 5 KG",

    shortDescription: "Functional Training Sand Bag",

    description:
      "Professional Power Bag made from heavy-duty nylon with reinforced handles. Perfect for Functional Training, CrossFit, HIIT and Strength Workouts.",

    category: "Power Bags",
    brand: "VERTEXworkout",

    badge: "NEW",

    price: 900,
    oldPrice: 1000,
    discount: 10,

    stock: 15,

    weight: "5 KG",
    size: "Small",
    color: "Black",

    featured: true,
    bestseller: true,
    isNew: true,

    rating: 4.9,
    reviews: 38,

    images: ["/products/powerbag5.jpg"],

    features: [
      "Heavy Duty Nylon",
      "Reinforced Handles",
      "Functional Training",
      "Indoor & Outdoor",
      "Lifetime Stitching",
    ],
  },

  {
    id: 2,
    sku: "VPB-010",
    slug: "vertex-power-bag-10kg",
    name: "VERTEX Power Bag 10 KG",

    shortDescription: "Functional Training Sand Bag",

    description:
      "Professional Power Bag for athletes and coaches.",

    category: "Power Bags",
    brand: "VERTEXworkout",

    badge: "BEST SELLER",

    price: 1100,
    oldPrice: 1250,
    discount: 12,

    stock: 20,

    weight: "10 KG",
    size: "Medium",
    color: "Black",

    featured: true,
    bestseller: true,
    isNew: false,

    rating: 5,
    reviews: 62,

    images: ["/products/powerbag10.jpg"],

    features: [
      "Heavy Duty Nylon",
      "Professional Handles",
      "Military Grade",
      "Functional Fitness",
      "Premium Quality",
    ],
  },

  {
    id: 3,
    sku: "VPB-015",
    slug: "vertex-power-bag-15kg",
    name: "VERTEX Power Bag 15 KG",

    shortDescription: "Professional Sand Bag",

    description:
      "Professional Functional Fitness Equipment.",

    category: "Power Bags",
    brand: "VERTEXworkout",

    badge: "HOT",

    price: 1350,
    oldPrice: 1500,
    discount: 10,

    stock: 10,

    weight: "15 KG",
    size: "Large",
    color: "Black",

    featured: true,
    bestseller: false,
    isNew: false,

    rating: 4.8,
    reviews: 41,

    images: ["/products/powerbag15.jpg"],

    features: [
      "Premium Nylon",
      "Multiple Grip Handles",
      "CrossFit",
      "Gym",
      "Outdoor",
    ],
  },

  {
    id: 4,
    sku: "VPB-020",
    slug: "vertex-power-bag-20kg",
    name: "VERTEX Power Bag 20 KG",

    shortDescription: "Elite Functional Training",

    description:
      "Designed for elite athletes and coaches.",

    category: "Power Bags",
    brand: "VERTEXworkout",

    badge: "PRO",

    price: 1600,
    oldPrice: 1800,
    discount: 11,

    stock: 8,

    weight: "20 KG",
    size: "XL",
    color: "Black",

    featured: true,
    bestseller: true,
    isNew: true,

    rating: 5,
    reviews: 74,

    images: ["/products/powerbag20.jpg"],

    features: [
      "Elite Build",
      "Heavy Duty",
      "Extreme Durability",
      "Competition Ready",
      "Professional Quality",
    ],
  },
];

export default products;