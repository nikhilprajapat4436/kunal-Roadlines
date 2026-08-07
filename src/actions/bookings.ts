"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Booking from "@/models/Booking";
import { getSession } from "@/lib/auth";

export interface ActionResult {
  success: boolean;
  error?: string;
}

type BookingStatus = "pending" | "confirmed" | "in-transit" | "delivered" | "cancelled";

interface BookingData {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company?: string;
  serviceType: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: Date;
  deliveryDate?: Date;
  cargoType: string;
  weight: string;
  vehicleType?: string;
  status: BookingStatus;
  amount?: number;
  notes?: string;
}

function generateBookingNumber(): string {
  const date = new Date();
  const y = date.getFullYear().toString().slice(-2);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `KR-${y}${m}${d}-${random}`;
}

function buildBookingData(formData: FormData): BookingData {
  return {
    bookingNumber:
      (formData.get("bookingNumber") as string) || generateBookingNumber(),
    customerName: formData.get("customerName") as string,
    customerEmail: formData.get("customerEmail") as string,
    customerPhone: formData.get("customerPhone") as string,
    company: (formData.get("company") as string) || undefined,
    serviceType: formData.get("serviceType") as string,
    pickupLocation: formData.get("pickupLocation") as string,
    dropLocation: formData.get("dropLocation") as string,
    pickupDate: new Date(formData.get("pickupDate") as string),
    deliveryDate: formData.get("deliveryDate")
      ? new Date(formData.get("deliveryDate") as string)
      : undefined,
    cargoType: formData.get("cargoType") as string,
    weight: formData.get("weight") as string,
    vehicleType: (formData.get("vehicleType") as string) || undefined,
    status: ((formData.get("status") as string) || "pending") as BookingStatus,
    amount: formData.get("amount")
      ? Number(formData.get("amount"))
      : undefined,
    notes: (formData.get("notes") as string) || undefined,
  };
}

// Get all bookings
export async function getBookings() {
  const session = await getSession();
  if (!session) return [];

  await connectToDatabase();
  const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
  return bookings.map((b) => ({
    ...b,
    _id: b._id.toString(),
    pickupDate: b.pickupDate?.toISOString(),
    deliveryDate: b.deliveryDate?.toISOString(),
    createdAt: b.createdAt?.toISOString(),
    updatedAt: b.updatedAt?.toISOString(),
  }));
}

// Get single booking
export async function getBooking(id: string) {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const booking = await Booking.findById(id).lean();
  if (!booking) return null;

  return {
    ...booking,
    _id: booking._id.toString(),
    pickupDate: booking.pickupDate?.toISOString(),
    deliveryDate: booking.deliveryDate?.toISOString(),
    createdAt: booking.createdAt?.toISOString(),
    updatedAt: booking.updatedAt?.toISOString(),
  };
}

// Create booking
export async function createBooking(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const data = buildBookingData(formData);

  if (
    !data.customerName ||
    !data.customerEmail ||
    !data.customerPhone ||
    !data.serviceType ||
    !data.pickupLocation ||
    !data.dropLocation ||
    !data.cargoType ||
    !data.weight
  ) {
    return { success: false, error: "Required fields are missing" };
  }

  try {
    await connectToDatabase();
    await Booking.create(data);
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return {
        success: false,
        error: "A booking with this number already exists",
      };
    }
    return { success: false, error: err.message || "Failed to create booking" };
  }
}

// Update booking
export async function updateBooking(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const id = formData.get("id") as string;
  if (!id) return { success: false, error: "Booking ID is required" };

  const data = buildBookingData(formData);

  try {
    await connectToDatabase();
    await Booking.findByIdAndUpdate(id, data, { runValidators: true });
    revalidatePath("/admin/bookings");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return {
        success: false,
        error: "A booking with this number already exists",
      };
    }
    return { success: false, error: err.message || "Failed to update booking" };
  }
}

// Update booking status only
export async function updateBookingStatus(
  id: string,
  status: BookingStatus
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  try {
    await connectToDatabase();
    await Booking.findByIdAndUpdate(id, { status }, { runValidators: true });
    revalidatePath("/admin/bookings");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { message?: string };
    return { success: false, error: err.message || "Failed to update status" };
  }
}

// Delete booking
export async function deleteBooking(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const id = formData.get("id") as string;
  if (!id) return;

  await connectToDatabase();
  await Booking.findByIdAndDelete(id);
  revalidatePath("/admin/bookings");
}