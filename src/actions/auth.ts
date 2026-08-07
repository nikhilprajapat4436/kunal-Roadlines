"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import {
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getSession,
} from "@/lib/auth";
import { loginSchema, resetPasswordSchema } from "@/lib/auth-schemas";

export interface ActionResult {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// Ensure the default admin account exists
async function ensureDefaultAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME;

  if (!adminEmail || !adminPassword) {
    return;
  }

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({
      name: adminName || "Kunal Roadlines Admin",
      email: adminEmail,
      password: adminPassword,
    });
  }
}

export async function loginAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = loginSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await connectToDatabase();
    await ensureDefaultAdmin();

    const admin = await Admin.findOne({ email: validation.data.email }).select(
      "+password"
    );

    if (!admin || !admin.isActive) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      validation.data.password,
      admin.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Update last login
    admin.lastLoginAt = new Date();
    await admin.save();

    // Create session token
    const token = await createSessionToken({
      adminId: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setSessionCookie(token);

    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  revalidatePath("/admin/login");
  redirect("/admin/login");
}

export async function resetPasswordAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const rawData = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const validation = resetPasswordSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await connectToDatabase();

    const admin = await Admin.findById(session.adminId).select("+password");
    if (!admin) {
      return {
        success: false,
        error: "Admin account not found",
      };
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      validation.data.currentPassword,
      admin.password
    );

    if (!isCurrentPasswordValid) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    // Check if new password is same as current
    const isSamePassword = await bcrypt.compare(
      validation.data.newPassword,
      admin.password
    );

    if (isSamePassword) {
      return {
        success: false,
        error: "New password must be different from current password",
      };
    }

    // Update password (pre-save hook will hash it)
    admin.password = validation.data.newPassword;
    await admin.save();

    // Clear session so user must login again with new password
    await clearSessionCookie();

    revalidatePath("/admin/login");
    redirect("/admin/login");
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}