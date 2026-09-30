import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import BloodText from './BloodText';

export default function CapsuleBundleBuilder() {
  const { formatPrice, addToCart, applyPromo, showToast, setIsCartOpen } = useStore();

  const [selectedHoodie, setSelectedHoodie] = useState('rad-01');
  const [selectedSweatshirt, setSelectedSweatshirt] = useState('rad-04');
  const [selectedTop, setSelectedTop] = useState('rad-07');

  const hoodieOptions = PRODUCTS.filter((p) => p.category === 'hoodies');
  const sweatshirtOptions = PRODUCTS.filter((p) => p.category === 'sweatshirts');
  const topOptions = PRODUCTS.filter((p) => p.category === 'tops');

  const p1 = PRODUCTS.find((p) => p.id === selectedHoodie) || hoodieOptions[0];
  const p2 = PRODUCTS.find((p) => p.id === selectedSweatshirt) || sweatshirtOptions[0];
  const p3 = PRODUCTS.find((p) => p.id === selectedTop) || topOptions[0];

  const totalRawPrice = (p1?.price || 0) + (p2?.price || 0) + (p3?.price || 0);
  const bundleDiscount = totalRawPrice * 0.20;
  const finalBundlePrice = totalRawPrice - bundleDiscount;

  const handleAddBundleToBag = () => {
    if (p1) addToCart(p1, { quantity: 1 });
    if (p2) addToCart(p2, { quantity: 1 });
    if (p3) addToCart(p3, { quantity: 1 });

    applyPromo('GENZ20');

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ffd312', '#dc143c', '#ffffff']
      });
    } catch {}

    showToast('Complete 3-Piece Drip (Hoodie + Sweatshirt + Top) added with 20% Privilege!', 'success');
    setIsCartOpen(true);
  };

  return (
    <section id="capsule-section" style={{ padding: '90px 0', backgroundColor: '#08080a', borderTop: '2px solid #ffd312', borderBottom: '2px solid #ffd312' }}>
      <div className="store-container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="blood-badge">
              DRIP PRIVILEGE (-20% OFF)
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#ffffff', fontWeight: '900', marginBottom: '14px' }}>
            BUILD YOUR 3-PIECE RUNWAY <BloodText drip={true}>DRIP</BloodText>
          </h2>
          <div className="title-red-line title-red-line-center" />
          <p style={{ fontSize: '0.92rem', color: '#dcdce6', lineHeight: 1.6 }}>
            Select 1 Heavyweight Hoodie + 1 Crewneck Sweatshirt + 1 Layering Top to automatically unlock a <span style={{ color: '#ffd312', fontWeight: '900' }}>20% Privilege Discount</span> on your Cash-on-Delivery invoice with free express courier.
          </p>
        </div>

        {/* 3 Steps Selectors Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(14px, 2.5vw, 24px)', marginBottom: '40px' }}>
          {/* Step 1: Hoodies */}
          <div style={{ backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '18px', padding: 'clamp(14px, 2.5vw, 20px)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '12px' }}>
              STEP 01 • CHOOSE HEAVYWEIGHT HOODIE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {hoodieOptions.map((prod) => {
                const isSelected = selectedHoodie === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedHoodie(prod.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'rgba(255,211,18,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${isSelected ? '#ffd312' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isSelected ? '0 0 12px rgba(255,211,18,0.3)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={prod.images[0]} alt={prod.title} style={{ width: '52px', height: '66px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ffd312' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2 }}>{prod.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#ffd312', fontWeight: '900', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{formatPrice(prod.price)}</div>
                    </div>
                    {isSelected && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ffd312', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} color="#010000" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Sweatshirts */}
          <div style={{ backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '18px', padding: 'clamp(14px, 2.5vw, 20px)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '12px' }}>
              STEP 02 • CHOOSE CREWNECK SWEATSHIRT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sweatshirtOptions.map((prod) => {
                const isSelected = selectedSweatshirt === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedSweatshirt(prod.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'rgba(255,211,18,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${isSelected ? '#ffd312' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isSelected ? '0 0 12px rgba(255,211,18,0.3)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={prod.images[0]} alt={prod.title} style={{ width: '52px', height: '66px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ffd312' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2 }}>{prod.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#ffd312', fontWeight: '900', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{formatPrice(prod.price)}</div>
                    </div>
                    {isSelected && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ffd312', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} color="#010000" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Tops */}
          <div style={{ backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '18px', padding: 'clamp(14px, 2.5vw, 20px)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '12px' }}>
              STEP 03 • CHOOSE SIGNATURE TOP
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topOptions.map((prod) => {
                const isSelected = selectedTop === prod.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedTop(prod.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? 'rgba(255,211,18,0.1)' : 'rgba(255,255,255,0.03)',
                      border: `1.5px solid ${isSelected ? '#ffd312' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: isSelected ? '0 0 12px rgba(255,211,18,0.3)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <img src={prod.images[0]} alt={prod.title} style={{ width: '52px', height: '66px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ffd312' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2 }}>{prod.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#ffd312', fontWeight: '900', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{formatPrice(prod.price)}</div>
                    </div>
                    {isSelected && (
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#ffd312', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={14} color="#010000" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div
          style={{
            backgroundColor: '#010000',
            border: '2px solid #ffd312',
            boxShadow: '4px 4px 0px #ffd312, 0 20px 50px rgba(0,0,0,0.9)',
            padding: '24px clamp(16px, 3.5vw, 36px)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          {/* Summary */}
          <div style={{ flex: '1 1 240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: '900', letterSpacing: '0.08em', color: '#ffd312', textTransform: 'uppercase' }}>
                TOTAL PRE-ORDER INVOICE:
              </span>
              <span className="sticker-crimson" style={{ fontSize: '0.62rem' }}>
                SAVE 20%
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: '900', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(finalBundlePrice)}
              </span>
              <span style={{ fontSize: '1rem', color: '#8c8c9e', textDecoration: 'line-through', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(totalRawPrice)}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#ffd312', fontWeight: '800' }}>
                (Save {formatPrice(bundleDiscount)})
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#8c8c9e', marginTop: '4px' }}>
              100% Cash On Delivery • 0 EGP due today • Includes free express courier
            </div>
          </div>

          {/* Reserve Bundle Button */}
          <button
            onClick={handleAddBundleToBag}
            className="btn-primary"
            style={{
              padding: '14px 28px',
              fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
              letterSpacing: '0.06em',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              flex: '1 1 220px'
            }}
          >
            <span>RESERVE 3-PIECE DRIP (-20%)</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
