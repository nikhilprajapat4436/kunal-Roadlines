"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Edit, Plus, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FleetForm } from "@/components/admin/fleet-form";
import { deleteFleetVehicle } from "@/actions/fleet";

interface Vehicle {
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
}

interface FleetClientProps {
  vehicles: Vehicle[];
}

const STATUS_STYLES: Record<string, string> = {
  available: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "in-transit": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  maintenance: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "out-of-service": "bg-red-500/10 text-red-400 border-red-500/20",
};

const TYPE_LABELS: Record<string, string> = {
  "mini-truck": "Mini Truck",
  lcv: "Light Commercial Vehicle",
  mhv: "Medium Heavy Vehicle",
  "flatbed-trailer": "Flatbed Trailer",
  reefer: "Reefer Truck",
  "container-trailer": "Container Trailer",
};

export function FleetClient({ vehicles }: FleetClientProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete vehicle "${name}"? This action cannot be undone.`)) {
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    await deleteFleetVehicle(formData);
    toast.success("Vehicle deleted successfully");
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setEditingVehicle(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">
            Fleet Management
          </h1>
          <p className="mt-2 text-white/60">
            Manage your fleet of {vehicles.length} vehicles
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Vehicle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: vehicles.length, color: "text-blue-400" },
          {
            label: "Available",
            value: vehicles.filter((v) => v.status === "available").length,
            color: "text-emerald-400",
          },
          {
            label: "In Transit",
            value: vehicles.filter((v) => v.status === "in-transit").length,
            color: "text-cyan-400",
          },
          {
            label: "Maintenance",
            value: vehicles.filter((v) => v.status === "maintenance").length,
            color: "text-amber-400",
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

      {/* Vehicle Grid */}
      {vehicles.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-white/5 border border-white/10">
          <Truck className="h-16 w-16 mx-auto text-white/20" />
          <h3 className="mt-4 text-lg font-semibold text-white">
            No vehicles yet
          </h3>
          <p className="mt-2 text-white/50">
            Add your first vehicle to start managing your fleet.
          </p>
          <Button
            onClick={handleAdd}
            className="mt-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/30 transition-colors"
            >
              {/* Image */}
              <div className="relative h-40 bg-slate-800">
                {vehicle.imageUrl ? (
                  <Image
                    src={vehicle.imageUrl}
                    alt={vehicle.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Truck className="h-12 w-12 text-white/20" />
                  </div>
                )}
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    STATUS_STYLES[vehicle.status] || ""
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-white">{vehicle.name}</h3>
                    <p className="mt-1 text-sm text-white/50">
                      {TYPE_LABELS[vehicle.type] || vehicle.type} ·{" "}
                      {vehicle.capacity}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Registration</span>
                    <span className="text-white/80">
                      {vehicle.registrationNumber}
                    </span>
                  </div>
                  {vehicle.driverName && (
                    <div className="flex justify-between">
                      <span className="text-white/40">Driver</span>
                      <span className="text-white/80">
                        {vehicle.driverName}
                      </span>
                    </div>
                  )}
                  {vehicle.location && (
                    <div className="flex justify-between">
                      <span className="text-white/40">Location</span>
                      <span className="text-white/80">{vehicle.location}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-5 pt-4 border-t border-white/10 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 rounded-full border-white/10 text-white/60 hover:text-white"
                  >
                    <Edit className="mr-1.5 h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(vehicle._id, vehicle.name)}
                    className="flex-1 rounded-full border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <FleetForm
          vehicle={editingVehicle}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}