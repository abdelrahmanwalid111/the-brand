import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Plus, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';

export default function HeroSection({ onShopClick }) {
  const { openQuickView, formatPrice } = useStore();
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Direct DOM refs for GPU-accelerated 60/120fps parallax with ZERO React re-renders on scroll
  const bgImageRef = useRef(null);
  const hotspotsContainerRef = useRef(null);
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
    image: '/assets/sygil_hero_cinematic.jpg',
    hotspots: [
      {
        id: 'hs-hero-1',
        productId: 'rad-01',
        title: 'DARK RITUAL 650GSM HOODIE',
        shortLabel: 'DARK RITUAL HOODIE',
        category: 'HOODIES',
        price: 2600,
        x: 35,
        y: 45,
        image: '/assets/sygil_hoodie_darkritual.jpg'
      },
      {
        id: 'hs-hero-2',
        productId: 'rad-06',
        title: 'SACRED GEOMETRY BOX-CUT TEE',
        shortLabel: 'SACRED GEOMETRY TEE',
        category: 'T-SHIRTS',
        price: 2600,
        x: 68,
        y: 46,
        image: '/assets/sygil_tshirt_sigil.jpg'
      }
    ]
  };

  // Silky 60/120fps Parallax via requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const renderParallax = () => {
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

        if (hotspotsContainerRef.current) {
          hotspotsContainerRef.current.style.transform = `translateY(${imageY}px)`;
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

  const handleHotspotClick = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      openQuickView(product);
    }
  };

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

      {/* 2. Interactive Garment Radar Hotspot Pins */}
      <div
        ref={hotspotsContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      >
        {heroData.hotspots.map((hs) => {
          const isCardOpen = activeHotspot?.id === hs.id;
          return (
            <div
              key={hs.id}
              style={{
                position: 'absolute',
                top: `${hs.y}%`,
                left: `${hs.x}%`,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'auto',
                zIndex: isCardOpen ? 45 : 30
              }}
              onMouseEnter={() => setActiveHotspot(hs)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Radar Pulse Button and Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(hs.productId);
                  }}
                  className="radar-sonar-pin"
                  aria-label={`View ${hs.title}`}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#ffd312',
                    border: '2.5px solid #010000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#010000',
                    cursor: 'pointer',
                    boxShadow: '0 0 22px rgba(255, 211, 18, 0.95), 0 4px 15px rgba(0,0,0,0.9)',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.22)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Plus size={19} strokeWidth={3.5} />
                </button>

                {/* Floating Label Badge (desktop / tablet) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(hs.productId);
                  }}
                  className="desktop-only"
                  style={{
                    backgroundColor: 'rgba(1, 1, 0, 0.92)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1.5px solid #ffd312',
                    color: '#ffffff',
                    padding: '5px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.68rem',
                    fontWeight: '800',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.85)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffd312';
                    e.currentTarget.style.color = '#010000';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(1, 1, 0, 0.92)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span>{hs.shortLabel}</span>
                  <span style={{ color: 'inherit', fontWeight: '900', fontFamily: 'var(--font-mono)' }}>
                    • {formatPrice(hs.price)}
                  </span>
                </button>
              </div>

              {/* Floating Garment Preview Card */}
              {isCardOpen && (
                <div
                  className="glass-modal hotspot-card-enter"
                  onClick={() => handleHotspotClick(hs.productId)}
                  style={{
                    position: 'absolute',
                    bottom: '48px',
                    left: hs.x > 50 ? 'auto' : '0',
                    right: hs.x > 50 ? '0' : 'auto',
                    transform: 'none',
                    width: 'min(82vw, 250px)',
                    padding: '12px',
                    borderRadius: '14px',
                    border: '1.5px solid #ffd312',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.95), 0 0 25px rgba(255,211,18,0.3)',
                    cursor: 'pointer',
                    zIndex: 50,
                    backgroundColor: 'rgba(5, 5, 8, 0.96)'
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '1',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '8px',
                      backgroundColor: '#010000',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <img
                      src={hs.image}
                      alt={hs.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontSize: '0.62rem', color: '#ffd312', fontWeight: '900', textTransform: 'uppercase' }}>
                      {hs.category}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: '#dc143c', fontWeight: '900' }}>
                      0 EGP TODAY
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.25, marginBottom: '6px' }}>
                    {hs.title}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(hs.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHotspotClick(hs.productId);
                      }}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#ffd312',
                        color: '#010000',
                        fontSize: '0.65rem',
                        fontWeight: '900',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={11} />
                      <span>VIEW</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
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

          {/* Dual CTAs from Figma: VIEW LOOKBOOK + SHOP NOW */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const el = document.getElementById('lookbook-section') || document.getElementById('wardrobe-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '12px 28px',
                backgroundColor: 'rgba(1, 1, 0, 0.7)',
                color: '#ffd312',
                border: '2px solid #ffd312',
                borderRadius: '6px',
                fontWeight: '900',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffd312';
                e.currentTarget.style.color = '#010000';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(255,211,18,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(1, 1, 0, 0.7)';
                e.currentTarget.style.color = '#ffd312';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>VIEW LOOKBOOK</span>
            </button>

            <button
              onClick={onShopClick}
              style={{
                padding: '10px 22px',
                backgroundColor: 'rgba(10, 10, 14, 0.95)',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '9999px',
                fontWeight: '900',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc143c';
                e.currentTarget.style.transform = 'translateX(2px)';
                e.currentTarget.style.boxShadow = '0 0 22px rgba(220, 20, 60, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>SHOP NOW</span>
              <span
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#dc143c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <ArrowRight size={14} strokeWidth={3} />
              </span>
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
