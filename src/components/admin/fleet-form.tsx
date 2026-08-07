"use client";

import { useActionState } from "react";
import { Loader2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createFleetVehicle, updateFleetVehicle, type ActionResult } from "@/actions/fleet";

const initialState: ActionResult = { success: false };

interface FleetFormProps {
  vehicle?: {
    _id: string;
    name: string;
    type: string;
    capacity: string;
    registrationNumber: string;
    status: string;
    driverName?: string;
    driverPhone?: string;
    imageUrl?: string;
    location?: string;
    lastServiceDate?: string;
    nextServiceDate?: string;
    notes?: string;
  } | null;
  onClose: () => void;
}

const VEHICLE_TYPES = [
  { value: "mini-truck", label: "Mini Truck" },
  { value: "lcv", label: "Light Commercial Vehicle" },
  { value: "mhv", label: "Medium Heavy Vehicle" },
  { value: "flatbed-trailer", label: "Flatbed Trailer" },
  { value: "reefer", label: "Reefer Truck" },
  { value: "container-trailer", label: "Container Trailer" },
];

const STATUSES = [
  { value: "available", label: "Available" },
  { value: "in-transit", label: "In Transit" },
  { value: "maintenance", label: "Maintenance" },
  { value: "out-of-service", label: "Out of Service" },
];

export function FleetForm({ vehicle, onClose }: FleetFormProps) {
  const [state, formAction, isPending] = useActionState(
    vehicle ? updateFleetVehicle : createFleetVehicle,
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
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {vehicle ? "Edit Vehicle" : "Add New Vehicle"}
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
          {vehicle && <input type="hidden" name="id" value={vehicle._id} />}

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                Vehicle Name *
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={vehicle?.name}
                placeholder="e.g. Tata 407"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber" className="text-white/80">
                Registration Number *
              </Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                defaultValue={vehicle?.registrationNumber}
                placeholder="e.g. HR-55-AB-1234"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-white/80">
                Vehicle Type *
              </Label>
              <select
                id="type"
                name="type"
                defaultValue={vehicle?.type}
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors focus:border-blue-500/50 focus:outline-none"
                required
              >
                <option value="" className="bg-slate-900">Select type</option>
                {VEHICLE_TYPES.map((type) => (
                  <option key={type.value} value={type.value} className="bg-slate-900">
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity" className="text-white/80">
                Capacity *
              </Label>
              <Input
                id="capacity"
                name="capacity"
                defaultValue={vehicle?.capacity}
                placeholder="e.g. 5 Tonnes"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-white/80">
                Status
              </Label>
              <select
                id="status"
                name="status"
                defaultValue={vehicle?.status || "available"}
                className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors focus:border-blue-500/50 focus:outline-none"
              >
                {STATUSES.map((status) => (
                  <option key={status.value} value={status.value} className="bg-slate-900">
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-white/80">
                Current Location
              </Label>
              <Input
                id="location"
                name="location"
                defaultValue={vehicle?.location}
                placeholder="e.g. Delhi NCR"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="driverName" className="text-white/80">
                Driver Name
              </Label>
              <Input
                id="driverName"
                name="driverName"
                defaultValue={vehicle?.driverName}
                placeholder="Driver name"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="driverPhone" className="text-white/80">
                Driver Phone
              </Label>
              <Input
                id="driverPhone"
                name="driverPhone"
                defaultValue={vehicle?.driverPhone}
                placeholder="+91 XXXXX XXXXX"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="lastServiceDate" className="text-white/80">
                Last Service Date
              </Label>
              <Input
                id="lastServiceDate"
                name="lastServiceDate"
                type="date"
                defaultValue={vehicle?.lastServiceDate?.split("T")[0]}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextServiceDate" className="text-white/80">
                Next Service Date
              </Label>
              <Input
                id="nextServiceDate"
                name="nextServiceDate"
                type="date"
                defaultValue={vehicle?.nextServiceDate?.split("T")[0]}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white/80">
              Vehicle Image URL
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={vehicle?.imageUrl}
              placeholder="https://example.com/truck.jpg"
              className={inputClass}
            />
            <p className="text-xs text-white/40">
              Paste a URL to a truck image (Pexels, Unsplash, etc.)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white/80">
              Notes
            </Label>
            <Textarea
              id="notes"
              name="notes"
              defaultValue={vehicle?.notes}
              placeholder="Additional notes about this vehicle"
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
                  {vehicle ? "Update Vehicle" : "Add Vehicle"}
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