import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { MessagesClient } from "@/components/admin/messages-client";

export const metadata: Metadata = {
  title: "Contact Messages",
  description: "Manage contact form messages",
};

export default async function AdminMessagesPage() {
  await requireAdmin();

  await connectToDatabase();
  const messages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .lean();

  const serializedMessages = messages.map((m) => ({
    _id: m._id.toString(),
    name: m.name,
    email: m.email,
    phone: m.phone,
    company: m.company,
    service: m.service,
    message: m.message,
    status: m.status,
    createdAt: m.createdAt?.toISOString(),
  }));

  return <MessagesClient messages={serializedMessages} />;
}