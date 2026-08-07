import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin";
import { ProfileForm } from "@/components/admin/profile-form";

export const metadata: Metadata = {
  title: "Admin Profile",
  description: "Manage your admin profile",
};

export default async function AdminProfilePage() {
  const session = await requireAdmin();

  await connectToDatabase();
  const admin = await Admin.findById(session.adminId).lean();

  const serializedAdmin = admin
    ? {
        _id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLoginAt: admin.lastLoginAt?.toISOString(),
        createdAt: admin.createdAt?.toISOString(),
      }
    : null;

  return <ProfileForm admin={serializedAdmin} />;
}