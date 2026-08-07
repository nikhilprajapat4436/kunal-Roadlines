"use client";

import {
  Area,
  AreaChart,
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

interface ChartData {
  name: string;
  value: number;
}

interface DashboardChartsProps {
  bookingTrend: ChartData[];
  statusDistribution: ChartData[];
  serviceDistribution: ChartData[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  "in-transit": "#06b6d4",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

const SERVICE_COLORS = [
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

export function DashboardCharts({
  bookingTrend,
  statusDistribution,
  serviceDistribution,
}: DashboardChartsProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Booking Trend Chart */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">
          Booking Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={bookingTrend}>
              <defs>
                <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.4)"
                fontSize={12}
              />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#bookingGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">
          Booking Status
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
              >
                {statusDistribution.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={STATUS_COLORS[entry.name] || "#3b82f6"}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {statusDistribution.map((entry) => (
            <span
              key={entry.name}
              className="flex items-center gap-1.5 text-xs text-white/60"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: STATUS_COLORS[entry.name] || "#3b82f6" }}
              />
              {entry.name} ({entry.value})
            </span>
          ))}
        </div>
      </div>

      {/* Service Distribution */}
      <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-6">
          Bookings by Service Type
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                stroke="rgba(255,255,255,0.4)"
                fontSize={12}
              />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {serviceDistribution.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={SERVICE_COLORS[index % SERVICE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}