import type { NextConfig } from "next";

/**
 * Build stamping for deploy-sync.
 *
 * Vercel injects VERCEL_GIT_COMMIT_SHA at build time; we inline it into BOTH
 * the client bundle and the server runtime as NEXT_PUBLIC_BUILD_ID, so every
 * deployment carries the commit SHA it was built from. This enables:
 *
 *   - GET /api/version  → reports the running deployment's build ID (server)
 *   - <VersionNotifier /> → knows which build THIS page bundle was served
 *     from (client) and can detect "a newer deployment is live" by comparing
 *     the two, offering the visitor a one-click refresh.
 *
 * Locally (and in CI) there is no commit SHA, so we fall back to a stable
 * "local-dev" id that matches itself and never triggers the notifier.
 */
const BUILD_ID = process.env.VERCEL_GIT_COMMIT_SHA ?? "local-dev";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_BUILD_ID: BUILD_ID,
  },
};

export default nextConfig;
