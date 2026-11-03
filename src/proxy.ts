import { NextRequest, NextResponse } from "next/server";

/**
 * proxy.ts — Edge proxy (Next.js 16's successor to middleware.ts): a light
 * authentication gate for deployments.
 *
 * WHAT IT DOES
 * Preview deployments (and — only if explicitly switched on — production)
 * are protected with HTTP Basic Auth, so only visitors holding the shared
 * credentials can open them. Production remains public by default, which is
 * essential: the site's search-engine visibility and AI discoverability work
 * depend on public access (see docs/DEPLOYMENT.md, "Securing deployments").
 *
 * HOW TO ENABLE (Vercel dashboard)
 *   Project → Settings → Environment Variables → add for the "Preview" scope:
 *     PREVIEW_USERNAME   e.g. binti-preview
 *     PREVIEW_PASSWORD   a long random string (use a password manager)
 *   then redeploy. Previews now answer 401 until credentials are entered.
 *
 * OPTIONAL PRODUCTION LOCK
 *   Set PROTECT_PRODUCTION="true" (Production scope) to gate production too
 *   — useful only for private reviews; remember to switch it off, since it
 *   blocks visitors AND crawlers while enabled.
 *
 * BEHAVIOUR & SAFETY
 *  • Fail-open: with no credentials configured nothing is ever gated, so
 *    local development and un-configured environments are unaffected.
 *  • VERCEL_ENV is a Vercel system variable ("production" | "preview" |
 *    "development") evaluated on the edge at request time.
 *  • This is a shared-credential convenience gate, not per-user auth — for
 *    team-only access also enable Vercel's native Deployment Protection
 *    (dashboard path documented in docs/DEPLOYMENT.md).
 */

export default function proxy(request: NextRequest) {
  const username = process.env.PREVIEW_USERNAME;
  const password = process.env.PREVIEW_PASSWORD;
  const protectProduction = process.env.PROTECT_PRODUCTION === "true";
  const isProduction = process.env.VERCEL_ENV === "production";

  const configured = Boolean(username && password);
  const shouldGate = configured && (protectProduction || !isProduction);
  if (!shouldGate) return NextResponse.next();

  const header = request.headers.get("authorization");
  if (header && username && password) {
    const expected = `Basic ${btoa(`${username}:${password}`)}`;
    if (header === expected) return NextResponse.next();
  }

  return new NextResponse(
    "This deployment is protected. Enter the shared credentials to continue.",
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Binti Rising", charset="UTF-8"',
        "Cache-Control": "no-store",
      },
    },
  );
}

export const config = {
  // Skip static asset paths that carry no page content (JS/CSS chunks,
  // image optimizer, favicon, SEO files). Everything else — pages, public
  // files, API routes — is gated on protected deployments.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
