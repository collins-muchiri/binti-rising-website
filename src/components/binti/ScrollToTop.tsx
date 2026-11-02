'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`scroll-top-btn fixed bottom-6 right-6 z-40 w-12 h-12 rounded-none bg-ink text-cream shadow-lg shadow-ink/25 flex items-center justify-center hover:bg-voilet transition-colors ${
        isVisible ? 'visible' : 'hidden'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
