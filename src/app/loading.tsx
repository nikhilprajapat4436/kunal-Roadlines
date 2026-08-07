"use client";

import { Truck } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
          <Truck className="h-10 w-10 animate-pulse" />
        </span>
        <div className="mt-6 h-1 w-40 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <p className="mt-6 text-sm font-medium text-muted-foreground">
        Loading...
      </p>

      <style>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }
      `}</style>
    </div>
  );
}