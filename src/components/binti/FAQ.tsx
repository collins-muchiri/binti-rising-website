'use client';

import { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the age range for BINTI Rising programs?',
    answer: 'Our programs are specifically designed for young women aged 15-25. We believe in meeting young women where they are during this critical phase of their lives and providing holistic empowerment that addresses their unique challenges.',
  },
  {
    question: 'How much do the programs cost?',
    answer: 'All BINTI Rising programs are completely FREE for participating young women. We are committed to removing financial barriers to empowerment. Our community partners and donors make this possible.',
  },
  {
    question: 'Where are your programs located?',
    answer: 'We currently operate in 10+ communities across Nairobi, Kenya. Our programs are community-based and locally adapted to meet the specific needs of young women in each area.',
  },
  {
    question: 'What does SRHR stand for?',
    answer: 'SRHR stands for Sexual and Reproductive Health and Rights. Our SRHR program pillar provides comprehensive education on reproductive health, consent, healthy relationships, and access to health services.',
  },
  {
    question: 'Can I volunteer with BINTI Rising?',
    answer: 'Yes! We welcome volunteers who are passionate about empowering young women. Visit our Get Involved section to learn about volunteer opportunities, or contact us at info@bintirising.org.',
  },
  {
    question: 'How do you measure the impact of your programs?',
    answer: 'We track 6 key performance indicators including SRHR knowledge, health service utilization, mental wellbeing, savings habits, leadership skills, and GBV awareness. Regular monitoring and evaluation ensure our programs are evidence-based and effective.',
  },
  {
    question: 'What are your program pillars?',
    answer: 'BINTI Rising has four main program pillars: SRHR (Sexual and Reproductive Health and Rights), Mental Health empowerment, Financial Freedom training, and Women Empowerment initiatives. Each pillar addresses interconnected challenges young women face.',
  },
  {
    question: 'How can organizations partner with BINTI Rising?',
    answer: 'We welcome partnerships with NGOs, corporate organizations, and social enterprises. Partners can support through funding, in-kind donations, expertise sharing, or collaborative program delivery. Contact our partnership team at info@bintirising.org.',
  },
];

export default function FAQ() {
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
    <section id="faq" ref={sectionRef} className="py-20 md:py-28 bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section heading — apparatus */}
        <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-voilet mb-4">
            Apparatus · Questions &amp; Answers
          </p>
          <h2 className="font-display text-4xl sm:text-5xl text-ink leading-[1.1]">
            Asked, <em className="text-voilet">answered.</em>
          </h2>
          <p className="mt-5 text-mist text-base sm:text-lg leading-relaxed">
            Find answers to common questions about Binti Rising, our programs, and how you can get involved.
          </p>
        </div>

        {/* FAQ Accordion — ruled ledger */}
        <div className={`mt-12 ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <Accordion type="single" collapsible className="border-t border-ink/15">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-ink/10 px-1 sm:px-2"
              >
                <AccordionTrigger className="py-5 hover:no-underline group">
                  <span className="text-left flex items-baseline gap-4">
                    <span className="font-display text-lg text-ink/25 shrink-0" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-ink group-hover:text-voilet transition-colors">
                      {faq.question}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-9 text-mist leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom note */}
        <div className={`mt-10 text-center ${isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <p className="text-mist">
            Still have questions? Contact us at{' '}
            <a href="mailto:info@bintirising.org" className="text-voilet font-medium hover:underline">
              info@bintirising.org
            </a>
            {' '}or call us on our hotline.
          </p>
        </div>
      </div>
    </section>
  );
}
