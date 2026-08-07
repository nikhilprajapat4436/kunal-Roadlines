"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface BookingDetailsProps {
  booking: Booking;
  onClose: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "in-transit": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const SERVICE_LABELS: Record<string, string> = {
  "full-truckload": "Full Truckload (FTL)",
  ltl: "Less Than Truckload (LTL)",
  "cold-chain": "Cold Chain",
  container: "Container Transport",
  express: "Express Delivery",
  warehousing: "Warehousing & 3PL",
};

export function BookingDetails({ booking, onClose }: BookingDetailsProps) {
  const formatDate = (date?: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const details = [
    { label: "Booking Number", value: booking.bookingNumber },
    { label: "Customer", value: booking.customerName },
    { label: "Email", value: booking.customerEmail },
    { label: "Phone", value: booking.customerPhone },
    { label: "Company", value: booking.company || "—" },
    {
      label: "Service Type",
      value: SERVICE_LABELS[booking.serviceType] || booking.serviceType,
    },
    { label: "Pickup Location", value: booking.pickupLocation },
    { label: "Drop Location", value: booking.dropLocation },
    { label: "Pickup Date", value: formatDate(booking.pickupDate) },
    { label: "Delivery Date", value: formatDate(booking.deliveryDate) },
    { label: "Cargo Type", value: booking.cargoType },
    { label: "Weight", value: booking.weight },
    { label: "Vehicle Type", value: booking.vehicleType || "—" },
    {
      label: "Amount",
      value: booking.amount ? `₹${booking.amount.toLocaleString("en-IN")}` : "—",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              Booking Details
            </h2>
            <p className="mt-1 text-sm text-white/50">
              {booking.bookingNumber}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Status badge */}
        <div className="mb-6">
          <span
            className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium border ${
              STATUS_STYLES[booking.status] || ""
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* Details grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <p className="text-xs text-white/40">{detail.label}</p>
              <p className="mt-1 text-sm font-medium text-white">
                {detail.value}
              </p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-white/40">Notes</p>
            <p className="mt-1 text-sm text-white/80">{booking.notes}</p>
          </div>
        )}

        <div className="mt-6">
          <Button
            onClick={onClose}
            className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}