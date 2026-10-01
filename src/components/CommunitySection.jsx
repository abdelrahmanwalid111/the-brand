import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CommunitySection() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (!agreed) {
      showToast('Please agree to terms & conditions', 'error');
      return;
    }
    showToast('You are now inscribed in SΨGIL Private Dispatches.', 'success');
    setEmail('');
    setAgreed(false);
  };

  return (
    <section
      aria-label="Community dispatches newsletter"
      style={{
        backgroundColor: '#010000',
        borderTop: '1px solid rgba(255, 211, 18, 0.3)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(40px, 6vw, 64px) 0',
        color: '#ffffff'
      }}
    >
      <div className="store-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(28px, 4vw, 48px)'
          }}
        >
          {/* Left: Heading & Value Proposition with Red Vertical Bar */}
          <div
            style={{
              borderLeft: '3px solid #dc143c',
              paddingLeft: 'clamp(14px, 2.5vw, 24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: '900',
                letterSpacing: '0.14em',
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'uppercase'
              }}
            >
              JOIN OUR COMMUNITY
            </span>
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
                fontWeight: '900',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                color: '#ffffff',
                margin: 0
              }}
            >
              STAY IN THE LOOP
            </h3>
            <p
              style={{
                fontSize: '0.78rem',
                color: '#8c8c9e',
                lineHeight: 1.5,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              BE THE FIRST TO KNOW ABOUT NEW DROPS. EXCLUSIVE OFFERS AND MORE.
            </p>
          </div>

          {/* Center: Email Form & Terms Checkbox */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#08080a',
                border: '1.5px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '9999px',
                padding: '4px 6px 4px 18px',
                transition: 'border-color 0.2s',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#ffd312')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)')}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading)'
                }}
              />
              <button
                type="submit"
                aria-label="Submit email address"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 0 12px rgba(220, 20, 60, 0.6)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = '#ff2a55';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#dc143c';
                }}
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            {/* Terms Checkbox */}
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.72rem',
                color: '#8c8c9e',
                cursor: 'pointer',
                letterSpacing: '0.04em',
                userSelect: 'none'
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  accentColor: '#dc143c',
                  width: '14px',
                  height: '14px',
                  cursor: 'pointer'
                }}
              />
              <span>I AGREE TO THE TERMS &amp; CONDITIONS.</span>
            </label>
          </form>

          {/* Right: Vertical Red Divider & Social Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 'clamp(16px, 2.5vw, 24px)',
              borderLeft: '2px solid rgba(220, 20, 60, 0.5)',
              paddingLeft: 'clamp(16px, 2.5vw, 28px)',
              height: '100%',
              minHeight: '60px'
            }}
          >
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SΨGIL on Instagram"
              style={{
                color: '#ffffff',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffd312';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SΨGIL on TikTok"
              style={{
                color: '#ffffff',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffd312';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.48 6.3 6.3 0 0 0 1.87-4.47V8.71a8.21 8.21 0 0 0 4.9 1.6V6.85a4.78 4.78 0 0 1-1-.16Z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SΨGIL on X"
              style={{
                color: '#ffffff',
                transition: 'color 0.2s, transform 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffd312';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
