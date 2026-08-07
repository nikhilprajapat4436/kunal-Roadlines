import {
  Truck,
  Package,
  Snowflake,
  Container,
  Timer,
  Ship,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export const COMPANY = {
  name: "Kunal Roadlines",
  legalName: "Kunal Roadlines Pvt. Ltd.",
  tagline: "Moving India Forward",
  phone: "+91 98765 43210",
  altPhone: "+91 98765 43211",
  email: "info@kunalroadlines.com",
  address: "Plot 42, Transport Nagar, NH-48, Gurugram, Haryana 122001",
  hours: "24/7 Operations",
  established: 2005,
  founded: 2005,
  fleetSize: 250,
  employees: 850,
  destinations: "500+ Cities",
  yearsExperience: 20,
  deliveryRate: "99.2%",
  website: "www.kunalroadlines.com",
};

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "full-truckload",
    title: "Full Truckload (FTL)",
    description:
      "Dedicated trucks for exclusive cargo movement with guaranteed departure schedules and direct point-to-point delivery across the country.",
    icon: Truck,
    features: ["Point-to-point delivery", "Dedicated vehicle", "Live tracking", "Flexible TAT"],
  },
  {
    id: "ltl",
    title: "Less Than Truckload (LTL)",
    description:
      "Cost-effective shared truckload solutions for smaller consignments with optimized routing and consolidated hub networks.",
    icon: Package,
    features: ["Cost-efficient sharing", "Hub-and-spoke network", "Safe consolidation", "2-5 day delivery"],
  },
  {
    id: "cold-chain",
    title: "Cold Chain Logistics",
    description:
      "Temperature-controlled transport for pharmaceuticals, perishables and sensitive goods with real-time temperature monitoring.",
    icon: Snowflake,
    features: ["Reefer containers", "IoT temperature tracking", "Pharma certified", "GMP compliant"],
  },
  {
    id: "container",
    title: "Container Transport",
    description:
      "Containerized cargo movement for import/export needs with seamless port-rail-road intermodal connectivity.",
    icon: Container,
    features: ["Port-rail-road intermodal", "20ft & 40ft containers", "Custom clearance support", "ODC handling"],
  },
  {
    id: "express",
    title: "Express Delivery",
    description:
      "Time-critical express freight services with priority handling, fastest routes and guaranteed delivery windows.",
    icon: Timer,
    features: ["Guaranteed TAT", "Priority handling", "Fastest routes", "Proof of delivery"],
  },
  {
    id: "warehousing",
    title: "Warehousing & 3PL",
    description:
      "Modern warehousing solutions with inventory management, order fulfillment and integrated supply chain services.",
    icon: Warehouse,
    features: ["Smart inventory", "Order fulfillment", "Value-added services", "PAN-India network"],
  },
];

export interface FleetItem {
  id: string;
  name: string;
  capacity: string;
  description: string;
  icon: LucideIcon;
  count: number;
  specs: string[];
}

export const FLEET: FleetItem[] = [
  {
    id: "mini-trucks",
    name: "Mini Trucks",
    capacity: "1-2 Tonnes",
    description: "Ideal for city deliveries, last-mile logistics and small business transportation.",
    icon: Truck,
    count: 40,
    specs: ["Closed body", "7 ft loading deck", "City delivery", "GPS enabled"],
  },
  {
    id: "lcv",
    name: "Light Commercial Vehicles",
    capacity: "3-7 Tonnes",
    description: "Versatile vehicles for intercity transport with flexible loading configurations.",
    icon: Truck,
    count: 65,
    specs: ["Open/closed body", "Hydraulic tailgate option", "Intercity routes", "24/7 support"],
  },
  {
    id: "mhv",
    name: "Medium Heavy Vehicles",
    capacity: "9-16 Tonnes",
    description: "Workhorse trucks for regional haulage with superior payload efficiency.",
    icon: Truck,
    count: 55,
    specs: ["High payload", "Container chassis", "Regional routes", "Telematics fitted"],
  },
  {
    id: "trailers",
    name: "Flatbed Trailers",
    capacity: "16-25 Tonnes",
    description: "Heavy-duty flatbed trailers for steel, machinery and project cargo movement.",
    icon: Container,
    count: 45,
    specs: ["Oversize cargo", "Multi-axle", "Project logistics", "Rigging support"],
  },
  {
    id: "reefer",
    name: "Reefer Trucks",
    capacity: "7-20 Tonnes",
    description: "Temperature-controlled trucks for cold chain and pharmaceutical logistics.",
    icon: Snowflake,
    count: 25,
    specs: ["-20°C to 25°C", "IoT monitoring", "Pharma certified", "Dual compartment"],
  },
  {
    id: "container-trailers",
    name: "Container Trailers",
    capacity: "20-40 ft",
    description: "Dedicated container trailers for port movements and international trade.",
    icon: Ship,
    count: 20,
    specs: ["20ft & 40ft", "Port connectivity", "Custom bonded", "Track & trace"],
  },
];

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export const GALLERY: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Semi truck on highway at sunset",
    category: "Fleet",
    width: 1200,
    height: 800,
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/2130590/pexels-photo-2130590.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Container trucks lined up at logistics hub",
    category: "Operations",
    width: 1200,
    height: 800,
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/2413533/pexels-photo-2413533.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Truck fleet during the day",
    category: "Fleet",
    width: 1200,
    height: 800,
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Modern logistics warehouse",
    category: "Facilities",
    width: 1200,
    height: 800,
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Truck driver logistics operations",
    category: "Team",
    width: 1200,
    height: 800,
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/2866159/pexels-photo-2866159.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Trucks on mountain highway",
    category: "Routes",
    width: 1200,
    height: 800,
  },
  {
    id: 7,
    src: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Loading cargo at distribution center",
    category: "Operations",
    width: 1200,
    height: 800,
  },
  {
    id: 8,
    src: "https://images.pexels.com/photos/1427581/pexels-photo-1427581.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Delivery truck on road",
    category: "Fleet",
    width: 1200,
    height: 800,
  },
  {
    id: 9,
    src: "https://images.pexels.com/photos/2422494/pexels-photo-2422494.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Heavy duty trucks at logistics park",
    category: "Operations",
    width: 1200,
    height: 800,
  },
];

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  avatarInitials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    company: "Bharat Steel Works",
    role: "Supply Chain Manager",
    quote:
      "Kunal Roadlines has transformed our steel logistics. Their flatbed trailers handle our heaviest consignments with remarkable precision. Delivery windows are always met, and their team is exceptionally professional.",
    rating: 5,
    avatarInitials: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "MediLife Pharmaceuticals",
    role: "Director of Operations",
    quote:
      "The cold chain capability of Kunal Roadlines is world-class. Our vaccines and temperature-sensitive medicines arrive with complete integrity. The IoT monitoring gives us absolute visibility throughout transit.",
    rating: 5,
    avatarInitials: "PS",
  },
  {
    id: 3,
    name: "Amit Patel",
    company: "FreshFarm Organics",
    role: "Head of Logistics",
    quote:
      "We've been transporting fresh produce with Kunal Roadlines for 3 years. Their reefer trucks maintain perfect temperature, and the track-and-trace platform means our customers always know their shipment status.",
    rating: 5,
    avatarInitials: "AP",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    company: "Apex Electronics",
    role: "Operations Director",
    quote:
      "As a company shipping fragile electronics nationwide, we need a partner we can trust. Kunal Roadlines delivers our products safely, on time, every time. Their LTL consolidation saves us over 30% in costs.",
    rating: 4,
    avatarInitials: "SR",
  },
  {
    id: 5,
    name: "Vikram Singh",
    company: "Global Exports Ltd.",
    role: "Export Manager",
    quote:
      "Their container transport and port handling are seamless. Since switching to Kunal Roadlines, our export shipments have zero detention charges, and customs clearance has never been smoother.",
    rating: 5,
    avatarInitials: "VS",
  },
  {
    id: 6,
    name: "Meena Iyer",
    company: "Urban Retail Co.",
    role: "Supply Chain Head",
    quote:
      "Kunal Roadlines handles our pan-India store replenishments with incredible consistency. Their mini trucks are perfect for city deliveries, and the GPS tracking keeps our stores perfectly in sync.",
    rating: 5,
    avatarInitials: "MI",
  },
];

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQ[] = [
  {
    id: 1,
    question: "What types of trucks does Kunal Roadlines operate?",
    answer:
      "We operate a diverse fleet of 250+ vehicles including mini trucks (1-2 tonnes), LCVs (3-7 tonnes), medium heavy vehicles (9-16 tonnes), flatbed trailers (up to 25 tonnes), reefer trucks, and container trailers. This allows us to handle everything from small city deliveries to heavy project logistics.",
    category: "General",
  },
  {
    id: 2,
    question: "How do I get a quote for transporting goods?",
    answer:
      "Getting a quote is simple. Call our 24/7 helpline, email us your requirements, or use the contact form on our website. Provide details about your cargo (type, weight, dimensions), pickup and drop locations, and timeline. We'll respond with a competitive quote within 2 hours.",
    category: "Pricing",
  },
  {
    id: 3,
    question: "Do you provide real-time tracking for shipments?",
    answer:
      "Yes! Every vehicle in our fleet is GPS-enabled and equipped with telematics. You can track your shipment in real-time through our customer portal or receive proactive updates via SMS and email at every milestone of the journey.",
    category: "Tracking",
  },
  {
    id: 4,
    question: "What areas do you serve?",
    answer:
      "We provide pan-India coverage with operations reaching 500+ cities and towns. Our major hub networks are in Delhi NCR, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, Ahmedabad, and Pune, with direct routes connecting all major industrial corridors.",
    category: "Coverage",
  },
  {
    id: 5,
    question: "Do you handle temperature-sensitive cargo?",
    answer:
      "Absolutely. Our cold chain division operates 25+ temperature-controlled reefer trucks with -20°C to +25°C capability. We're pharmaceutical-certified (GMP compliant) and provide real-time temperature monitoring with IoT sensors for complete cold chain integrity.",
    category: "Services",
  },
  {
    id: 6,
    question: "What is your on-time delivery rate?",
    answer:
      "We maintain a 99.2% on-time delivery rate across all service lines. Our operations team uses advance route optimization and predictive analytics to ensure deliveries meet or exceed committed timelines.",
    category: "Operations",
  },
  {
    id: 7,
    question: "Is my cargo insured?",
    answer:
      "Yes, all cargo is covered under comprehensive transit insurance. We work with leading insurers to provide end-to-end coverage for your goods. Additional coverage can be arranged for high-value consignments on request.",
    category: "Safety",
  },
  {
    id: 8,
    question: "Can you handle oversize or project cargo?",
    answer:
      "Yes, our project logistics division specializes in ODC (Over Dimensional Cargo) movement. We have multi-axle trailers, experienced rigging teams, and strong relationships with transport authorities to manage permits and escorts for oversized loads.",
    category: "Services",
  },
];

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export const STATS: Stat[] = [
  { label: "Years of Excellence", value: "20", suffix: "+" },
  { label: "Fleet of Vehicles", value: "250", suffix: "+" },
  { label: "Cities Covered", value: "500", suffix: "+" },
  { label: "On-Time Delivery", value: "99.2", suffix: "%" },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;