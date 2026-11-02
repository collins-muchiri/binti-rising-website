'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

const stories = [
  {
    name: 'Amina Wanjiku',
    location: 'Kayole, Nairobi',
    quote:
      'Before joining Binti Rising, I had no idea about my reproductive health rights. The SRHR sessions gave me knowledge and confidence I never had. Now I help other young women in Kayole understand their bodies and make informed choices about their health.',
    pillar: 'SRHR',
    initials: 'AW',
  },
  {
    name: 'Wanjiru Njoroge',
    location: 'Kibra, Nairobi',
    quote:
      'The financial literacy program changed my life completely. I learned how to budget, save, and even started a small business selling handmade jewelry. For the first time, I feel economically independent and hopeful about my future.',
    pillar: 'Financial Freedom',
    initials: 'WN',
  },
  {
    name: 'Faith Atieno',
    location: 'Dagoretti, Nairobi',
    quote:
      'Mental health was never something we talked about in my community. Binti Rising created a safe space for us to share our struggles. I learned coping strategies that help me every day. I am stronger and more resilient now.',
    pillar: 'Mental Health',
    initials: 'FA',
  },
  {
    name: 'Njeri Kamau',
    location: 'Mathare, Nairobi',
    quote:
      'The Women Empowerment program taught me that my voice matters. I now speak up at community meetings and advocate for girls\' education. I never saw myself as a leader, but Binti Rising helped me discover my potential.',
    pillar: 'Leadership',
    initials: 'NK',
  },
  {
    name: 'Akello Obondo',
    location: 'Embakasi, Nairobi',
    quote:
      'After completing all four program pillars, I became a peer mentor. I now help new participants navigate the program and share my own journey. Watching other young women transform is the most rewarding experience of my life.',
    pillar: 'SRHR',
    initials: 'AO',
  },
  {
    name: 'Syombua Musyoka',
    location: 'Rongai, Nairobi',
    quote:
      'I used to think starting a business was only for people with capital. Through Binti\'s entrepreneurship sessions, I learned that with KES 500 and determination, I could start something meaningful. Today I run a small grocery kiosk.',
    pillar: 'Financial Freedom',
    initials: 'SM',
  },
];

const partners = [
  'Nairobi County Government',
  'Nairobi City County Health Dept.',
  'Local Community Health Units',
  'Women\'s Groups in Nairobi',
  'Nairobi Youth Organizations',
  'Local Health Facilities',
];

export default function Stories() {
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
    <section id="stories" ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            Act IV · In Their Own Words
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Voices carry further than <em className="text-voilet">flyers.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
            Hear from the young women across Nairobi whose lives have been transformed through our programs.
            Their stories inspire our work every day.
          </p>
        </div>

        {/* Pull-quotes — editorial two-column flow */}
        <div className="mt-14 columns-1 md:columns-2 gap-10 [column-fill:_balance]">
          {stories.map((story, i) => (
            <blockquote
              key={story.name}
              className={`break-inside-avoid mb-10 border-l-2 border-voilet/70 pl-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <p className="font-display italic text-xl sm:text-[1.35rem] leading-snug text-ink">
                &ldquo;{story.quote}&rdquo;
              </p>
              <footer className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span className="font-medium text-ink">{story.name}</span>
                <span className="inline-flex items-center gap-1 text-mist text-xs">
                  <MapPin className="w-3 h-3" aria-hidden="true" />
                  {story.location}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-voilet border border-voilet/30 px-2 py-0.5">
                  {story.pillar}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Community Partners — colophon list */}
        <div className={`mt-16 border-t border-ink/10 pt-10 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <h3 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-ink text-center">
            Our Community Partners
          </h3>
          <p className="text-xs text-mist text-center mt-2">Working together for lasting impact across Nairobi</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {partners.map((partner) => (
              <li key={partner} className="text-sm text-mist hover:text-voilet transition-colors">
                {partner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
