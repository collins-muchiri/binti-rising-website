import { ImageResponse } from "next/og";

/**
 * Dynamic Open Graph / Twitter card image (Next.js Metadata file convention).
 *
 * Implements the Vercel SEO Playbook's "dynamic OG images" recommendation:
 * a 1200×630 landscape social card rendered with next/og (Satori) at build
 * time (static route, no per-request cost) and served from the site's own
 * origin. This replaces the previous square 1024×1024 logo, which social
 * platforms crop inconsistently — 1200×630 is the canonical OG size and
 * fills link previews on Facebook/X/LinkedIn/WhatsApp/iMessage fully.
 *
 * Because this file-convention route exists, Next.js automatically injects
 * `og:image`, `og:image:width/height/alt` and the Twitter fallback into the
 * page head (the explicit `images` entries were removed from layout.tsx
 * metadata so this convention takes effect).
 *
 * Design: the site's monograph palette — ink background, paper type, clay
 * accents — with the organisation name, slogan and registration line.
 */

export const alt =
  "Binti Rising Initiative — From Silence, She Rises. Empowering adolescent girls and young women in Nairobi, Kenya.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Palette mirrors the site styles (ink / paper / clay). */
const INK = "#1a1626";
const PAPER = "#f6f3ee";
const CLAY = "#b4472e";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          color: PAPER,
          padding: "72px 84px",
          // Clay spine along the left edge, echoing the site's section rails.
          borderLeft: `20px solid ${CLAY}`,
        }}
      >
        {/* Top row: organisation name + registration */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 34,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: PAPER,
              opacity: 0.85,
            }}
          >
            Binti Rising Initiative
          </div>
          <div style={{ fontSize: 22, color: PAPER, opacity: 0.5 }}>
            Reg No NC/SD/CBO/2026/0123
          </div>
        </div>

        {/* Middle: slogan in two tones, the visual anchor of the card */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 700,
              color: PAPER,
            }}
          >
            From Silence,
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 700,
              color: CLAY,
            }}
          >
            She Rises.
          </div>
        </div>

        {/* Bottom row: mission line + URL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            borderTop: `1px solid ${PAPER}33`,
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 32, color: PAPER, opacity: 0.9 }}>
            Empowering adolescent girls &amp; young women in Nairobi, Kenya
          </div>
          <div style={{ fontSize: 26, color: CLAY, display: "flex" }}>
            binti-rising-initiative.vercel.app
          </div>
        </div>
      </div>
    ),
    size,
  );
}
