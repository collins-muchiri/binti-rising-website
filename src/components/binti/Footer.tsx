'use client';

import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'The Story', href: '#about' },
  { label: 'Pillars', href: '#programs' },
  { label: 'Stewards', href: '#leadership' },
  { label: 'The Proof', href: '#impact' },
  { label: 'Voices', href: '#stories' },
  { label: 'Plates', href: '#plates' },
  { label: 'Get Involved', href: '#get-involved' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-cream text-ink border-t border-ink/10 mt-auto">
      {/* Coda line */}
      <div className="border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="font-display italic text-2xl sm:text-3xl text-ink">
            From silence, <span className="text-voilet not-italic">she rises.</span>
          </p>
          <p className="mt-3 text-xs tracking-[0.25em] uppercase text-mist">
            Peer-led Journey to Wholeness (JTW) · AGYW 15&ndash;25 · Kibera, Mathare &amp; Kawangware
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="bg-ink text-cream hover:bg-ink/85 rounded-none px-8 min-h-[44px] tracking-wide"
            >
              <a href="#get-involved" onClick={(e) => handleNavClick(e, '#get-involved')}>
                <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
                Make a Donation
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Organization Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-ink">
                Binti Rising Initiative
              </div>
              <div className="font-display italic text-sm text-mist mt-1">
                A photographic monograph
              </div>
            </div>
            <p className="text-sm text-mist leading-relaxed mb-6">
              Empowering young women aged 15&ndash;25 through comprehensive programs in SRHR, mental
              health, financial literacy, and women&apos;s leadership in Nairobi, Kenya.
            </p>

            <div className="flex gap-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((social) => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 border border-ink/15 text-mist hover:text-voilet hover:border-voilet/40 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-4 h-4" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 text-ink">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-mist hover:text-voilet transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Programs */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 text-ink">
              Programs
            </h4>
            <ul className="space-y-2.5">
              {[
                'SRHR Education',
                'Mental Health & Wellbeing',
                'Financial Freedom',
                'Women Empowerment',
              ].map((program) => (
                <li key={program}>
                  <a
                    href="#programs"
                    onClick={(e) => handleNavClick(e, '#programs')}
                    className="text-sm text-mist hover:text-voilet transition-colors"
                  >
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.3em] uppercase mb-4 text-ink">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-voilet shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-mist">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-voilet shrink-0" aria-hidden="true" />
                <span className="text-sm text-mist">info@bintirising.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-voilet shrink-0" aria-hidden="true" />
                <span className="text-sm text-mist">+254 700 000 000</span>
              </li>
            </ul>

            {/* CBO Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-2 bg-white border border-ink/10">
              <div className="w-2 h-2 rounded-full bg-voilet" aria-hidden="true" />
              <span className="text-xs text-mist font-medium">Registered CBO in Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar — colophon */}
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-mist">
              &copy; {new Date().getFullYear()} Binti Rising Initiative. All rights reserved.
            </p>
            <p className="text-xs text-mist flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-voilet fill-voilet" aria-hidden="true" /> for young women in Nairobi
            </p>
          </div>
          <p className="mt-3 text-[10px] text-mist/70 leading-relaxed">
            Photographs: Binti Rising Initiative archive — Nairobi folder, tagged{' '}
            <span className="font-medium">nairobi-photos-v1.0</span>, traceable via manifest.json.
            No stock imagery. Kenya DPA 2019 — aggregates only, no personal identifiers.
          </p>
        </div>
      </div>
    </footer>
  );
}
