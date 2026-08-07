import type { Metadata } from "next";
import { redirectIfAuthenticated } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Login to Kunal Roadlines admin dashboard",
};

export default async function AdminLoginPage() {
  await redirectIfAuthenticated();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-600/20 blur-3xl animate-pulse-glow" />

      <div className="relative w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  );
}