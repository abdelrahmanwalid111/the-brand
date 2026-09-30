import React, { useState, useEffect } from 'react';

export default function MarqueeTicker() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 35;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    'SΨGIL OCCULT ATELIER • HOODIES, SWEATSHIRTS & TOPS ONLY',
    '100% CASH ON DELIVERY (EGP) • 0 EGP DUE TODAY',
    'FREE EXPRESS COURIER ON ALL PRE-ORDERS OVER 3,000 EGP',
    'HANDCRAFTED IN STRICT 50–150 PIECE RUNWAY ALLOCATIONS',
    'PRE-ORDER 3-PIECE DRIP CAPSULE (HOODIE + SWEATSHIRT + TOP) UNLOCKS -20% PRIVILEGE',
    'PAY CASH IN EGP TO COURIER UPON INSPECTION'
  ];

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 50,
        backgroundColor: '#010000',
        borderBottom: isScrolled ? 'none' : '1px solid rgba(220, 20, 60, 0.4)',
        padding: '6px 0',
        height: '32px',
        opacity: isScrolled ? 0 : 1,
        visibility: isScrolled ? 'hidden' : 'visible',
        pointerEvents: isScrolled ? 'none' : 'auto',
        overflow: 'hidden',
        lineHeight: 1,
        transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out'
      }}
      aria-hidden={isScrolled}
    >
      <div
        className="animate-marquee"
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 60s linear infinite'
        }}
      >
        {[...items, ...items, ...items].map((text, idx) => {
          return (
            <div
              key={idx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '0 20px',
                whiteSpace: 'nowrap',
                fontSize: '0.66rem',
                fontWeight: '900',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.14em',
                color: '#dc143c',
                textTransform: 'uppercase'
              }}
            >
              <span>{text}</span>
              <span style={{ color: '#dc143c', opacity: 0.5, fontSize: '0.75rem' }}>•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
