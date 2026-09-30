import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ChevronRight, X } from 'lucide-react';
import { PRESETS, CURRENCIES } from '../data/storeData';

export default function AnnouncementBar() {
  const { currency, setCurrency, preset, setPreset, formatPrice, freeShippingThreshold } = useStore();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 19, seconds: 32 });

  const messages = [
    `PRE-ORDER ONLY PORTAL • 100% CASH ON DELIVERY (0 EGP DUE TODAY)`,
    `COMPLIMENTARY EXPRESS COURIER OVER ${formatPrice(freeShippingThreshold)}`,
    'SΨGIL VOL IX ATELIER PRE-ORDERS NOW LIVE — LIMITED 50-150 PCS',
    'USE DRIP CODE "SYGIL15" FOR 15% OFF YOUR PRE-ORDER CASH INVOICE',
    'ALLOCATIONS SELLING OUT FAST • PAY CASH TO COURIER'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [messages.length]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{
      backgroundColor: '#010000',
      borderBottom: '2px solid #ffd312',
      color: '#ffffff',
      fontSize: '0.74rem',
      fontWeight: '800',
      letterSpacing: '0.06em',
      padding: '8px 16px',
      position: 'relative',
      zIndex: 50,
      transition: 'all var(--transition-smooth)'
    }}>
      <div className="store-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {/* Left: Drop Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#dc143c',
            boxShadow: '0 0 10px #dc143c'
          }}></span>
          <span style={{ color: '#ffd312', fontFamily: 'var(--font-mono)', fontWeight: '900' }}>NEXT DROP:</span>
          <span style={{
            fontFamily: 'monospace',
            fontWeight: '900',
            letterSpacing: '0.1em',
            color: '#010000',
            backgroundColor: '#ffd312',
            padding: '2px 8px',
            borderRadius: '4px',
            border: '1px solid #010000'
          }}>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>

        {/* Center: Rotating Message */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#ffffff',
          cursor: 'pointer',
          fontFamily: 'var(--font-heading)'
        }}
        onClick={() => setCurrentMessageIndex((prev) => (prev + 1) % messages.length)}
        >
          <span>{messages[currentMessageIndex]}</span>
          <ChevronRight size={14} style={{ color: '#ffd312' }} />
        </div>

        {/* Right: Currency & Preset Quick Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Preset Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ opacity: 0.7, fontSize: '0.68rem', color: '#ffd312' }}>THEME:</span>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              style={{
                background: '#08080a',
                border: '1px solid #ffd312',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: '900',
                padding: '3px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id} style={{ background: '#010000', color: '#ffd312' }}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Currency Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ opacity: 0.7, fontSize: '0.68rem', color: '#ffd312' }}>CURRENCY:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                background: '#08080a',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontSize: '0.68rem',
                fontWeight: '900',
                padding: '3px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {Object.keys(CURRENCIES).map((code) => (
                <option key={code} value={code} style={{ background: '#010000', color: '#fff' }}>
                  {CURRENCIES[code].label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Close bar"
            style={{
              color: '#ffffff',
              opacity: 0.6,
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
