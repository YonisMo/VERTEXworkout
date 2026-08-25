import Image from "next/image";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const categories = [
  {
    title: "Training Equipment",
    description:
      "Professional functional training equipment for strength, conditioning and athletic performance.",
    image: "/images/products/powerbag10.jpeg",
  },
  {
    title: "Apparel",
    description:
      "Premium sportswear designed for comfort, performance and everyday training.",
    image: "/images/products/sportsbag.jpeg",
  },
  {
    title: "Swimming",
    description:
      "Professional swimming gear and accessories for training and competition.",
    image: "/images/products/swimvest.jpeg",
  },
  {
    title: "Protection",
    description:
      "Protective equipment that enhances safety, stability and injury prevention.",
    image: "/images/products/swimvest.jpeg",
  },
  {
    title: "Bags",
    description:
      "High-quality sports bags for athletes, coaches and everyday fitness use.",
    image: "/images/products/runningbag.jpeg",
  },
  {
    title: "VERTEX Innovation",
    description:
      "Exclusive VERTEX products engineered to deliver innovative training solutions.",
    image: "/images/products/powerbag20.png",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#F5F3EE] py-24">
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
              className="group flex min-h-[470px] flex-col overflow-hidden rounded-2xl border border-[#E8D85A] bg-[#F2EA79] shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="mb-3 inline-flex w-fit rounded-full bg-[#022859] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#F2EA79]">
                  Professional Collection
                </span>

                <h3 className="text-2xl font-bold text-[#022859] transition group-hover:text-[#A68900]">
                  {category.title}
                </h3>

                <p className="mt-4 flex-1 text-[16px] leading-7 text-[#022859]/85">
                  {category.description}
                </p>

                <button
                  type="button"
                  className="mt-6 w-fit font-semibold text-[#022859] transition duration-300 group-hover:text-[#A68900]"
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}