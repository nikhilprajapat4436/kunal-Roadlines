"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animate all child sections with data-transition attribute
      gsap.utils.toArray<HTMLElement>("[data-page-section]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 + i * 0.15,
            ease: "power3.out",
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <div ref={sectionRef} className="contents">
      {children}
    </div>
  );
}