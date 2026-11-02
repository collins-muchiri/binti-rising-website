'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

/**
 * The Plates — a photo essay drawn from the initiative's own Nairobi archive
 * (tagged `nairobi-photos-v1.0` on GitHub; every file traceable via manifest.json).
 * No stock imagery. Kenya DPA 2019 compliant: aggregates only, no personal identifiers.
 */
const plates = [
  {
    src: '/nairobi-team/nairobi-08.webp',
    numeral: 'VIII',
    alt: 'Session flipchart crossing out harmful gender myths and listing ten steps to support a friend',
    caption: 'Myths, marched off — a flipchart crosses out harmful gender norms and lists ten steps to support a friend.',
    theme: '#gender-equality',
    wide: true,
  },
  {
    src: '/nairobi-team/nairobi-03.webp',
    numeral: 'III',
    alt: 'Facilitators in team tees holding a Certificate of Achievement between two bouquets of balloons',
    caption: 'Facilitators with a Certificate of Achievement — Surround Sound Kenya tees, balloons, pride.',
    theme: '#achievement',
    wide: false,
  },
  {
    src: '/nairobi-team/nairobi-05.webp',
    numeral: 'V',
    alt: 'A young hand colouring a drawn flame during a creative expression workshop',
    caption: 'Hands stay busy — a young hand colours a flame during creative expression.',
    theme: '#expression',
    wide: false,
  },
  {
    src: '/nairobi-team/nairobi-10.webp',
    numeral: 'X',
    alt: 'Olympic Handball Team in orange kits facing a congratulations board',
    caption: 'Olympic Handball Team (SSK · MTV Shuga · Shujaaz) before the congratulations board.',
    theme: '#sports',
    wide: false,
  },
  {
    src: '/nairobi-team/nairobi-06.webp',
    numeral: 'VI',
    alt: 'Uniformed participants holding up their certificates in a settlement corridor',
    caption: 'Graduation in the corridor — uniformed participants lift their certificates.',
    theme: '#graduation',
    wide: false,
  },
  {
    src: '/nairobi-team/nairobi-12.webp',
    numeral: 'XII',
    alt: 'Youth screening session watching SRHR video content together',
    caption: 'Learning by screening — a youth session watches SRHR video content together.',
    theme: '#srhr',
    wide: false,
  },
  {
    src: '/nairobi-team/nairobi-13.webp',
    numeral: 'XIII',
    alt: 'Young Kings SA team holding Shujaaz magazines, health communication materials',
    caption: 'Materials that speak — the team holds Shujaaz magazines, health communication for young people.',
    theme: '#shujaaz',
    wide: true,
  },
];

export default function Plates() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="plates" ref={sectionRef} className="py-20 md:py-28 bg-cream border-y border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            The Plates · Nairobi Archive
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Fourteen photographs, <em className="text-voilet">one arc.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
            Every image on this page comes from the initiative&apos;s own Google Drive
            &ldquo;Nairobi&rdquo; folder — no stock photography, no invented scenes. Each file is
            traceable through <span className="text-ink font-medium">manifest.json</span> and tagged{' '}
            <span className="text-ink font-medium">nairobi-photos-v1.0</span> in the public release.
          </p>
        </div>

        {/* Photo essay grid */}
        <div className={`mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          {plates.map((plate, i) => (
            <figure
              key={plate.numeral + plate.src}
              className={plate.wide ? 'sm:col-span-2' : ''}
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              <div className="bg-white p-2 sm:p-3 plate-shadow">
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  width={plate.wide ? 1600 : 1200}
                  height={plate.wide ? 900 : 1600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-mist">
                <span className="max-w-md">
                  <span className="font-semibold text-ink">Plate {plate.numeral}.</span> {plate.caption}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-voilet">{plate.theme}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Download note */}
        <div className={`mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border border-ink/15 bg-white px-6 py-5 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <p className="text-sm text-mist text-center sm:text-left max-w-xl">
            The complete pack — all fourteen photographs, credits and manifest — is published as an
            open release for press and partner use.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-ink/25 text-ink hover:bg-ink/5 rounded-none shrink-0 min-h-[44px]"
          >
            <a
              href="https://github.com/collins-muchiri/binti-rising-website/releases/tag/nairobi-photos-v1.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
              Photo release v1.0
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
