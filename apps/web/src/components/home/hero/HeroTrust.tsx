interface HeroTrustProps {
  items: readonly string[];
}

export default function HeroTrust({
  items,
}: HeroTrustProps) {
  return (
    <div className="mt-16 border-t border-white/10 pt-8">
      <p className="mb-6 font-tajawal text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
        Trusted Ecosystem
      </p>

      <div className="flex flex-wrap items-center gap-4">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-tajawal text-sm font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-[#F2EA79]/40 hover:text-[#F2EA79]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}