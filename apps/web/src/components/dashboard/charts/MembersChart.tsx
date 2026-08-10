"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const membersData = [
  { month: "Jan", members: 40 },
  { month: "Feb", members: 55 },
  { month: "Mar", members: 70 },
  { month: "Apr", members: 82 },
  { month: "May", members: 94 },
  { month: "Jun", members: 112 },
];

export default function MembersChart() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#022859]">
          Members Growth
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Monthly registered members
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={membersData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(2, 40, 89, 0.04)",
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow:
                  "0 10px 25px rgba(15, 23, 42, 0.08)",
              }}
              formatter={(value) => [
                Number(value).toLocaleString(),
                "Members",
              ]}
            />

            <Bar
              dataKey="members"
              fill="#022859"
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}