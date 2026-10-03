import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onShopClick }) {
  // Direct DOM refs for GPU-accelerated 60/120fps parallax with ZERO React re-renders on scroll
  const bgImageRef = useRef(null);
  const contentRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Signature Figma Hero Data
  const heroData = {
    eyebrow: 'NEW SEASON / AUTUMN WINTER 2026',
    titleWhite: 'BUILT',
    titleYellow: 'FOR',
    titleRed: 'MORE',
    tagline: 'Premium Streetwear For Those Who Move Different',
    description: 'Handcrafted in strict 66-piece runway allocations in Florence. 0 EGP due today — inspect & pay cash upon doorstep delivery.',
    image: '/assets/sygil_hero_cinematic.jpg'
  };

  // Silky 60/120fps Parallax via requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const renderParallax = () => {
      if (window.innerWidth <= 768) {
        if (contentRef.current) contentRef.current.style.opacity = 1;
        ticking = false;
        return;
      }
      const y = window.scrollY;
      if (y <= 1200) {
        const scale = 1.02 + Math.min(y * 0.0005, 0.18);
        const imageY = y * 0.28;
        const contentY = -y * 0.36;
        const opacity = Math.max(0, 1 - y / 380);
        const cueOpacity = Math.max(0, 1 - y / 50);

        if (bgImageRef.current) {
          bgImageRef.current.style.transform = `scale(${scale}) translateY(${imageY}px)`;
        }

        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${contentY}px)`;
          contentRef.current.style.opacity = opacity;
        }

        if (scrollCueRef.current) {
          scrollCueRef.current.style.opacity = cueOpacity;
          scrollCueRef.current.style.pointerEvents = y > 50 ? 'none' : 'auto';
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(renderParallax);
        ticking = true;
      }
    };

    renderParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'clamp(580px, 92vh, 960px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        color: '#ffffff',
        paddingTop: '80px',
        paddingBottom: 'clamp(32px, 6vh, 64px)'
      }}
    >
      {/* 1. Cinematic Hero Background with Parallax Zoom */}
      <div
        ref={bgImageRef}
        style={{
          position: 'absolute',
          inset: 0,
          willChange: 'transform',
          zIndex: 1
        }}
      >
        <img
          src={heroData.image}
          alt="SΨGIL Dark Ritual Streetwear Collection"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%'
          }}
        />
        {/* Contrast Gradient for Text Legibility at the Bottom and Left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(1,0,0,0.98) 0%, rgba(1,0,0,0.85) 35%, rgba(1,0,0,0.3) 70%, rgba(1,0,0,0.15) 100%), linear-gradient(to right, rgba(1,0,0,0.85) 0%, rgba(1,0,0,0.45) 45%, transparent 75%)'
          }}
        />
        {/* Crimson atmospheric bleed on the right edge (as seen in Figma) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '35%',
            background: 'radial-gradient(circle at 90% 50%, rgba(220, 20, 60, 0.22) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* 3. High-Voltage Figma Headline & Action Block */}
      <div
        ref={contentRef}
        className="store-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            pointerEvents: 'auto'
          }}
        >
          {/* Eyebrow from Figma: NEW SEASON / AUTUMN WINTER 2026 */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px'
            }}
          >
            <span
              style={{
                fontSize: 'clamp(0.68rem, 1.1vw, 0.78rem)',
                fontWeight: '900',
                letterSpacing: '0.14em',
                color: 'rgba(255, 255, 255, 0.75)',
                textTransform: 'uppercase'
              }}
            >
              {heroData.eyebrow}
            </span>
          </div>

          {/* Figma Statement Headline: BUILT FOR MORE */}
          <h1
            style={{
              margin: '0 0 12px 0',
              textTransform: 'uppercase',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              fontWeight: '900'
            }}
          >
            <span
              style={{
                fontSize: 'clamp(2rem, 4.4vw, 3.6rem)',
                color: '#ffffff',
                display: 'block'
              }}
            >
              {heroData.titleWhite} <span style={{ color: '#ffd312' }}>{heroData.titleYellow}</span>
            </span>
            <span
              style={{
                fontSize: 'clamp(2.5rem, 5.4vw, 4.2rem)',
                color: '#dc143c',
                display: 'block',
                letterSpacing: '0.04em'
              }}
            >
              {heroData.titleRed}
            </span>
          </h1>

          {/* Subtitle from Figma: Premium Streetwear For Those Who Move Different */}
          <p
            style={{
              fontSize: 'clamp(0.8rem, 1.1vw, 0.92rem)',
              fontWeight: '800',
              color: '#ffffff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}
          >
            {heroData.tagline}
          </p>

          {/* Atelier Pre-order Narrative */}
          <p
            style={{
              fontSize: 'clamp(0.7rem, 0.85vw, 0.78rem)',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: '440px',
              marginBottom: '24px',
              fontWeight: '400'
            }}
          >
            {heroData.description}
          </p>

          {/* Dual CTAs: SHOP NOW (Primary Red) + VIEW LOOKBOOK (Secondary Gold) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onShopClick && onShopClick()}
              style={{
                padding: '13px 28px',
                backgroundColor: '#dc143c',
                color: '#ffffff',
                border: '2px solid #dc143c',
                borderRadius: '9999px',
                fontWeight: '900',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '3px 3px 0px #d4af37, 0 0 25px rgba(220, 20, 60, 0.45)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff2a55';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '5px 5px 0px #ffd312, 0 0 30px rgba(220, 20, 60, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc143c';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '3px 3px 0px #d4af37, 0 0 25px rgba(220, 20, 60, 0.45)';
              }}
            >
              <span>SHOP NOW</span>
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#dc143c'
                }}
              >
                <ArrowRight size={14} strokeWidth={3} />
              </span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('lookbook-section') || document.getElementById('wardrobe-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '12px 26px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: '#ffffff',
                border: '1.5px solid #d4af37',
                borderRadius: '9999px',
                fontWeight: '900',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#d4af37';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(212,175,55,0.5), 3px 3px 0px #dc143c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>VIEW LOOKBOOK</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Scroll Cue Indicator */}
      <div
        ref={scrollCueRef}
        className="desktop-only"
        onClick={() => {
          const el = document.getElementById('wardrobe-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          cursor: 'pointer',
          willChange: 'opacity',
          transition: 'opacity 0.2s ease-out'
        }}
      >
        <span
          style={{
            fontSize: '0.62rem',
            fontWeight: '900',
            letterSpacing: '0.14em',
            fontFamily: 'var(--font-mono)',
            color: '#ffd312',
            textTransform: 'uppercase'
          }}
        >
          SCROLL TO EXPLORE THE RITUAL
        </span>
        <div
          style={{
            width: '2px',
            height: '26px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '2px'
          }}
        >
          <div
            className="animate-scroll-line"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '14px',
              backgroundColor: '#ffd312',
              boxShadow: '0 0 8px #ffd312'
            }}
          />
        </div>
      </div>

      {/* 5. Bottom Gradient Transition */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '110px',
          background: 'linear-gradient(to top, #010000 0%, rgba(1, 0, 0, 0.8) 45%, rgba(1, 0, 0, 0) 100%)',
          zIndex: 8,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
}
