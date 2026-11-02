"use client";

/**
 * back-to-top.tsx — a fixed, floating "back to top" arrow.
 *
 * • Appears only after the user has scrolled past the hero (~640px).
 * • Smooth-scrolls to the top; honours prefers-reduced-motion (instant jump).
 * • Scroll handling is a passive listener throttled with requestAnimationFrame,
 *   so it never blocks the main thread; React bails out of state updates when
 *   the visibility result is unchanged.
 * • While hidden the button is `invisible` (kept in the DOM for the fade
 *   transition, but removed from the accessibility tree and focus order).
 * • Styled in the site's monograph palette: terracotta disc, paper glyph.
 */

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const APPEAR_AFTER = 640; // px scrolled before the arrow fades in

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setVisible(window.scrollY > APPEAR_AFTER);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Defer the initial check so it also catches restored scroll positions.
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full bg-[#b4472e] text-[#f6f3ee] shadow-[0_4px_16px_rgba(26,22,38,0.25)] ring-1 ring-[#1a1626]/10 transition-all duration-300 hover:bg-[#9d3d27] hover:shadow-[0_6px_20px_rgba(26,22,38,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4472e] motion-reduce:transition-none sm:bottom-8 sm:right-8 sm:size-12 ${
        visible
          ? "translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      <ArrowUp className="size-5 sm:size-5" aria-hidden="true" />
    </button>
  );
}
