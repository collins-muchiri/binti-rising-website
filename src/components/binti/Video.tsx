'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export default function Video() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="video" ref={sectionRef} className="py-20 md:py-28 bg-white border-b border-ink/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            Act III · The Voice — Educational Content
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Learn about <em className="text-voilet">SRHR.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Watch our comprehensive guide on Sexual and Reproductive Health and Rights to
            understand key concepts and empowerment strategies.
          </p>
        </div>

        {/* Video plate */}
        <div className={`mt-12 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <div className="bg-white p-2 sm:p-3 plate-shadow">
            <div className="aspect-video bg-parchment flex items-center justify-center relative overflow-hidden">
              {/* Play Button */}
              <a
                href="https://www.youtube.com/embed/dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group/play"
                aria-label="Play the SRHR education video"
              >
                <div className="absolute inset-0 bg-ink/10 group-hover/play:bg-ink/25 transition-all duration-300" />
                <div className="flex items-center justify-center h-full relative">
                  <Button
                    size="lg"
                    className="relative bg-ink text-cream hover:bg-voilet rounded-full w-20 h-20 flex items-center justify-center transition-colors"
                  >
                    <Play className="w-8 h-8 fill-cream" aria-hidden="true" />
                  </Button>
                </div>
              </a>

              {/* Video Title Overlay */}
              <div className="absolute inset-0 flex items-end pointer-events-none">
                <div className="w-full p-6 bg-gradient-to-t from-ink/70 to-transparent">
                  <h3 className="text-cream font-medium text-lg">Understanding SRHR: Empowerment Through Education</h3>
                  <p className="text-cream/70 text-sm mt-1">A comprehensive guide for young women</p>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-mist">
            <span className="font-semibold text-ink">Plate VII.</span> The screening — SRHR, told
            in their own language.
          </figcaption>
        </div>

        {/* CTA Below Video */}
        <div className="mt-10 text-center">
          <p className="text-mist mb-4 text-sm">
            Want to join our programs? Learn more about our SRHR initiatives.
          </p>
          <Button
            asChild
            className="bg-ink text-cream hover:bg-ink/85 rounded-none px-8 min-h-[44px] tracking-wide"
          >
            <a href="#get-involved">Get Involved Today</a>
          </Button>
        </div>

        {/* Video Stats — ledger line */}
        <dl className={`mt-12 grid grid-cols-3 gap-px bg-ink/10 border border-ink/10 max-w-xl mx-auto ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          {[
            { label: 'Views', value: '2.5K+' },
            { label: 'Duration', value: '12 mins' },
            { label: 'Rating', value: '4.8/5' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white text-center px-3 py-5">
              <dd className="font-display text-2xl text-ink">{stat.value}</dd>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-mist mt-1.5">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
