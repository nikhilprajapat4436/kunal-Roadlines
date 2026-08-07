"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { SERVICES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: (i % 3) * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-secondary/50"
    >
      {/* Background decoration */}
      <div className="absolute -bottom-40 -left-40 -z-10 w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Comprehensive Logistics Solutions"
          description="From full truckload movements to temperature-controlled cold chain, we offer end-to-end logistics services tailored to your business needs."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                data-service-card
                className="group relative p-6 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="text-5xl font-bold text-foreground/5 transition-colors duration-300 group-hover:text-primary/10">
                    {String(SERVICES.indexOf(service) + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mt-5 text-xl font-semibold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mt-5 space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover overlay */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}