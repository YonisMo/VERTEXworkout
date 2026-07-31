import { ChevronDown } from "lucide-react";

export default function HeroScroll() {
  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
      <span className="mb-2 font-tajawal text-xs uppercase tracking-[0.3em] text-slate-400">
        Scroll
      </span>

      <ChevronDown className="h-6 w-6 animate-bounce text-[#F2EA79]" />
    </div>
  );
}