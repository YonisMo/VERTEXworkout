import products from "@/data/store/products";

export const ProductService = {

  getAll() {
    return products;
  },

  getFeatured() {
    return products.filter((product) => product.featured);
  },

  getBestSellers() {
    return products.filter((product) => product.bestseller);
  },

  getNewProducts() {
    return products.filter((product) => product.isNew);
  },

  getBySlug(slug: string) {
    return products.find((product) => product.slug === slug);
  },

  getByCategory(category: string) {
    return products.filter(
      (product) => product.category === category
    );
  },

  search(keyword: string) {
    return products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  },

};