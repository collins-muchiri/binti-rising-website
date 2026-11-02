"use client";

/**
 * kpi-section.tsx: Act V · The Proof.
 *
 * Six M&E indicators rendered as baseline→target bars with count-up numbers.
 * Animations trigger once, when the section scrolls into view, and are
 * skipped entirely for readers who prefer reduced motion.
 */

import { useEffect, useRef, useState } from "react";
import { KPIS } from "@/lib/story-data";

/** Count-up hook: animates 0 → value over ~1.2 s once visible. */
function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Defer by one frame: avoids synchronous setState inside the effect.
      const raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1200);
      // easeOutCubic for a natural settle
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return value;
}

function KpiRow({
  label,
  hint,
  baseline,
  target,
  run,
}: {
  label: string;
  hint: string;
  baseline: number;
  target: number;
  run: boolean;
}) {
  const shown = useCountUp(target, run);
  return (
    <li className="rounded-md border border-[#1a1626]/10 bg-white/60 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-[#1a1626]">{label}</h4>
          <p className="text-xs text-[#6f6a7c]">{hint}</p>
        </div>
        <p className="shrink-0 text-right text-sm text-[#6f6a7c]">
          <span aria-hidden="true">{run ? shown : baseline}</span>
          <span className="sr-only">{`baseline ${baseline}, target ${target}`}</span>
          <span className="mx-1">→</span>
          <span className="text-lg font-bold text-[#b4472e]">{target}</span>
        </p>
      </div>
      {/* Baseline→target bar (pure CSS width transitions) */}
      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#1a1626]/10"
        role="img"
        aria-label={`${label}: baseline ${baseline}, target ${target}`}
      >
        <div className="flex h-full">
          <div
            className="h-full bg-[#1a1626]/30 transition-[width] duration-1000 ease-out"
            style={{ width: run ? `${baseline}%` : "0%" }}
          />
          <div
            className="h-full bg-[#b4472e] transition-[width] duration-1000 ease-out"
            style={{ width: run ? `${target - baseline}%` : "0%" }}
          />
        </div>
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-wider text-[#6f6a7c]">
        Baseline {baseline} · Target {target}
      </p>
    </li>
  );
}

export function KpiSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {KPIS.map((kpi) => (
          <KpiRow key={kpi.label} {...kpi} run={run} />
        ))}
      </ul>
    </div>
  );
}
