import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTransition } from "@/components/providers/page-transition";
import { AnimatedCursor } from "@/components/shared/animated-cursor";
import { BackToTop } from "@/components/shared/back-to-top";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kunalroadlines.com";
const siteName = "Kunal Roadlines";
const description =
  "Kunal Roadlines provides premium trucking, freight and logistics services across India. Full truckload, less than truckload, cold chain, and specialized cargo solutions with real-time tracking and reliable delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Premium Freight & Logistics Solutions`,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "Logistics & Transportation",
  keywords: [
    "trucking",
    "freight",
    "logistics",
    "transportation",
    "full truckload",
    "less than truckload",
    "cold chain",
    "cargo",
    "Kunal Roadlines",
    "India logistics",
    "freight forwarding",
    "supply chain",
    "warehousing",
    "container transport",
  ],
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: `${siteName} | Premium Freight & Logistics Solutions`,
    description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteName} - Premium Freight & Logistics`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Premium Freight & Logistics Solutions`,
    description,
    images: ["/og-image.jpg"],
    creator: "@kunalroadlines",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <PageTransition>
            {children}
            <AnimatedCursor />
            <BackToTop />
            <WhatsAppButton />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "oklch(0.13 0.02 240)",
                  color: "oklch(0.95 0.005 240)",
                  borderRadius: "12px",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "oklch(0.7 0.12 150)",
                    secondary: "oklch(0.95 0.005 240)",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "oklch(0.577 0.245 27.325)",
                    secondary: "oklch(0.95 0.005 240)",
                  },
                },
              }}
            />
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}