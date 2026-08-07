"use client";

import { Globe, Link2, Mail, MapPin, Phone, Send, Truck } from "lucide-react";
import { COMPANY, NAV_LINKS, SERVICES } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 dark:bg-black text-white/70 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-cyan-950/20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
                <Truck className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Kunal<span className="text-gradient">Roadlines</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed">
              Premium freight and logistics solutions across India. Moving
              businesses forward with precision, transparency, and care since{" "}
              {COMPANY.established}.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Globe, label: "Website", href: `https://${COMPANY.website}` },
                { icon: Send, label: "Telegram", href: "#" },
                { icon: Link2, label: "LinkedIn", href: "#" },
                { icon: Mail, label: "Email", href: `mailto:${COMPANY.email}` },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 text-white/50 hover:text-white transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      if (target) {
                        window.scrollTo({
                          top: (target as HTMLElement).offsetTop - 80,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector("#services");
                      if (target) {
                        window.scrollTo({
                          top: (target as HTMLElement).offsetTop - 80,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 text-sm hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>
                    {COMPANY.phone}
                    <br />
                    {COMPANY.altPhone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-3 text-sm hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {COMPANY.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            © {year} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="text-sm text-white/50">
            Made with <span className="text-red-500">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}