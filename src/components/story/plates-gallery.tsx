"use client";

/**
 * plates-gallery.tsx: "The Plates", a full-bleed CSS-Grid mosaic of the
 * fourteen verified archive photographs, with an accessible lightbox.
 *
 * Layout maths (no white gaps anywhere):
 *   • mobile  : 2 columns × 7 rows          (14 singles, perfectly filled)
 *   • ≥sm     : 4 columns × 5 rows          (I + VII span 2×2 = 8 cells,
 *                                              12 singles = 12 cells → 20
 *                                              cells = exactly 5 full rows)
 *   • Single plates define row height via aspect-[4/3]; 2×2 plates stretch
 *     across two rows (sm:aspect-auto), so every cell is completely filled.
 *   • Photos are edge-to-edge (object-cover, no white frame); captions sit on
 *     an ink gradient overlay instead of a white strip below the photo.
 *
 * • Each plate opens in a Dialog (keyboard: Esc to close, focus is trapped).
 * • next/image `fill` + `sizes` serves correctly sized WebP per viewport.
 */

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PLATES } from "@/lib/story-data";

export function PlatesGallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const plate = openIdx !== null ? PLATES[openIdx] : null;
  const isFeature = (span: string) => span.includes("row-span-2");

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {PLATES.map((p, i) => (
          <figure
            key={p.src}
            className={`group relative aspect-[4/3] overflow-hidden ring-1 ring-[#1a1626]/10 ${p.span} ${
              isFeature(p.span) ? "sm:aspect-auto" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              className="absolute inset-0 block h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4472e]"
              aria-label={`Open Plate ${p.numeral}: ${p.caption}`}
            >
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes={isFeature(p.span) ? "(max-width: 640px) 50vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                style={{ objectPosition: p.focus ?? "center" }}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              {/* Caption: ink gradient overlay, no white strip below the photo */}
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a1626]/90 via-[#1a1626]/45 to-transparent p-2.5 pt-10 text-left sm:p-3 sm:pt-12"
                aria-hidden="true"
              >
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#e8a28f] sm:text-[10px]">
                  Plate {p.numeral} · {p.act}
                </span>
                <span className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-white/90 sm:text-xs sm:leading-relaxed">
                  {p.caption}
                </span>
              </span>
              {/* Hover affordance (desktop) */}
              <span className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-[#1a1626]/0 transition-colors duration-300 group-hover:bg-[#1a1626]/20 sm:flex">
                <Expand
                  className="size-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </button>
          </figure>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-3xl border-[#1a1626]/10 bg-[#f6f3ee] p-3 sm:p-4">
          {plate && (
            <div>
              <DialogTitle className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b4472e]">
                Plate {plate.numeral} · {plate.act} · {plate.tag}
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-relaxed text-[#1a1626]">
                {plate.caption}
              </DialogDescription>
              <div className="mt-3">
                <Image
                  src={plate.src}
                  alt={plate.caption}
                  width={plate.width}
                  height={plate.height}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="mx-auto h-auto max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>
              <p className="mt-2 text-[11px] text-[#6f6a7c]">
                Binti Rising Initiative archive, Nairobi team folder, traceable via
                manifest.json · release nairobi-photos-v1.0
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
