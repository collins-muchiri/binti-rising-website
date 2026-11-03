import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/story-data";

/**
 * Branded 404 page (Next.js App Router `not-found.tsx` convention).
 *
 * Per the Vercel SEO Playbook's "Fixing dead ends" section:
 *  - tell the user plainly they have hit a missing page (a correct 404
 *    status is returned, so crawlers de-index the URL instead of confusing
 *    it with real content);
 *  - never loop back to the homepage silently — offer explicit paths;
 *  - link to the site's best content so the journey continues: the story
 *    (home), the photo plates, and the get-involved section;
 *  - keep it light, on-brand, and quick to leave.
 */

export const metadata: Metadata = {
  title: "Page not found | Binti Rising Initiative",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f6f3ee] px-4 py-16 text-[#1a1626]">
      <div className="w-full max-w-xl text-center">
        {/* Eyebrow: the "act" styling used across the monograph. */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#b4472e]">
          404 · Off the page
        </p>
        <h1 className="mt-4 font-display text-4xl italic leading-tight sm:text-5xl">
          This page is not part of the monograph.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#1a1626]/70">
          The address you followed doesn&apos;t exist here. The story,
          however, continues exactly where it always has.
        </p>

        {/* Paths onward: home, plates, get involved (anchors on the one-page site). */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-[#b4472e] text-[#f6f3ee] hover:bg-[#9d3d27]">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Return to the story
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#1a1626]/25 text-[#1a1626] hover:bg-[#1a1626]/5">
            <Link href="/#plates">
              <BookOpen className="mr-2 size-4" aria-hidden="true" />
              Browse the plates
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-[#1a1626]/25 text-[#1a1626] hover:bg-[#1a1626]/5">
            <Link href="/#get-involved">
              <HeartHandshake className="mr-2 size-4" aria-hidden="true" />
              Get involved
            </Link>
          </Button>
        </div>

        <p className="mt-10 text-xs text-[#1a1626]/50">
          Binti Rising Initiative · Reg No NC/SD/CBO/2026/0123, Kiambu, Kenya ·{" "}
          <a
            href={`mailto:${CONTACT.email}`}
            className="underline decoration-[#b4472e]/50 underline-offset-2 hover:text-[#b4472e]"
          >
            {CONTACT.email}
          </a>
        </p>
      </div>
    </main>
  );
}
