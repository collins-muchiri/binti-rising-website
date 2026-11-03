import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-url";

/**
 * robots.txt via the Next.js Metadata API (replaces the static
 * public/robots.txt, which hardcoded the vercel.app URL).
 *
 * Benefits (per the Vercel SEO Playbook):
 *  - The sitemap URL is derived from SITE_URL (src/lib/seo/site-url.ts), so
 *    when a custom domain goes live (NEXT_PUBLIC_SITE_URL env var), robots.txt
 *    updates automatically — no second place to remember to edit.
 *  - Lives in version control next to sitemap.ts, so crawl directives are
 *    reviewed like any other code.
 *
 * Rendered output:
 *   User-agent: *
 *   Allow: /
 *   Crawl-delay: 1
 *   Sitemap: <SITE_URL>/sitemap.xml
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Gentle crawl pacing for politeness on shared crawlers that honour
        // it (Google ignores this directive by design and uses its own
        // rate control).
        crawlDelay: 1,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
