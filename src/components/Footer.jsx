import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import AnimatedLogo from './AnimatedLogo';

export default function Footer({ onNavigateSection }) {
  const { showToast } = useStore();
  const [journalEmail, setJournalEmail] = useState('');

  const handleJournalSubmit = (e) => {
    e.preventDefault();
    if (journalEmail) {
      showToast('Welcome to the SΨGIL occult pre-order dispatches.', 'success');
      setJournalEmail('');
    }
  };

  return (
    <footer id="contact-section" style={{ backgroundColor: '#010000', borderTop: '2px solid #ffd312', paddingTop: '80px', paddingBottom: '40px', color: '#dcdce6' }}>
      <div className="store-container">
        {/* Top: Brand Heading & Journal Capture */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(28px, 4vw, 48px)', marginBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '40px' }}>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <AnimatedLogo size="lg" showText={true} />
            </div>
            <p style={{ fontSize: '0.9rem', color: '#8c8c9e', maxWidth: '460px', lineHeight: 1.6 }}>
              The occult cyber-atelier defining next-generation brutalist streetwear. Handcrafted in limited 50–150 piece batches in Florence, Tokyo, and Biella. 100% Cash On Delivery pre-order platform.
            </p>
          </div>

          <div>
            <div style={{ display: 'inline-flex', marginBottom: '8px' }}>
              <span className="sticker-badge">
                SΨGIL PRIVATE DISPATCHES
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#8c8c9e', marginBottom: '16px' }}>
              Secret pre-order batch alerts, private salon invites, and backstage access delivered to your inbox.
            </p>
            <form onSubmit={handleJournalSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                placeholder="Enter email for private drops"
                value={journalEmail}
                onChange={(e) => setJournalEmail(e.target.value)}
                style={{
                  flex: 1,
                  backgroundColor: '#08080a',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  borderRadius: '9999px',
                  padding: '12px 20px',
                  color: '#ffffff',
                  fontSize: '0.84rem',
                  outline: 'none',
                  fontFamily: 'var(--font-mono)'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '12px 24px', fontSize: '0.8rem' }}
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        {/* Navigation & Social Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', marginBottom: '48px' }}>
          {/* Client Services */}
          <div>
            <h5 style={{ fontSize: '0.78rem', fontWeight: '900', letterSpacing: '0.12em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '18px' }}>
              CLIENT SERVICES
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem' }}>
              <li>
                <a
                  href="#faq-section"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateSection) onNavigateSection('faq-section');
                    else document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: '#dcdce6', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffd312'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#dcdce6'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  Return Policy
                </a>
              </li>
              <li>
                <a
                  href="#editorial-section"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateSection) onNavigateSection('editorial-section');
                    else document.getElementById('editorial-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: '#dcdce6', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffd312'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#dcdce6'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: '#dcdce6', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffd312'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#dcdce6'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#faq-section"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigateSection) onNavigateSection('faq-section');
                    else document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ color: '#dcdce6', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ffd312'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#dcdce6'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h5 style={{ fontSize: '0.78rem', fontWeight: '900', letterSpacing: '0.12em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '18px' }}>
              FOLLOW US
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#dcdce6',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  width: 'fit-content'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffd312';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#dcdce6';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#08080a',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span>
                <span>Facebook</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#dcdce6',
                  textDecoration: 'none',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  width: 'fit-content'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffd312';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#dcdce6';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#08080a',
                    border: '1.5px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </span>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', fontSize: '0.74rem', color: '#8c8c9e' }}>
          <div>
            © 2026 SΨGIL ATELIER LTD. ALL RIGHTS RESERVED. PRE-ORDER PORTAL • STRICTLY 100% CASH ON DELIVERY.
          </div>

          {/* Cash Payment Badges */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '0.72rem', fontWeight: '900' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '4px', backgroundColor: '#08080a', border: '1.5px solid #ffd312', color: '#ffd312' }}>
              100% CASH ON DELIVERY
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '4px', backgroundColor: '#08080a', border: '1.5px solid #dc143c', color: '#ffffff' }}>
              0 EGP DUE TODAY
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '4px', backgroundColor: '#08080a', border: '1.5px solid rgba(255,255,255,0.3)', color: '#ffffff' }}>
              DOORSTEP COURIER HANDOVER
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
