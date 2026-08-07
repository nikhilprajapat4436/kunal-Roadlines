"use client";

import { useActionState } from "react";
import { Loader2, Save, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAdminProfile, type ActionResult } from "@/actions/profile";

const initialState: ActionResult = { success: false };

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  lastLoginAt?: string;
  createdAt?: string;
}

interface ProfileFormProps {
  admin: Admin | null;
}

export function ProfileForm({ admin }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateAdminProfile,
    initialState
  );

  const inputClass =
    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50";

  const formatDate = (date?: string) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Admin Profile
        </h1>
        <p className="mt-2 text-white/60">
          Manage your admin account information
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-3xl font-bold shadow-lg shadow-blue-500/25">
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </span>
            <h2 className="mt-4 text-lg font-semibold text-white">
              {admin?.name}
            </h2>
            <p className="text-sm text-white/50">{admin?.email}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              {admin?.role || "admin"}
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Last Login</span>
              <span className="text-white/70">{formatDate(admin?.lastLoginAt)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">Member Since</span>
              <span className="text-white/70">{formatDate(admin?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-blue-400" />
            Edit Profile
          </h2>

          <form action={formAction} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={admin?.name}
                placeholder="Your full name"
                className={inputClass}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={admin?.email}
                placeholder="admin@kunalroadlines.com"
                className={inputClass}
                required
              />
            </div>

            {state?.error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">{state.error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}