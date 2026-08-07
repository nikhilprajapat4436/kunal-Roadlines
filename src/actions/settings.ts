"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import CompanySettings from "@/models/CompanySettings";
import { getSession } from "@/lib/auth";

export interface ActionResult {
  success: boolean;
  error?: string;
}

// Get company settings
export async function getCompanySettings() {
  const session = await getSession();
  if (!session) return null;

  await connectToDatabase();
  const settings = await CompanySettings.findOne().lean();
  if (!settings) return null;

  return {
    ...settings,
    _id: settings._id.toString(),
    updatedAt: settings.updatedAt?.toISOString(),
  };
}

// Update company settings
export async function updateCompanySettings(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  const data = {
    companyName: formData.get("companyName") as string,
    tagline: (formData.get("tagline") as string) || "",
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    altPhone: (formData.get("altPhone") as string) || "",
    address: formData.get("address") as string,
    website: (formData.get("website") as string) || "",
    established: formData.get("established")
      ? Number(formData.get("established"))
      : undefined,
    fleetSize: formData.get("fleetSize")
      ? Number(formData.get("fleetSize"))
      : 0,
    employees: formData.get("employees")
      ? Number(formData.get("employees"))
      : 0,
    deliveryRate: (formData.get("deliveryRate") as string) || "",
    description: (formData.get("description") as string) || "",
    socialLinks: {
      facebook: (formData.get("facebook") as string) || "",
      instagram: (formData.get("instagram") as string) || "",
      twitter: (formData.get("twitter") as string) || "",
      linkedin: (formData.get("linkedin") as string) || "",
    },
  };

  if (!data.companyName || !data.email || !data.phone || !data.address) {
    return { success: false, error: "Required fields are missing" };
  }

  try {
    await connectToDatabase();
    const existing = await CompanySettings.findOne();
    if (existing) {
      await CompanySettings.findByIdAndUpdate(existing._id, data, {
        runValidators: true,
      });
    } else {
      await CompanySettings.create(data);
    }
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error: unknown) {
    const err = error as { message?: string };
    return { success: false, error: err.message || "Failed to update settings" };
  }
}