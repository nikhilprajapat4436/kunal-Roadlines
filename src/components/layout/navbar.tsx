"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleScrollSpy = () => {
      const sections = NAV_LINKS.map((link) =>
        document.querySelector(link.href)
      );
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(NAV_LINKS[index].href.replace("#", ""));
          }
        }
      });
    };

    handleScroll();
    handleScrollSpy();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollSpy);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, []);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-effect shadow-lg shadow-black/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 text-foreground"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
              <Truck className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight">
              Kunal<span className="text-gradient">Roadlines</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  activeSection === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href="tel:+919876543210" className="hidden md:block">
              <Button variant="outline" className="gap-2 rounded-full">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+91 98765 43210</span>
              </Button>
            </a>
            <Button
              className="hidden sm:inline-flex rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
              onClick={() => {
                const target = document.querySelector("#contact");
                if (target) {
                  window.scrollTo({
                    top: (target as HTMLElement).offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Get a Quote
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden glass-effect"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                    activeSection === link.href.replace("#", "")
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-2 flex flex-col gap-3">
                <Button
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    const target = document.querySelector("#contact");
                    if (target) {
                      window.scrollTo({
                        top: (target as HTMLElement).offsetTop - 80,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  Get a Quote
                </Button>
                <a href="tel:+919876543210">
                  <Button variant="outline" className="w-full rounded-full gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us Now
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}