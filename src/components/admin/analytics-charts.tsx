"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
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

interface AnalyticsChartsProps {
  monthlyBookings: { name: string; bookings: number }[];
  monthlyRevenue: { name: string; revenue: number }[];
  statusDistribution: ChartData[];
  serviceDistribution: ChartData[];
  fleetDistribution: ChartData[];
  messageDistribution: ChartData[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#3b82f6",
  "in-transit": "#06b6d4",
  delivered: "#10b981",
  cancelled: "#ef4444",
  available: "#10b981",
  maintenance: "#f59e0b",
  "out-of-service": "#ef4444",
  new: "#f59e0b",
  read: "#3b82f6",
  replied: "#10b981",
  archived: "#64748b",
};

const SERVICE_COLORS = [
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
];

const tooltipStyle = {
  background: "#1e293b",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
};

export function AnalyticsCharts({
  monthlyBookings,
  monthlyRevenue,
  statusDistribution,
  serviceDistribution,
  fleetDistribution,
  messageDistribution,
}: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      {/* Bookings & Revenue Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Monthly Bookings
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyBookings}>
                <defs>
                  <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3b82f6"
                  fill="url(#bookingsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Monthly Revenue (₹)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Status & Service Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Booking Status Distribution
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
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  wrapperStyle={{ color: "#fff", fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Bookings by Service
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
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

      {/* Fleet & Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Fleet Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={fleetDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {fleetDistribution.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#3b82f6"}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ color: "#fff", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-6">
            Message Status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={messageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: "#8b5cf6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}