export interface Product {
  id: number;

  sku: string;

  slug: string;

  name: string;

  shortDescription: string;

  description: string;

  category: string;

  brand: string;

  badge: string;

  price: number;

  oldPrice?: number;

  discount?: number;

  stock: number;

  weight?: string;

  size?: string;

  color?: string;

  featured: boolean;

  bestseller: boolean;

  isNew: boolean;

  rating: number;

  reviews: number;

  images: string[];

  features: string[];

  // Future Ready

  tags?: string[];

  specifications?: Record<string, string>;

  createdAt?: string;

  updatedAt?: string;
}