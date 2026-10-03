import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NewsletterModal() {
  const { isNewsletterOpen, setIsNewsletterOpen, applyPromo, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isNewsletterOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      applyPromo('GENZ15');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#ffd312', '#dc143c', '#ffffff']
        });
      } catch {}
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('GENZ15');
    setCopied(true);
    showToast('Code GENZ15 copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div
        onClick={() => setIsNewsletterOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(1, 1, 0, 0.9)',
          backdropFilter: 'blur(8px)'
        }}
      />

      <div
        style={{
          position: 'relative',
          backgroundColor: '#08080a',
          border: '2px solid #dc143c',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(220,20,60,0.35)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '540px',
          overflow: 'hidden',
          zIndex: 140,
          padding: '40px 32px',
          textAlign: 'center'
        }}
      >
        <button
          onClick={() => setIsNewsletterOpen(false)}
          aria-label="Close modal"
          style={{ position: 'absolute', top: '16px', right: '16px', color: '#dc143c', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'inline-flex', marginBottom: '14px' }}>
              <span className="sticker-badge">
                PRIVATE ACCESS DISPATCH
              </span>
            </div>

            <h3 style={{ fontSize: '1.9rem', fontWeight: '900', color: '#ffffff', marginBottom: '10px' }}>
              CLAIM 15% OFF YOUR PRE-ORDER CASH INVOICE
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#dcdce6', lineHeight: 1.6, marginBottom: '24px' }}>
              Subscribe to the SΨGIL Occult Dispatch to get early pre-order batch releases, private atelier drop links, and an instant 15% cash discount code.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="email"
                required
                placeholder="Enter your personal email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '14px 18px',
                  borderRadius: '9999px',
                  backgroundColor: '#010000',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '16px', fontSize: '0.9rem' }}
              >
                <span>UNLOCK 15% PRE-ORDER PRIVILEGE</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <p style={{ fontSize: '0.7rem', color: '#8c8c9e', marginTop: '16px' }}>
              Zero spam. Strictly limited batch announcements and VIP early access.
            </p>
          </div>
        ) : (
          <div>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(220, 20, 60, 0.2)', border: '2px solid #dc143c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ffffff' }}>
              <Check size={32} strokeWidth={3} />
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginBottom: '10px' }}>
              YOU'RE ON THE VIP LIST
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#dcdce6', marginBottom: '20px' }}>
              Your 15% discount has been activated in your bag!
            </p>

            {/* Code Copy Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 20px',
                borderRadius: '12px',
                backgroundColor: '#010000',
                border: '2px dashed #dc143c',
                marginBottom: '24px',
                boxShadow: '2px 2px 0px #d4af37'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.68rem', color: '#8c8c9e', fontWeight: '900' }}>YOUR PRE-ORDER CODE:</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: '900', color: '#d4af37', letterSpacing: '0.1em' }}>
                  SYGIL15
                </div>
              </div>
              <button
                onClick={handleCopyCode}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: '900',
                  border: '1px solid #d4af37',
                  cursor: 'pointer'
                }}
              >
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>

            <button
              onClick={() => setIsNewsletterOpen(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '15px' }}
            >
              CONTINUE BROWSING DROPS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
