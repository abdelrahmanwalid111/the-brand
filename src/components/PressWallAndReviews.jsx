import React, { useState } from 'react';
import { PRESS_QUOTES } from '../data/storeData';

export default function PressWallAndReviews() {
  const [activePressIndex, setActivePressIndex] = useState(0);

  const quote = PRESS_QUOTES[activePressIndex];

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#08080a', borderTop: '2px solid rgba(255,255,255,0.1)', borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
      <div className="store-container">
        {/* Editorial Press Quotes Box */}
        <div
          style={{
            backgroundColor: '#010000',
            border: '2px solid #ffd312',
            boxShadow: '4px 4px 0px #ffd312',
            borderRadius: '24px',
            padding: '48px clamp(24px, 5vw, 64px)',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '2.4rem', color: '#ffd312', opacity: 0.6, lineHeight: 1, marginBottom: '12px', fontFamily: 'serif' }}>
            “
          </div>

          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.3rem, 2.6vw, 2rem)',
              lineHeight: 1.35,
              color: '#ffffff',
              maxWidth: '860px',
              margin: '0 auto 24px',
              fontWeight: '800'
            }}
          >
            "{quote.quote}"
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '0.92rem', fontWeight: '900', letterSpacing: '0.12em', color: '#ffd312', textTransform: 'uppercase' }}>
              {quote.publication}
            </span>
            <span style={{ fontSize: '0.74rem', color: '#8c8c9e', letterSpacing: '0.05em' }}>
              {quote.author}
            </span>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {PRESS_QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePressIndex(i)}
                aria-label={`Quote ${i + 1}`}
                style={{
                  width: activePressIndex === i ? '28px' : '8px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: activePressIndex === i ? '#ffd312' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
