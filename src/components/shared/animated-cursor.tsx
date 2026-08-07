"use client";

import { useEffect, useRef } from "react";

export function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let dotX = -100;
    let dotY = -100;
    let frameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      cursor.style.opacity = "1";
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      cursor.style.opacity = "0";
    };

    const animate = () => {
      // Smooth follow for outline
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Fast follow for dot
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;

      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

      frameId = requestAnimationFrame(animate);
    };

    // Detect interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, input, textarea, select, [role='button']"
      );
      cursor.classList.toggle("cursor-hover", !!isInteractive);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    frameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 rounded-full border-2 border-blue-500/50 opacity-0 transition-opacity duration-300 hidden md:block"
        style={{ transition: "transform 0.1s ease-out" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-1.5 w-1.5 rounded-full bg-blue-500 opacity-0 transition-opacity duration-300 hidden md:block"
      />
      <style jsx global>{`
        .cursor-hover {
          border-color: rgb(59 130 246 / 0.8);
          transform: scale(1.5);
          transition: transform 0.2s ease-out;
        }
        @media (min-width: 768px) {
          .cursor-hover {
            border-color: rgb(59 130 246 / 0.8);
          }
        }
      `}</style>
    </>
  );
}