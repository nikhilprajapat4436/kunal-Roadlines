"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="text-center px-4">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500">
          <AlertTriangle className="h-10 w-10" />
        </span>

        <h1 className="mt-6 text-2xl md:text-3xl font-bold text-foreground">
          Something Went Wrong
        </h1>

        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          An unexpected error occurred. Please try again, or go back to the
          homepage.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            onClick={reset}
            className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="rounded-full gap-2">
              <ArrowLeft className="h-4 w-4 text-primary" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}