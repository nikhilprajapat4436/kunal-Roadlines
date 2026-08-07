"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { Eye, EyeOff, KeyRound, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/lib/auth-schemas";
import { resetPasswordAction, type ActionResult } from "@/actions/auth";

const initialState: ActionResult = { success: false };

export function ResetPasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState
  );

  const {
    register,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const inputClass =
    "pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50";

  return (
    <div className="w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
          <KeyRound className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white">Reset Password</h1>
        <p className="mt-1 text-sm text-white/60">
          Change your admin account password
        </p>
      </div>

      {/* Security badge */}
      <div className="mb-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-medium text-emerald-400">
          You will be logged out after changing your password
        </span>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-white/80">
            Current Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              id="currentPassword"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              className={inputClass}
              {...register("currentPassword")}
              aria-invalid={!!errors.currentPassword}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              aria-label={
                showCurrentPassword ? "Hide password" : "Show password"
              }
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-400">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-white/80">
            New Password
          </Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className={inputClass}
              {...register("newPassword")}
              aria-invalid={!!errors.newPassword}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-400">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white/80">
            Confirm New Password
          </Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className={inputClass}
              {...register("confirmPassword")}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Password requirements */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs font-medium text-white/60 mb-2">
            Password requirements:
          </p>
          <ul className="space-y-1 text-xs text-white/40">
            <li>• At least 8 characters long</li>
            <li>• Contains at least one uppercase letter (A-Z)</li>
            <li>• Contains at least one lowercase letter (a-z)</li>
            <li>• Contains at least one number (0-9)</li>
          </ul>
        </div>

        {/* Error message */}
        {state?.error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">{state.error}</p>
          </div>
        )}

        {/* Field errors from server */}
        {state?.fieldErrors && (
          <div className="space-y-1">
            {Object.entries(state.fieldErrors).map(([field, messages]) => (
              <p key={field} className="text-sm text-red-400">
                {messages?.[0]}
              </p>
            ))}
          </div>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}