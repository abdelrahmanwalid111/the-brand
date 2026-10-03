import React from 'react';

export default function EditorialStorySection({ onExploreStory }) {
  return (
    <section id="editorial-section" style={{ padding: 'clamp(50px, 8vw, 100px) 0', backgroundColor: '#010000', borderTop: '1px solid rgba(220, 20, 60, 0.4)' }}>
      <div className="store-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(36px, 6vw, 64px)',
            alignItems: 'center'
          }}
        >
          {/* Left: Atmospheric Cinematic Model Portrait from Figma */}
          <div style={{ position: 'relative', marginBottom: 'clamp(28px, 5vw, 0px)' }}>
            <div
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '4/3',
                backgroundColor: '#050508',
                border: '1.5px solid #dc143c',
                boxShadow: '0 0 35px rgba(0,0,0,0.9), 0 0 25px rgba(220,20,60,0.25)'
              }}
            >
              <img
                src="/assets/sygil_story_portrait.jpg"
                alt="SΨGIL Campaign Story Model"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Quote Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-18px',
                left: 'clamp(10px, 3vw, 24px)',
                right: 'clamp(10px, 3vw, 24px)',
                padding: 'clamp(12px, 2.5vw, 18px)',
                borderRadius: '12px',
                backgroundColor: 'rgba(8, 8, 10, 0.95)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid #dc143c',
                boxShadow: '3px 3px 0px #d4af37'
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
                  color: '#ffffff',
                  lineHeight: 1.4,
                  margin: '0 0 6px 0',
                  fontWeight: '800'
                }}
              >
                "We do not build garments for a single season. We sculpt contemporary armor that hits with undeniable presence."
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '4px',
                  fontSize: '0.66rem',
                  color: '#d4af37',
                  fontWeight: '900',
                  letterSpacing: '0.06em'
                }}
              >
                <span>SΨGIL OCCULT ATELIER</span>
                <span>FLORENCE, ITALY</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative from Figma */}
          <div style={{ paddingTop: '10px' }}>
            {/* Top Red Dash & Kicker from Figma */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ width: '28px', height: '3px', backgroundColor: '#dc143c', display: 'inline-block' }} />
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: '900',
                  letterSpacing: '0.14em',
                  color: '#ffffff',
                  textTransform: 'uppercase'
                }}
              >
                THE SYGIL STORY
              </span>
            </div>

            {/* Editorial Title from Figma: MORE THAN JUST CLOTHES */}
            <h2
              style={{
                fontSize: 'clamp(1.9rem, 3.6vw, 2.9rem)',
                lineHeight: 1.05,
                color: '#ffffff',
                fontWeight: '900',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                marginBottom: '16px',
                fontFamily: 'var(--font-heading)'
              }}
            >
              MORE THAN<br />JUST CLOTHES
            </h2>
            <div className="title-red-line" />

            {/* Manifesto Copy from Figma */}
            <p
              style={{
                fontSize: 'clamp(0.82rem, 1.1vw, 0.94rem)',
                fontWeight: '800',
                color: '#ffffff',
                lineHeight: 1.5,
                marginBottom: '18px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              WE CREATE PIECES FOR PEOPLE WHO SEE CLOTHING AS AN EXTENSION OF THEIR MINDSET. DESIGNED FOR FREEDOM, BUILT FOR THE STREETS.
            </p>

            <p style={{ fontSize: '0.8rem', color: '#8c8c9e', lineHeight: 1.7, marginBottom: '28px' }}>
              Founded at the intersection of Florentine leather mastery, occult geometry, and high-voltage cyber brutalism, SΨGIL operates on a pure pre-order allocation model. Every hide is hand-graded for micro-grain uniformity. Every seam is laser-bonded to hold its silhouette. Zero upfront charge — pay in cash only when your piece arrives at your door.
            </p>

            {/* Credential Badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', marginBottom: '32px' }}>
              <div style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: '#08080a', border: '1.5px solid #d4af37' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#d4af37', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>66 PIECES</div>
                <div style={{ fontSize: '0.7rem', color: '#8c8c9e', textTransform: 'uppercase', fontWeight: '800' }}>
                  Strict pre-order allocation
                </div>
              </div>

              <div style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: '#08080a', border: '1.5px solid #dc143c' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#dc143c', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>100% COD</div>
                <div style={{ fontSize: '0.7rem', color: '#8c8c9e', textTransform: 'uppercase', fontWeight: '800' }}>
                  Cash On Doorstep Delivery
                </div>
              </div>
            </div>

            {/* Button from Figma: OUR STORY -> */}
            <button
              onClick={onExploreStory}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(8, 8, 10, 0.95)',
                border: '1.5px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontWeight: '900',
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc143c';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.4)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.8)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>OUR STORY</span>
              <span
                style={{
                  color: '#dc143c',
                  fontSize: '1rem',
                  display: 'inline-block'
                }}
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
