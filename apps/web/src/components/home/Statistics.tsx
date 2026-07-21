import Container from "@/components/ui/Container";

const stats = [
  {
    number: "1000+",
    title: "Members",
  },
  {
    number: "500+",
    title: "Training Programs",
  },
  {
    number: "150+",
    title: "Exercises",
  },
  {
    number: "24/7",
    title: "Online Support",
  },
];

export default function Statistics() {
  return (
    <section className="bg-[#022859] py-24">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="group rounded-3xl border border-[#F2EA79]/20 bg-white/5 p-10 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#F2EA79]/50 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="text-5xl font-extrabold text-[#F2EA79] transition-transform duration-300 group-hover:scale-110 md:text-6xl">
                {stat.number}
              </div>

              <div className="mt-5 text-lg font-semibold tracking-wide text-white md:text-xl">
                {stat.title}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}