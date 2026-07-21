import { ProductService } from "@/services/product.service";

export function useProducts() {

  return {

    products: ProductService.getAll(),

    featured: ProductService.getFeatured(),

    bestSellers: ProductService.getBestSellers(),

    newProducts: ProductService.getNewProducts(),

  };

}