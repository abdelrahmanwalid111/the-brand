import React from 'react';
import { CATEGORIES } from '../data/storeData';
import { ArrowRight } from 'lucide-react';

export default function CategoryRails({ onSelectCategory, activeCategory }) {
  // The 4 main showcase categories matching Figma: HOODIES, T-SHIRTS, JACKETS, PANTS
  const categoriesToDisplay = CATEGORIES.filter((c) => c.id !== 'all' && c.image);

  return (
    <section id="wardrobe-section" style={{ position: 'relative', padding: '48px 0 32px', scrollMarginTop: '60px', overflow: 'hidden' }}>
      {/* Atmospheric Crimson Ambient Glow from "More From The Ritual" */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '-8%',
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(220, 20, 60, 0.22) 0%, rgba(180, 10, 40, 0.08) 45%, transparent 70%)',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="store-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: '900',
                  letterSpacing: '0.14em',
                  color: '#dc143c',
                  textTransform: 'uppercase'
                }}
              >
                THE RITUAL WARDROBE
              </span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>•</span>
              <span style={{ fontSize: '0.68rem', color: '#ffd312', fontWeight: '900', letterSpacing: '0.08em' }}>
                66 PIECES ONLY
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.8vw, 2.8rem)',
                color: '#ffffff',
                fontWeight: '900',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              The Wardrobe
            </h2>
            <div className="title-red-line" />
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              backgroundColor: 'transparent',
              border: '1.5px solid #ffd312',
              borderRadius: '6px',
              color: '#ffd312',
              fontSize: '0.76rem',
              fontWeight: '900',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              marginBottom: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffd312';
              e.currentTarget.style.color = '#010000';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 211, 18, 0.5), 3px 3px 0px #ffffff';
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ffd312';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translate(0, 0)';
            }}
          >
            <span>VIEW ALL GRAILS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Category Grid Cards from Figma */}
        <div className="category-rails-grid">
          {categoriesToDisplay.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  position: 'relative',
                  height: 'clamp(210px, 28vw, 360px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#050508',
                  border: `1.5px solid ${isActive ? '#ffd312' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isActive ? '0 0 24px rgba(255,211,18,0.35)' : 'none',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#ffd312';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.95), 0 0 30px rgba(220, 20, 60, 0.45), 0 0 15px rgba(255, 211, 18, 0.3)';
                  const img = e.currentTarget.querySelector('.cat-garment-img');
                  if (img) img.style.transform = 'scale(1.08)';
                  const arrow = e.currentTarget.querySelector('.cat-arrow');
                  if (arrow) arrow.style.transform = 'translateX(6px)';
                  const glow = e.currentTarget.querySelector('.cat-bg-glow');
                  if (glow) {
                    glow.style.opacity = '1';
                    glow.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isActive ? '#ffd312' : 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = isActive ? '0 0 24px rgba(255,211,18,0.35)' : 'none';
                  const img = e.currentTarget.querySelector('.cat-garment-img');
                  if (img) img.style.transform = 'scale(1)';
                  const arrow = e.currentTarget.querySelector('.cat-arrow');
                  if (arrow) arrow.style.transform = 'translateX(0)';
                  const glow = e.currentTarget.querySelector('.cat-bg-glow');
                  if (glow) {
                    glow.style.opacity = isActive ? '1' : '0.65';
                    glow.style.transform = 'scale(1)';
                  }
                }}
              >
                {/* Atmospheric Crimson Background Glow from "More From The Ritual" */}
                <div
                  className="cat-bg-glow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 40%, rgba(220, 20, 60, 0.28) 0%, rgba(180, 10, 40, 0.12) 35%, rgba(255, 211, 18, 0.04) 55%, transparent 75%)',
                    pointerEvents: 'none',
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    opacity: isActive ? 1 : 0.65
                  }}
                />

                {/* Garment Cutout Image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '16px 16px 80px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    className="cat-garment-img"
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.9))',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>

                {/* Bottom Content Bar from Figma: Category Title + shop now -> */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(14px, 2.5vw, 20px)',
                    background: 'linear-gradient(to top, rgba(1,1,0,0.98) 0%, rgba(1,1,0,0.85) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    zIndex: 5
                  }}
                >
                  <div
                    style={{
                      fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                      fontWeight: '900',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1
                    }}
                  >
                    {cat.name}
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      color: '#ffffff',
                      letterSpacing: '0.04em',
                      width: 'fit-content'
                    }}
                  >
                    <span style={{ borderBottom: '1.5px solid #dc143c', paddingBottom: '2px' }}>shop now</span>
                    <span
                      className="cat-arrow"
                      style={{
                        color: '#dc143c',
                        fontSize: '1rem',
                        transition: 'transform 0.25s ease',
                        display: 'inline-block'
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
