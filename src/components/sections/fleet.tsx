"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { FLEET } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Fleet() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-fleet-card]").forEach((el, i) => {
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
      id="fleet"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 -z-10 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Fleet"
          title="A Vehicle for Every Need"
          description="Our diverse fleet of 250+ modern vehicles is equipped with GPS tracking, advanced safety systems, and professional drivers to handle every type of cargo."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLEET.map((vehicle) => {
            const Icon = vehicle.icon;
            return (
              <div
                key={vehicle.id}
                data-fleet-card
                className="group relative p-6 rounded-3xl bg-gradient-to-br from-card to-secondary/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-primary font-medium">
                        {vehicle.capacity}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    {vehicle.count} Units
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {vehicle.description}
                </p>

                {/* Specs */}
                <div className="mt-5 pt-5 border-t border-border/50">
                  <ul className="grid grid-cols-2 gap-2">
                    {vehicle.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}