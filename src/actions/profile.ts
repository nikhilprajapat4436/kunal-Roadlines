"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import { getSession } from "@/lib/auth";

export interface ActionResult {
  success: boolean;
  error?: string;
}

// Get admin profile
export async function getAdminProfile() {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const admin = await Admin.findById(session.adminId).lean();
  if (!admin) return null;

  return {
    _id: admin._id.toString(),
    name: admin.name,
    email: admin.email,
    role: admin.role,
    lastLoginAt: admin.lastLoginAt?.toISOString(),
    createdAt: admin.createdAt?.toISOString(),
    updatedAt: admin.updatedAt?.toISOString(),
  };
}

// Update admin profile
export async function updateAdminProfile(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { success: false, error: "Name and email are required" };
  }

  try {
    await connectToDatabase();
    await Admin.findByIdAndUpdate(
      session.adminId,
      { name, email },
      { runValidators: true }
    );
    revalidatePath("/admin/profile");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { code?: number; message?: string };
    if (err.code === 11000) {
      return { success: false, error: "This email is already in use" };
    }
    return { success: false, error: err.message || "Failed to update profile" };
  }
}