import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import ScrollRestoration from "@/components/ScrollRestoration";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site-url";
import { FAQS, CONTACT } from "@/lib/story-data";

/* Monograph type system: Playfair Display for display serif, Inter for text */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Google Analytics 4 Measurement ID: rendered only when configured on Vercel. */
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  title: "Binti Rising Initiative | Empowering Young Women in Nairobi, Kenya",
  description:
    "Binti Rising Initiative is a Kenyan CBO registered in 2026, empowering adolescent girls and young women aged 15-25 through Shuga Global based peer education, SRHR, mental health, financial literacy, and leadership programs in Nairobi, Kenya. Your support changes lives.",
  keywords: [
    "Binti Rising Initiative",
    "Binti Rising Initiative CBO",
    "Binti Rising",
    "Binti Rising CBO",
    "young women empowerment",
    "girls empowerment Kenya",
    "Kenya CBO",
    "community-based organization Nairobi",
    "CBO in Kiambu",
    "SRHR",
    "SRHR Kenya",
    "sexual and reproductive health and rights",
    "adolescent girls and young women Kenya",
    "AGYW Nairobi",
    "Journey to Wholeness programme",
    "mental health",
    "financial literacy",
    "women empowerment",
    "Nairobi",
    "Nairobi Kenya",
    "Kibera",
    "Mathare",
    "Kawangware",
    "donate Kenya",
    "volunteer Nairobi",
    "women empowerment Nairobi",
  ],
  authors: [{ name: "Binti Rising Initiative" }],
  creator: "Binti Rising Initiative",
  publisher: "Binti Rising Initiative",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Binti Rising Initiative | Empowering Young Women in Nairobi, Kenya",
    description:
      "Empowering adolescent girls and young women aged 15-25 through comprehensive programs in SRHR, mental health, financial freedom, and leadership in Nairobi, Kenya. Your support directly transforms lives.",
    url: SITE_URL,
    siteName: "Binti Rising Initiative",
    images: [
      {
        url: "/binti-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Binti Rising Initiative Logo",
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binti Rising Initiative",
    description:
      "Empowering young women in Nairobi, Kenya through SRHR education, health, and leadership programs. Donate today to change lives.",
    images: ["/binti-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Rendered only when NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION is set (Vercel env var),
  // so there is never an invalid placeholder meta tag in production.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
  manifest: "/manifest.json",
  // Favicon and Apple touch icon come from the src/app/icon.png and
  // src/app/apple-icon.png file conventions (generated from the official
  // logo in scripts/prepare-assets.py), so no explicit icons entry is needed.
};

/* ─────────────────────────── Structured data (JSON-LD) ───────────────────────────
   Every URL is absolute against SITE_URL and every fact mirrors what is visible
   on the page (FAQ schema is generated from the same FAQS array the accordion
   renders), per Google's structured-data guidelines. */

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Binti Rising Initiative",
  alternateName: ["Binti Rising Initiative CBO", "Binti Rising"],
  url: SITE_URL,
  logo: absoluteUrl("/binti-logo.jpg"),
  slogan: "From Silence, She Rises",
  description:
    "Binti Rising Initiative is a Kenyan community-based organisation (CBO) registered in 2026 (Kiambu). Born out of the Shuga x Shujaaz x PATH collaboration, it empowers adolescent girls and young women aged 15-25 through peer education based on Shuga Global's MTV Shuga model, plus SRHR education, mental health support, financial literacy, and leadership programs in Nairobi, Kenya.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "KE",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi",
  },
  areaServed: {
    "@type": "City",
    name: "Nairobi",
    sameAs: "https://en.wikipedia.org/wiki/Nairobi",
  },
  foundingDate: "2026",
  foundingLocation: {
    "@type": "Place",
    name: "Kiambu, Kenya",
  },
  identifier: "Reg No NC/SD/CBO/2026/0123",
  knowsAbout: [
    "Sexual and Reproductive Health and Rights",
    "Shuga Global",
    "MTV Shuga peer education",
    "Shujaaz youth media",
    "PATH global health",
    "Financial literacy",
    "Mental health",
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 5,
    maxValue: 10,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "general",
      email: CONTACT.email,
      availableLanguage: ["English", "Swahili"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT.whatsapp.replace(/\s/g, ""),
      availableLanguage: ["English", "Swahili"],
    },
    {
      "@type": "ContactPoint",
      contactType: "hotline",
      name: "GBV Toll-Free Hotline",
      telephone: `tel:${CONTACT.gbvHotline}`,
      availableLanguage: ["English", "Swahili"],
    },
  ],
  sameAs: ["https://github.com/collins-muchiri/binti-rising-website"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Binti Rising Initiative",
  alternateName: "Binti Rising Initiative CBO",
  url: SITE_URL,
  description:
    "Binti Rising Initiative: empowering young women in Nairobi, Kenya through SRHR, mental health, financial literacy, and leadership programs.",
  publisher: {
    "@type": "NGO",
    name: "Binti Rising Initiative",
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/binti-logo.jpg"),
    },
  },
};

/** Generated from the same FAQS array the on-page accordion renders:
    schema content always matches visible content. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth motion-reduce:scroll-auto">
      <head>
        <meta name="geo.region" content="KE-NBO" />
        <meta name="geo.placename" content="Nairobi" />
        <meta name="geo.position" content="-1.2921;36.8219" />
        <meta name="ICBM" content="-1.2921, 36.8219" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ScrollRestoration />
        {children}
        <Toaster />
        {/* Vercel Web Analytics: privacy-friendly, cookie-free page-view and
            visitor tracking served from Vercel's own edge (/\_vercel/insights).
            mode="auto" (the default, kept explicit here) activates collection
            ONLY on production deployments, so local dev and preview
            deployments stay measurement-free. Data appears in the Vercel
            dashboard under Project → Analytics once Web Analytics is enabled
            there (free on Hobby). If numbers stay at zero right after deploy,
            check content blockers (uBlock/Brave/AdGuard) — they filter
            /_vercel/insights/* — and confirm the dashboard toggle is on.
            See docs/DEPLOYMENT.md §5 for the full checklist. */}
        <Analytics mode="auto" />
        {/* Google Analytics 4: active only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set,
            keeping preview deployments and local dev measurement-free. */}
        {GA_ID && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
        )}
        {GA_ID && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        )}
      </body>
    </html>
  );
}
