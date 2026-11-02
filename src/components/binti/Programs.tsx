'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SessionTopic {
  title: string;
  desc: string;
}

interface ProgramDetail {
  numeral: string;
  iconTitle: string;
  fullDescription: string;
  sessions: SessionTopic[];
  outcomes: string[];
}

const programDetails: Record<string, ProgramDetail> = {
  SRHR: {
    numeral: 'I',
    iconTitle: 'Sexual & Reproductive Health Rights',
    fullDescription:
      'Our Sexual and Reproductive Health Rights (SRHR) program is the cornerstone of BINTI Rising\'s empowerment framework. Over 8 comprehensive sessions, young women gain critical knowledge about their bodies, health rights, and access to services that many have never received before. In Nairobi\'s communities, where cultural taboos often prevent open conversations about sexual health, this program creates a safe, judgment-free space for young women to learn, ask questions, and build confidence in making informed decisions about their reproductive health.',
    sessions: [
      { title: 'Understanding Your Body', desc: 'Anatomy, puberty changes, menstrual health, and hygiene management for young women.' },
      { title: 'Consent & Boundaries', desc: 'Understanding personal boundaries, recognizing consent, and saying no with confidence.' },
      { title: 'Family Planning Methods', desc: 'Overview of modern contraceptive methods, effectiveness, and accessing reproductive health services.' },
      { title: 'STIs & HIV Prevention', desc: 'Comprehensive education on sexually transmitted infections, prevention strategies, and testing.' },
      { title: 'Pregnancy & Maternal Health', desc: 'Antenatal care, nutrition during pregnancy, and safe delivery practices in Nairobi.' },
      { title: 'Gender-Based Violence Awareness', desc: 'Recognizing GBV, understanding legal protections, and knowing where to get help.' },
      { title: 'Body Image & Self-Esteem', desc: 'Building positive body image, resisting harmful beauty standards, and self-acceptance.' },
      { title: 'Accessing Health Services', desc: 'Navigating Nairobi\'s health facilities, understanding patient rights, and health insurance options.' },
    ],
    outcomes: [
      'Increased knowledge of SRHR from 40% to 80% baseline',
      'Improved utilization of reproductive health services',
      'Enhanced ability to recognize and report GBV',
      'Better menstrual health management practices',
      'Increased confidence in accessing health facilities',
    ],
  },
  MentalHealth: {
    numeral: 'II',
    iconTitle: 'Mental Health & Wellbeing',
    fullDescription:
      'Mental health remains one of the most stigmatized topics in Nairobi\'s communities. BINTI Rising\'s Mental Health & Wellbeing program breaks these barriers by creating supportive spaces where young women can openly discuss their emotional struggles. Over 6 structured sessions, participants learn evidence-based coping strategies, build emotional resilience, and develop self-care practices that serve them for life. Our facilitators are trained in psychological first aid and create an environment of trust and confidentiality.',
    sessions: [
      { title: 'Understanding Mental Health', desc: 'What mental health means, common conditions, and breaking stigma in our communities.' },
      { title: 'Stress Management', desc: 'Identifying stress triggers, practical coping techniques, and relaxation exercises.' },
      { title: 'Emotional Regulation', desc: 'Recognizing emotions, healthy expression techniques, and building emotional intelligence.' },
      { title: 'Self-Care Practices', desc: 'Creating daily self-care routines, mindfulness, and prioritizing mental wellbeing.' },
      { title: 'Building Support Systems', desc: 'Identifying trusted people, building healthy relationships, and knowing when to seek professional help.' },
      { title: 'Resilience & Goal Setting', desc: 'Bouncing back from adversity, personal visioning, and setting achievable life goals.' },
    ],
    outcomes: [
      'Improved mental wellbeing scores from 30% to 70%',
      'Reduced stigma around mental health discussions',
      'Established personal self-care routines',
      'Stronger peer support networks',
      'Increased willingness to seek professional help',
    ],
  },
  FinancialFreedom: {
    numeral: 'III',
    iconTitle: 'Financial Freedom & Literacy',
    fullDescription:
      'Economic empowerment is essential for young women\'s autonomy and independence. BINTI Rising\'s Financial Freedom & Literacy program equips participants with practical financial skills that many schools and families fail to teach. Over 6 hands-on sessions, young women learn budgeting, saving strategies, entrepreneurship basics, and how to navigate Nairobi\'s financial landscape. Many graduates have gone on to start small businesses, join savings groups (chamas), and become financially independent for the first time.',
    sessions: [
      { title: 'Financial Literacy Basics', desc: 'Understanding money, income vs. expenses, and why financial knowledge matters for women.' },
      { title: 'Budgeting & Money Management', desc: 'Creating personal budgets, tracking spending, and making smart financial decisions.' },
      { title: 'Saving Strategies', desc: 'Different saving methods, joining chamas (savings groups), building an emergency fund.' },
      { title: 'Entrepreneurship Basics', desc: 'Identifying business opportunities in Nairobi, writing a simple business plan, and starting small.' },
      { title: 'Understanding Credit & Loans', desc: 'How loans work, responsible borrowing, avoiding debt traps, and building credit history.' },
      { title: 'Income Generation & Networking', desc: 'Multiple income streams, leveraging networks in Nairobi, and digital financial tools like M-Pesa.' },
    ],
    outcomes: [
      'Regular saving habits increase from 20% to 65%',
      'Participants start income-generating activities',
      'Improved financial decision-making skills',
      'Formation of peer savings groups (chamas)',
      'Greater economic independence and confidence',
    ],
  },
  Leadership: {
    numeral: 'IV',
    iconTitle: 'Women Empowerment & Leadership',
    fullDescription:
      'The Women Empowerment & Leadership program is where young women discover their voice and power. Over 6 transformative sessions, participants develop self-advocacy skills, learn about their legal rights, and build the confidence to take on leadership roles in their communities. This program challenges harmful gender norms, fosters civic engagement, and creates a pipeline of young women leaders who will drive change in Nairobi and beyond. Graduates become ambassadors who mentor the next cohort.',
    sessions: [
      { title: 'Self-Advocacy & Communication', desc: 'Speaking up confidently, assertive communication, and expressing needs effectively.' },
      { title: 'Women\'s Rights & Legal Framework', desc: 'Understanding constitutional rights, gender equality laws, and legal protections for women in Kenya.' },
      { title: 'Leadership Skills Development', desc: 'Different leadership styles, team building, decision-making, and conflict resolution.' },
      { title: 'Community Engagement & Civic Participation', desc: 'Getting involved in community development, understanding local governance, and civic duties.' },
      { title: 'Gender Norms & Equality', desc: 'Challenging harmful stereotypes, promoting gender equality, and creating inclusive spaces.' },
      { title: 'Mentorship & Paying It Forward', desc: 'Becoming a mentor, sharing knowledge, and creating lasting impact in Nairobi communities.' },
    ],
    outcomes: [
      'Leadership competency scores rise from 25% to 70%',
      'Increased participation in community decision-making',
      'Stronger self-advocacy and communication skills',
      'Formation of peer mentorship networks',
      'Greater awareness of women\'s legal rights',
    ],
  },
};

const programs = [
  {
    title: 'Sexual & Reproductive Health Rights',
    shortTitle: 'SRHR',
    key: 'SRHR',
    sessions: 8,
    description:
      'Comprehensive education on sexual and reproductive health, body autonomy, consent, family planning, and access to health services. Empowering young women with knowledge to make informed decisions about their bodies and health.',
  },
  {
    title: 'Mental Health & Wellbeing',
    shortTitle: 'Mental Health',
    key: 'MentalHealth',
    sessions: 6,
    description:
      'Building mental resilience through stress management, emotional regulation, self-care practices, and creating safe spaces for young women to discuss their mental health challenges without stigma.',
  },
  {
    title: 'Financial Freedom & Literacy',
    shortTitle: 'Financial Freedom',
    key: 'FinancialFreedom',
    sessions: 6,
    description:
      'Equipping young women with practical financial skills including budgeting, saving, entrepreneurship, and income generation. Building pathways to economic independence and breaking cycles of poverty.',
  },
  {
    title: 'Women Empowerment & Leadership',
    shortTitle: 'Leadership',
    key: 'Leadership',
    sessions: 6,
    description:
      'Developing leadership skills, self-advocacy, community engagement, and confidence building. Preparing young women to take on leadership roles in their communities and beyond.',
  },
];

const ROMAN = ['I', 'II', 'III', 'IV'];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleJoinProgram = () => {
    setOpenDialog(null);
    setTimeout(() => {
      const el = document.querySelector('#get-involved');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  const activeDetail = openDialog ? programDetails[openDialog] : null;
  const activeProgram = programs.find((p) => p.key === openDialog);

  return (
    <section id="programs" ref={sectionRef} className="py-20 md:py-28 bg-white border-y border-ink/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Act heading */}
        <div className={`max-w-3xl ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            Act II · The Classroom
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            The work moves through <em className="text-voilet">classrooms and halls.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
            Four pillars — twenty-six structured sessions across six months. The curriculum is
            consistent, but the rooms are not: school blocks, community halls, open-air
            corridors. Each chapter below opens into its full syllabus.
          </p>
        </div>

        {/* Chapter entries — numbered monograph index */}
        <div className={`mt-14 border-t border-ink/10 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          {programs.map((program, i) => (
            <article
              key={program.shortTitle}
              className="group grid md:grid-cols-[auto_1fr_auto] gap-x-6 lg:gap-x-10 gap-y-3 py-8 border-b border-ink/10 items-start hover:bg-cream/60 transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4"
            >
              {/* Numeral */}
              <div className="font-display text-5xl sm:text-6xl text-ink/15 group-hover:text-voilet transition-colors leading-none pt-1 w-16">
                {ROMAN[i]}
              </div>
              {/* Content */}
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl text-ink">{program.title}</h3>
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-mist">
                    {program.sessions} sessions
                  </span>
                </div>
                <p className="mt-2.5 text-mist text-sm sm:text-base leading-relaxed max-w-2xl">
                  {program.description}
                </p>
              </div>
              {/* CTA */}
              <div className="md:pt-2">
                <Button
                  variant="ghost"
                  className="text-ink hover:text-voilet hover:bg-transparent p-0 h-auto font-medium tracking-wide"
                  onClick={() => setOpenDialog(program.key)}
                  aria-label={`Read the full ${program.title} syllabus`}
                >
                  <span className="border-b border-ink/25 group-hover:border-voilet pb-0.5">Read the chapter</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Classroom plates */}
        <div className={`mt-14 grid sm:grid-cols-2 gap-6 lg:gap-10 ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <figure>
            <div className="bg-white p-2 sm:p-3 plate-shadow">
              <Image
                src="/nairobi-team/nairobi-02.webp"
                alt="Learners clapping through a classroom session, flip-chart alphabet on the wall"
                width={1600}
                height={900}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="mt-3 text-xs text-mist">
              <span className="font-semibold text-ink">Plate III.</span> A classroom session —
              learners clapping through the alphabet of self-worth.
            </figcaption>
          </figure>
          <figure>
            <div className="bg-white p-2 sm:p-3 plate-shadow">
              <Image
                src="/nairobi-team/nairobi-07.webp"
                alt="A girl presenting flipcharts to her seated peers during a peer-led session"
                width={1200}
                height={1600}
                className="w-full h-auto block"
              />
            </div>
            <figcaption className="mt-3 text-xs text-mist">
              <span className="font-semibold text-ink">Plate IV.</span> Peer-led — a girl
              presents her group&apos;s flipcharts to the room.
            </figcaption>
          </figure>
        </div>

        {/* Total Sessions — colophon line */}
        <div className={`mt-14 text-center ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <p className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border border-ink/15 bg-cream px-8 py-4 text-sm text-mist">
            <span className="font-display text-2xl text-ink">26</span> sessions
            <span className="text-ink/25" aria-hidden="true">·</span>
            <span className="font-display text-2xl text-ink">6</span> months
            <span className="text-ink/25" aria-hidden="true">·</span>
            <span className="font-display text-2xl text-voilet">4</span> pillars
          </p>
        </div>
      </div>

      {/* Chapter Detail Dialog */}
      <Dialog open={!!openDialog} onOpenChange={(open) => { if (!open) setOpenDialog(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden rounded-none">
          {activeDetail && activeProgram && (
            <>
              {/* Dialog header — ink plate */}
              <div className="bg-ink px-6 py-5 text-cream">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl sm:text-2xl text-cream flex items-baseline gap-4">
                    <span className="text-3xl text-cream/30">{activeDetail.numeral}.</span>
                    {activeDetail.iconTitle}
                  </DialogTitle>
                  <DialogDescription className="text-cream/60 text-sm mt-1">
                    {activeProgram.sessions} comprehensive sessions delivered over the program period
                  </DialogDescription>
                </DialogHeader>
              </div>

              <ScrollArea className="max-h-[65vh] custom-scrollbar bg-cream">
                <div className="px-6 py-6 space-y-6">
                  {/* Full Description */}
                  <div>
                    <p className="text-mist text-sm sm:text-base leading-relaxed">
                      {activeDetail.fullDescription}
                    </p>
                  </div>

                  {/* Session Topics */}
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-ink mb-3">
                      Session Topics
                    </h4>
                    <div className="divide-y divide-ink/10 border-y border-ink/10">
                      {activeDetail.sessions.map((session, idx) => (
                        <div key={session.title} className="flex gap-4 py-3">
                          <span className="font-display text-lg text-voilet leading-none pt-0.5 w-6 shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-medium text-ink text-sm">{session.title}</div>
                            <div className="text-mist text-xs mt-0.5 leading-relaxed">{session.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Outcomes */}
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-ink mb-3">
                      Expected Outcomes
                    </h4>
                    <div className="grid gap-2">
                      {activeDetail.outcomes.map((outcome) => (
                        <div key={outcome} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-voilet" aria-hidden="true" />
                          <span className="text-mist text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Join CTA */}
                  <div className="pt-4 border-t border-ink/10">
                    <Button
                      onClick={handleJoinProgram}
                      className="w-full bg-ink text-cream hover:bg-ink/85 rounded-none py-6 text-base tracking-wide"
                    >
                      <span className="flex items-center gap-2">
                        Join This Program
                        <ArrowDown className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </Button>
                    <p className="text-center text-xs text-mist mt-2">
                      Scroll down to the Get Involved section to sign up
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
