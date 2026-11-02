'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown, FileText, ShieldCheck, Globe, BarChart3 } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleScrollDown = () => {
    const about = document.querySelector('#about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-cream overflow-hidden border-b border-ink/10"
    >
      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        {/* Masthead eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4 animate-fade-in">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-ink">
            Binti Rising Initiative
          </p>
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-mist">
            A Photographic Monograph · Nairobi
          </p>
        </div>

        {/* Display headline */}
        <h1 className="mt-10 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-ink animate-fade-in-up">
          From Silence,
          <br />
          <em className="text-voilet">She Rises.</em>
        </h1>

        <p className="mt-8 max-w-2xl text-base sm:text-lg text-mist leading-relaxed animate-fade-in-up delay-100">
          In Kibera, Mathare and Kawangware, the Binti Rising Initiative runs a peer-led
          mentorship programme — the Journey to Wholeness — for adolescent girls and young
          women aged 15&ndash;25. This monograph follows one arc through fourteen plates from
          the team&apos;s own archive: community circles, classrooms, quiet craft, loud
          celebration, and the measured proof that lives are changing.
        </p>

        <p className="mt-4 max-w-2xl text-base sm:text-lg text-ink font-medium leading-relaxed animate-fade-in-up delay-200">
          Your support directly transforms young women&apos;s lives in Nairobi.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-300">
          <Button
            asChild
            size="lg"
            className="bg-ink text-cream hover:bg-ink/85 rounded-none px-8 min-h-[48px] text-base tracking-wide"
          >
            <a href="#get-involved">Support a Journey</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-ink/25 text-ink hover:bg-ink/5 rounded-none px-8 min-h-[48px] text-base"
          >
            <a href="/binti-rising-monograph.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
              Read the Monograph (PDF)
            </a>
          </Button>
        </div>

        {/* Trust line — set as a quiet colophon row */}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/10 pt-5 animate-fade-in delay-500">
          {[
            { icon: ShieldCheck, label: 'Registered CBO' },
            { icon: Globe, label: 'UN-aligned Programs' },
            { icon: BarChart3, label: 'Evidence-based M&E' },
          ].map((badge) => (
            <span key={badge.label} className="inline-flex items-center gap-2 text-xs text-mist">
              <badge.icon className="w-3.5 h-3.5 text-voilet" aria-hidden="true" />
              {badge.label}
            </span>
          ))}
          <span className="inline-flex items-center gap-2 text-xs text-mist">
            <span className="font-display text-base text-ink">500+</span> Young Women
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-mist">
            <span className="font-display text-base text-ink">10+</span> Communities
          </span>
          <span className="inline-flex items-center gap-2 text-xs text-mist">
            <span className="font-display text-base text-ink">26</span> Sessions
          </span>
        </div>

        {/* Opening plate — the circle of trust */}
        <figure className="mt-12 animate-fade-in-up delay-500">
          <div className="bg-white p-2 sm:p-3 plate-shadow">
            <Image
              src="/nairobi-team/nairobi-01.webp"
              alt="Hands joined in a close circle beneath a community tent during a BINTI Rising peer session"
              width={1200}
              height={1600}
              className="w-full h-auto block"
              priority
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-mist">
            <span>
              <span className="font-semibold text-ink">Plate I.</span> Nothing begins with a
              lesson — the opening circle of trust.
            </span>
            <span className="tracking-[0.2em] uppercase text-[10px]">
              Nairobi team archive
            </span>
          </figcaption>
        </figure>

        {/* Scroll indicator */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleScrollDown}
            className="flex flex-col items-center gap-1 text-mist hover:text-voilet transition-colors"
            aria-label="Scroll to the story"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Continue Reading</span>
            <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
