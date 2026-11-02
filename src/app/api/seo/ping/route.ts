import { NextResponse } from "next/server";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site-url";

/**
 * Notifies search engines that the sitemap has changed.
 *
 * Google retired its legacy sitemap-ping endpoint in 2023 (and Bing retired
 * theirs in 2022), so pinging google.com/ping returns 404/410 and is no
 * longer a supported submission channel. Sitemaps are discovered by crawlers
 * through robots.txt and submitted manually via Search Console.
 *
 * IndexNow (api.indexnow.org — used by Bing, Yandex, Seznam and others) is
 * still an active submission channel, so this route submits the canonical
 * URL and the sitemap URL through it.
 */
export async function GET() {
  try {
    const sitemapUrl = absoluteUrl("/sitemap.xml");
    const key = process.env.INDEXNOW_KEY || "binti-2026-rise-key";

    const response = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: SITE_URL,
        key,
        urlList: [SITE_URL, sitemapUrl],
      }),
    });

    return NextResponse.json({
      success: response.ok,
      sitemapUrl,
      channel: "IndexNow (Bing, Yandex, Seznam). Google discovers sitemaps via robots.txt and Search Console.",
      status: response.status,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to submit sitemap via IndexNow." },
      { status: 500 }
    );
  }
}
