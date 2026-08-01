type SectionTitleProps = {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
};

export default function SectionTitle({
  badge,
  title,
  subtitle,
  center = true,
}: SectionTitleProps) {
  return (
    <div
      className={`mb-16 flex flex-col ${
        center
          ? "items-center text-center"
          : "items-start text-left"
      }`}
    >
      {badge && (
        <span className="inline-flex items-center justify-center rounded-full bg-[#022859] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#F2EA79]">
          {badge}
        </span>
      )}

      <h2 className="mt-6 max-w-4xl font-cairo text-4xl font-extrabold leading-tight text-[#022859] md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}