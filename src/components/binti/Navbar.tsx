'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { label: 'The Story', href: '#about' },
  { label: 'Pillars', href: '#programs' },
  { label: 'Stewards', href: '#leadership' },
  { label: 'The Proof', href: '#impact' },
  { label: 'Voices', href: '#stories' },
  { label: 'Plates', href: '#plates' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-ink/10'
          : 'bg-cream/80 backdrop-blur-sm border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          {/* Wordmark — editorial masthead */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-baseline gap-2.5 group"
            aria-label="BINTI Rising Initiative — back to top"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-ink">
              Binti Rising Initiative
            </span>
            <span className="hidden lg:inline-block h-px w-8 bg-ink/25 group-hover:bg-voilet transition-colors" aria-hidden="true" />
            <span className="hidden lg:inline font-display italic text-sm text-mist">
              From Silence, She Rises
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-[13px] font-medium text-mist hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA — ink button, square-edged like the monograph */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-ink text-cream hover:bg-ink/85 rounded-none px-5 min-h-[44px] font-medium tracking-wide"
            >
              <a href="#get-involved" onClick={(e) => handleNavClick(e, '#get-involved')}>
                Get Involved
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-ink min-h-[44px] min-w-[44px]">
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-cream p-0 border-l border-ink/10">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 py-4 border-b border-ink/10">
                  <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-ink">
                    Binti Rising Initiative
                  </span>
                </div>
                <div className="flex-1 px-4 py-6">
                  <div className="flex flex-col">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="px-4 py-3 text-ink font-medium border-b border-ink/5 hover:bg-parchment transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-ink/10">
                  <Button
                    asChild
                    className="w-full bg-ink text-cream hover:bg-ink/85 rounded-none min-h-[44px]"
                  >
                    <a href="#get-involved" onClick={(e) => handleNavClick(e, '#get-involved')}>
                      Get Involved
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
