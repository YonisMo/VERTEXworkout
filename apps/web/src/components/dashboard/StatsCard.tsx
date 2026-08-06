import { ReactNode } from "react";

type StatsCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  color?: string;
  change?: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  color = "#022859",
  change,
}: StatsCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-extrabold text-[#022859]">
            {value}
          </h2>

          {change && (
            <p className="mt-3 text-sm font-medium text-emerald-600">
              {change}
            </p>
          )}
        </div>

        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-white transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}