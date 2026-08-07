"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/admin/booking-form";
import { BookingDetails } from "@/components/admin/booking-details";
import { deleteBooking } from "@/actions/bookings";

interface Booking {
  _id: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  serviceType: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate?: string;
  deliveryDate?: string;
  cargoType: string;
  weight: string;
  vehicleType?: string;
  status: string;
  amount?: number;
  notes?: string;
}

interface BookingsClientProps {
  bookings: Booking[];
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "in-transit": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const SERVICE_LABELS: Record<string, string> = {
  "full-truckload": "Full Truckload",
  ltl: "Less Than Truckload",
  "cold-chain": "Cold Chain",
  container: "Container",
  express: "Express",
  warehousing: "Warehousing",
};

export function BookingsClient({ bookings }: BookingsClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);

  const handleDelete = async (id: string, bookingNumber: string) => {
    if (!confirm(`Delete booking "${bookingNumber}"? This action cannot be undone.`)) {
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    await deleteBooking(formData);
    toast.success("Booking deleted successfully");
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingBooking(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Booking Management
          </h1>
          <p className="mt-2 text-white/60">
            Manage all {bookings.length} bookings
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: "Total", value: bookings.length, color: "text-blue-400" },
          {
            label: "Pending",
            value: bookings.filter((b) => b.status === "pending").length,
            color: "text-amber-400",
          },
          {
            label: "Confirmed",
            value: bookings.filter((b) => b.status === "confirmed").length,
            color: "text-blue-400",
          },
          {
            label: "In Transit",
            value: bookings.filter((b) => b.status === "in-transit").length,
            color: "text-cyan-400",
          },
          {
            label: "Delivered",
            value: bookings.filter((b) => b.status === "delivered").length,
            color: "text-emerald-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-2xl bg-white/5 border border-white/10"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-sm text-white/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Bookings Table */}
      {bookings.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-white/50">No bookings yet</p>
          <Button
            onClick={handleAdd}
            className="mt-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Booking
          </Button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-white/40 border-b border-white/10">
                  <th className="p-4 font-medium">Booking #</th>
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Service</th>
                  <th className="p-4 font-medium">Route</th>
                  <th className="p-4 font-medium">Pickup Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-medium text-white">
                      {booking.bookingNumber}
                    </td>
                    <td className="p-4">
                      <p className="text-white/80">{booking.customerName}</p>
                      <p className="text-xs text-white/40">
                        {booking.customerPhone}
                      </p>
                    </td>
                    <td className="p-4 text-white/70">
                      {SERVICE_LABELS[booking.serviceType] || booking.serviceType}
                    </td>
                    <td className="p-4 text-white/70">
                      {booking.pickupLocation} → {booking.dropLocation}
                    </td>
                    <td className="p-4 text-white/70">
                      {booking.pickupDate
                        ? new Date(booking.pickupDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${
                          STATUS_STYLES[booking.status] || ""
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setViewingBooking(booking)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="View booking"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(booking)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          aria-label="Edit booking"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(booking._id, booking.bookingNumber)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                          aria-label="Delete booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <BookingForm
          booking={editingBooking}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Details Modal */}
      {viewingBooking && (
        <BookingDetails
          booking={viewingBooking}
          onClose={() => setViewingBooking(null)}
        />
      )}
    </div>
  );
}