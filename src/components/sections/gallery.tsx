"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { GALLERY } from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Fleet", "Operations", "Facilities", "Team", "Routes"];

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gallery-item]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: (i % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredImages =
    activeCategory === "All"
      ? GALLERY
      : GALLERY.filter((img) => img.category === activeCategory);

  const selectedImageData = GALLERY.find(
    (img) => img.id === selectedImage
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-secondary/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="Inside Our Operations"
          description="A glimpse into our fleet, facilities, and the dedicated team that keeps India's supply chain moving."
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border/50"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                data-gallery-item
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-medium text-primary bg-primary-foreground/90 px-2 py-0.5 rounded-full self-start">
                    {image.category}
                  </span>
                  <p className="mt-2 text-sm text-white font-medium">
                    {image.alt}
                  </p>
                </div>
                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="h-4 w-4 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImageData.src}
                alt={selectedImageData.alt}
                width={selectedImageData.width}
                height={selectedImageData.height}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mt-4 text-center">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/20 text-primary">
                  {selectedImageData.category}
                </span>
                <p className="mt-2 text-sm text-white/80">
                  {selectedImageData.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}