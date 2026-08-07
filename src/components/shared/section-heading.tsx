"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 mb-12 md:mb-16",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Badge
          variant="outline"
          className="px-4 py-1.5 text-sm font-medium tracking-wide uppercase text-primary border-primary/20 bg-primary/5"
        >
          {eyebrow}
        </Badge>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground",
          align === "center" && "max-w-3xl"
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className={cn(
            "text-base md:text-lg text-muted-foreground leading-relaxed",
            align === "center" && "max-w-2xl"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}