"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormValues } from "@/lib/auth-schemas";
import { loginAction, type ActionResult } from "@/actions/auth";

const initialState: ActionResult = { success: false };

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  const {
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30">
          <Truck className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-2xl font-bold text-white">
          Kunal<span className="text-gradient">Roadlines</span>
        </h1>
        <p className="mt-1 text-sm text-white/60">Admin Dashboard</p>
      </div>

      {/* Badge */}
      <div className="mb-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-medium text-emerald-400">
          Secure Admin Access
        </span>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/80">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              id="email"
              type="email"
              placeholder="admin@kunalroadlines.com"
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/80">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
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
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-white/40">
        Authorized personnel only. All access is monitored.
      </p>
    </div>
  );
}