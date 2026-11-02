'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { TrendingUp, Target, Heart, Banknote } from 'lucide-react';

const kpis = [
  {
    name: 'Knowledge Level',
    before: 40,
    target: 80,
    description: 'SRHR, health, and rights knowledge',
  },
  {
    name: 'Service Utilization',
    before: 15,
    target: 60,
    description: 'Health services access and utilization',
  },
  {
    name: 'Mental Wellbeing',
    before: 30,
    target: 70,
    description: 'Overall mental health scores',
  },
  {
    name: 'Savings Habits',
    before: 20,
    target: 65,
    description: 'Regular saving behavior among participants',
  },
  {
    name: 'Leadership Skills',
    before: 25,
    target: 70,
    description: 'Self-rated leadership competency',
  },
  {
    name: 'GBV Awareness',
    before: 35,
    target: 75,
    description: 'Gender-based violence awareness and reporting',
  },
];

const donationImpact = [
  { amount: 'KES 1,000', impact: '1 session for a young woman' },
  { amount: 'KES 5,000', impact: 'Complete pillar training (6-8 sessions)' },
  { amount: 'KES 10,000', impact: 'Materials & supplies for a cohort of 20' },
  { amount: 'KES 20,000', impact: 'Sponsor an entire cohort of 20 young women' },
  { amount: 'KES 50,000', impact: 'Fund a full program cycle for one community' },
];

function ProgressBar({ before, target, index, isVisible }: {
  before: number;
  target: number;
  index: number;
  isVisible: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-mist">Baseline: {before}%</span>
        <span className="text-ink font-semibold">Target: {target}%</span>
      </div>
      <div className="relative h-1.5 bg-ink/10 overflow-hidden">
        {/* Baseline rule */}
        <div
          className={`absolute top-0 left-0 h-full bg-mist/40 ${isVisible ? 'animate-progress' : ''}`}
          style={{ width: `${before}%`, animationDelay: `${index * 0.15}s` }}
        />
        {/* Target fill */}
        <div
          className={`absolute top-0 left-0 h-full bg-voilet ${isVisible ? 'animate-progress' : ''}`}
          style={{ width: `${target}%`, animationDelay: `${index * 0.15 + 0.3}s` }}
        />
      </div>
    </div>
  );
}

export default function Impact() {
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
    <section id="impact" ref={sectionRef} className="py-20 md:py-28 bg-white border-y border-ink/10 relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4 inline-flex items-center gap-2">
            <Target className="w-3.5 h-3.5" aria-hidden="true" />
            Act V · The Proof — Monitoring &amp; Evaluation
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Then the corridor becomes <em className="text-voilet">a stage.</em>
          </h2>
        </div>

        {/* Narrative */}
        <div className={`max-w-3xl mt-8 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <p className="text-mist text-base sm:text-lg leading-relaxed">
            Every young woman who joins Binti Rising in Nairobi experiences measurable change. Our evidence-based
            programs track 6 key performance indicators — from SRHR knowledge and health service utilization to
            mental wellbeing, savings habits, leadership skills, and GBV awareness. The results speak for
            themselves: young women who enter our programs with limited knowledge leave as informed, resilient,
            and economically empowered leaders.
          </p>
          <p className="text-ink text-base sm:text-lg font-medium mt-4">
            Every KES you invest creates a measurable, lasting impact in a young woman&apos;s life.
          </p>
        </div>

        {/* KPI ledger */}
        <div className={`mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          {kpis.map((kpi, i) => (
            <div key={kpi.name} className="bg-white p-6 hover:bg-cream/50 transition-colors">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-4 h-4 text-voilet shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-ink font-medium text-base">{kpi.name}</h3>
                  <p className="text-mist text-xs mt-0.5">{kpi.description}</p>
                </div>
              </div>

              <div className="flex items-end gap-3 mb-5">
                <span className="font-display text-5xl text-ink leading-none">{kpi.before}%</span>
                <svg className="w-5 h-5 text-voilet mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="font-display text-4xl text-voilet leading-none">{kpi.target}%</span>
              </div>

              <ProgressBar before={kpi.before} target={kpi.target} index={i} isVisible={isVisible} />
            </div>
          ))}
        </div>

        {/* Proof plate */}
        <figure className={`mt-14 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div className="bg-white p-2 sm:p-3 plate-shadow">
            <Image
              src="/nairobi-team/nairobi-09.webp"
              alt="School group raising their certificates high in Nairobi"
              width={1599}
              height={720}
              className="w-full h-auto block"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-xs text-mist">
            <span>
              <span className="font-semibold text-ink">Plate XI.</span> Certificates, raised high —
              Nairobi, February 2026.
            </span>
            <span className="tracking-[0.2em] uppercase text-[10px]">The proof</span>
          </figcaption>
        </figure>

        {/* Impact Per KES Section */}
        <div className={`mt-16 ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          <div className="mb-8">
            <h3 className="font-display text-2xl text-ink inline-flex items-center gap-3">
              <Banknote className="w-5 h-5 text-voilet" aria-hidden="true" />
              Your Donation&apos;s Impact
            </h3>
            <p className="text-mist text-sm mt-2">
              Transparent, measurable outcomes for every contribution
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-ink/10 border border-ink/10">
            {donationImpact.map((item) => (
              <div key={item.amount} className="bg-white p-5 text-center hover:bg-cream/50 transition-colors">
                <div className="font-display text-xl text-voilet">{item.amount}</div>
                <div className="text-mist text-xs mt-2 leading-relaxed">{item.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* M&E Approach Note */}
        <div className={`mt-12 ${isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <p className="inline-flex items-start gap-3 border border-ink/15 bg-cream px-5 py-4 text-sm text-mist max-w-3xl leading-relaxed">
            <Heart className="w-4 h-4 text-voilet shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Our M&amp;E framework uses baseline and endline assessments, quarterly reviews, and participatory
              feedback to ensure programs are evidence-based and responsive to community needs.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
