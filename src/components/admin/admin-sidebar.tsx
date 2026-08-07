"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Package,
  Settings,
  Truck,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import type { SessionData } from "@/lib/auth";

interface AdminSidebarProps {
  session: SessionData;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Fleet Management",
    href: "/admin/fleet",
    icon: Truck,
  },
  {
    label: "Bookings",
    href: "/admin/bookings",
    icon: Package,
  },
  {
    label: "Contact Messages",
    href: "/admin/messages",
    icon: Mail,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Company Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    label: "Admin Profile",
    href: "/admin/profile",
    icon: User,
  },
];

export function AdminSidebar({ session }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutAction();
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
          <Truck className="h-5 w-5" />
        </span>
        <div>
          <p className="font-bold text-white">
            Kunal<span className="text-gradient">Roadlines</span>
          </p>
          <p className="text-xs text-white/50">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-white border border-blue-500/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User info + Logout */}
      <div className="px-3 py-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-sm font-semibold">
            {session.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session.name}
            </p>
            <p className="text-xs text-white/50 truncate">{session.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-white/10 text-white"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden lg:block w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-72 bg-slate-950 border-r border-white/10 shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/60 hover:text-white"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}