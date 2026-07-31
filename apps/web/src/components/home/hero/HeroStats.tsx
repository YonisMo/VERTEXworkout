import Card from "@/components/ui/Card";

interface HeroStat {
  value: string;
  label: string;
  icon: React.ElementType;
}

interface HeroStatsProps {
  stats: readonly HeroStat[];
}

export default function HeroStats({
  stats,
}: HeroStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-5 lg:grid-cols-2 xl:grid-cols-2">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#F2EA79]/40 hover:bg-white/15"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F2EA79]/15">
              <Icon className="h-6 w-6 text-[#F2EA79]" />
            </div>

            <h3 className="font-cairo text-3xl font-black text-white">
              {stat.value}
            </h3>

            <p className="mt-2 font-tajawal text-sm font-medium text-slate-300">
              {stat.label}
            </p>
          </Card>
        );
      })}
    </div>
  );
}