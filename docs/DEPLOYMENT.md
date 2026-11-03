# Deployment & Operations Guide

Operational documentation for the Binti Rising website on Vercel
(https://binti-rising-initiative.vercel.app), covering four areas:

1. [Concurrent builds (no queued builds)](#1-concurrent-builds)
2. [Frontend–backend version sync](#2-frontendbackend-version-sync)
3. [Securing preview (and production) deployments](#3-securing-deployments)
4. [Custom domain: purchase and connect](#4-custom-domain)

Every code-level piece below is already implemented in the repository; items
marked **DASHBOARD** are one-time clicks in the Vercel dashboard that require
the project owner's login.

---

## 1. Concurrent builds

**Goal:** multiple deployments build simultaneously instead of queueing.

**How Vercel works:** build concurrency is plan-governed, not a toggle:

| Plan       | Concurrent active builds | Behaviour when exceeded        |
| ---------- | ------------------------ | ------------------------------ |
| Hobby      | 1                        | Additional builds queue        |
| Pro        | 12                       | Queues only beyond 12 at once  |
| Enterprise | Custom (24+)             | Rarely queues                  |

Each push and each branch/PR gets its own independent deployment build;
Vercel parallelises across them subject to the plan limit.

**What was done in this repository**

- Added `.github/workflows/ci.yml`: **lint** and **build** run as two
  parallel GitHub Actions jobs on every push/PR, so verification never waits
  behind Vercel's queue (and vice versa).
- The production build is already fast (Next.js 16 + Turbopack, small
  single-page surface, no database at build time), which keeps the site near
  the front of the queue on Hobby.

**DASHBOARD — if queueing becomes frequent**

- Upgrade path: **Project → Settings → Usage** / team **Settings → Billing →
  Upgrade** to Pro for 12 concurrent builds (the standard fix).
- Free mitigations first: keep pushes atomic (avoid 5 rapid-fire commits —
  they are 5 builds), and let the most recent commit supersede older ones
  (Vercel automatically cancels nothing on Hobby; older builds finishing is
  harmless because only the newest is aliased to production).

---

## 2. Frontend–backend version sync

**Goal:** an open browser tab must never run a stale frontend against a
newer deployment (the classic mismatch: old JS calls new API or vice versa).

**Why mismatch can only come from open tabs:** Vercel deployments are
*atomic* — the static bundle, server components and API routes of one
deployment always ship together and are aliased to production in a single
switch. The only stale surface is a visitor who loaded the page *before*
the switch.

**What was implemented**

| Piece | File | Role |
| --- | --- | --- |
| Build stamp | `next.config.ts` | Inlines `VERCEL_GIT_COMMIT_SHA` as `NEXT_PUBLIC_BUILD_ID` into both client bundle and server runtime |
| Version probe | `src/app/api/version/route.ts` | `GET /api/version` returns `{ version, commit, environment, deployment, reportedAt }` with `Cache-Control: no-store` |
| Sync island | `src/components/story/version-notifier.tsx` | Polls `/api/version` every 90 s (only while the tab is visible, plus on `visibilitychange`); if the reported build ≠ its own baked-in build, shows a small paper-styled "Site update available" notice with a **Refresh** button (bottom-left, opposite the back-to-top arrow) |
| Mount point | `src/app/page.tsx` | `<VersionNotifier />` rendered once, next to `<BackToTop />` |

**Behaviour details**

- Fail-silent: fetch errors (offline, gated preview) never surface UI errors.
- Dismissing the notice stores the build id in `sessionStorage`
  (`binti-dismissed-build`); a *newer* deployment re-triggers the notice.
- Accessible: `role="status"` + `aria-live="polite"`, reduced-motion safe.
- Local dev stamps itself `local-dev`, which always matches — no noise.

**Verify it works**

```bash
curl -s https://binti-rising-initiative.vercel.app/api/version | python3 -m json.tool
```

---

## 3. Securing deployments

**Goal:** authentication before access to preview deployments (and, if ever
wanted, production).

Two complementary layers; the code layer is implemented, the native layer is
a **DASHBOARD** toggle.

### 3a. Code layer (implemented): Basic-Auth proxy

`src/proxy.ts` (Next.js 16's edge proxy, successor to `middleware.ts`):

- **Preview deployments are gated** with HTTP Basic Auth as soon as
  credentials exist; production stays public by default (protecting SEO and
  AI discoverability — the site's core growth channel).
- **Fail-open by design:** without credentials nothing is gated, so local
  dev and CI are unaffected.
- Optional production lock: set `PROTECT_PRODUCTION="true"` to gate
  production too (private review windows only — crawlers are blocked while
  it is on, so switch it off afterwards).

**DASHBOARD — enable it (one time, ~2 minutes):**

1. Vercel dashboard → the project → **Settings → Environment Variables**.
2. Add two variables, scope **Preview** (and **Development** if desired):
   - `PREVIEW_USERNAME` — e.g. `binti-preview`
   - `PREVIEW_PASSWORD` — a long random string from a password manager
3. Redeploy any branch (or push). Preview URLs now return **401** until the
   credentials are entered once per browser session.
4. (Optional) Add `PROTECT_PRODUCTION` = `true` scoped to **Production** to
   lock production the same way.

> Environment variables used by the edge proxy are inlined at build time,
> so changing the password requires a redeploy.

### 3b. Native layer (optional hardening): Vercel Deployment Protection

**DASHBOARD:** Project → **Settings → Deployment Protection**:

| Option | Plan | Effect |
| --- | --- | --- |
| **Standard Protection** (default on) | All | Preview URLs require Vercel Authentication |
| **All Deployments** | All | Production aliases also require Vercel Authentication (breaks public access — not recommended for this site) |
| **Password Protection** for deployments | Pro | Shareable password, no Vercel login needed |
| **Trusted IPs** | Enterprise | IP allow-list |

Recommended posture for this project: keep **Standard Protection** on
(previews require a Vercel login), plus the proxy's shared credentials for
non-Vercel stakeholders such as partners and volunteers.

---

## 4. Custom domain

**Goal:** branding + accessibility + stronger SEO identity.

**Recommended name: `bintirising.org`** — verified **available to register**
(RDAP lookup returned 404 on 2026-02-06). It matches the brand and the
`info@bintirising.org` address already used in site content. A strong
Kenyan alternative for a CBO is **`bintirising.or.ke`** (the `.or.ke` TLD is
reserved for Kenyan not-for-profits, via KeNIC-accredited registrars).

**Registrar options**

| Registrar | Notes |
| --- | --- |
| Cloudflare Registrar | At-cost pricing, free WHOIS privacy, easy DNS |
| Porkbun | Low prices, free privacy, good UI |
| Namecheap | Widely used, frequent promos |
| Truehost / Sasahost / HostPoa (KeNIC registrars) | For `.or.ke` |

Expect roughly **US$10–12/year** for `.org`.

### Connect the domain — step by step

1. **DASHBOARD — purchase** `bintirising.org` at the registrar of choice
   (payment step — project owner action).
2. **DASHBOARD — add to Vercel:** Project → **Settings → Domains → Add** →
   enter `bintirising.org` (Vercel automatically adds `www.` too).
3. **At the registrar**, create the records Vercel displays (values can
   change over time — always follow what the dashboard shows):
   - Apex `A` record → Vercel's anycast IP (e.g. `76.76.21.21`)
   - `www` `CNAME` record → `cname.vercel-dns.com`
   - (Or, simplest: switch the domain's nameservers to Vercel DNS and let
     Vercel manage the records.)
4. Wait for DNS propagation (minutes to ~48 h). Vercel issues free
   auto-renewing HTTPS certificates (Let's Encrypt) once DNS verifies.
5. **DASHBOARD — set production domain:** ensure `bintirising.org` is the
   production alias and enable **Redirect to Domain** so
   `binti-rising-initiative.vercel.app` and `www` 301-redirect to the apex.
6. **Repository — flip the canonical URL (already prepared):** set
   `NEXT_PUBLIC_SITE_URL=https://bintirising.org` in
   **Settings → Environment Variables** (Production scope) and redeploy.
   Because `SITE_URL` is now env-driven (`src/lib/seo/site-url.ts`),
   canonical, Open Graph, Twitter, sitemap, JSON-LD and IndexNow all switch
   in one deploy — no code edit needed.
7. **Repository — one file edit:** update the `Sitemap:` line in
   `public/robots.txt` to `https://bintirising.org/sitemap.xml`.
8. Re-submit the new domain in Google Search Console and re-fire
   `POST /api/seo/ping` (IndexNow) after the switch.

---

## Change log (this repository)

| Change | File(s) |
| --- | --- |
| Parallel CI (lint + build) | `.github/workflows/ci.yml` |
| Build stamping | `next.config.ts` |
| Version probe API | `src/app/api/version/route.ts` |
| Deploy-sync notice | `src/components/story/version-notifier.tsx`, mounted in `src/app/page.tsx` |
| Preview/production auth gate | `src/proxy.ts` |
| Env-driven canonical URL | `src/lib/seo/site-url.ts` |
| This guide + README link | `docs/DEPLOYMENT.md`, `README.md` |
