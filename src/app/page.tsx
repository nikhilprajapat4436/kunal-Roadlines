import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Fleet } from "@/components/sections/fleet";
import { Newsletter } from "@/components/sections/newsletter";
import { Contact } from "@/components/sections/contact";

// Code split below-the-fold sections
const Gallery = dynamic(() =>
  import("@/components/sections/gallery").then((m) => m.Gallery)
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials)
);
const FAQ = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.FAQ)
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Fleet />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}