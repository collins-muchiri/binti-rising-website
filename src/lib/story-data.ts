/**
 * story-data.ts: single source of truth for the Binti Rising storytelling page.
 *
 * Every photograph references a verified file from the Nairobi team archive
 * (public/nairobi-team/, traceable via manifest.json, release nairobi-photos-v1.0).
 * No stock imagery, no invented scenes. Kenya DPA 2019: aggregates only.
 *
 * NOTE: em dashes are intentionally absent from all user-visible copy in this
 * project (plain punctuation is used instead), so keep it that way.
 */

/** The fourteen verified archive photographs, in narrative order. */
export type Plate = {
  src: string;
  /** Intrinsic pixel dimensions; the lightbox renders the uncropped photo. */
  width: number;
  height: number;
  /** Roman numeral shown on the plate frame, as in a printed monograph. */
  numeral: string;
  act: string;
  caption: string;
  tag: string;
  /** object-position hint so portrait photos keep their subjects in frame
      when cropped to the uniform 4:3 mosaic cells. */
  focus?: string;
  /** Tailwind grid span classes for the editorial mosaic (desktop). */
  span: string;
};

export const PLATES: Plate[] = [
  {
    src: "/nairobi-team/nairobi-01.webp",
    width: 1200,
    height: 1600,
    focus: "center 25%",
    numeral: "I",
    act: "The Circle",
    caption: "The opening circle: beneath a community tent, trust is built shoulder to shoulder.",
    tag: "#community",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/nairobi-team/nairobi-02.webp",
    width: 1600,
    height: 900,
    numeral: "II",
    act: "The Classroom",
    caption: "A classroom session: learners clapping through the alphabet of self-worth.",
    tag: "#education",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-03.webp",
    width: 1599,
    height: 1066,
    numeral: "III",
    act: "The Classroom",
    caption: "Facilitators with a Certificate of Achievement, in Surround Sound Kenya tees, with balloons and pride.",
    tag: "#achievement",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-04.webp",
    width: 1599,
    height: 1066,
    numeral: "IV",
    act: "The Classroom",
    caption: "Peer-led: a mentor shakes the hand of a young woman receiving her certificate.",
    tag: "#mentorship",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-05.webp",
    width: 899,
    height: 1599,
    focus: "center 25%",
    numeral: "V",
    act: "The Voice",
    caption: "Hands stay busy: a young hand colours a flame during creative expression.",
    tag: "#expression",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-06.webp",
    width: 1600,
    height: 1204,
    numeral: "VI",
    act: "The Proof",
    caption: "Graduation in the corridor: uniformed participants lift their certificates.",
    tag: "#graduation",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-07.webp",
    width: 1200,
    height: 1600,
    focus: "center 25%",
    numeral: "VII",
    act: "The Voice",
    caption: "A girl takes the whiteboard: her group's findings presented to the room.",
    tag: "#leadership",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/nairobi-team/nairobi-08.webp",
    width: 1200,
    height: 1600,
    focus: "center 25%",
    numeral: "VIII",
    act: "The Voice",
    caption: "Myths, marched off: a flipchart crosses out harmful gender norms.",
    tag: "#gender-equality",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-09.webp",
    width: 1599,
    height: 720,
    numeral: "IX",
    act: "The Proof",
    caption: "Celebration: certificates raised, laughter louder than doubt.",
    tag: "#celebration",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-10.webp",
    width: 1280,
    height: 960,
    numeral: "X",
    act: "The Circle",
    caption: "Olympic Handball Team (SSK · MTV Shuga · Shujaaz) before the congratulations board.",
    tag: "#sports",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-11.webp",
    width: 720,
    height: 1280,
    focus: "center 25%",
    numeral: "XI",
    act: "The Circle",
    caption: "The dialogue circle, where every voice is heard first.",
    tag: "#dialogue",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-12.webp",
    width: 720,
    height: 480,
    numeral: "XII",
    act: "The Voice",
    caption: "Learning by screening: a youth session watches SRHR video content together.",
    tag: "#srhr",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-13.webp",
    width: 1600,
    height: 900,
    numeral: "XIII",
    act: "The Voice",
    caption: "Materials that speak: the team holds Shujaaz magazines, health communication for young people.",
    tag: "#shujaaz",
    span: "",
  },
  {
    src: "/nairobi-team/nairobi-14.webp",
    width: 1600,
    height: 900,
    numeral: "XIV",
    act: "The Proof",
    caption: "Rising: a fist lifted, Knowledge is Power.",
    tag: "#power",
    span: "",
  },
];

/** Programme pillars: Act II of the narrative. */
export const PILLARS = [
  {
    numeral: "II",
    title: "Sexual & Reproductive Health Rights",
    sessions: 8,
    body:
      "Comprehensive education on sexual and reproductive health, body autonomy, consent, family planning, and access to health services: knowledge to make informed decisions about one's own body and health.",
  },
  {
    numeral: "III",
    title: "Mental Health & Wellbeing",
    sessions: 6,
    body:
      "Building mental resilience through stress management, emotional regulation, and self-care, in safe spaces where young women can speak about mental health without stigma.",
  },
  {
    numeral: "IV",
    title: "Financial Freedom & Literacy",
    sessions: 6,
    body:
      "Practical financial skills: budgeting, saving, entrepreneurship, and income generation. Pathways to economic independence that break cycles of poverty.",
  },
  {
    numeral: "V",
    title: "Women Empowerment & Leadership",
    sessions: 6,
    body:
      "Leadership skills, self-advocacy, community engagement, and confidence, preparing young women to take on leadership roles in their communities and beyond.",
  },
];

/** Testimonials: Act IV · In Their Own Words (community voices from the programme). */
export const VOICES = [
  {
    quote:
      "Before joining Binti Rising, I had no idea about my reproductive health rights. The SRHR sessions gave me knowledge and confidence I never had. Now I help other young women in Kayole understand their bodies and make informed choices about their health.",
    name: "Amina Wanjiku",
    place: "Kayole, Nairobi",
    tag: "SRHR",
  },
  {
    quote:
      "The financial literacy program changed my life completely. I learned how to budget, save, and even started a small business selling handmade jewellery. For the first time, I feel economically independent and hopeful about my future.",
    name: "Wanjiru Njoroge",
    place: "Kibra, Nairobi",
    tag: "Financial Freedom",
  },
  {
    quote:
      "Mental health was never something we talked about in my community. Binti Rising created a safe space for us to share our struggles. I learned coping strategies that help me every day. I am stronger and more resilient now.",
    name: "Faith Atieno",
    place: "Dagoretti, Nairobi",
    tag: "Mental Health",
  },
  {
    quote:
      "The Women Empowerment program taught me that my voice matters. I now speak up at community meetings and advocate for girls' education. I never saw myself as a leader, but Binti Rising helped me discover my potential.",
    name: "Njeri Kamau",
    place: "Mathare, Nairobi",
    tag: "Leadership",
  },
  {
    quote:
      "After completing all four program pillars, I became a peer mentor. I now help new participants navigate the program and share my own journey. Watching other young women transform is the most rewarding experience of my life.",
    name: "Akello Obondo",
    place: "Embakasi, Nairobi",
    tag: "Peer Mentor",
  },
  {
    quote:
      "I used to think starting a business was only for people with capital. Through Binti's entrepreneurship sessions, I learned that with KES 500 and determination, I could start something meaningful. Today I run a small grocery kiosk.",
    name: "Syombua Musyoka",
    place: "Rongai, Nairobi",
    tag: "Financial Freedom",
  },
];

/** The Stewards: governance & delivery team. */
export const STEWARDS = [
  { initials: "ED", role: "Binti Founder", title: "Founder & Executive Director", body: "Visionary leader driving Binti's mission to empower young women across Nairobi communities." },
  { initials: "PM", role: "Programs Manager", title: "Programs Manager", body: "Oversees all 4 program pillars, ensuring quality delivery and alignment with community needs." },
  { initials: "ME", role: "M&E Lead", title: "Monitoring & Evaluation Lead", body: "Ensures evidence-based programming through rigorous data collection and impact measurement." },
  { initials: "FA", role: "Finance Lead", title: "Finance & Admin Lead", body: "Manages financial systems, compliance, and administrative operations with transparency." },
  { initials: "BC", role: "Board Chairperson", title: "Board Chairperson", body: "Provides strategic governance, oversight, and guidance for organizational growth and impact." },
  { initials: "BS", role: "Board Secretary", title: "Board Secretary", body: "Ensures compliance, governance standards, and documentation across all board activities." },
];

/** KPIs: Act V · The Proof (baseline → target, per the M&E framework). */
export const KPIS = [
  { label: "Knowledge Level", hint: "SRHR, health, and rights knowledge", baseline: 40, target: 80 },
  { label: "Service Utilization", hint: "Health services access and utilization", baseline: 15, target: 60 },
  { label: "Mental Wellbeing", hint: "Overall mental health scores", baseline: 30, target: 70 },
  { label: "Savings Habits", hint: "Regular saving behavior among participants", baseline: 20, target: 65 },
  { label: "Leadership Skills", hint: "Self-rated leadership competency", baseline: 25, target: 70 },
  { label: "GBV Awareness", hint: "Gender-based violence awareness and reporting", baseline: 35, target: 75 },
];

/** Donation tiers: what each contribution funds. */
export const DONATION_TIERS = [
  { amount: "KES 1,000", what: "1 training session for a young woman" },
  { amount: "KES 5,000", what: "Complete pillar training (6-8 sessions)" },
  { amount: "KES 10,000", what: "Materials & supplies for a cohort of 20" },
  { amount: "KES 20,000", what: "Sponsor an entire cohort of 20 young women" },
  { amount: "KES 50,000", what: "Fund a full program cycle for one community" },
];

/** FAQ: Apparatus · Questions & Answers. */
export const FAQS = [
  {
    q: "What is the age range for Binti Rising programs?",
    a: "Our Journey to Wholeness (JTW) programme serves adolescent girls and young women (AGYW) aged 15-25 across Nairobi's informal settlements.",
  },
  {
    q: "How much do the programs cost?",
    a: "Nothing. Every programme is free for participants; the initiative is funded through donations, partners, and community goodwill so that cost is never a barrier.",
  },
  {
    q: "Where are your programs located?",
    a: "We work across 10+ communities in Nairobi; our core sites are Kibera, Mathare, and Kawangware, with sessions in school blocks, community halls, and open-air spaces.",
  },
  {
    q: "What does SRHR stand for?",
    a: "Sexual and Reproductive Health and Rights: the knowledge and freedom to make informed decisions about one's own body, health, and future.",
  },
  {
    q: "Can I volunteer with Binti Rising?",
    a: "Yes. We welcome facilitators, mentors, creatives, and M&E volunteers. Reach us on WhatsApp +254 758 919 709 or info@bintirising.org to join the next cohort.",
  },
  {
    q: "How do you measure the impact of your programs?",
    a: "Through rigorous monitoring & evaluation: baseline and endline assessments on six KPIs, quarterly reviews, and participatory feedback from the young women themselves.",
  },
  {
    q: "What are your program pillars?",
    a: "Four pillars: Sexual & Reproductive Health Rights, Mental Health & Wellbeing, Financial Freedom & Literacy, and Women Empowerment & Leadership, delivered as 26 structured sessions over six months.",
  },
  {
    q: "How can organizations partner with Binti Rising?",
    a: "We collaborate with health facilities, schools, youth networks, and funders. Write to info@bintirising.org. We are a registered CBO (Reg No NC/SD/CBO/2026/0123, Kiambu) with evidence-based programming.",
  },
  {
    q: "When was Binti Rising Initiative founded?",
    a: "Binti Rising Initiative was registered and started in 2026 (Reg No NC/SD/CBO/2026/0123, Kiambu). We grew out of the Shuga x Shujaaz x PATH collaboration, and our peer educators facilitate sessions based on Shuga Global's MTV Shuga model alongside Shujaaz youth media. Official website: https://binti-rising-initiative.vercel.app/#home",
  },
  {
    q: "Where can I find Binti Rising Initiative online?",
    a: "The official website of Binti Rising Initiative CBO is https://binti-rising-initiative.vercel.app/#home. You can also reach the team on WhatsApp +254 758 919 709 or by email at info@bintirising.org.",
  },
];

/** Navigation map: the six-act spine. */
export const NAV_LINKS = [
  { href: "#story", label: "The Story" },
  { href: "#pillars", label: "Pillars" },
  { href: "#plates", label: "Plates" },
  { href: "#voices", label: "Voices" },
  { href: "#proof", label: "The Proof" },
  { href: "#faq", label: "FAQ" },
  { href: "#get-involved", label: "Get Involved" },
];

/** Partners: the collaboration Binti Rising grew out of (validated online, 2026). */
export const PARTNERS = [
  {
    name: "Shuga Global",
    note: "Formerly the MTV Staying Alive Foundation; the team behind the award-winning MTV Shuga SRHR franchise. Our peer education is based on the Shuga Global model.",
  },
  {
    name: "Shujaaz",
    note: "East Africa's biggest multimedia youth platform (Shujaaz Inc). Shujaaz magazines feature in our sessions as youth health communication.",
  },
  {
    name: "PATH",
    note: "A global health nonprofit driving innovation so health is within reach for everyone, with long-standing work in Kenya.",
  },
] as const;

/** Contact facts: carried verbatim from the initiative's own materials. */
export const CONTACT = {
  gbvHotline: "1195",
  whatsapp: "+254 758 919 709",
  shortcode: "20308",
  email: "info@bintirising.org",
  registration: "Reg No NC/SD/CBO/2026/0123",
  mpesaPaybill: "123456",
  mpesaAccount: "BINTI",
  bank: "Kenya Commercial Bank (KCB)",
  bankAccount: "BINTI Rising Initiative",
  bankBranch: "Nairobi Main",
};
