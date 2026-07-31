import Container from "@/components/ui/Container";

interface WhyHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export default function WhyHeader({
  badge,
  title,
  subtitle,
}: WhyHeaderProps) {
  return (
    <Container>
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-[#F2EA79]/40 bg-[#F2EA79]/10 px-5 py-2 font-tajawal text-sm font-bold uppercase tracking-[0.2em] text-[#022859]">
          {badge}
        </span>

        <h2 className="mt-8 font-cairo text-4xl font-black text-[#022859] md:text-5xl lg:text-6xl">
          {title}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl font-tajawal text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      </div>
    </Container>
  );
}