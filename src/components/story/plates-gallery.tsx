"use client";

/**
 * plates-gallery.tsx — "The Plates": an editorial CSS-Grid mosaic of the
 * fourteen verified archive photographs, with an accessible lightbox.
 *
 * • Each plate opens in a Dialog (keyboard: Esc to close, focus is trapped).
 * • Captions carry the act and the archive tag, like a printed monograph.
 * • next/image serves correctly sized WebP per viewport (script/payload
 *   optimisation — the raw plates are never loaded larger than needed).
 */

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PLATES } from "@/lib/story-data";

export function PlatesGallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const plate = openIdx !== null ? PLATES[openIdx] : null;

  return (
    <>
      {/* Editorial mosaic: 1 column on mobile, 4-column grid on larger screens.
          Feature plates (I and XIV) span 2×2 to create the printed-spread rhythm. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {PLATES.map((p, i) => (
          <figure key={p.src} className={`bg-white p-2 shadow-[0_2px_24px_rgba(26,22,38,0.10)] ${p.span}`}>
            <button
              type="button"
              onClick={() => setOpenIdx(i)}
              className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b4472e]"
              aria-label={`Open Plate ${p.numeral} — ${p.caption}`}
            >
              <Image
                src={p.src}
                alt={p.caption}
                width={1200}
                height={900}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Hover affordance (desktop) */}
              <span className="absolute inset-0 hidden items-center justify-center bg-[#1a1626]/0 transition-colors duration-300 group-hover:bg-[#1a1626]/25 sm:flex">
                <Expand
                  className="size-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </button>
            <figcaption className="px-1 pb-1 pt-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b4472e]">
                Plate {p.numeral} · {p.act}
              </span>
              <p className="mt-1 text-xs leading-relaxed text-[#6f6a7c]">{p.caption}</p>
            </figcaption>
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
              <div className="mt-3 bg-white p-2">
                <Image
                  src={plate.src}
                  alt={plate.caption}
                  width={1600}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
              <p className="mt-2 text-[11px] text-[#6f6a7c]">
                Binti Rising Initiative archive — Nairobi team folder, traceable via
                manifest.json · release nairobi-photos-v1.0
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
