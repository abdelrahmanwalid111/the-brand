import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Plus, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import BloodText from './BloodText';

export default function HeroSection({ onShopClick, onLookbookClick }) {
  const { openQuickView, formatPrice } = useStore();
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Direct DOM refs for GPU-accelerated 60/120fps parallax with ZERO React re-renders on scroll
  const bgImageRef = useRef(null);
  const hotspotsContainerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Single signature editorial hero image
  const heroData = {
    title: 'SΨGIL',
    subtitle: 'ATELIER PRE-ORDER ARCHIVE',
    description: 'Ultra-structured matte Italian lambskins, 650gsm heavyweight hoodies, and French terry sweatshirts. Handcrafted upon pre-order in limited allocations. 0 EGP due today — pay cash upon delivery.',
    image: '/assets/genz_hero_yellow.jpg',
    tag: '100% CASH ON DELIVERY',
    badge: 'BATCH 01 ALLOCATION',
    hotspots: [
      {
        id: 'hs-hero-1',
        productId: 'rad-07',
        title: 'SΨGIL LAMBSKIN BOX-CUT MOTO TOP',
        shortLabel: 'LAMBSKIN MOTO TOP',
        category: 'TOPS',
        price: 4200,
        x: 64,
        y: 42,
        image: '/assets/radian_cropped_jacket.jpg'
      },
      {
        id: 'hs-hero-2',
        productId: 'rad-01',
        title: '650GSM OCCULT HEAVYWEIGHT HOODIE',
        shortLabel: 'HEAVYWEIGHT HOODIE',
        category: 'HOODIES',
        price: 3600,
        x: 48,
        y: 64,
        image: '/assets/genz_hero_yellow.jpg'
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
        height: 'calc(100vh - 70px)',
        minHeight: '600px',
        maxHeight: '920px',
        marginTop: '-76px',
        paddingTop: '76px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff'
      }}
    >
      {/* 1. Single Editorial Hero Background with Radian Parallax Zoom */}
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
          alt={heroData.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%'
          }}
        />
        {/* Contrast Gradient for Text Legibility on Left Side */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(1,1,0,0.96) 0%, rgba(1,1,0,0.72) 38%, rgba(1,1,0,0.3) 70%, rgba(1,1,0,0.6) 100%), linear-gradient(to top, rgba(1,1,0,0.96) 0%, transparent 40%, rgba(1,1,0,0.5) 100%)'
          }}
        />
      </div>

      {/* 2. Interactive Garment Radar Hotspot Pins (Z-Index 30, fully clickable) */}
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

                {/* Floating Label Badge */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHotspotClick(hs.productId);
                  }}
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
                    left: '50%',
                    width: '260px',
                    padding: '14px',
                    borderRadius: '14px',
                    border: '1.5px solid #ffd312',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.95), 0 0 25px rgba(255,211,18,0.3)',
                    cursor: 'pointer',
                    zIndex: 50
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="sticker-badge" style={{ fontSize: '0.58rem', padding: '2px 6px' }}>
                      {hs.category}
                    </span>
                    <span style={{ fontSize: '0.62rem', color: '#ffd312', fontWeight: '900' }}>
                      CLICK TO INSPECT
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <img
                      src={hs.image}
                      alt={hs.title}
                      style={{
                        width: '50px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: '900',
                          color: '#ffffff',
                          lineHeight: 1.25,
                          marginBottom: '4px'
                        }}
                      >
                        {hs.title}
                      </div>
                      <div style={{ fontSize: '0.84rem', color: '#ffd312', fontWeight: '900', fontFamily: 'var(--font-mono)' }}>
                        {formatPrice(hs.price)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                    <span style={{ fontSize: '0.62rem', color: '#ff3b62', fontWeight: '800' }}>
                      0 EGP DUE TODAY • COD
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHotspotClick(hs.productId);
                      }}
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: '900',
                        color: '#010000',
                        backgroundColor: '#ffd312',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Eye size={11} />
                      <span>PREVIEW</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Left-Aligned, Much Smaller & Refined Text Content */}
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
            maxWidth: '460px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            pointerEvents: 'auto'
          }}
        >
          {/* Subtle Sticker Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="sticker-badge" style={{ fontSize: '0.62rem', padding: '3px 8px' }}>
              {heroData.badge}
            </span>
            <span
              className="sticker-cash"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#010000',
                color: '#ffd312',
                border: '1px solid #ffd312',
                padding: '3px 8px',
                borderRadius: '9999px',
                fontSize: '0.62rem',
                fontWeight: '900',
                letterSpacing: '0.06em'
              }}
            >
              {heroData.tag}
            </span>
          </div>

          {/* Compact Refined Syne Headline */}
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)',
              lineHeight: 1.05,
              fontWeight: '900',
              letterSpacing: '0.02em',
              marginBottom: '6px',
              textTransform: 'uppercase'
            }}
          >
            <BloodText drip={true}>{heroData.title}</BloodText>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(0.85rem, 1.3vw, 1.1rem)',
                fontWeight: '800',
                letterSpacing: '0.08em',
                fontFamily: 'var(--font-heading)',
                marginTop: '4px',
                color: '#ffd312'
              }}
            >
              {heroData.subtitle}
            </span>
          </h1>

          {/* Animated Red Accent Line */}
          <div className="title-red-line" />

          {/* Much Smaller Editorial Description */}
          <p
            style={{
              fontSize: 'clamp(0.78rem, 1vw, 0.88rem)',
              lineHeight: 1.55,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '420px',
              marginBottom: '20px',
              fontWeight: '400'
            }}
          >
            {heroData.description}
          </p>

          {/* Compact Luxury Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onShopClick}
              className="btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.74rem',
                letterSpacing: '0.06em'
              }}
            >
              <span>RESERVE PRE-ORDER</span>
              <ArrowUpRight size={14} />
            </button>

            <button
              onClick={onLookbookClick}
              className="btn-crimson"
              style={{
                padding: '10px 18px',
                fontSize: '0.74rem',
                letterSpacing: '0.06em'
              }}
            >
              <span>LOOKBOOK RADAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Radian Scroll Down Indicator Cue */}
      <div
        ref={scrollCueRef}
        onClick={() => {
          const el = document.getElementById('wardrobe-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          position: 'absolute',
          bottom: '20px',
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
            fontSize: '0.6rem',
            fontWeight: '900',
            letterSpacing: '0.14em',
            fontFamily: 'var(--font-mono)',
            color: '#ffd312',
            textTransform: 'uppercase'
          }}
        >
          SCROLL TO EXPLORE THE WARDROBE
        </span>
        <div
          style={{
            width: '2px',
            height: '30px',
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

      {/* 5. Bottom Vignette Seamless Blend to 'The wardrobe' */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, #010000 0%, rgba(1, 0, 0, 0.8) 45%, rgba(1, 0, 0, 0) 100%)',
          zIndex: 8,
          pointerEvents: 'none'
        }}
      />
    </section>
  );
}
