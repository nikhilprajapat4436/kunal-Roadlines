"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Fleet from "@/models/Fleet";
import { getSession } from "@/lib/auth";

export interface ActionResult {
  success: boolean;
  error?: string;
}

type VehicleStatus = "available" | "in-transit" | "maintenance" | "out-of-service";

interface VehicleData {
  name: string;
  type: string;
  capacity: string;
  registrationNumber: string;
  status: VehicleStatus;
  driverName?: string;
  driverPhone?: string;
  imageUrl?: string;
  location?: string;
  lastServiceDate?: Date;
  nextServiceDate?: Date;
  notes?: string;
}

function buildVehicleData(formData: FormData): VehicleData {
  return {
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    capacity: formData.get("capacity") as string,
    registrationNumber: formData.get("registrationNumber") as string,
    status: ((formData.get("status") as string) || "available") as VehicleStatus,
    driverName: (formData.get("driverName") as string) || undefined,
    driverPhone: (formData.get("driverPhone") as string) || undefined,
    imageUrl: (formData.get("imageUrl") as string) || undefined,
    location: (formData.get("location") as string) || undefined,
    lastServiceDate: formData.get("lastServiceDate")
      ? new Date(formData.get("lastServiceDate") as string)
      : undefined,
    nextServiceDate: formData.get("nextServiceDate")
      ? new Date(formData.get("nextServiceDate") as string)
      : undefined,
    notes: (formData.get("notes") as string) || undefined,
  };
}

// Get all fleet vehicles
export async function getFleetVehicles() {
  const session = await getSession();
  if (!session) return [];

  await connectToDatabase();
  const vehicles = await Fleet.find().sort({ createdAt: -1 }).lean();
  return vehicles.map((v) => ({
    ...v,
    _id: v._id.toString(),
    createdAt: v.createdAt?.toISOString(),
    updatedAt: v.updatedAt?.toISOString(),
    lastServiceDate: v.lastServiceDate?.toISOString(),
    nextServiceDate: v.nextServiceDate?.toISOString(),
  }));
}

// Get single fleet vehicle
export async function getFleetVehicle(id: string) {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const vehicle = await Fleet.findById(id).lean();
  if (!vehicle) return null;

  return {
    ...vehicle,
    _id: vehicle._id.toString(),
    createdAt: vehicle.createdAt?.toISOString(),
    updatedAt: vehicle.updatedAt?.toISOString(),
    lastServiceDate: vehicle.lastServiceDate?.toISOString(),
    nextServiceDate: vehicle.nextServiceDate?.toISOString(),
  };
}

// Create fleet vehicle
export async function createFleetVehicle(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const data = buildVehicleData(formData);

  if (!data.name || !data.type || !data.capacity || !data.registrationNumber) {
    return { success: false, error: "Required fields are missing" };
  }

  try {
    await connectToDatabase();
    await Fleet.create(data);
    revalidatePath("/admin/fleet");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return {
        success: false,
        error: "A vehicle with this registration number already exists",
      };
    }
    return { success: false, error: err.message || "Failed to create vehicle" };
  }
}

// Update fleet vehicle
export async function updateFleetVehicle(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const id = formData.get("id") as string;
  if (!id) return { success: false, error: "Vehicle ID is required" };

  const data = buildVehicleData(formData);

  try {
    await connectToDatabase();
    await Fleet.findByIdAndUpdate(id, data, { runValidators: true });
    revalidatePath("/admin/fleet");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return {
        success: false,
        error: "A vehicle with this registration number already exists",
      };
    }
    return { success: false, error: err.message || "Failed to update vehicle" };
  }
}

// Delete fleet vehicle
export async function deleteFleetVehicle(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const id = formData.get("id") as string;
  if (!id) return;

  await connectToDatabase();
  await Fleet.findByIdAndDelete(id);
  revalidatePath("/admin/fleet");
}