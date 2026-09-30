import React from 'react';
import { CATEGORIES } from '../data/storeData';
import { ArrowRight } from 'lucide-react';

export default function CategoryRails({ onSelectCategory, activeCategory }) {
  const categoriesWithImages = CATEGORIES.filter((c) => c.image);

  return (
    <section id="wardrobe-section" style={{ padding: '64px 0 32px', scrollMarginTop: '60px' }}>
      <div className="store-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span className="sticker-badge">
                CURATED PIECES
              </span>
              <span className="sticker-cash" style={{ fontSize: '0.64rem', padding: '2px 8px' }}>
                HOODIES • SWEATSHIRTS • TOPS
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.2vw, 3.2rem)', color: '#ffffff', fontWeight: '900', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              The wardrobe
            </h2>
            <div className="title-red-line" />
            <div style={{ fontSize: '0.76rem', color: '#ffd312', fontFamily: 'var(--font-mono)', fontWeight: '800', letterSpacing: '0.08em', marginTop: '4px' }}>
              BATCH 01 RUNWAY EDITIONS • 0 EGP DUE TODAY
            </div>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: '900',
              letterSpacing: '0.08em',
              color: '#ffd312',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span>VIEW ALL GRAILS</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Rails Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(145px, 28vw, 240px), 1fr))',
            gap: 'clamp(10px, 2vw, 16px)'
          }}
        >
          {categoriesWithImages.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  position: 'relative',
                  height: 'clamp(200px, 30vw, 320px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `2px solid ${isActive ? '#ffd312' : 'rgba(255,255,255,0.12)'}`,
                  boxShadow: isActive ? '0 0 20px rgba(255,211,18,0.4)' : 'none',
                  transition: 'all var(--transition-smooth)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#ffd312';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #ffd312';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = isActive ? '#ffd312' : 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.boxShadow = isActive ? '0 0 20px rgba(255,211,18,0.4)' : 'none';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                {/* Gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(1,1,0,0.95) 0%, rgba(1,1,0,0.2) 60%, rgba(1,1,0,0.5) 100%)'
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'clamp(12px, 3vw, 20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    zIndex: 2
                  }}
                >
                  <span className="sticker-dark" style={{ width: 'fit-content', marginBottom: '6px', fontSize: '0.62rem' }}>
                    {cat.count} PIECES
                  </span>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', fontWeight: '900', color: '#ffffff', letterSpacing: '0.04em' }}>
                    {cat.name}
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
