"use client";

/**
 * version-notifier.tsx: keeps open browser tabs in sync with deployments.
 *
 * Vercel deploys are atomic (the HTML, JS and API routes of one deployment
 * ship together), but a visitor who already has the page open keeps running
 * the OLD bundle. This client island polls /api/version — a build-stamped
 * probe — and, when the reported version differs from the one baked into
 * this bundle, shows a small paper-styled notice offering a one-click
 * refresh. That closes the classic "frontend-backend mismatch" gap: no tab
 * keeps calling an old bundle against a newer deployment.
 *
 * Behaviour notes:
 *  • Polls every 90s, and only while the tab is visible; returning to the
 *    tab re-checks immediately via the `visibilitychange` listener.
 *  • Network failures are swallowed: the notice is a convenience and must
 *    never surface errors to visitors.
 *  • Dismissing stores the newer build id in sessionStorage, so the notice
 *    stays hidden for THAT build during the session; a fresh deployment
 *    re-triggers it.
 *  • Sits bottom-left (the back-to-top arrow owns the bottom-right corner),
 *    animates with framer-motion, and respects prefers-reduced-motion.
 */

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { RefreshCw, X } from "lucide-react";

/** Build id inlined into THIS bundle at build time (see next.config.ts). */
const THIS_BUILD = process.env.NEXT_PUBLIC_BUILD_ID ?? "local-dev";

/** Poll cadence while the tab is visible, in milliseconds. */
const POLL_INTERVAL = 90_000;

/** sessionStorage key holding the build id the visitor dismissed. */
const DISMISS_KEY = "binti-dismissed-build";

export function VersionNotifier() {
  const [newerBuild, setNewerBuild] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<string | null>(null);

  /** Probe /api/version and flag when the live deployment is newer. */
  const check = useCallback(async () => {
    // Hidden tabs need no updates; they re-check on becoming visible.
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      return;
    }
    try {
      const res = await fetch("/api/version", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { version?: string | null };
      if (!data?.version || data.version === THIS_BUILD) return;
      // Respect a prior dismissal of this exact build.
      try {
        if (sessionStorage.getItem(DISMISS_KEY) === data.version) return;
      } catch {
        /* private browsing / storage disabled — still show the notice */
      }
      setNewerBuild(data.version);
    } catch {
      // Offline, protected preview, or dev quirks — stay silent by design.
    }
  }, []);

  useEffect(() => {
    // First probe shortly after hydration, then on a fixed cadence.
    const initial = setTimeout(check, 5_000);
    const interval = setInterval(check, POLL_INTERVAL);
    const onVisibility = () => {
      if (document.visibilityState === "visible") check();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [check]);

  /** Hide the notice for the remainder of this session (per build). */
  const dismiss = () => {
    if (newerBuild) {
      try {
        sessionStorage.setItem(DISMISS_KEY, newerBuild);
      } catch {
        /* storage unavailable — dismissal is still in-memory */
      }
    }
    setDismissed(newerBuild);
  };

  const visible = newerBuild !== null && newerBuild !== dismissed;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="status"
            aria-live="polite"
            className="fixed bottom-5 left-4 right-4 z-40 sm:bottom-8 sm:left-8 sm:right-auto sm:w-88"
          >
            <div className="rounded-lg border border-[#1a1626]/15 bg-[#f6f3ee] p-4 shadow-[0_8px_24px_rgba(26,22,38,0.18)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b4472e]">
                Site update available
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#1a1626]">
                A newer version of this page was just published. Refresh to see
                the latest content.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#b4472e] px-4 py-2 text-sm font-medium text-[#f6f3ee] transition-colors duration-200 hover:bg-[#9d3d27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4472e]"
                >
                  <RefreshCw className="size-4" aria-hidden="true" />
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Dismiss update notice"
                  title="Dismiss"
                  className="flex size-9 items-center justify-center rounded-full text-[#1a1626]/60 transition-colors duration-200 hover:bg-[#1a1626]/5 hover:text-[#1a1626] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4472e]"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
