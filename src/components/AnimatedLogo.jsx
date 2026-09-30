import React, { useState } from 'react';

export default function AnimatedLogo({ size = 'md', showText = true }) {
  const [isHovered, setIsHovered] = useState(false);

  // Dimensions based on size
  const sizes = {
    sm: { imgSize: 34, fontSize: '1.05rem', subSize: '0.52rem', ringSize: 46 },
    md: { imgSize: 44, fontSize: '1.35rem', subSize: '0.62rem', ringSize: 60 },
    lg: { imgSize: 72, fontSize: '2.1rem', subSize: '0.75rem', ringSize: 96 },
    xl: { imgSize: 110, fontSize: '3rem', subSize: '0.9rem', ringSize: 146 }
  };

  const current = sizes[size] || sizes.md;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'xl' || size === 'lg' ? '16px' : '10px',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Emblem Icon with Animated Sacred Rings */}
      <div
        style={{
          position: 'relative',
          width: `${current.ringSize}px`,
          height: `${current.ringSize}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Outer Rotating Runic Ring */}
        <svg
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            animation: isHovered ? 'spinSlow 3s linear infinite' : 'spinSlow 14s linear infinite',
            transformOrigin: 'center center',
            transition: 'animation-duration 0.3s ease',
            pointerEvents: 'none'
          }}
        >
          {/* Dashed outer ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#ffd312"
            strokeWidth="1.2"
            strokeDasharray="4 6 12 4 8 8"
            opacity={isHovered ? 0.9 : 0.6}
          />
          {/* 4 Cardinal points / stars */}
          <polygon points="50,2 52,6 50,10 48,6" fill="#ffd312" />
          <polygon points="50,98 52,94 50,90 48,94" fill="#ffd312" />
          <polygon points="2,50 6,52 10,50 6,48" fill="#ffd312" />
          <polygon points="98,50 94,52 90,50 94,48" fill="#ffd312" />
          
          {/* Crimson Accents */}
          <circle cx="50" cy="50" r="41" fill="none" stroke="#dc143c" strokeWidth="0.8" strokeDasharray="3 14" opacity="0.8" />
        </svg>

        {/* Counter-Rotating Inner Sacred Ring */}
        <svg
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            animation: isHovered ? 'spinReverse 2s linear infinite' : 'spinReverse 10s linear infinite',
            transformOrigin: 'center center',
            pointerEvents: 'none'
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#ffd312"
            strokeWidth="0.8"
            strokeDasharray="2 8"
            opacity={isHovered ? 0.8 : 0.4}
          />
        </svg>

        {/* Glow Aura */}
        <div
          style={{
            position: 'absolute',
            width: `${current.imgSize}px`,
            height: `${current.imgSize}px`,
            borderRadius: '50%',
            backgroundColor: isHovered ? 'rgba(255, 211, 18, 0.45)' : 'rgba(255, 211, 18, 0.2)',
            filter: 'blur(10px)',
            transition: 'all 0.3s ease',
            pointerEvents: 'none'
          }}
        />

        {/* The Authentic High-Res Sygil Logo Image */}
        <div
          style={{
            position: 'relative',
            width: `${current.imgSize}px`,
            height: `${current.imgSize}px`,
            borderRadius: '50%',
            overflow: 'hidden',
            border: `1.5px solid ${isHovered ? '#ffd312' : 'rgba(255, 211, 18, 0.6)'}`,
            boxShadow: isHovered ? '0 0 18px #ffd312, 0 0 30px #dc143c' : '0 0 10px rgba(0,0,0,0.8)',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: '#010000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/assets/sygil_logo.jpg"
            alt="SYGIL Occult Atelier Sigil"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(1.15)',
              filter: isHovered ? 'brightness(1.2) contrast(1.1)' : 'brightness(1.05)'
            }}
          />

          {/* Glint Flare Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.4) 0%, transparent 60%)',
              opacity: isHovered ? 0.8 : 0.2,
              mixBlendMode: 'overlay',
              transition: 'opacity 0.3s'
            }}
          />
        </div>
      </div>

      {/* Typography: SΨGIL */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: current.fontSize,
              fontWeight: '900',
              letterSpacing: '0.18em',
              color: '#ffffff',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              textTransform: 'uppercase',
              textShadow: isHovered ? '0 0 16px rgba(255,211,18,0.7)' : 'none',
              transition: 'text-shadow 0.3s'
            }}
          >
            <span>S</span>
            <span style={{ color: '#ffd312', fontSize: '1.15em', lineHeight: 0.8, textShadow: '0 0 10px #ffd312' }}>Ψ</span>
            <span>GIL</span>
          </div>
        </div>
      )}
    </div>
  );
}
