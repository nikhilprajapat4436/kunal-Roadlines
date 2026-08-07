"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateCompanySettings, type ActionResult } from "@/actions/settings";

const initialState: ActionResult = { success: false };

interface Settings {
  _id: string;
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  altPhone: string;
  address: string;
  website: string;
  established: number;
  fleetSize: number;
  employees: number;
  deliveryRate: string;
  description: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

interface SettingsFormProps {
  settings: Settings | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateCompanySettings,
    initialState
  );

  const inputClass =
    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          Company Settings
        </h1>
        <p className="mt-2 text-white/60">
          Manage your company information and social links
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-6">
            Basic Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white/80">
                Company Name *
              </Label>
              <Input
                id="companyName"
                name="companyName"
                defaultValue={settings?.companyName}
                placeholder="Kunal Roadlines"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline" className="text-white/80">
                Tagline
              </Label>
              <Input
                id="tagline"
                name="tagline"
                defaultValue={settings?.tagline}
                placeholder="Moving India Forward"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={settings?.email}
                placeholder="info@kunalroadlines.com"
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white/80">
                Phone *
              </Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={settings?.phone}
                placeholder="+91 98765 43210"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="altPhone" className="text-white/80">
                Alternate Phone
              </Label>
              <Input
                id="altPhone"
                name="altPhone"
                defaultValue={settings?.altPhone}
                placeholder="+91 98765 43211"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white/80">
                Website
              </Label>
              <Input
                id="website"
                name="website"
                defaultValue={settings?.website}
                placeholder="www.kunalroadlines.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="address" className="text-white/80">
              Address *
            </Label>
            <Textarea
              id="address"
              name="address"
              defaultValue={settings?.address}
              placeholder="Company address"
              rows={2}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50"
              required
            />
          </div>
        </div>

        {/* Company Stats */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-6">
            Company Statistics
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="space-y-2">
              <Label htmlFor="established" className="text-white/80">
                Established
              </Label>
              <Input
                id="established"
                name="established"
                type="number"
                defaultValue={settings?.established}
                placeholder="2005"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fleetSize" className="text-white/80">
                Fleet Size
              </Label>
              <Input
                id="fleetSize"
                name="fleetSize"
                type="number"
                defaultValue={settings?.fleetSize}
                placeholder="250"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees" className="text-white/80">
                Employees
              </Label>
              <Input
                id="employees"
                name="employees"
                type="number"
                defaultValue={settings?.employees}
                placeholder="850"
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryRate" className="text-white/80">
                Delivery Rate
              </Label>
              <Input
                id="deliveryRate"
                name="deliveryRate"
                defaultValue={settings?.deliveryRate}
                placeholder="99.2%"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="description" className="text-white/80">
              Company Description
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={settings?.description}
              placeholder="Short description about your company"
              rows={3}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-blue-500/50"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-lg font-semibold text-white mb-6">
            Social Media Links
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="facebook" className="text-white/80">
                Facebook
              </Label>
              <Input
                id="facebook"
                name="facebook"
                defaultValue={settings?.socialLinks?.facebook}
                placeholder="https://facebook.com/..."
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram" className="text-white/80">
                Instagram
              </Label>
              <Input
                id="instagram"
                name="instagram"
                defaultValue={settings?.socialLinks?.instagram}
                placeholder="https://instagram.com/..."
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-white/80">
                Twitter / X
              </Label>
              <Input
                id="twitter"
                name="twitter"
                defaultValue={settings?.socialLinks?.twitter}
                placeholder="https://twitter.com/..."
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-white/80">
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                defaultValue={settings?.socialLinks?.linkedin}
                placeholder="https://linkedin.com/..."
                className={inputClass}
              />
            </div>
          </div>
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
              Save Settings
            </>
          )}
        </Button>
      </form>
    </div>
  );
}