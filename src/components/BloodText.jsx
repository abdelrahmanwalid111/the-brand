import React, { useId } from 'react';

export default function BloodText({ children, drip = false, className = '', style = {} }) {
  const rawId = useId();
  const gradId = `blood-grad-${rawId.replace(/[:]/g, '')}`;

  return (
    <span
      className={`blood-text-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        verticalAlign: 'baseline',
        ...style
      }}
    >
      <span className="blood-fluid-text">
        {children}
      </span>
      {drip && (
        <span className="blood-drip-container" aria-hidden="true">
          <svg
            className="blood-drip-svg"
            viewBox="0 0 120 28"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b30922" />
                <stop offset="40%" stopColor="#800213" />
                <stop offset="85%" stopColor="#4a0008" />
                <stop offset="100%" stopColor="#250004" />
              </linearGradient>
            </defs>
            {/* Viscous organic blood drip stalactites along baseline */}
            <path
              d="M0,0 L120,0 L120,3 Q114,3 111,7 Q108,12 106,12 Q104,12 101,7 Q98,3 88,3 Q84,3 81,11 Q78,22 75,22 Q72,22 69,11 Q66,3 52,3 Q48,3 45,9 Q42,16 40,16 Q38,16 35,9 Q32,3 18,3 Q14,3 12,8 Q10,14 8,14 Q6,14 4,8 Q2,3 0,3 Z"
              fill={`url(#${gradId})`}
            />
            {/* Glossy top specular rim */}
            <path
              d="M0,1 L120,1"
              stroke="rgba(255, 120, 140, 0.45)"
              strokeWidth="0.8"
            />
          </svg>
          {/* Natural Gravity Liquid Falling Tears */}
          <span className="blood-falling-tear" />
          <span className="blood-falling-tear-second" />
        </span>
      )}
    </span>
  );
}
