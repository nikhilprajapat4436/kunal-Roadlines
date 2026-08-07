"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-testimonial-reveal]",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const current = TESTIMONIALS[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 -z-10 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Trusted by businesses across India for their most important shipments. Here's what they have to say about working with Kunal Roadlines."
        />

        <div
          data-testimonial-reveal
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Carousel */}
          <div className="relative min-h-[400px] md:min-h-[350px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
                className="absolute inset-0 p-6 md:p-10 rounded-3xl bg-card border border-border/50 shadow-xl shadow-black/5"
              >
                {/* Quote icon */}
                <Quote className="h-12 w-12 text-primary/20 absolute top-8 right-8" />

                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < current.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      )}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mt-6 text-lg md:text-xl text-foreground leading-relaxed italic">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-8 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-semibold">
                    {current.avatarInitials}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {current.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {current.role} · {current.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={goToPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border hover:bg-muted-foreground/30"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden border-y border-border/50 py-4">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(2)].map((_, arrIndex) => (
              <div key={arrIndex} className="flex">
                {TESTIMONIALS.map((t) => (
                  <span
                    key={`${arrIndex}-${t.id}`}
                    className="mx-6 flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    {t.company}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}