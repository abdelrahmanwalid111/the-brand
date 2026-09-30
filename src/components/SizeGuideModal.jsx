import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X } from 'lucide-react';

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [activeTab, setActiveTab] = useState('apparel'); // 'apparel' or 'footwear'

  if (!isSizeGuideOpen) return null;

  const apparelSizes = [
    { eu: 'EU 44', chestCm: '88 – 92 cm', waistCm: '72 – 76 cm', shoulderCm: '44.0 cm', sleeveCm: '63.0 cm', garmentLengthCm: '74.0 cm' },
    { eu: 'EU 46', chestCm: '92 – 96 cm', waistCm: '76 – 80 cm', shoulderCm: '45.5 cm', sleeveCm: '64.5 cm', garmentLengthCm: '76.0 cm' },
    { eu: 'EU 48', chestCm: '96 – 100 cm', waistCm: '80 – 84 cm', shoulderCm: '47.0 cm', sleeveCm: '66.0 cm', garmentLengthCm: '78.0 cm' },
    { eu: 'EU 50', chestCm: '100 – 106 cm', waistCm: '84 – 90 cm', shoulderCm: '48.5 cm', sleeveCm: '67.5 cm', garmentLengthCm: '80.0 cm' },
    { eu: 'EU 52', chestCm: '106 – 112 cm', waistCm: '90 – 96 cm', shoulderCm: '50.0 cm', sleeveCm: '69.0 cm', garmentLengthCm: '82.0 cm' }
  ];

  const shoeSizes = [
    { eu: 'EU 38', footCm: '24.5 cm', insoleWidthCm: '9.2 cm' },
    { eu: 'EU 39', footCm: '25.1 cm', insoleWidthCm: '9.4 cm' },
    { eu: 'EU 40', footCm: '25.8 cm', insoleWidthCm: '9.6 cm' },
    { eu: 'EU 41', footCm: '26.5 cm', insoleWidthCm: '9.8 cm' },
    { eu: 'EU 42', footCm: '27.1 cm', insoleWidthCm: '10.0 cm' },
    { eu: 'EU 43', footCm: '27.8 cm', insoleWidthCm: '10.2 cm' },
    { eu: 'EU 44', footCm: '28.5 cm', insoleWidthCm: '10.4 cm' },
    { eu: 'EU 45', footCm: '29.2 cm', insoleWidthCm: '10.6 cm' }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 130, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(8px, 2.5vw, 16px)' }}>
      <div
        onClick={() => setIsSizeGuideOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(1, 1, 0, 0.88)',
          backdropFilter: 'blur(10px)'
        }}
      />

      <div
        className="responsive-modal"
        style={{
          position: 'relative',
          backgroundColor: '#08080a',
          border: '2px solid #ffd312',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 140,
          padding: 'clamp(20px, 3.5vw, 32px) clamp(14px, 3vw, 28px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255,211,18,0.25)'
        }}
      >
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          aria-label="Close size guide"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            color: '#ffd312',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="sticker-badge" style={{ fontSize: '0.68rem' }}>
            EU STANDARDS • CM ONLY
          </span>
        </div>

        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff', marginBottom: '8px' }}>
          EUROPEAN SIZE SPECIFICATIONS & MEASUREMENTS (CM)
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#8c8c9e', marginBottom: '20px' }}>
          All SΨGIL silhouettes follow standard European atelier metric tailoring (EU sizes, centimeters).
        </p>

        {/* Tab switcher */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('apparel')}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'apparel' ? '#ffd312' : 'rgba(255,255,255,0.06)',
                color: activeTab === 'apparel' ? '#010000' : '#ffffff',
                border: `1.5px solid ${activeTab === 'apparel' ? '#010000' : 'rgba(255,255,255,0.15)'}`,
                fontSize: '0.76rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              APPAREL & OUTERWEAR (EU)
            </button>
            <button
              onClick={() => setActiveTab('footwear')}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                backgroundColor: activeTab === 'footwear' ? '#ffd312' : 'rgba(255,255,255,0.06)',
                color: activeTab === 'footwear' ? '#010000' : '#ffffff',
                border: `1.5px solid ${activeTab === 'footwear' ? '#010000' : 'rgba(255,255,255,0.15)'}`,
                fontSize: '0.76rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              FOOTWEAR (EU)
            </button>
          </div>

          <div style={{ padding: '6px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,211,18,0.1)', border: '1px solid #ffd312', color: '#ffd312', fontSize: '0.72rem', fontWeight: '900', fontFamily: 'var(--font-mono)' }}>
            METRIC UNIT: CENTIMETERS (CM)
          </div>
        </div>

        {/* Table */}
        {activeTab === 'apparel' ? (
          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ffd312', color: '#ffd312' }}>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>EU SIZE</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>CHEST (CM)</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>WAIST (CM)</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>SHOULDER (CM)</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>SLEEVE (CM)</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>LENGTH (CM)</th>
                </tr>
              </thead>
              <tbody>
                {apparelSizes.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#dcdce6' }}>
                    <td style={{ padding: '14px 10px', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>{row.eu}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.chestCm}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.waistCm}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.shoulderCm}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.sleeveCm}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.garmentLengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ffd312', color: '#ffd312' }}>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>EU SIZE</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>FOOT LENGTH (CM)</th>
                  <th style={{ padding: '12px 10px', fontWeight: '900' }}>INSOLE WIDTH (CM)</th>
                </tr>
              </thead>
              <tbody>
                {shoeSizes.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#dcdce6' }}>
                    <td style={{ padding: '14px 10px', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>{row.eu}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.footCm}</td>
                    <td style={{ padding: '14px 10px', fontFamily: 'var(--font-mono)' }}>{row.insoleWidthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Advisory */}
        <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#010000', border: '1px solid rgba(255,211,18,0.3)', fontSize: '0.78rem', color: '#dcdce6', lineHeight: 1.6 }}>
          <span style={{ color: '#ffd312', fontWeight: '900' }}>Atelier Fit Note: </span>
          All pieces are patterned according to European standard atelier blocks with architectural drape. Measurements are provided in exact centimeters (cm). If your measurements fall between two EU sizes, order the larger EU size for a relaxed drape or the smaller EU size for a closer silhouette.
        </div>
      </div>
    </div>
  );
}
