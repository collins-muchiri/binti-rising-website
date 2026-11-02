# Binti Rising Initiative Website

*Public website of the Binti Rising initiative — modern TypeScript build deployed on Vercel; canonical repository.*

![category](https://img.shields.io/badge/category-web-platform-EC4899?style=flat-square) ![language](https://img.shields.io/badge/language-TypeScript-2563EB?style=flat-square) ![maintenance](https://img.shields.io/badge/maintenance-active-16A34A?style=flat-square) ![repo](https://img.shields.io/badge/repo-binti--rising--website-111827?style=flat-square)

---

﻿# Binti Rising Initiative Website

A modern, responsive website for the Binti Rising Initiative, built with Next.js and TypeScript. This platform showcases the organization's mission, programs, leadership, and impact in empowering communities.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works seamlessly across all devices
- **Modern UI**: Built with Tailwind CSS and ShadCN UI components for a professional look
- **SEO Optimized**: Includes sitemap, robots.txt, and IndexNow integration for better search visibility
- **Contact Form**: Integrated contact functionality for user inquiries
- **Database Integration**: Prisma ORM for data management
- **Accessibility**: Uses Radix UI primitives for enhanced accessibility
- **Performance**: Optimized build with Next.js for fast loading times

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI + Radix UI
- **Database**: Prisma ORM
- **Deployment**: Vercel
- **Package Manager**: npm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/collins-muchiri/binti-rising-website.git
cd binti-rising-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
INDEXNOW_KEY=your-indexnow-key
CONTACT_EMAIL=info@bintirising.org
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Set up the database (if using Prisma):
```bash
npm run db:generate
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema changes
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset the database

## 🌐 Deployment

This project is configured for easy deployment on Vercel. See [VERCEL_DEPLOYMENT_GUIDE.md](VERCEL_DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

### Environment Variables for Production

Set these in your Vercel dashboard:
- `INDEXNOW_KEY`: Your IndexNow API key
- `CONTACT_EMAIL`: Contact email address
- `NEXT_PUBLIC_SITE_URL`: Your production URL

## 📁 Project Structure

```
binti-rising-website/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── components/     # React components
│   │   │   ├── binti/      # Custom components
│   │   │   └── ui/         # ShadCN UI components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   ├── prisma/             # Database schema
│   └── public/             # Static assets
├── components.json         # ShadCN configuration
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## 📄 License

This project is private and proprietary to the Binti Rising Initiative.

## 📞 Contact

For questions or support, please contact:
- Email: info@bintirising.org
- Website: [binti-rising-initiative.vercel.app](https://binti-rising-initiative.vercel.app/)

---

Built with ❤️ for the Binti Rising Initiative

## 🔍 Search Engine Setup (SEO)

The site is optimized so searches for **“Binti Rising Initiative”**, **“Binti Rising Initiative CBO”** and related terms resolve to the canonical production URL **https://binti-rising-initiative.vercel.app**. Every absolute URL the site emits (canonical link, Open Graph, Twitter card, sitemap, robots, JSON-LD structured data, IndexNow) is derived from the single constant in `src/lib/seo/site-url.ts`.

### Google Search Console
1. Add the property `https://binti-rising-initiative.vercel.app` at [search.google.com/search-console](https://search.google.com/search-console).
2. Choose the **HTML tag** verification method and copy the `content` value of the `google-site-verification` tag.
3. On Vercel, set the environment variable `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to that value and redeploy — the verification meta tag is then rendered automatically.
4. Submit `https://binti-rising-initiative.vercel.app/sitemap.xml` under **Sitemaps**. Google & Bing can also be notified via `GET /api/seo/ping`.

### Google Analytics 4
1. Create a GA4 property and copy the Measurement ID (`G-XXXXXXXXXX`).
2. On Vercel, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and redeploy — the gtag.js snippets render only when this variable is set, so local dev and preview deployments stay measurement-free.

### IndexNow (Bing, Yandex & others)
- The key file is served at `/indexnow-key.txt`.
- `POST /api/indexnow` with `{ "urls": ["/"] }` submits URLs for near-instant indexing.

### Structured data
Three JSON-LD blocks are rendered from `src/app/layout.tsx`:
- `NGO` — organization identity, registration number, real contact points (email, WhatsApp, GBV hotline 1195), GitHub profile;
- `WebSite` — site identity and publisher;
- `FAQPage` — generated from the same `FAQS` array the on-page accordion renders, so schema always matches visible content.

## Contribution and license

Issues and pull requests are welcome — please open an issue describing the proposed change before submitting substantive work. No license file is present; the work remains under the author's default copyright. Contact the owner for reuse terms.
