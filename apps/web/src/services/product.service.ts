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
    return products.find(
      (product) => product.slug === slug
    );
  },

  getById(id: number) {
    return products.find(
      (product) => product.id === id
    );
  },

  getByCategory(category: string) {
    return products.filter(
      (product) => product.category === category
    );
  },

  getCategories() {
    return [...new Set(products.map((p) => p.category))];
  },

  search(keyword: string) {
    const value = keyword.toLowerCase().trim();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.brand.toLowerCase().includes(value)
    );
  },

  getRelated(productId: number, category: string) {
    return products
      .filter(
        (product) =>
          product.id !== productId &&
          product.category === category
      )
      .slice(0, 4);
  },
};