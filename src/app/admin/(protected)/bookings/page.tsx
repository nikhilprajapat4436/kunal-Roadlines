import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Booking from "@/models/Booking";
import { BookingsClient } from "@/components/admin/bookings-client";

export const metadata: Metadata = {
  title: "Booking Management",
  description: "Manage all bookings",
};

export default async function AdminBookingsPage() {
  await requireAdmin();

  await connectToDatabase();
  const bookings = await Booking.find().sort({ createdAt: -1 }).lean();

  const serializedBookings = bookings.map((b) => ({
    _id: b._id.toString(),
    bookingNumber: b.bookingNumber,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    company: b.company,
    serviceType: b.serviceType,
    pickupLocation: b.pickupLocation,
    dropLocation: b.dropLocation,
    pickupDate: b.pickupDate?.toISOString(),
    deliveryDate: b.deliveryDate?.toISOString(),
    cargoType: b.cargoType,
    weight: b.weight,
    vehicleType: b.vehicleType,
    status: b.status,
    amount: b.amount,
    notes: b.notes,
  }));

  return <BookingsClient bookings={serializedBookings} />;
}