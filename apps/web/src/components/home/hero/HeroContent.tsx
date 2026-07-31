import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";

interface HeroContentProps {
  data: {
    badge: string;
    title: {
      line1: string;
      line2: string;
      highlight: string;
    };
    description: string;
    buttons: readonly {
      label: string;
      href: string;
      variant: "primary" | "secondary";
      icon: React.ElementType;
    }[];
  };
}

export default function HeroContent({ data }: HeroContentProps) {
  return (
    <div className="max-w-3xl">
      <HeroBadge text={data.badge} />

      <h1 className="mt-8 font-cairo text-5xl font-black leading-tight tracking-tight text-white md:text-7xl xl:text-8xl">
        {data.title.line1}
        <br />
        {data.title.line2}
        <br />
        <span className="text-[#F2EA79]">
          {data.title.highlight}
        </span>
      </h1>

      <p className="mt-8 max-w-2xl font-tajawal text-lg leading-8 text-slate-300 md:text-xl">
        {data.description}
      </p>

      <HeroButtons buttons={data.buttons} />
    </div>
  );
}