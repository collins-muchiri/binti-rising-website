'use client';

import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';

interface Leader {
  name: string;
  title: string;
  initials: string;
  bio: string;
}

const leaders: Leader[] = [
  {
    name: 'Binti Founder',
    title: 'Founder & Executive Director',
    initials: 'ED',
    bio: 'Visionary leader driving Binti\'s mission to empower young women across Nairobi communities.',
  },
  {
    name: 'Programs Manager',
    title: 'Programs Manager',
    initials: 'PM',
    bio: 'Oversees all 4 program pillars, ensuring quality delivery and alignment with community needs.',
  },
  {
    name: 'M&E Lead',
    title: 'Monitoring & Evaluation Lead',
    initials: 'ME',
    bio: 'Ensures evidence-based programming through rigorous data collection and impact measurement.',
  },
  {
    name: 'Finance Lead',
    title: 'Finance & Admin Lead',
    initials: 'FA',
    bio: 'Manages financial systems, compliance, and administrative operations with transparency.',
  },
  {
    name: 'Board Chairperson',
    title: 'Board Chairperson',
    initials: 'BC',
    bio: 'Provides strategic governance, oversight, and guidance for organizational growth and impact.',
  },
  {
    name: 'Board Secretary',
    title: 'Board Secretary',
    initials: 'BS',
    bio: 'Ensures compliance, governance standards, and documentation across all board activities.',
  },
];

export default function Leadership() {
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
    <section id="leadership" ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            The Stewards
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            A team that keeps the <em className="text-voilet">promise.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
            A dedicated team of professionals and volunteers committed to empowering young women
            across Nairobi, Kenya.
          </p>
        </div>

        {/* Leadership roster — ruled index style */}
        <div className={`mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          {leaders.map((leader) => (
            <article key={leader.title} className="group bg-cream hover:bg-white transition-colors p-6">
              <div className="flex items-center gap-4">
                {/* Initials plate */}
                <div
                  className="w-14 h-14 shrink-0 bg-ink text-cream font-display text-lg flex items-center justify-center"
                  aria-hidden="true"
                >
                  {leader.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-ink text-base truncate">{leader.name}</h3>
                  <p className="text-[11px] tracking-[0.15em] uppercase text-mist font-medium mt-0.5">
                    {leader.title}
                  </p>
                </div>
                <button
                  aria-label={`${leader.name} LinkedIn profile`}
                  className="w-9 h-9 shrink-0 flex items-center justify-center text-mist/50 hover:text-voilet transition-colors"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <p className="mt-4 text-sm text-mist leading-relaxed">{leader.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
