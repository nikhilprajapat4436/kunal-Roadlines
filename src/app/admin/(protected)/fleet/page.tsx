import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Fleet from "@/models/Fleet";
import { FleetClient } from "@/components/admin/fleet-client";

export const metadata: Metadata = {
  title: "Fleet Management",
  description: "Manage your fleet vehicles",
};

export default async function AdminFleetPage() {
  await requireAdmin();

  await connectToDatabase();
  const vehicles = await Fleet.find().sort({ createdAt: -1 }).lean();

  const serializedVehicles = vehicles.map((v) => ({
    _id: v._id.toString(),
    name: v.name,
    type: v.type,
    capacity: v.capacity,
    registrationNumber: v.registrationNumber,
    status: v.status,
    driverName: v.driverName,
    driverPhone: v.driverPhone,
    imageUrl: v.imageUrl,
    location: v.location,
    lastServiceDate: v.lastServiceDate?.toISOString(),
    nextServiceDate: v.nextServiceDate?.toISOString(),
    notes: v.notes,
  }));

  return <FleetClient vehicles={serializedVehicles} />;
}