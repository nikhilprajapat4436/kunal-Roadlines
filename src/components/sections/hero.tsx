"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowRight, PlayCircle, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/data";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-badge]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          "[data-hero-title]",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
          "-=0.3"
        )
        .fromTo(
          "[data-hero-description]",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-stats]",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          "[data-hero-image]",
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1"
        );

      // Floating animation for badge
      gsap.to("[data-hero-float]", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-400/20 dark:bg-blue-600/20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-400/20 dark:bg-cyan-600/20 blur-3xl animate-pulse-glow" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="relative z-10">
            <div data-hero-badge>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/70 dark:bg-slate-800/70 backdrop-blur border border-border/50 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Trusted Since {COMPANY.established}
              </span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground">
              <span data-hero-title className="block">
                Moving India
              </span>
              <span data-hero-title className="block text-gradient mt-2">
                Forward, On Time.
              </span>
            </h1>

            <p
              data-hero-description
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Kunal Roadlines delivers premium freight, trucking and logistics
              solutions across {COMPANY.destinations}. With a fleet of{" "}
              {COMPANY.fleetSize}+ vehicles and {COMPANY.yearsExperience} years of
              excellence, we keep your business moving.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                data-hero-cta
                size="lg"
                className="group rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                data-hero-cta
                size="lg"
                variant="outline"
                className="rounded-full gap-2"
              >
                <PlayCircle className="h-5 w-5 text-primary" />
                Watch Our Story
              </Button>
            </div>

            {/* Stats */}
            <div
              data-hero-stats
              className="mt-12 grid grid-cols-3 gap-6 max-w-sm"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {COMPANY.fleetSize}+
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Fleet Vehicles
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {COMPANY.deliveryRate}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  On-Time Delivery
                </p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {COMPANY.yearsExperience}+
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:h-[600px]">
            <div
              data-hero-image
              className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10"
            >
              <Image
                src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Semi truck on highway at sunset"
                width={1200}
                height={800}
                priority
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <div
              data-hero-float
              className="absolute -bottom-6 -left-6 sm:-left-10 p-4 rounded-2xl glass-effect shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                  <Truck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Live Tracking
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Every shipment, every mile
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute top-6 right-6 p-4 rounded-2xl glass-effect shadow-xl">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">
                  4.9/5
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                From 2,500+ client reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}