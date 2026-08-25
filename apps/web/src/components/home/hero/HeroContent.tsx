import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";

interface HeroContentProps {
  data: {
    badge: string;

    title: {
      line1: string;
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

export default function HeroContent({
  data,
}: HeroContentProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left">
      <HeroBadge text={data.badge} />

      <h1 className="mt-8 font-cairo text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
        <span className="text-[#F2EA79]">
          {data.title.line1}
        </span>

        <br />

        <span className="text-[#F2EA79]">
          {data.title.highlight}
        </span>
      </h1>

      <p className="mt-8 max-w-3xl font-tajawal text-lg leading-8 text-slate-300 sm:text-xl">
        {data.description}
      </p>

      <HeroButtons buttons={data.buttons} />
    </div>
  );
}