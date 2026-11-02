import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-url";

/**
 * Served at /sitemap.xml (see Next.js Metadata routes).
 *
 * Only canonical, indexable URLs belong here: search engines ignore
 * "#fragment" URLs, so single-page section anchors are intentionally omitted.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
