export interface Product {
  // Identity
  id: number;
  sku: string;
  slug: string;

  // Basic Information
  name: string;
  shortDescription: string;
  description: string;

  // Classification
  category: string;
  brand: string;
  badge: string;

  // Pricing
  price: number;
  oldPrice?: number;
  discount?: number;

  // Inventory
  stock: number;

  // Physical Information
  weight?: string;
  size?: string;
  color?: string;

  // Status
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;

  // Reviews
  rating: number;
  reviews: number;

  // Media
  images: string[];

  // Product Details
  features: string[];
  tags?: string[];
  specifications?: Record<string, string>;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
}