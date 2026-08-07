import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kunal Roadlines",
    short_name: "KunalRoadlines",
    description:
      "Premium freight and logistics solutions across India. Full truckload, LTL, cold chain, and specialized cargo services.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}