'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Users, MapPin, BookOpen, Star, Heart } from 'lucide-react';

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Young Women Reached' },
  { icon: MapPin, value: 10, suffix: '+', label: 'Nairobi Communities' },
  { icon: BookOpen, value: 26, suffix: '+', label: 'Sessions Completed' },
  { icon: Star, value: 50, suffix: '+', label: 'Community Partners' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span ref={(node) => {
      if (node && !started) {
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
          { threshold: 0.5 }
        );
        observer.observe(node);
      }
    }}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
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
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            Act I · The Circle
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Nothing begins with a{' '}
            <em className="text-voilet">lesson.</em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12">
          {/* Text Content */}
          <div className={isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}>
            <p className="text-mist text-base sm:text-lg leading-relaxed">
              <strong className="text-ink">Binti Rising Initiative</strong> is a registered
              Community-Based Organization in Kenya, dedicated to transforming the lives of young women
              aged 15&ndash;25. Founded in 2024, we work across{' '}
              <strong className="text-ink">10+ communities in Nairobi</strong> to provide
              holistic empowerment programs that address the real needs of young women in the city.
            </p>
            <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
              Our comprehensive approach addresses the interconnected challenges young women face from
              limited access to sexual and reproductive health education, to mental health struggles,
              financial barriers, and gender-based violence. We believe in meeting young women where
              they are and walking alongside them on their journey to empowerment.
            </p>
            <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
              Through our four program pillars — <strong className="text-ink">SRHR</strong>,{' '}
              <strong className="text-ink">Mental Health</strong>,{' '}
              <strong className="text-ink">Financial Freedom</strong>, and{' '}
              <strong className="text-ink">Women Empowerment</strong> — we&apos;re building
              a generation of informed, resilient, and economically independent young women leaders.
            </p>

            {/* Why Support BINTI - Donor paragraph, set as a marginal note */}
            <aside className="mt-8 border-l-2 border-voilet pl-5 py-1">
              <h3 className="font-display text-lg text-ink flex items-center gap-2">
                <Heart className="w-4 h-4 text-voilet" aria-hidden="true" />
                Why support Binti?
              </h3>
              <p className="text-mist text-sm leading-relaxed mt-2">
                Every shilling donated to Binti Rising goes directly toward transforming a young woman&apos;s life.
                Our evidence-based programs are aligned with UN Sustainable Development Goals and measured
                through rigorous monitoring and evaluation. With over 500 young women already reached across
                Nairobi communities, your investment creates ripple effects — empowered women lift families
                and communities out of poverty.
              </p>
            </aside>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-mist">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-voilet text-voilet" aria-hidden="true" />
                ))}
                <span className="ml-1.5">Registered CBO</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-parchment text-mist">
                <MapPin className="w-3.5 h-3.5 text-voilet" aria-hidden="true" />
                Nairobi, Kenya
              </span>
            </div>
          </div>

          {/* Plate */}
          <figure className={isVisible ? 'animate-slide-in-right' : 'opacity-0'}>
            <div className="bg-white p-2 sm:p-3 plate-shadow">
              <Image
                src="/nairobi-team/nairobi-11.webp"
                alt="A large dialogue circle of young women in a community hall in Nairobi"
                width={720}
                height={1280}
                className="w-full h-auto object-cover"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-mist">
              <span>
                <span className="font-semibold text-ink">Plate II.</span> The dialogue circle —
                where every voice is heard first.
              </span>
              <span className="tracking-[0.2em] uppercase text-[10px]">Community hall, Nairobi</span>
            </figcaption>
          </figure>
        </div>

        {/* Stats Counter Row — ruled ledger style */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-cream px-6 py-8 text-center transition-colors hover:bg-white ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <stat.icon className="w-5 h-5 text-voilet mx-auto mb-3" aria-hidden="true" />
              <div className="font-display text-4xl sm:text-5xl text-ink">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-[11px] tracking-[0.15em] uppercase text-mist font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
