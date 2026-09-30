import React, { useState } from 'react';
import { BRAND_VALUES, FAQS } from '../data/storeData';
import { ChevronDown } from 'lucide-react';

export default function BrandValuesMatrix() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq-section" style={{ padding: '90px 0', backgroundColor: '#010000' }}>
      <div className="store-container">
        {/* 4 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '80px' }}>
          {BRAND_VALUES.map((val, idx) => {
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#08080a',
                  border: '1.5px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all var(--transition-smooth)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-3px, -3px)';
                  e.currentTarget.style.borderColor = '#ffd312';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #ffd312';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '900',
                    fontFamily: 'var(--font-mono)',
                    color: '#ffd312',
                    letterSpacing: '0.05em'
                  }}
                >
                  0{idx + 1}
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '900', letterSpacing: '0.04em', color: '#ffffff', textTransform: 'uppercase' }}>
                  {val.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#dcdce6', lineHeight: 1.6 }}>
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQs Section */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span className="sticker-badge">
                CLIENT CONCIERGE
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)', color: '#ffffff', fontWeight: '900' }}>
              FREQUENTLY ASKED QUESTIONS <span style={{ color: '#ffd312' }}>///</span>
            </h3>
            <div className="title-red-line title-red-line-center" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: `1.5px solid ${isOpen ? '#ffd312' : 'rgba(255, 255, 255, 0.12)'}`,
                    borderRadius: '14px',
                    backgroundColor: '#08080a',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 22px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      color: '#ffffff',
                      fontWeight: '900',
                      fontSize: '0.92rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 22px 20px', fontSize: '0.86rem', color: '#dcdce6', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
