import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import Booking from "@/models/Booking";
import Fleet from "@/models/Fleet";
import ContactMessage from "@/models/ContactMessage";
import { DashboardCharts } from "@/components/admin/dashboard-charts";
import {
  ArrowRight,
  CalendarClock,
  MessageSquare,
  Package,
  ShieldCheck,
  Truck,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Kunal Roadlines admin dashboard",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "in-transit": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default async function AdminDashboardPage() {
  const session = await requireAdmin();

  await connectToDatabase();
  const [admin, bookings, fleetCount, newMessages] = await Promise.all([
    Admin.findById(session.adminId),
    Booking.find().sort({ createdAt: -1 }).limit(5).lean(),
    Fleet.countDocuments(),
    ContactMessage.countDocuments({ status: "new" }),
  ]);

  // Calculate stats
  const totalBookings = await Booking.countDocuments();
  const activeBookings = await Booking.countDocuments({
    status: { $in: ["pending", "confirmed", "in-transit"] },
  });

  // Chart data - last 7 days booking trend
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      name: date.toLocaleDateString("en-IN", { weekday: "short" }),
      date: date.toISOString().split("T")[0],
    };
  });

  const bookingTrend = await Promise.all(
    last7Days.map(async (day) => {
      const start = new Date(day.date);
      const end = new Date(day.date);
      end.setDate(end.getDate() + 1);
      const count = await Booking.countDocuments({
        createdAt: { $gte: start, $lt: end },
      });
      return { name: day.name, value: count };
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

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings.toString(),
      icon: Package,
      description: "All time bookings",
      color: "text-blue-400 bg-blue-500/10",
    },
    {
      label: "Active Bookings",
      value: activeBookings.toString(),
      icon: Truck,
      description: "In progress",
      color: "text-cyan-400 bg-cyan-500/10",
    },
    {
      label: "Fleet Vehicles",
      value: fleetCount.toString(),
      icon: ShieldCheck,
      description: "In operation",
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "New Messages",
      value: newMessages.toString(),
      icon: MessageSquare,
      description: "Awaiting response",
      color: "text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome back, {session.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-2 text-white/60">
            Here's what's happening with your logistics today.
          </p>
        </div>
        <Link
          href="/admin/bookings"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-colors"
        >
          New Booking
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-white/70">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-white/40">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <DashboardCharts
        bookingTrend={bookingTrend}
        statusDistribution={statusDistribution}
        serviceDistribution={serviceDistribution}
      />

      {/* Recent Bookings */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
          <Link
            href="/admin/bookings"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 mx-auto text-white/20" />
            <p className="mt-4 text-white/50">No bookings yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 border-b border-white/10">
                  <th className="pb-3 pr-4 font-medium">Booking #</th>
                  <th className="pb-3 pr-4 font-medium">Customer</th>
                  <th className="pb-3 pr-4 font-medium">Route</th>
                  <th className="pb-3 pr-4 font-medium">Pickup Date</th>
                  <th className="pb-3 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id.toString()}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium text-white">
                      {booking.bookingNumber}
                    </td>
                    <td className="py-3 pr-4 text-white/70">
                      {booking.customerName}
                    </td>
                    <td className="py-3 pr-4 text-white/70">
                      {booking.pickupLocation} → {booking.dropLocation}
                    </td>
                    <td className="py-3 pr-4 text-white/70">
                      {new Date(booking.pickupDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                          STATUS_STYLES[booking.status] || ""
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Info */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            Admin Profile
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-xl font-bold">
                {session.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <p className="font-semibold text-white">{session.name}</p>
                <p className="text-sm text-white/50">{session.email}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Account Status</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Role</span>
                <span className="text-white/80">Administrator</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Last Login</span>
                <span className="text-white/80">
                  {admin?.lastLoginAt
                    ? new Date(admin.lastLoginAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-cyan-400" />
            Quick Actions
          </h2>
          <div className="mt-6 space-y-3">
            {[
              { label: "Manage Fleet", href: "/admin/fleet", icon: Truck },
              { label: "View Bookings", href: "/admin/bookings", icon: Package },
              { label: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
              { label: "Company Settings", href: "/admin/settings", icon: ShieldCheck },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-white">
                      {action.label}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}