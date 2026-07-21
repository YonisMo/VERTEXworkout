import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const categories = [
  {
    title: "Training Equipment",
    image: "/products/training-equipment.jpg",
  },
  {
    title: "Apparel",
    image: "/products/apparel.jpg",
  },
  {
    title: "Swimming",
    image: "/products/swimming.jpg",
  },
  {
    title: "Protection",
    image: "/products/protection.jpg",
  },
  {
    title: "Bags",
    image: "/products/bags.jpg",
  },
  {
    title: "VERTEX Innovation",
    image: "/products/innovation.jpg",
  },
];

export default function Categories() {
  return (
    <section className="bg-slate-50 py-24">

      <Container>

        <SectionTitle
          badge="Categories"
          title="Shop by Category"
          subtitle="Explore all VERTEXworkout product categories designed for athletes and professionals."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <div
              key={category.title}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-8">

                <h3 className="text-3xl font-bold text-[#022859] transition group-hover:text-[#d9c84e]">
                  {category.title}
                </h3>

              </div>
            </div>
          ))}

        </div>

      </Container>

    </section>
  );
}