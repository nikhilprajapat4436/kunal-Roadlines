"use client";

import { useActionState } from "react";
import { Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking, updateBooking, type ActionResult } from "@/actions/bookings";

const initialState: ActionResult = { success: false };

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

interface BookingFormProps {
  booking?: Booking | null;
  onClose: () => void;
}

const SERVICE_TYPES = [
  { value: "full-truckload", label: "Full Truckload (FTL)" },
  { value: "ltl", label: "Less Than Truckload (LTL)" },
  { value: "cold-chain", label: "Cold Chain" },
  { value: "container", label: "Container Transport" },
  { value: "express", label: "Express Delivery" },
  { value: "warehousing", label: "Warehousing & 3PL" },
];

const STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "in-transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export function BookingForm({ booking, onClose }: BookingFormProps) {
  const [state, formAction, isPending] = useActionState(
    booking ? updateBooking : createBooking,
    initialState
  );

  const inputClass =
    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {booking ? `Edit Booking ${booking.bookingNumber}` : "New Booking"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form action={formAction} className="space-y-5">
          {booking && <input type="hidden" name="id" value={booking._id} />}
          {booking && (
            <input type="hidden" name="bookingNumber" value={booking.bookingNumber} />
          )}

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-white/80">
                Customer Name *
              </Label>
              <Input
                id="customerName"
                name="customerName"
                defaultValue={booking?.customerName}
                placeholder="Customer name"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone" className="text-white/80">
                Customer Phone *
              </Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                defaultValue={booking?.customerPhone}
                placeholder="+91 XXXXX XXXXX"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="customerEmail" className="text-white/80">
                Customer Email *
              </Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                type="email"
                defaultValue={booking?.customerEmail}
                placeholder="customer@email.com"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white/80">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                defaultValue={booking?.company}
                placeholder="Company name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="serviceType" className="text-white/80">
                Service Type *
              </Label>
              <select
                id="serviceType"
                name="serviceType"
                defaultValue={booking?.serviceType}
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors focus:border-blue-500/50 focus:outline-none"
                required
              >
                <option value="" className="bg-slate-900">Select service</option>
                {SERVICE_TYPES.map((service) => (
                  <option key={service.value} value={service.value} className="bg-slate-900">
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-white/80">
                Status
              </Label>
              <select
                id="status"
                name="status"
                defaultValue={booking?.status || "pending"}
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors focus:border-blue-500/50 focus:outline-none"
              >
                {STATUSES.map((status) => (
                  <option key={status.value} value={status.value} className="bg-slate-900">
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="pickupLocation" className="text-white/80">
                Pickup Location *
              </Label>
              <Input
                id="pickupLocation"
                name="pickupLocation"
                defaultValue={booking?.pickupLocation}
                placeholder="e.g. Delhi"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropLocation" className="text-white/80">
                Drop Location *
              </Label>
              <Input
                id="dropLocation"
                name="dropLocation"
                defaultValue={booking?.dropLocation}
                placeholder="e.g. Mumbai"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="pickupDate" className="text-white/80">
                Pickup Date *
              </Label>
              <Input
                id="pickupDate"
                name="pickupDate"
                type="date"
                defaultValue={booking?.pickupDate?.split("T")[0]}
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate" className="text-white/80">
                Delivery Date
              </Label>
              <Input
                id="deliveryDate"
                name="deliveryDate"
                type="date"
                defaultValue={booking?.deliveryDate?.split("T")[0]}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="cargoType" className="text-white/80">
                Cargo Type *
              </Label>
              <Input
                id="cargoType"
                name="cargoType"
                defaultValue={booking?.cargoType}
                placeholder="e.g. General Goods"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-white/80">
                Weight *
              </Label>
              <Input
                id="weight"
                name="weight"
                defaultValue={booking?.weight}
                placeholder="e.g. 5 Tonnes"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="vehicleType" className="text-white/80">
                Vehicle Type
              </Label>
              <Input
                id="vehicleType"
                name="vehicleType"
                defaultValue={booking?.vehicleType}
                placeholder="e.g. Flatbed Trailer"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white/80">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                defaultValue={booking?.amount}
                placeholder="e.g. 25000"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white/80">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={booking?.notes}
              placeholder="Additional notes about this booking"
              rows={3}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50"
            />
          </div>

          {state?.error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400">{state.error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {booking ? "Update Booking" : "Create Booking"}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-full border-white/10 text-white/60 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}