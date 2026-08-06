"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 6100 },
  { month: "Mar", revenue: 5800 },
  { month: "Apr", revenue: 7600 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 12500 },
];

export default function RevenueChart() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm">

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#022859]">
          Revenue Overview
        </h2>

        <p className="mt-2 text-slate-500">
          Monthly revenue performance
        </p>
      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={revenueData}>

            <defs>

              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#F2EA79"
                  stopOpacity={0.9}
                />

                <stop
                  offset="95%"
                  stopColor="#F2EA79"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

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

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#022859"
              strokeWidth={4}
              fill="url(#revenueGradient)"
              animationDuration={1200}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </section>
  );
}