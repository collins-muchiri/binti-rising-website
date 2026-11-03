import { NextResponse } from "next/server";

/**
 * GET /api/version — deployment version probe.
 *
 * Returns the build identifier stamped at build time (see next.config.ts).
 * The client-side <VersionNotifier /> polls this endpoint and compares the
 * reported version with the one baked into its own bundle: a mismatch means
 * a newer deployment is live and the visitor can refresh to re-sync with the
 * latest client + server bundle.
 *
 * `force-dynamic` + `no-store` guarantee the response is never cached at the
 * CDN edge or by the browser, so the probe always reflects the CURRENT
 * deployment, not the one the visitor originally loaded.
 *
 * Response shape:
 * {
 *   "version":     "<git commit SHA>" | "local-dev",   // build stamp
 *   "commit":      "<git commit SHA>" | null,           // raw Vercel value
 *   "environment": "production" | "preview" | ...,
 *   "deployment":  "<project-hash>.vercel.app" | null,  // VERCEL_URL
 *   "reportedAt":  "<ISO 8601 timestamp>"
 * }
 */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      version: process.env.NEXT_PUBLIC_BUILD_ID ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      environment: process.env.VERCEL_ENV ?? "development",
      deployment: process.env.VERCEL_URL ?? null,
      reportedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" } },
  );
}
