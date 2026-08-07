import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Booking from "@/models/Booking";
import Fleet from "@/models/Fleet";
import ContactMessage from "@/models/ContactMessage";
import { AnalyticsCharts } from "@/components/admin/analytics-charts";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Business analytics and insights",
};

export default async function AdminAnalyticsPage() {
  await requireAdmin();

  await connectToDatabase();

  // Monthly booking trend (last 6 months)
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    return {
      name: date.toLocaleDateString("en-IN", { month: "short" }),
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  });

  const monthlyBookings = await Promise.all(
    months.map(async (m) => {
      const start = new Date(m.year, m.month, 1);
      const end = new Date(m.year, m.month + 1, 1);
      const count = await Booking.countDocuments({
        createdAt: { $gte: start, $lt: end },
      });
      return { name: m.name, bookings: count };
    })
  );

  // Revenue by month (from delivered bookings with amounts)
  const monthlyRevenue = await Promise.all(
    months.map(async (m) => {
      const start = new Date(m.year, m.month, 1);
      const end = new Date(m.year, m.month + 1, 1);
      const bookings = await Booking.find({
        createdAt: { $gte: start, $lt: end },
        amount: { $exists: true, $ne: null },
      }).lean();
      const total = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
      return { name: m.name, revenue: total };
    })
  );

  // Status distribution
  const statuses = [
    "pending",
    "confirmed",
    "in-transit",
    "delivered",
    "cancelled",
  ] as const;
  const statusDistribution = await Promise.all(
    statuses.map(async (status) => ({
      name: status,
      value: await Booking.countDocuments({ status }),
    }))
  );

  // Service distribution
  const services = [
    "full-truckload",
    "ltl",
    "cold-chain",
    "container",
    "express",
    "warehousing",
  ];
  const serviceDistribution = await Promise.all(
    services.map(async (service) => ({
      name: service.replace("-", " "),
      value: await Booking.countDocuments({ serviceType: service }),
    }))
  );

  // Fleet status
  const fleetStatuses = [
    "available",
    "in-transit",
    "maintenance",
    "out-of-service",
  ] as const;
  const fleetDistribution = await Promise.all(
    fleetStatuses.map(async (status) => ({
      name: status,
      value: await Fleet.countDocuments({ status }),
    }))
  );

  // Message stats
  const messageStatuses = ["new", "read", "replied", "archived"] as const;
  const messageDistribution = await Promise.all(
    messageStatuses.map(async (status) => ({
      name: status,
      value: await ContactMessage.countDocuments({ status }),
    }))
  );

  // Summary stats
  const totalBookings = await Booking.countDocuments();
  const totalRevenue = await Booking.aggregate([
    { $match: { amount: { $exists: true, $ne: null } } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);
  const avgBookingValue = totalBookings > 0
    ? Math.round((totalRevenue[0]?.total || 0) / totalBookings)
    : 0;
  const deliveredRate = totalBookings > 0
    ? Math.round(
        ((await Booking.countDocuments({ status: "delivered" })) / totalBookings) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Analytics</h1>
        <p className="mt-2 text-white/60">
          Business insights and performance metrics
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: "Total Bookings",
            value: totalBookings.toString(),
            color: "text-blue-400",
          },
          {
            label: "Total Revenue",
            value: `₹${(totalRevenue[0]?.total || 0).toLocaleString("en-IN")}`,
            color: "text-emerald-400",
          },
          {
            label: "Avg Booking Value",
            value: `₹${avgBookingValue.toLocaleString("en-IN")}`,
            color: "text-cyan-400",
          },
          {
            label: "Delivery Rate",
            value: `${deliveredRate}%`,
            color: "text-amber-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-sm text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <AnalyticsCharts
        monthlyBookings={monthlyBookings}
        monthlyRevenue={monthlyRevenue}
        statusDistribution={statusDistribution}
        serviceDistribution={serviceDistribution}
        fleetDistribution={fleetDistribution}
        messageDistribution={messageDistribution}
      />
    </div>
  );
}