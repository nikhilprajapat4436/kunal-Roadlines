"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  ease?: string;
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  toggleActions?: string;
  once?: boolean;
}

export function useGsapReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseGsapRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      y = 40,
      x = 0,
      opacity = 0,
      duration = 1,
      stagger = 0.15,
      delay = 0,
      ease = "power3.out",
      trigger,
      start = "top 80%",
      end = "top 20%",
      scrub = false,
      toggleActions = "play none none reverse",
      once = false,
    } = options;

    const ctx = gsap.context(() => {
      const targets = element.querySelectorAll("[data-gsap-reveal]");
      const elements = targets.length > 0 ? targets : element;

      gsap.fromTo(
        elements,
        { y, x, opacity, autoAlpha: 0 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration,
          delay,
          stagger,
          ease,
          scrollTrigger: {
            trigger: trigger || element,
            start,
            end,
            scrub,
            toggleActions,
            once,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [options]);

  return ref;
}

export function useGsapScrollVelocity<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const rotate = Math.max(-8, Math.min(8, velocity / 100));
            gsap.to(element, {
              rotation: rotate,
              duration: 0.5,
              ease: "power2.out",
            });
          },
        },
      });
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useGsapParallax<T extends HTMLElement = HTMLDivElement>(
  speed = 0.2
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: 100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, element);

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

export function useGsapCounter<T extends HTMLElement = HTMLSpanElement>(
  target: number,
  duration = 2,
  decimals = 0
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const obj = { value: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          element.textContent = obj.value.toFixed(decimals);
        },
      });
    }, element);

    return () => ctx.revert();
  }, [target, duration, decimals]);

  return ref;
}