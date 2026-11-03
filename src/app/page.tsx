import Image from "next/image";
import {
  Download,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Target,
  LineChart,
  Facebook,
  MessageCircle,
  CalendarDays,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteNav } from "@/components/story/site-nav";
import { BackToTop } from "@/components/story/back-to-top";
import { Reveal } from "@/components/story/reveal";
import { PlatesGallery } from "@/components/story/plates-gallery";
import { VideoFacade } from "@/components/story/video-facade";
import { KpiSection } from "@/components/story/kpi-section";
import { GetInvolved } from "@/components/story/get-involved";
import { PILLARS, VOICES, STEWARDS, FAQS, CONTACT, NAV_LINKS, PARTNERS } from "@/lib/story-data";
import { SITE_URL } from "@/lib/seo/site-url";

/**
 * Binti Rising Initiative: "From Silence, She Rises"
 * A one-page storytelling monograph for a Nairobi CBO (registered in Kiambu).
 *
 * Structure, the six-act spine:
 *   Cover (#home) → Act I The Circle (#story) → Act II The Classroom (#pillars)
 *   → Interlude The Plates (#plates) → Act III The Voice (#video)
 *   → Act IV In Their Own Words (#voices) → The Stewards (#stewards)
 *   → The Allies (#partners) → Act V The Proof (#proof) → Apparatus FAQ (#faq)
 *   → Act VI Get Involved
 *
 * Layout: CSS Grid for card mosaics, Flexbox for rows/nav; every section is a
 * semantic <section> with an aria-labelledby heading. Animations respect
 * prefers-reduced-motion.
 */

/** Shared section header: act eyebrow + two-tone headline + optional lede. */
function ActHeader({
  id,
  act,
  line1,
  line2,
  lede,
}: {
  id: string;
  act: string;
  line1: string;
  line2: string;
  lede?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#b4472e] sm:text-[11px]">
        {act}
      </p>
      <h2
        id={id}
        className="mt-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
      >
        {line1} <em className="font-display italic font-medium">{line2}</em>
      </h2>
      {lede && (
        <p className="mt-4 text-sm leading-relaxed text-[#6f6a7c] sm:text-base">{lede}</p>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f6f3ee] text-[#1a1626]">
      {/* Skip link: first tab stop for keyboard/screen-reader readers */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#1a1626] focus:px-4 focus:py-2 focus:text-[#f6f3ee]"
      >
        Skip to main content
      </a>

      <SiteNav />

      <main id="main" className="flex-1 w-full">
        {/* ─────────────────────────────── COVER (#home) ─────────────────────────────── */}
        <section id="home" aria-label="Cover" className="relative">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-16">
            <div>
              {/* Brand mark: the initiative's official logo artwork (the sun,
                  flower and rising face), cropped square from the full lockup. */}
              <Image
                src="/binti-mark.png"
                alt="Binti Rising Initiative logo: a young woman's profile rising toward the sun"
                width={72}
                height={72}
                priority
                className="mb-4 size-[72px] rounded-full bg-white p-1 shadow-[0_2px_16px_rgba(26,22,38,0.12)] ring-1 ring-[#1a1626]/10"
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#6f6a7c] sm:text-[11px]">
                A Photographic Monograph · Nairobi
              </p>
              <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                From Silence,
                <br />
                <em className="font-display italic font-medium text-[#b4472e]">She Rises.</em>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#6f6a7c] sm:text-base">
                In Kibera, Mathare and Kawangware, the Binti Rising Initiative runs a peer-led
                mentorship programme, the Journey to Wholeness, for adolescent girls and young
                women aged 15-25. This monograph follows one arc through fourteen plates from the
                team&apos;s own archive: community circles, classrooms, quiet craft, loud
                celebration, and the measured proof that lives are changing.
              </p>
              <p className="mt-4 max-w-xl text-sm font-medium sm:text-base">
                Your support directly transforms young women&apos;s lives in Nairobi.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85 min-h-[44px]"
                >
                  <a href="#get-involved">Support a Journey</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[#1a1626]/25 min-h-[44px]">
                  <a href="/binti-rising-monograph.pdf" download>
                    <Download className="size-4" aria-hidden="true" />
                    Read the Monograph (PDF)
                  </a>
                </Button>
              </div>
              {/* Trust chips: registration year, the founding collaboration,
                  the campus events partner, and M&E rigour */}
              <ul className="mt-6 flex flex-wrap gap-2 text-[11px] text-[#6f6a7c]">
                {[
                  "Registered CBO 2026",
                  "Shuga × Shujaaz × PATH",
                  "Campus Connect KE partner",
                  "Evidence-based M&E",
                ].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-[#1a1626]/15 bg-white/60 px-3 py-1.5"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cover plate: Plate XIV, the raised fist */}
            <Reveal>
              <figure className="bg-white p-2 shadow-[0_2px_40px_rgba(26,22,38,0.16)] sm:p-3">
                <Image
                  src="/nairobi-team/nairobi-14.webp"
                  alt="Plate XIV: a young woman raises her fist, Knowledge is Power. Binti Rising Nairobi archive."
                  width={1600}
                  height={1200}
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="h-auto w-full object-cover"
                />
                <figcaption className="px-1 pb-1 pt-2 text-xs text-[#6f6a7c]">
                  <span className="font-semibold uppercase tracking-[0.2em] text-[#b4472e]">
                    Plate XIV.
                  </span>{" "}
                  Rising: a fist lifted, <em className="font-display">Knowledge is Power.</em>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Hero stats strip */}
          <div className="border-y border-[#1a1626]/10 bg-white/50">
            <dl className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-4 py-6 sm:px-6">
              {[
                { n: "500+", label: "Young Women" },
                { n: "10+", label: "Communities" },
                { n: "26", label: "Sessions" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <dd className="text-2xl font-bold text-[#b4472e] sm:text-4xl">{s.n}</dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#6f6a7c] sm:text-xs">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─────────────────────── ACT I · THE CIRCLE (#story) ─────────────────────── */}
        <section id="story" aria-labelledby="story-heading" className="scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <ActHeader
                id="story-heading"
                act="Act I · The Circle"
                line1="Nothing begins with a"
                line2="lesson."
              />
              <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed text-[#6f6a7c] sm:text-base">
                <p>
                  <strong className="text-[#1a1626]">Binti Rising Initiative</strong> is a
                  registered Community-Based Organization in Kenya (Kiambu), dedicated to
                  transforming the lives of young women aged 15-25. Founded in 2026, we work
                  across 10+ communities in Nairobi to provide holistic empowerment programs that
                  address the real needs of young women in the city.
                </p>
                {/* Origin story: founded in 2026, born of the Shuga x Shujaaz x PATH
                    collaboration. Partner facts are validated against Shuga Global /
                    Shujaaz Inc / PATH public listings; see PARTNERS in story-data.ts. */}
                <p>
                  Binti Rising was started in 2026 through the{" "}
                  <strong className="text-[#1a1626]">Shuga × Shujaaz × PATH</strong>{" "}
                  collaboration. Peer education is based on{" "}
                  <strong className="text-[#1a1626]">Shuga Global</strong> (formerly the MTV
                  Staying Alive Foundation, the team behind the award-winning MTV Shuga
                  franchise), and Shujaaz magazines, East Africa&apos;s biggest youth media
                  platform, feature in our sessions as health communication for young people.
                </p>
                {/* Campus partnership: events focus stated by the initiative itself
                    (Journey to Wholeness + peer education with Campus Connect KE). */}
                <p>
                  Through our partnership with{" "}
                  <strong className="text-[#1a1626]">Campus Connect KE</strong>, we conduct
                  events focused on the Journey to Wholeness and peer education, bringing
                  Shuga-based sessions, SRHR conversations, and mentorship to students across
                  Nairobi.
                </p>
                <p>
                  Our comprehensive approach addresses the interconnected challenges young women
                  face: from limited access to sexual and reproductive health education, to
                  mental health struggles, financial barriers, and gender-based violence. We
                  believe in meeting young women where they are and walking alongside them on
                  their journey to empowerment.
                </p>
                <p>
                  Through our four program pillars (SRHR, Mental Health, Financial Freedom, and{" "}
                  <strong className="text-[#1a1626]">Women Empowerment</strong>), we&apos;re
                  building a generation of informed, resilient, and economically independent
                  young women leaders.
                </p>
              </div>
            </div>
            {/* Why-support aside */}
            <aside className="h-fit rounded-md border border-[#1a1626]/10 bg-white/70 p-6 lg:mt-14">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#b4472e]">
                Why support Binti?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6f6a7c]">
                Every shilling donated to Binti Rising goes directly toward transforming a young
                woman&apos;s life. Our evidence-based programs are aligned with UN Sustainable
                Development Goals and measured through rigorous monitoring and evaluation. With
                over 500 young women already reached across Nairobi communities, your investment
                creates ripple effects: empowered women lift families and communities out of
                poverty.
              </p>
              <p className="mt-4 flex items-center gap-2 text-xs text-[#6f6a7c]">
                <ShieldCheck className="size-4 text-[#b4472e]" aria-hidden="true" />
                Registered CBO · Nairobi, Kenya · {CONTACT.registration}
              </p>
            </aside>
          </div>
        </section>

        {/* ───────────────────── ACT II · THE CLASSROOM (#pillars) ───────────────────── */}
        <section id="pillars" aria-labelledby="pillars-heading" className="scroll-mt-20 border-y border-[#1a1626]/10 bg-white/40">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="pillars-heading"
              act="Act II · The Classroom"
              line1="The work moves through"
              line2="classrooms and halls."
              lede="Four pillars, twenty-six structured sessions across six months. The curriculum is consistent, but the rooms are not: school blocks, community halls, open-air corridors. Each chapter below opens into its full syllabus."
            />
            {/* Pillar cards: CSS Grid: 1 → 2 → 4 columns */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 80}>
                  <article className="flex h-full flex-col rounded-md border border-[#1a1626]/10 bg-[#f6f3ee] p-5 transition-shadow hover:shadow-[0_2px_24px_rgba(26,22,38,0.12)]">
                    <span className="font-display text-3xl italic text-[#b4472e]">{pillar.numeral}</span>
                    <h3 className="mt-3 text-base font-bold leading-snug">{pillar.title}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#6f6a7c]">
                      {pillar.sessions} sessions
                    </p>
                    <p className="mt-3 flex-1 text-xs leading-relaxed text-[#6f6a7c]">{pillar.body}</p>
                    <a
                      href="#get-involved"
                      className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold text-[#b4472e] hover:underline"
                    >
                      Fund this chapter →
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
            {/* Curriculum facts */}
            <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
              {[
                ["26", "sessions"],
                ["6", "months"],
                ["4", "pillars"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dd className="text-2xl font-bold text-[#1a1626] sm:text-3xl">{n}</dd>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-[#6f6a7c]">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─────────────────────── THE PLATES · ARCHIVE (#plates) ─────────────────────── */}
        <section id="plates" aria-labelledby="plates-heading" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="plates-heading"
              act="The Plates · Nairobi Archive"
              line1="Fourteen photographs,"
              line2="one arc."
              lede="Every image on this page comes from the initiative's own Google Drive “Nairobi” folder: no stock photography, no invented scenes. Each file is traceable through manifest.json and tagged nairobi-photos-v1.0 in the public release. Select any plate to view it full size."
            />
            <div className="mt-10">
              <PlatesGallery />
            </div>
          </div>
        </section>

        {/* ──────────────────── ACT III · THE VOICE · VIDEO (#video) ──────────────────── */}
        <section id="video" aria-labelledby="video-heading" className="scroll-mt-20 border-y border-[#1a1626]/10 bg-[#1a1626] text-[#f6f3ee]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="video-heading"
              act="Act III · The Voice: Educational Content"
              line1="Learn about"
              line2="SRHR."
              lede="Our comprehensive guide on Sexual and Reproductive Health and Rights: key concepts and empowerment strategies, told in the language of the young women themselves."
            />
            <div className="mt-10 [&_p]:text-[#f6f3ee]/70 [&_h3]:text-[#f6f3ee] [&_em]:text-[#e8a28f] [&_dd]:text-[#f6f3ee] [&_dt]:text-[#f6f3ee]/60 [&_span.absolute]:text-[#1a1626]">
              <VideoFacade />
            </div>
          </div>
        </section>

        {/* ──────────────── ACT IV · IN THEIR OWN WORDS (#voices) ──────────────── */}
        <section id="voices" aria-labelledby="voices-heading" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="voices-heading"
              act="Act IV · In Their Own Words"
              line1="Voices carry further than"
              line2="flyers."
              lede="Hear from the young women across Nairobi whose lives have been transformed through our programs. Their stories inspire our work every day."
            />
            {/* Testimonial cards: CSS Grid: 1 → 2 → 3 columns */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VOICES.map((voice, i) => (
                <Reveal key={voice.name} delay={(i % 3) * 80}>
                  <figure className="flex h-full flex-col rounded-md border border-[#1a1626]/10 bg-white/70 p-6">
                    <blockquote className="flex-1">
                      <span aria-hidden="true" className="font-display text-4xl leading-none text-[#b4472e]">
                        “
                      </span>
                      <p className="text-sm leading-relaxed text-[#1a1626]">{voice.quote}</p>
                    </blockquote>
                    <figcaption className="mt-4 flex items-center justify-between gap-2 border-t border-[#1a1626]/10 pt-3">
                      <div>
                        <p className="text-sm font-bold">{voice.name}</p>
                        <p className="text-xs text-[#6f6a7c]">{voice.place}</p>
                      </div>
                      <span className="rounded-full bg-[#b4472e]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#b4472e]">
                        {voice.tag}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────── THE STEWARDS (#stewards) ───────────────────────── */}
        <section id="stewards" aria-labelledby="stewards-heading" className="scroll-mt-20 border-y border-[#1a1626]/10 bg-white/40">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="stewards-heading"
              act="The Stewards"
              line1="A team that keeps the"
              line2="promise."
              lede="A dedicated team of professionals and volunteers committed to empowering young women across Nairobi, Kenya."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STEWARDS.map((steward) => (
                <article
                  key={steward.initials + steward.role}
                  className="flex items-start gap-4 rounded-md border border-[#1a1626]/10 bg-[#f6f3ee] p-5"
                >
                  {/* Monogram avatar */}
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#1a1626] font-display text-sm italic text-[#f6f3ee]"
                  >
                    {steward.initials}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold">{steward.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#6f6a7c]">{steward.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────── THE ALLIES · PARTNERS (#partners) ────────────────────── */}
        <section id="partners" aria-labelledby="partners-heading" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="partners-heading"
              act="The Allies · Partners & Collaborators"
              line1="No one rises"
              line2="alone."
              lede="Binti Rising grew out of the Shuga × Shujaaz × PATH collaboration and works hand in hand with campus partner Campus Connect KE. Each ally brings a different strength: edutainment, youth media, global health expertise, and campus reach."
            />
            {/* Partner cards: 1 → 2 → 4 columns. Official logos are shown where a
                verified mark exists (see PARTNERS notes); partners without a
                verifiable logo get a typographic wordmark, never a guessed one. */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTNERS.map((partner, i) => (
                <Reveal key={partner.name} delay={i * 80}>
                  <article
                    className={`flex h-full flex-col rounded-md border p-5 transition-shadow hover:shadow-[0_2px_24px_rgba(26,22,38,0.14)] ${
                      partner.dark
                        ? "border-[#1a1626] bg-[#1a1626] text-[#f6f3ee]"
                        : "border-[#1a1626]/10 bg-white/70 text-[#1a1626]"
                    }`}
                  >
                    {/* Logo plate: fixed-height stage so every card aligns */}
                    <div className="flex h-14 items-center">
                      {partner.logo ? (
                        <Image
                          src={partner.logo}
                          alt={partner.logoAlt ?? `${partner.name} logo`}
                          width={partner.logoWidth ?? 320}
                          height={partner.logoHeight ?? 120}
                          sizes="(max-width: 640px) 50vw, 220px"
                          className={`w-auto max-w-full object-contain ${
                            partner.dark ? "max-h-12" : "max-h-11"
                          }`}
                        />
                      ) : (
                        /* Typographic wordmark for partners with no verifiable
                           logo asset (Campus Connect KE). */
                        <span className="flex items-center gap-2 font-display text-lg italic leading-tight">
                          <GraduationCap
                            className="size-6 shrink-0 text-[#b4472e]"
                            aria-hidden="true"
                          />
                          <span>
                            Campus <span className="text-[#b4472e]">Connect</span> KE
                          </span>
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 text-sm font-bold">{partner.name}</h3>
                    <p
                      className={`mt-1 flex-1 text-xs leading-relaxed ${
                        partner.dark ? "text-[#f6f3ee]/70" : "text-[#6f6a7c]"
                      }`}
                    >
                      {partner.note}
                    </p>
                    {/* Official-site link only where publicly verifiable */}
                    {partner.href && (
                      <a
                        href={partner.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`mt-3 inline-flex min-h-[44px] items-center gap-1 text-xs font-semibold ${
                          partner.dark
                            ? "text-[#e8a28f] hover:underline"
                            : "text-[#b4472e] hover:underline"
                        }`}
                      >
                        Official website
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Engagement banner: the Campus Connect KE events programme.
                Gives readers a concrete, low-barrier way to bring Binti Rising
                to their campus or community, supporting the partnership's
                Journey to Wholeness + peer education events. */}
            <div className="mt-8 flex flex-col items-start gap-4 rounded-md border border-[#b4472e]/25 bg-[#b4472e]/5 p-6 sm:flex-row sm:items-center">
              <span
                aria-hidden="true"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#b4472e] text-[#f6f3ee]"
              >
                <CalendarDays className="size-6" />
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#b4472e]">
                  Journey to Wholeness on Campus
                </h3>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6f6a7c]">
                  With Campus Connect KE we conduct events focused on the Journey to Wholeness
                  and peer education: Shuga-based session circles, SRHR conversations, and
                  mentorship for students. Host one at your campus, school, or community
                  space; we bring the facilitators, the materials, and the evidence.
                </p>
              </div>
              <Button
                asChild
                className="min-h-[44px] shrink-0 bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85"
              >
                <a href="mailto:info@bintirising.org?subject=Campus%20event%20request">
                  Host an Event
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ──────────────────────── ACT V · THE PROOF (#proof) ──────────────────────── */}
        <section id="proof" aria-labelledby="proof-heading" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <ActHeader
                  id="proof-heading"
                  act="Act V · The Proof: Monitoring & Evaluation"
                  line1="Then the corridor becomes"
                  line2="a stage."
                  lede="Every young woman who joins Binti Rising experiences measurable change. We track six key performance indicators, from SRHR knowledge and service utilization to mental wellbeing, savings habits, leadership, and GBV awareness. The results speak for themselves."
                />
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#6f6a7c]">
                  <LineChart className="mt-0.5 size-4 shrink-0 text-[#b4472e]" aria-hidden="true" />
                  Baseline and endline assessments, quarterly reviews, and participatory feedback
                  keep programs evidence-based and community-responsive.
                </p>
                <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-[#6f6a7c]">
                  <Target className="mt-0.5 size-4 shrink-0 text-[#b4472e]" aria-hidden="true" />
                  Every KES you invest creates a measurable, lasting impact in a young
                  woman&apos;s life.
                </p>
              </div>
              <div className="lg:col-span-2">
                <KpiSection />
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────── APPARATUS · FAQ (#faq) ─────────────────────── */}
        <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-y border-[#1a1626]/10 bg-white/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-3 lg:gap-12">
            <div>
              <ActHeader
                id="faq-heading"
                act="Apparatus · Questions & Answers"
                line1="Asked,"
                line2="answered."
                lede="Find answers to common questions about Binti Rising, our programs, and how you can get involved."
              />
              <p className="mt-5 text-xs leading-relaxed text-[#6f6a7c]">
                Still have questions? Contact us at{" "}
                <a href={`mailto:${CONTACT.email}`} className="font-medium text-[#b4472e] hover:underline">
                  {CONTACT.email}
                </a>{" "}
                or call the GBV hotline{" "}
                <a href="tel:1195" className="font-medium text-[#b4472e] hover:underline">
                  1195
                </a>
                .
              </p>
            </div>
            {/* Accordion (max height + scroll handled by layout, list kept short) */}
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={faq.q} value={`faq-${i}`} className="border-[#1a1626]/10">
                    <AccordionTrigger className="min-h-[44px] py-4 text-left text-sm font-semibold hover:no-underline hover:text-[#b4472e]">
                      <span className="flex gap-3">
                        <span className="shrink-0 font-display italic text-[#b4472e]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {faq.q}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-8 text-sm leading-relaxed text-[#6f6a7c]">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* ──────────────────── ACT VI · JOIN THE JOURNEY (#get-involved) ──────────────────── */}
        <section id="get-involved" aria-labelledby="get-involved-heading" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
            <ActHeader
              id="get-involved-heading"
              act="Act VI · Join the Journey"
              line1="Add your voice to the"
              line2="rising."
              lede="Whether you donate, volunteer, or partner with us, every action counts in empowering young women across Nairobi."
            />
            <div className="mt-8">
              <GetInvolved />
            </div>
            {/* Contact strip */}
            <div className="mt-10 grid gap-3 rounded-md border border-[#1a1626]/10 bg-white/60 p-6 sm:grid-cols-3">
              <p className="flex items-center gap-2 text-sm text-[#6f6a7c]">
                <MapPin className="size-4 shrink-0 text-[#b4472e]" aria-hidden="true" />
                Nairobi, Kenya
              </p>
              <p className="flex items-center gap-2 text-sm text-[#6f6a7c]">
                <Phone className="size-4 shrink-0 text-[#b4472e]" aria-hidden="true" />
                <a href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`} className="hover:text-[#1a1626] hover:underline">
                  {CONTACT.whatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm text-[#6f6a7c]">
                <Mail className="size-4 shrink-0 text-[#b4472e]" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#1a1626] hover:underline">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating back-to-top arrow (appears after scrolling past the hero). */}
      <BackToTop />

      {/* ───────────────────────────────── FOOTER ───────────────────────────────── */}
      {/* mt-auto keeps the footer pinned to the viewport bottom on short pages
          and pushes it down naturally on long ones. Dark ink mirrors the Act III
          section for a professional NGO close: brand + mission + socials, quick
          links, programmes, contact, partner strip, and a legal colophon. */}
      <footer className="mt-auto bg-[#1a1626] text-[#f6f3ee]">
        {/* Upper grid: mission / explore / programmes / contact */}
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:py-14">
          {/* Brand, mission statement, social links, official URL */}
          <div className="lg:col-span-5">
            {/* Brand row: the official logo mark on a white plate (the artwork
                is designed for light backgrounds) beside the wordmark. */}
            <div className="flex items-center gap-3">
              <Image
                src="/binti-mark.png"
                alt="Binti Rising Initiative logo"
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-xl bg-white p-1 ring-1 ring-white/20"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e8a28f]">
                  Binti Rising Initiative
                </p>
                <p className="font-display text-2xl italic">From silence, she rises.</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#f6f3ee]/70">
              A Kenyan community-based organisation founded in 2026, running the peer-led
              Journey to Wholeness programme for adolescent girls and young women aged 15-25
              in Kibera, Mathare &amp; Kawangware. Peer education is based on Shuga Global&apos;s
              MTV Shuga model, in collaboration with Shujaaz and PATH.
            </p>
            {/* Social profiles (verified public presences only) */}
            <ul className="mt-5 flex flex-wrap gap-3">
              <li>
                <a
                  href="https://www.facebook.com/esther.gitaranga.1"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Binti Rising Initiative on Facebook"
                  className="flex size-11 items-center justify-center rounded-full border border-white/15 text-[#f6f3ee]/80 transition-colors hover:border-[#b4472e] hover:bg-[#b4472e] hover:text-[#f6f3ee]"
                >
                  <Facebook className="size-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with Binti Rising Initiative on WhatsApp"
                  className="flex size-11 items-center justify-center rounded-full border border-white/15 text-[#f6f3ee]/80 transition-colors hover:border-[#b4472e] hover:bg-[#b4472e] hover:text-[#f6f3ee]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  aria-label="Email Binti Rising Initiative"
                  className="flex size-11 items-center justify-center rounded-full border border-white/15 text-[#f6f3ee]/80 transition-colors hover:border-[#b4472e] hover:bg-[#b4472e] hover:text-[#f6f3ee]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                </a>
              </li>
            </ul>
            {/* Explicit official URL: the string AI assistants cite when asked
                about Binti Rising Initiative CBO. */}
            <p className="mt-5 text-xs text-[#f6f3ee]/50">
              Official website:{" "}
              <a
                href={`${SITE_URL}/#home`}
                className="font-medium text-[#e8a28f] hover:underline"
              >
                binti-rising-initiative.vercel.app
              </a>
            </p>
          </div>

          {/* Explore: chapter anchors */}
          <nav aria-label="Footer quick links" className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f6f3ee]">Explore</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#f6f3ee]/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-[#e8a28f] hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programmes: the four pillars */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f6f3ee]">
              Programmes
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[#f6f3ee]/60">
              <li>
                <a href="#pillars" className="transition-colors hover:text-[#e8a28f] hover:underline">
                  Journey to Wholeness
                </a>
              </li>
              {PILLARS.map((pillar) => (
                <li key={pillar.title}>
                  <a href="#pillars" className="transition-colors hover:text-[#e8a28f] hover:underline">
                    {pillar.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact: address, email, WhatsApp, GBV hotline, registration */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f6f3ee]">Contact</h2>
            <ul className="mt-3 space-y-2.5 text-sm text-[#f6f3ee]/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#e8a28f]" aria-hidden="true" />
                Nairobi, Kenya · Kiambu County
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#e8a28f]" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#e8a28f] hover:underline">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-[#e8a28f]" aria-hidden="true" />
                <a
                  href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#e8a28f] hover:underline"
                >
                  WhatsApp {CONTACT.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#e8a28f]" aria-hidden="true" />
                <span>
                  GBV Hotline{" "}
                  <a href="tel:1195" className="font-semibold text-[#e8a28f] hover:underline">
                    1195
                  </a>{" "}
                  (toll free) · Shortcode {CONTACT.shortcode}
                </span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-[#f6f3ee]/40">{CONTACT.registration}</p>
            <Button
              asChild
              size="sm"
              className="mt-4 bg-[#b4472e] text-[#f6f3ee] hover:bg-[#b4472e]/85 min-h-[44px]"
            >
              <a href="#get-involved">Make a Donation</a>
            </Button>
          </div>
        </div>

        {/* Partner strip: the collaboration the initiative grew out of (see PARTNERS).
            Logo marks live in the Partners section; here we keep the typographic
            strip that works on the ink background. */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#f6f3ee]/40">
              In collaboration with
            </span>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {PARTNERS.map((partner) => (
                <li
                  key={partner.name}
                  title={partner.note}
                  className="font-display text-sm italic text-[#f6f3ee]/80"
                >
                  {partner.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colophon: copyright, registration, and the trademark note for
            third-party partner logos.
            Extra bottom padding on small screens keeps the last lines clear
            of the floating back-to-top arrow. */}
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 pb-16 pt-4 text-[11px] leading-relaxed text-[#f6f3ee]/40 sm:px-6 sm:pb-4">
            © {new Date().getFullYear()} Binti Rising Initiative · {CONTACT.registration},
            Kiambu, Kenya. Partner names and logos are trademarks of their respective
            organizations and appear here for partnership acknowledgement only.
          </p>
        </div>
      </footer>
    </div>
  );
}
