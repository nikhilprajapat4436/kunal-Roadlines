"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setEmail("");
    toast.success("Subscribed! You'll hear from us soon.");
  };

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-blue-600/10" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 md:p-12 rounded-3xl gradient-border text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25">
            <Mail className="h-7 w-7" />
          </span>

          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-foreground">
            Stay Updated with Kunal Roadlines
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Subscribe to our newsletter for industry insights, logistics tips,
            and exclusive offers. No spam, just value.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-full bg-background/80 border-border/50"
              aria-label="Email address"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/25"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            By subscribing, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </section>
  );
}