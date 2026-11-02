/**
 * Canonical site URL — the single source of truth for every absolute URL the
 * site emits: metadata (canonical / Open Graph / Twitter), sitemap.xml,
 * robots.txt, JSON-LD structured data, and the SEO ping/IndexNow APIs.
 *
 * Search engines are pointed at the production deployment:
 *   https://binti-rising-initiative.vercel.app
 *
 * To move to a custom domain later (e.g. https://bintirising.org), change this
 * one constant — every consumer updates automatically.
 */
export const SITE_URL = "https://binti-rising-initiative.vercel.app";

/** Build an absolute URL from a site-relative path ("/", "/sitemap.xml", …). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
