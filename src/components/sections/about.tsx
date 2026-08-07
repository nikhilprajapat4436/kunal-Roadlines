"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Award, Clock, Globe2, Users } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { COMPANY, STATS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Counter animation for stats
      STATS.forEach((stat) => {
        const target = section.querySelector(
          `[data-counter="${stat.label}"]`
        );
        if (!target) return;

        const obj = { value: 0 };
        const targetValue = parseFloat(stat.value);

        gsap.to(obj, {
          value: targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            const formatted = stat.suffix === "%" 
              ? obj.value.toFixed(1) 
              : Math.round(obj.value).toString();
            target.textContent = formatted;
          },
        });
      });

      // Reveal animations
      gsap.utils.toArray<HTMLElement>("[data-about-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
            },
          }
        );
      });

      // Parallax effect on image
      gsap.to("[data-about-image]", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10">
        <div className="w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title="The Backbone of Indian Logistics"
          description="For over two decades, Kunal Roadlines has been the trusted partner for businesses across India, moving everything from everyday essentials to critical industrial cargo with precision and care."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div className="relative" data-about-reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
              <div data-about-image>
                <Image
                  src="https://images.pexels.com/photos/2130590/pexels-photo-2130590.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Kunal Roadlines logistics fleet"
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-border/50">
              <p className="text-4xl font-bold text-gradient">
                {COMPANY.yearsExperience}+
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Years of Logistics Excellence
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-6">
            <div data-about-reveal>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Moving Businesses Forward Since {COMPANY.founded}
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                What started as a single-truck operation has grown into one of
                India's most reliable logistics providers. Today, our fleet of{" "}
                {COMPANY.fleetSize}+ vehicles connects businesses to{" "}
                {COMPANY.destinations} across the country, delivering with
                precision, transparency, and care.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Our success is built on a simple promise: treat every shipment
                like it's our own. From a single parcel to complete supply chain
                solutions, we bring the same dedication to every kilometer.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Award,
                  title: "ISO Certified",
                  description: "Quality management systems certified",
                },
                {
                  icon: Users,
                  title: `${COMPANY.employees}+ Team`,
                  description: "Skilled professionals nationwide",
                },
                {
                  icon: Globe2,
                  title: "Pan-India Network",
                  description: `${COMPANY.destinations} served`,
                },
                {
                  icon: Clock,
                  title: "24/7 Operations",
                  description: "Round-the-clock dispatch support",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  data-about-reveal
                  className="p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h4 className="mt-3 font-semibold text-foreground">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-card border border-border/50">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              data-about-reveal
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-foreground">
                <span data-counter={stat.label}>0</span>
                {stat.suffix}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}