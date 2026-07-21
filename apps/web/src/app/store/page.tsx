import {
  StoreHero,
  Categories,
  FeaturedProducts,
} from "@/components/store";

export default function StorePage() {
  return (
    <main>
      <StoreHero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
}