import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

/**
 * Static luxury brand logo showcasing the authentic SΨGIL occult insignia.
 * Clicking the logo navigates back to the Home page.
 */
export default function AnimatedLogo({ size = 'md', showText = true, stacked = false, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const store = useStore();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (store?.openHomePage) {
      store.openHomePage();
    } else {
      try {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
        window.location.hash = '';
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Responsive dimensional scales (Enhanced for majestic luxury visibility)
  const sizes = {
    sm: { emblemH: 46, wordmarkH: 23, gap: 10, fullH: 64 },
    md: { emblemH: 58, wordmarkH: 30, gap: 14, fullH: 82 },
    lg: { emblemH: 80, wordmarkH: 40, gap: 18, fullH: 110 },
    xl: { emblemH: 116, wordmarkH: 58, gap: 24, fullH: 150 }
  };

  const current = sizes[size] || sizes.md;

  if (stacked) {
    return (
      <div
        className="brand-logo-root"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Return to Homepage"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: `${current.gap}px`,
          cursor: 'pointer',
          userSelect: 'none',
          filter: isHovered
            ? 'brightness(1.15) drop-shadow(0 0 12px rgba(220, 20, 60, 0.45))'
            : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
          transition: 'filter 0.25s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/assets/sygil_emblem.png"
          alt="SΨGIL Occult Insignia"
          style={{
            height: `${current.emblemH * 1.25}px`,
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
        {showText && (
          <img
            src="/assets/sygil_wordmark.png"
            alt="SΨGIL"
            style={{
              height: `${current.wordmarkH * 1.1}px`,
              width: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="brand-logo-root"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Return to Homepage"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e); }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${current.gap}px`,
        cursor: 'pointer',
        userSelect: 'none',
        filter: isHovered
          ? 'brightness(1.15) drop-shadow(0 0 12px rgba(212, 175, 55, 0.45))'
          : 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
        transition: 'filter 0.25s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Authentic Occult Emblem */}
      <img
        src="/assets/sygil_emblem.png"
        alt="SΨGIL Occult Insignia"
        style={{
          height: `${current.emblemH}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block'
        }}
      />

      {/* Matching Gold Engraved Wordmark */}
      {showText && (
        <img
          src="/assets/sygil_wordmark.png"
          alt="SΨGIL"
          style={{
            height: `${current.wordmarkH}px`,
            width: 'auto',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      )}
    </div>
  );
}
