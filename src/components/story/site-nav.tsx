"use client";

/**
 * site-nav.tsx: sticky chapter navigation for the six-act monograph.
 *
 * • Desktop: inline anchor links + a reading-progress bar (CSS Grid/Flexbox).
 * • Mobile:  a Sheet menu (44px touch targets throughout).
 * • The active act is tracked with an IntersectionObserver so readers always
 *   know which chapter they are in.
 */

import { useEffect, useState } from "react";
import { Menu, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/story-data";

export function SiteNav() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Reading progress: how far the reader has scrolled through the monograph.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is currently in view (by the top third of the viewport).
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-33% 0px -60% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const linkClasses = (href: string) =>
    `text-sm transition-colors hover:text-[#1a1626] ${
      active === href ? "text-[#1a1626] font-semibold" : "text-[#6f6a7c]"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-[#1a1626]/10 bg-[#f6f3ee]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Wordmark */}
        <a
          href="#home"
          className="flex min-h-[44px] items-center gap-2 font-semibold leading-tight"
          aria-label="Binti Rising Initiative, back to the cover"
        >
          <BookOpen className="size-5 shrink-0" aria-hidden="true" />
          <span className="flex flex-col">
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#6f6a7c]">
              Binti Rising Initiative
            </span>
            <span className="text-sm sm:text-base">From Silence, She Rises</span>
          </span>
        </a>

        {/* Desktop nav (Flexbox row) */}
        <nav aria-label="Chapters" className="ml-auto hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.label}
            </a>
          ))}
          <Button
            asChild
            size="sm"
            className="bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85 min-h-[44px]"
          >
            <a href="#get-involved">Support a Journey</a>
          </Button>
        </nav>

        {/* Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto size-11 shrink-0 border-[#1a1626]/25 lg:hidden"
              aria-label="Open chapter menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 border-[#1a1626]/10 bg-[#f6f3ee]">
            <SheetTitle className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6f6a7c]">
              Chapters
            </SheetTitle>
            <nav aria-label="Chapters" className="mt-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-base transition-colors hover:bg-[#1a1626]/5 ${
                    active === link.href ? "font-semibold text-[#1a1626]" : "text-[#6f6a7c]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-3 bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85 min-h-[44px]">
                <a href="#get-involved" onClick={() => setOpen(false)}>
                  Support a Journey
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Reading-progress bar */}
      <div aria-hidden="true" className="h-0.5 w-full bg-[#1a1626]/10">
        <div
          className="h-full bg-[#b4472e] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </header>
  );
}
