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
    <div className={center ? "mb-16 text-center" : "mb-16"}>
      {badge && (
        <span className="inline-block rounded-full bg-[#022859] px-4 py-2 text-sm font-bold uppercase tracking-wider text-[#F2EA79]">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-extrabold text-[#022859] md:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}