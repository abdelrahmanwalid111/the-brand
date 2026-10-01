import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export default function FeaturedSpotlight() {
  const { formatPrice, addToCart, setIsSizeGuideOpen, openQuickView, openProductPage } = useStore();
  const product = PRODUCTS.find((p) => p.isHeroSpotlight) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[1] || product.sizes[0] : 'EU 48');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('story');
  const [isAdding, setIsAdding] = useState(false);

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      image: product.images[activeImageIndex],
      quantity
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const pairProduct = PRODUCTS.find((p) => p.id === 'rad-04') || PRODUCTS[1];

  return (
    <section style={{ padding: '80px 0', backgroundColor: '#08080a', borderTop: '2px solid #ffd312', borderBottom: '2px solid #ffd312' }}>
      <div className="store-container">
        {/* Section Header Tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="sticker-badge">
              SPOTLIGHT PRE-ORDER GRAIL
            </span>
            <span style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: '#ffd312', textTransform: 'uppercase', fontWeight: '900' }}>
              ATELIER BATCH 01 • 100% CASH ON DELIVERY
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => openProductPage(product)}
              style={{
                color: '#ffd312',
                fontSize: '0.76rem',
                fontWeight: '900',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.05em'
              }}
            >
              VIEW FULL GRAIL PAGE →
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
          {/* Left: Product Gallery */}
          <div>
            {/* Main Active Image with Zoom */}
            <div
              onClick={() => openProductPage(product)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                backgroundColor: '#010000',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 0 30px rgba(0,0,0,0.8)',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <img
                src={product.images[activeImageIndex]}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '76px',
                    height: '96px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: `2px solid ${activeImageIndex === idx ? '#ffd312' : 'rgba(255,255,255,0.15)'}`,
                    boxShadow: activeImageIndex === idx ? '0 0 12px #ffd312' : 'none',
                    cursor: 'pointer',
                    opacity: activeImageIndex === idx ? 1 : 0.6,
                    transition: 'all 0.2s',
                    padding: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Buy Box & Product Narrative */}
          <div>
            {/* Allocation & Stock Notice from Figma */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ color: '#dc143c', fontSize: '0.78rem', fontWeight: '900', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                DARK RITUAL COLLECTION
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#dc143c', fontWeight: '900' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc143c', boxShadow: '0 0 10px #dc143c' }}></span>
                <span>12 units remaining in Batch 01</span>
              </div>
            </div>

            {/* Title with Figma split: DARK (white) RITUAL (yellow) HOODIE (white) */}
            <h2
              onClick={() => openProductPage(product)}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.05,
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '10px',
                cursor: 'pointer',
                transition: 'color 0.2s',
                textTransform: 'uppercase'
              }}
            >
              <span>DARK </span>
              <span style={{ color: '#ffd312' }}>RITUAL </span>
              <span>HOODIE</span>
            </h2>
            <div className="title-red-line" />

            {/* Subtitle */}
            <p style={{ fontSize: '0.92rem', color: '#dcdce6', marginBottom: '18px', lineHeight: 1.6 }}>
              {product.description || product.subtitle}
            </p>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(product.price)}
              </span>
              <span
                style={{
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: '900',
                  padding: '3px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.08em'
                }}
              >
                LIMITED
              </span>
              <span style={{ fontSize: '0.76rem', color: '#8c8c9e', fontWeight: '800' }}>
                0 EGP DUE TODAY • CASH ON DELIVERY
              </span>
            </div>

            {/* Color Swatch Picker */}
            {product.colors && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem' }}>
                  <span style={{ fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase' }}>COLORWAY:</span>
                  <span style={{ color: '#ffd312', fontWeight: '900' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (c.img) {
                          const idx = product.images.indexOf(c.img);
                          if (idx !== -1) setActiveImageIndex(idx);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: `2px solid ${selectedColor === c.name ? '#ffd312' : 'rgba(255,255,255,0.2)'}`,
                        boxShadow: selectedColor === c.name ? '0 0 10px rgba(255,211,18,0.4)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: c.hex, border: '1px solid #fff', display: 'inline-block' }} />
                      <span style={{ fontSize: '0.74rem', fontWeight: '800', color: '#ffffff' }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.78rem' }}>
                <span style={{ fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase' }}>SELECT EU SIZE:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{
                    color: '#ffd312',
                    fontSize: '0.75rem',
                    fontWeight: '900',
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  EU Size & Fit Guide (CM)
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      minWidth: '58px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      backgroundColor: selectedSize === size ? '#ffd312' : 'rgba(255,255,255,0.06)',
                      color: selectedSize === size ? '#010000' : '#ffffff',
                      border: `2px solid ${selectedSize === size ? '#010000' : 'rgba(255,255,255,0.2)'}`,
                      boxShadow: selectedSize === size ? '2px 2px 0px #ffffff' : 'none',
                      fontWeight: '900',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Add To Bag Button */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {/* Stepper */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#010000',
                  border: '1.5px solid #ffd312',
                  borderRadius: '9999px',
                  padding: '4px 10px'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '8px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '8px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Solid Crimson CTA from Figma */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{
                  flex: '1 1 200px',
                  padding: '14px 22px',
                  fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)',
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  fontWeight: '900',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 20px rgba(220, 20, 60, 0.45)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff2a55';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc143c';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {isAdding ? (
                  <span>RESERVING PRE-ORDER...</span>
                ) : (
                  <span>PRE-ORDER NOW — {formatPrice(product.price * quantity)}</span>
                )}
              </button>

              {/* View Lookbook CTA from Figma */}
              <button
                onClick={() => {
                  const el = document.getElementById('lookbook-section') || document.getElementById('wardrobe-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  padding: '14px 20px',
                  fontSize: '0.78rem',
                  backgroundColor: 'transparent',
                  color: '#ffd312',
                  fontWeight: '900',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  border: '1.5px solid #ffd312',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffd312';
                  e.currentTarget.style.color = '#010000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffd312';
                }}
              >
                <span>VIEW LOOKBOOK</span>
              </button>
            </div>

            {/* Trust Badges Rail */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 130px), 1fr))', gap: '8px', margin: '20px 0', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: '800', letterSpacing: '0.05em' }}>
                • Express Courier Dispatch
              </div>
              <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: '800', letterSpacing: '0.05em' }}>
                • Florence Atelier Craft
              </div>
              <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: '800', letterSpacing: '0.05em' }}>
                • Doorstep Cash Handover
              </div>
            </div>

            {/* Accordions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Accordion 1: Story */}
              <div style={{ border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#010000' }}>
                <button
                  onClick={() => toggleAccordion('story')}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '0.8rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>01 / THE EDITORIAL STORY & FIT</span>
                  <ChevronDown size={16} style={{ transform: openAccordion === 'story' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                </button>
                {openAccordion === 'story' && (
                  <div style={{ padding: '16px 18px', fontSize: '0.84rem', color: '#dcdce6', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ marginBottom: '10px' }}>{product.description}</p>
                    <p style={{ color: '#ffd312', fontWeight: '700' }}>{product.fit}</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Details */}
              <div style={{ border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', overflow: 'hidden', backgroundColor: '#010000' }}>
                <button
                  onClick={() => toggleAccordion('details')}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '0.8rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>02 / MATERIALS & ARTISANAL SOURCING</span>
                  <ChevronDown size={16} style={{ transform: openAccordion === 'details' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                </button>
                {openAccordion === 'details' && (
                  <div style={{ padding: '16px 18px', fontSize: '0.84rem', color: '#dcdce6', lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Pair With Cross-sell */}
            <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(255,211,18,0.05)', border: '1.5px dashed #ffd312', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={pairProduct.images[0]} alt="" style={{ width: '50px', height: '62px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #ffd312' }} />
                <div>
                  <div style={{ fontSize: '0.68rem', color: '#ffd312', fontWeight: '900' }}>FREQUENTLY PAIRED WITH</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '900', color: '#ffffff' }}>{pairProduct.title}</div>
                  <div style={{ fontSize: '0.76rem', color: '#8c8c9e' }}>{formatPrice(pairProduct.price)}</div>
                </div>
              </div>
              <button
                onClick={() => openQuickView(pairProduct)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  border: '1.5px solid #ffd312',
                  color: '#ffd312',
                  fontSize: '0.74rem',
                  fontWeight: '900',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                QUICK VIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
