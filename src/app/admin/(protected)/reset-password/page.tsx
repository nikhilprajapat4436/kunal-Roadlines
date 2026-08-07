import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { ResetPasswordForm } from "@/components/admin/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Change your admin password",
};

export default async function AdminResetPasswordPage() {
  await requireAdmin();

  return (
    <div className="max-w-lg mx-auto">
      <ResetPasswordForm />
    </div>
  );
}