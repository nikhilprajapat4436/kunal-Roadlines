import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import CompanySettings from "@/models/CompanySettings";
import { SettingsForm } from "@/components/admin/settings-form";

export const metadata: Metadata = {
  title: "Company Settings",
  description: "Manage company settings",
};

export default async function AdminSettingsPage() {
  await requireAdmin();

  await connectToDatabase();
  const settings = await CompanySettings.findOne().lean();

  const serializedSettings = settings
    ? {
        _id: settings._id.toString(),
        companyName: settings.companyName,
        tagline: settings.tagline,
        email: settings.email,
        phone: settings.phone,
        altPhone: settings.altPhone,
        address: settings.address,
        website: settings.website,
        established: settings.established,
        fleetSize: settings.fleetSize,
        employees: settings.employees,
        deliveryRate: settings.deliveryRate,
        description: settings.description,
        socialLinks: settings.socialLinks,
      }
    : null;

  return <SettingsForm settings={serializedSettings} />;
}