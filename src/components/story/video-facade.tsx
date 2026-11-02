"use client";

/**
 * video-facade.tsx — Act III · The Voice.
 *
 * Click-to-play facade: the YouTube iframe is injected ONLY after the reader
 * presses play, so no third-party script or ~1 MB of media is loaded on page
 * view (loading-efficiency requirement). The poster is a real photograph from
 * the Nairobi archive (Plate XII — the SRHR screening).
 *
 * Featured film: "What Is Sexual and Reproductive Health and Rights?"
 * by Global Citizen — https://www.youtube.com/watch?v=snc-fAeslH4
 * (Swap SRHR_VIDEO_ID for the initiative's own SRHR film when published.)
 */

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Film } from "lucide-react";

const SRHR_VIDEO_ID = "snc-fAeslH4";
const SRHR_VIDEO_TITLE = "What Is Sexual and Reproductive Health and Rights?";
const SRHR_VIDEO_BY = "Global Citizen";

export function VideoFacade() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
      {/* Poster / player — Grid takes 3 of 5 columns on desktop */}
      <div className="lg:col-span-3">
        <div className="relative aspect-video w-full overflow-hidden bg-white shadow-[0_2px_40px_rgba(26,22,38,0.14)]">
          {playing ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${SRHR_VIDEO_ID}?autoplay=1&rel=0`}
              title={`${SRHR_VIDEO_TITLE} — ${SRHR_VIDEO_BY}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Poster: a verified archive photograph */}
              <Image
                src="/nairobi-team/nairobi-12.webp"
                alt="Poster: a youth session watching SRHR video content together — Plate XII of the Nairobi archive"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
              {/* Play overlay — replaced entirely by the iframe once clicked */}
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center bg-[#1a1626]/35 transition-colors hover:bg-[#1a1626]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4472e]"
                aria-label={`Play: ${SRHR_VIDEO_TITLE} — ${SRHR_VIDEO_BY}`}
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-[#b4472e] text-white shadow-lg transition-transform duration-300 group-hover:scale-110 sm:size-20">
                  <Play className="size-7 translate-x-0.5 sm:size-8" aria-hidden="true" />
                </span>
                <span className="absolute bottom-3 left-3 rounded bg-[#f6f3ee]/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1a1626]">
                  Understanding SRHR · Empowerment Through Education
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chapter text — 2 of 5 columns (section heading lives in page.tsx) */}
      <div className="flex flex-col justify-center lg:col-span-2">
        <p className="text-sm leading-relaxed text-[#6f6a7c]">
          Plate VII — the screening: SRHR, told in their own language. Press play to watch the
          guide with your cohort, or use it in your own facilitation sessions.
        </p>
        {/* Featured film credit */}
        <div className="mt-5 rounded-md border border-[#1a1626]/10 bg-white/60 p-4">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b4472e]">
            <Film className="size-4" aria-hidden="true" />
            Now playing
          </p>
          <p className="mt-2 text-sm font-bold leading-snug text-[#1a1626]">
            {SRHR_VIDEO_TITLE}
          </p>
          <p className="text-xs text-[#6f6a7c]">by {SRHR_VIDEO_BY}</p>
          <a
            href={`https://www.youtube.com/watch?v=${SRHR_VIDEO_ID}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-xs font-semibold text-[#b4472e] hover:underline"
          >
            <ExternalLink className="size-3.5" aria-hidden="true" />
            Watch on YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
