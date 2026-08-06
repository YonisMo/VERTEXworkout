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
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#022859]">
          Members Growth
        </h2>

        <p className="mt-2 text-slate-500">
          Monthly registered members
        </p>
      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={membersData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748B" }}
            />

            <YAxis
              tick={{ fill: "#64748B" }}
            />

            <Tooltip />

            <Bar
              dataKey="members"
              fill="#022859"
              radius={[10, 10, 0, 0]}
              animationDuration={1200}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}