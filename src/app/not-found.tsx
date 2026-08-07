import Link from "next/link";
import { ArrowLeft, Compass, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="text-center px-4">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
          <Truck className="h-10 w-10" />
        </span>

        <p className="mt-8 text-gradient text-7xl md:text-8xl font-bold">404</p>

        <h1 className="mt-4 text-2xl md:text-3xl font-bold text-foreground">
          Page Not Found
        </h1>

        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          Oops! Looks like this shipment was misrouted. The page you're
          looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/#contact">
            <Button variant="outline" className="rounded-full gap-2">
              <Compass className="h-4 w-4 text-primary" />
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}