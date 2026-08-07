# 🚛 Kunal Roadlines

A production-ready premium trucking and logistics website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **MongoDB**.

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8) ![MongoDB](https://img.shields.io/badge/MongoDB-7-green)

## ✨ Features

### Public Website
- **Premium UI** inspired by Apple, Linear, and Stripe
- **GSAP animations** with ScrollTrigger for scroll-based effects
- **Framer Motion** for micro-interactions and page transitions
- **Dark/Light mode** with system preference detection
- **Fully responsive** across all devices
- **Sections**: Navbar, Hero, About, Services, Fleet, Gallery, Testimonials, FAQ, Newsletter, Contact, Footer

### Admin Panel
- **JWT Authentication** with bcrypt password hashing
- **Dashboard** with Recharts analytics (booking trends, revenue, status distribution)
- **Fleet Management** - Full CRUD with image support
- **Booking Management** - Full CRUD with auto-generated booking numbers
- **Contact Messages** - Inbox with status management
- **Company Settings** - Manage company info and social links
- **Admin Profile** - Edit profile information
- **Analytics** - 6 interactive charts with business insights

### Advanced Features
- **SEO**: robots.txt, sitemap.xml, OpenGraph, Twitter Cards, manifest
- **Performance**: Code splitting, lazy loading, image optimization (AVIF/WebP)
- **Accessibility**: ARIA labels, focus-visible outlines, reduced motion support
- **UX**: Animated cursor, back-to-top button, floating WhatsApp button, loading screens
- **Security**: Security headers, JWT middleware protection, input validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18.18+ or later
- MongoDB Atlas (or local MongoDB)
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/nikhilprajapat4436/kunal-Roadlines.git
cd kunal-roadlines
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing (use a strong random string) |
| `NEXT_PUBLIC_SITE_URL` | Your production URL |
| `ADMIN_EMAIL` | Initial admin email |
| `ADMIN_PASSWORD` | Initial admin password |
| `ADMIN_NAME` | Initial admin name |

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 🗂️ Project Structure

```
kunal-roadlines/
├── src/
│   ├── actions/          # Server actions (auth, fleet, bookings, etc.)
│   ├── app/
│   │   ├── admin/        # Admin panel routes
│   │   │   ├── (protected)/  # Protected admin pages
│   │   │   └── login/    # Admin login
│   │   ├── error.tsx     # Error boundary
│   │   ├── loading.tsx   # Loading screen
│   │   ├── not-found.tsx # 404 page
│   │   ├── robots.ts     # SEO robots
│   │   ├── sitemap.ts    # SEO sitemap
│   │   ├── manifest.ts   # PWA manifest
│   │   ├── globals.css   # Global styles
│   │   ├── layout.tsx    # Root layout with metadata
│   │   └── page.tsx      # Homepage
│   ├── components/
│   │   ├── admin/        # Admin panel components
│   │   ├── layout/       # Navbar, Footer
│   │   ├── providers/    # Theme, PageTransition
│   │   ├── sections/     # Homepage sections
│   │   ├── shared/       # Shared UI components
│   │   └── ui/           # shadcn/ui components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities, auth, db
│   └── models/           # Mongoose models
├── public/               # Static assets
├── .env.example          # Environment template
├── next.config.ts        # Next.js configuration
├── vercel.json           # Vercel deployment config
└── package.json
```

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Use the credentials from your `.env.local` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`)
3. Change your password after first login via `/admin/reset-password`

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, shadcn/ui |
| **Animations** | GSAP, Framer Motion |
| **Forms** | React Hook Form, Zod |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT, bcrypt |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Notifications** | React Hot Toast |

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add your environment variables
4. Deploy!

The `vercel.json` includes:
- Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- Cache headers for fonts and images
- Mumbai region (`bom1`) for India-based deployments

### Environment Variables on Vercel

Add these in Vercel → Project → Settings → Environment Variables:

```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
NEXT_PUBLIC_SITE_URL=https://your-domain.com
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your-strong-password
ADMIN_NAME=Your Name
```

## 🎨 Customization

### Colors
Edit CSS variables in `src/app/globals.css` under `:root` and `.dark`:

```css
:root {
  --primary: oklch(0.45 0.18 255);  /* Blue */
  --background: oklch(0.98 0.005 240);
}
```

### Content
Update data in `src/lib/data.ts`:
- `NAV_LINKS` - Navigation links
- `SERVICES` - Service offerings
- `FLEET` - Fleet vehicles
- `GALLERY` - Gallery images
- `TESTIMONIALS` - Customer testimonials
- `FAQS` - FAQ items

### Images
Replace images in `public/` or update remote image URLs in `src/lib/data.ts`.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request