"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  DollarSign,
  Dumbbell,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useMembersStore } from "@/store/membersStore";
import { usePaymentsStore } from "@/store/paymentsStore";

const monthlyRevenue = [
  { month: "Apr", revenue: 18400 },
  { month: "May", revenue: 22100 },
  { month: "Jun", revenue: 24800 },
  { month: "Jul", revenue: 27900 },
  { month: "Aug", revenue: 31200 },
  { month: "Sep", revenue: 35600 },
];

const attendanceData = [
  { name: "Mon", attendance: 42 },
  { name: "Tue", attendance: 48 },
  { name: "Wed", attendance: 55 },
  { name: "Thu", attendance: 51 },
  { name: "Fri", attendance: 63 },
  { name: "Sat", attendance: 58 },
  { name: "Sun", attendance: 36 },
];

const programData = [
  { name: "Functional Training", value: 32 },
  { name: "Boxing Fitness", value: 22 },
  { name: "Swimming", value: 18 },
  { name: "Fat Burn", value: 15 },
  { name: "Kids Fitness", value: 8 },
  { name: "Other", value: 5 },
];

const PIE_COLORS = [
  "#022859",
  "#F2EA79",
  "#A68986",
  "#BFB8BA",
  "#55789D",
  "#7C8EA3",
];

type Period = "6M" | "3M" | "30D";

export default function AnalyticsPage() {
  const { members } = useMembersStore();
  const { payments } = usePaymentsStore();
  const [period, setPeriod] = useState<Period>("6M");

  const analytics = useMemo(() => {
    const paidPayments = payments.filter(
      (payment) => payment.status === "Paid",
    );

    const revenue = paidPayments.reduce(
      (total, payment) => total + payment.amount,
      0,
    );

    const activeMembers = members.filter(
      (member) => member.membership === "Active",
    ).length;

    const pendingMembers = members.filter(
      (member) => member.membership === "Pending",
    ).length;

    const averagePayment =
      paidPayments.length > 0 ? revenue / paidPayments.length : 0;

    return {
      revenue,
      activeMembers,
      pendingMembers,
      averagePayment,
      transactions: payments.length,
    };
  }, [members, payments]);

  const revenueData = useMemo(() => {
    if (period === "3M") {
      return monthlyRevenue.slice(-3);
    }

    if (period === "30D") {
      return [
        { month: "Week 1", revenue: 7600 },
        { month: "Week 2", revenue: 8400 },
        { month: "Week 3", revenue: 9200 },
        { month: "Week 4", revenue: 10400 },
      ];
    }

    return monthlyRevenue;
  }, [period]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#022859]">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your gym performance, members, attendance and revenue.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`EGP ${analytics.revenue.toLocaleString()}`}
          change="+12.5%"
          positive
          icon={DollarSign}
        />

        <StatCard
          title="Active Members"
          value={analytics.activeMembers.toString()}
          change="+8.2%"
          positive
          icon={Users}
        />

        <StatCard
          title="Attendance"
          value="72%"
          change="+5.4%"
          positive
          icon={Activity}
        />

        <StatCard
          title="Avg. Payment"
          value={`EGP ${Math.round(
            analytics.averagePayment,
          ).toLocaleString()}`}
          change="-2.1%"
          positive={false}
          icon={Dumbbell}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-[#022859]">
                Revenue Overview
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Revenue performance over time
              </p>
            </div>

            <div className="flex rounded-lg bg-gray-100 p-1">
              {(["6M", "3M", "30D"] as Period[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    period === item
                      ? "bg-white text-[#022859] shadow-sm"
                      : "text-gray-500 hover:text-[#022859]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis
                  tickFormatter={(value) =>
                    `${Math.round(value / 1000)}k`
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    `EGP ${Number(value).toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Bar
                  dataKey="revenue"
                  fill="#022859"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-semibold text-[#022859]">
              Members by Program
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Current member distribution
            </p>
          </div>

          <div className="mt-4 h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={programData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  innerRadius={48}
                  paddingAngle={2}
                >
                  {programData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Members"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {programData.map((program, index) => (
              <div
                key={program.name}
                className="flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        PIE_COLORS[index % PIE_COLORS.length],
                    }}
                  />
                  <span className="text-gray-600">{program.name}</span>
                </div>

                <span className="font-semibold text-[#022859]">
                  {program.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold text-[#022859]">
              Weekly Attendance
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Average check-ins per day
            </p>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip
                  formatter={(value) => [`${value}`, "Check-ins"]}
                />
                <Bar
                  dataKey="attendance"
                  fill="#F2EA79"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="font-semibold text-[#022859]">
              Performance Summary
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Key operational indicators
            </p>
          </div>

          <div className="space-y-4">
            <SummaryRow
              icon={Users}
              label="Total Members"
              value={members.length.toString()}
              detail={`${analytics.activeMembers} active`}
            />

            <SummaryRow
              icon={CalendarDays}
              label="Transactions"
              value={analytics.transactions.toString()}
              detail={`${analytics.pendingMembers} pending members`}
            />

            <SummaryRow
              icon={DollarSign}
              label="Paid Revenue"
              value={`EGP ${analytics.revenue.toLocaleString()}`}
              detail="Successful payments"
            />

            <SummaryRow
              icon={Activity}
              label="Attendance Rate"
              value="72%"
              detail="This month"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#022859]">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-[#022859]/10 p-3 text-[#022859]">
          <Icon size={20} />
        </div>
      </div>

      <div
        className={`mt-4 flex items-center gap-1 text-xs font-medium ${
          positive ? "text-green-600" : "text-red-500"
        }`}
      >
        {positive ? (
          <ArrowUpRight size={14} />
        ) : (
          <ArrowDownRight size={14} />
        )}

        <span>{change}</span>
        <span className="font-normal text-gray-400">
          vs previous period
        </span>
      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-[#022859]/10 p-2 text-[#022859]">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="mt-0.5 text-xs text-gray-400">{detail}</p>
        </div>
      </div>

      <p className="text-lg font-bold text-[#022859]">{value}</p>
    </div>
  );
}