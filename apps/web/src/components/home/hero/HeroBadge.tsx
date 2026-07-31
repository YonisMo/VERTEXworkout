import { Sparkles } from "lucide-react";

interface HeroBadgeProps {
  text: string;
}

export default function HeroBadge({ text }: HeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#F2EA79]/30 bg-white/10 px-5 py-2 backdrop-blur-md">
      <Sparkles className="h-4 w-4 text-[#F2EA79]" />

      <span className="font-tajawal text-sm font-semibold tracking-wide text-[#F2EA79]">
        {text}
      </span>
    </div>
  );
}