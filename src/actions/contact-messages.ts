"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { getSession } from "@/lib/auth";

export interface ActionResult {
  success: boolean;
  error?: string;
}

type MessageStatus = "new" | "read" | "replied" | "archived";

// Get all contact messages
export async function getContactMessages() {
  const session = await getSession();
  if (!session) return [];

  await connectToDatabase();
  const messages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .lean();
  return messages.map((m) => ({
    ...m,
    _id: m._id.toString(),
    createdAt: m.createdAt?.toISOString(),
    updatedAt: m.updatedAt?.toISOString(),
  }));
}

// Get single contact message
export async function getContactMessage(id: string) {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const message = await ContactMessage.findById(id).lean();
  if (!message) return null;

  return {
    ...message,
    _id: message._id.toString(),
    createdAt: message.createdAt?.toISOString(),
    updatedAt: message.updatedAt?.toISOString(),
  };
}

// Update message status
export async function updateMessageStatus(
  id: string,
  status: MessageStatus
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  try {
    await connectToDatabase();
    await ContactMessage.findByIdAndUpdate(id, { status });
    revalidatePath("/admin/messages");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { message?: string };
    return { success: false, error: err.message || "Failed to update status" };
  }
}

// Delete contact message
export async function deleteContactMessage(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const id = formData.get("id") as string;
  if (!id) return;

  await connectToDatabase();
  await ContactMessage.findByIdAndDelete(id);
  revalidatePath("/admin/messages");
}