"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { FAQS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-faq-reveal]",
        { y: 50, opacity: 0 },
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

  // Group FAQs by category
  const categories = [...new Set(FAQS.map((f) => f.category))];

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-secondary/50"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 -z-10 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Have questions about our services? Find answers to the most common questions below or contact our team directly."
        />

        <div data-faq-reveal>
          {categories.map((category) => (
            <div key={category} className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  {category}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Accordion className="space-y-3">
                {FAQS.filter((faq) => faq.category === category).map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={`faq-${faq.id}`}
                    className="rounded-2xl border border-border/50 bg-card overflow-hidden transition-all data-[state=open]:shadow-lg data-[state=open]:shadow-primary/5"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}