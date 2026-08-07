"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/shared/section-heading";
import { contactSchema, defaultContactValues, type ContactFormValues } from "@/lib/contact-schema";
import { COMPANY, SERVICES } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultContactValues,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-contact-reveal]").forEach((el) => {
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
              start: "top 85%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call since no backend yet
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Contact form submitted:", data);

    toast.success("Thank you! We'll get back to you within 2 hours.", {
      duration: 4000,
    });

    reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      lines: [COMPANY.phone, COMPANY.altPhone],
      href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      lines: [COMPANY.email],
      href: `mailto:${COMPANY.email}`,
    },
    {
      icon: MapPin,
      title: "Head Office",
      lines: [COMPANY.address],
      href: "https://maps.google.com/?q=Transport+Nagar+Gurugram",
    },
    {
      icon: Clock,
      title: "Working Hours",
      lines: [COMPANY.hours, "All days including holidays"],
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute -top-40 -left-40 -z-10 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title="Get in Touch"
          description="Ready to move your business forward? Our logistics experts are available 24/7 to discuss your requirements and provide a competitive quote."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <div
                  key={info.title}
                  data-contact-reveal
                  className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{info.title}</h3>
                    {info.lines.map((line) => (
                      <p key={line} className="mt-1 text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              );

              return info.href ? (
                <a
                  key={info.title}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {content}
                </a>
              ) : (
                content
              );
            })}

            {/* Map inset */}
            <div
              data-contact-reveal
              className="relative rounded-2xl border border-border/50 overflow-hidden h-48"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.519640740912!2d77.02062931490392!3d28.439707182496196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19c1daddd397%3A0x5384f4bee91d1654!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kunal Roadlines Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div
            data-contact-reveal
            className="lg:col-span-3 p-8 rounded-3xl bg-card border border-border/50"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Phone + Company */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    placeholder="+91 XXXXX XXXXX"
                    {...register("phone")}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company name (optional)"
                    {...register("company")}
                  />
                </div>
              </div>

              {/* Service */}
              <div className="space-y-2">
                <Label htmlFor="service">Service Required *</Label>
                <select
                  id="service"
                  className="flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("service")}
                  aria-invalid={!!errors.service}
                >
                  <option value="" className="bg-card">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id} className="bg-card">
                      {service.title}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-sm text-red-500">{errors.service.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your cargo, pickup, delivery location, and timeline..."
                  rows={5}
                  {...register("message")}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}