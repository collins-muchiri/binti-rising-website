/**
 * Canonical site URL: the single source of truth for every absolute URL the
 * site emits: metadata (canonical / Open Graph / Twitter), sitemap.xml,
 * robots.txt, JSON-LD structured data, and the SEO ping/IndexNow APIs.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this in Vercel (Project → Settings →
 *      Environment Variables) on the day a custom domain goes live; every
 *      canonical / OG / sitemap / JSON-LD URL flips to it on the next deploy,
 *      with zero code changes.
 *   2. Fallback: the current production URL on vercel.app (used today).
 *
 * Trailing slashes are trimmed so absoluteUrl() always joins cleanly.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://binti-rising-initiative.vercel.app"
).replace(/\/+$/, "");

/** Build an absolute URL from a site-relative path ("/", "/sitemap.xml", …). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
