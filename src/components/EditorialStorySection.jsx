import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EditorialStorySection({ onExploreStory }) {
  return (
    <section id="editorial-section" style={{ padding: 'clamp(50px, 8vw, 100px) 0', backgroundColor: '#010000' }}>
      <div className="store-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(36px, 5vw, 60px)', alignItems: 'center' }}>
          {/* Left: Artisanal Craftsmanship Image */}
          <div style={{ position: 'relative', marginBottom: '28px' }}>
            <div
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                minHeight: '220px',
                border: '2px solid #ffd312',
                boxShadow: '4px 4px 0px #ffd312, 0 20px 50px rgba(0,0,0,0.9)'
              }}
            >
              <img
                src="/assets/craftsmanship.jpg"
                alt="Florentine Master Tailoring Atelier"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Quote Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                left: 'clamp(10px, 3vw, 20px)',
                right: 'clamp(10px, 3vw, 20px)',
                padding: 'clamp(14px, 3vw, 24px)',
                borderRadius: '16px',
                backgroundColor: 'rgba(8, 8, 10, 0.96)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid #ffd312',
                boxShadow: '3px 3px 0px #dc143c'
              }}
            >
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.85rem, 2vw, 1.05rem)', color: '#ffffff', lineHeight: 1.4, marginBottom: '8px', fontWeight: '800' }}>
                "We do not build garments for a single season. We sculpt contemporary armor that hits with undeniable presence."
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px', fontSize: '0.68rem', color: '#ffd312', fontWeight: '900', letterSpacing: '0.06em' }}>
                <span>MATTEO CELLINI • MASTER ARTISAN</span>
                <span>FLORENCE, ITALY</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div style={{ paddingTop: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span className="sticker-badge">
                THE SΨGIL ATELIER MANIFESTO
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(2.1rem, 4vw, 3.2rem)', lineHeight: 1.08, color: '#ffffff', fontWeight: '900', marginBottom: '14px' }}>
              THE ART OF THE <span className="blood-text">UNCOMPROMISING</span> FIT <span style={{ color: '#ffd312' }}>///</span>
            </h2>
            <div className="title-red-line" />

            <p style={{ fontSize: '0.94rem', color: '#dcdce6', lineHeight: 1.7, marginBottom: '18px' }}>
              Founded at the intersection of Florentine leather mastery, occult geometry, and high-voltage cyber brutalism, SΨGIL operates on a pure pre-order allocation model. We craft only what is reserved — eliminating waste while delivering unparalleled artisanal quality.
            </p>

            <p style={{ fontSize: '0.94rem', color: '#dcdce6', lineHeight: 1.7, marginBottom: '28px' }}>
              Every hide is hand-graded for micro-grain uniformity. Every seam is laser-bonded to guarantee a crisp boxy drape that holds its silhouette. Zero upfront charge — pay in cash only when your piece arrives at your door.
            </p>

            {/* Credential Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#08080a', border: '1.5px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>50–150 PCS</div>
                <div style={{ fontSize: '0.72rem', color: '#8c8c9e', textTransform: 'uppercase', fontWeight: '800' }}>
                  Strict pre-order batch allocation
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#08080a', border: '1.5px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#dc143c', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>100% COD</div>
                <div style={{ fontSize: '0.72rem', color: '#8c8c9e', textTransform: 'uppercase', fontWeight: '800' }}>
                  Cash On Doorstep Delivery
                </div>
              </div>
            </div>

            <button
              onClick={onExploreStory}
              className="btn-primary"
            >
              <span>DISCOVER THE ATELIER ARCHIVE</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
