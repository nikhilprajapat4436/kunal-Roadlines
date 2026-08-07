import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AdminSidebar session={session} />
      <main className="lg:pl-64 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}