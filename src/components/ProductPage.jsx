import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { Heart, ChevronDown, Plus, Minus, ArrowLeft, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductPage({ product: propProduct }) {
  const {
    selectedProduct,
    closeProductPage,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    openShopPage,
    openHomePage
  } = useStore();

  const product = propProduct || selectedProduct || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0].name : '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'M');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('details');
  const [isAdding, setIsAdding] = useState(false);

  const [prevProductId, setPrevProductId] = useState(product?.id);
  if (product?.id !== prevProductId) {
    setPrevProductId(product?.id);
    setSelectedColor(product?.colors?.[0]?.name || '');
    setSelectedSize(product?.sizes?.[0] || 'M');
    setActiveImageIndex(0);
    setQuantity(1);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.id]);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      image: product.images ? product.images[activeImageIndex] : product.image || '/assets/leather_tee.jpg',
      quantity
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  // Recommended related pieces
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured)).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', color: '#ffffff', paddingTop: '24px', paddingBottom: '80px' }}>
      <div className="store-container">
        {/* Simple & Clean Top Navigation Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '14px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={closeProductPage}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#08080a',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#dc143c';
                e.currentTarget.style.color = '#dc143c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <ArrowLeft size={14} />
              <span>BACK</span>
            </button>

            <button
              onClick={() => openShopPage()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#08080a',
                border: '1px solid #d4af37',
                color: '#ffd312',
                fontSize: '0.78rem',
                fontWeight: '800',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc143c';
                e.currentTarget.style.borderColor = '#dc143c';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#08080a';
                e.currentTarget.style.borderColor = '#d4af37';
                e.currentTarget.style.color = '#ffd312';
              }}
            >
              <span>VIEW ALL IN SHOP</span>
            </button>
          </div>

          {/* Minimalist Breadcrumbs */}
          <nav aria-label="Breadcrumb" style={{ fontSize: '0.76rem', color: '#8c8c9e', fontWeight: '700' }}>
            <span
              onClick={openHomePage}
              style={{ cursor: 'pointer', color: '#8c8c9e', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8c8c9e')}
            >
              HOME
            </span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span
              onClick={() => openShopPage()}
              style={{ cursor: 'pointer', color: '#8c8c9e', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8c8c9e')}
            >
              SHOP
            </span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span
              onClick={() => openShopPage(product.category)}
              style={{ cursor: 'pointer', color: '#8c8c9e', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd312')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8c8c9e')}
            >
              {product.categoryLabel || product.category}
            </span>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: '#ffffff', textTransform: 'uppercase' }}>{product.title}</span>
          </nav>
        </div>

        {/* 2-Column Product Layout: Clean, Restrained, High-End */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 5vw, 56px)', alignItems: 'start', marginBottom: '70px' }}>
          {/* Left Column: Focused Product Image Gallery */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '1/1',
                backgroundColor: '#050507',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={product.images ? product.images[activeImageIndex] : product.image || '/assets/leather_tee.jpg'}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Thumbnail Strip (only if multiple images) */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `1.5px solid ${activeImageIndex === idx ? '#dc143c' : 'rgba(255, 255, 255, 0.12)'}`,
                      cursor: 'pointer',
                      opacity: activeImageIndex === idx ? 1 : 0.55,
                      transition: 'all 0.2s',
                      padding: 0,
                      backgroundColor: '#050507',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Clean Buy Box & Key Details */}
          <div>
            {/* Category / Atelier Kicker */}
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: '900',
                letterSpacing: '0.12em',
                color: '#dc143c',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}
            >
              {product.categoryLabel || product.category} • SΨGIL ATELIER
            </div>

            {/* Product Title */}
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                lineHeight: 1.15,
                fontWeight: '900',
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 14px 0',
                letterSpacing: '0.02em'
              }}
            >
              {product.title}
            </h1>

            {/* Price Line */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '20px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <span
                style={{
                  fontSize: '1.75rem',
                  fontWeight: '900',
                  color: '#ffd312',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.02em'
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '1rem', color: '#8c8c9e', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Editorial Description */}
            <p style={{ fontSize: '0.88rem', color: '#dcdce6', lineHeight: 1.65, marginBottom: '24px' }}>
              {product.description || product.subtitle}
            </p>

            {/* Color Selection (if multiple colorways) */}
            {product.colors && product.colors.length > 1 && (
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '800', marginBottom: '8px', color: '#8c8c9e', textTransform: 'uppercase' }}>
                  COLOR: <span style={{ color: '#ffffff' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (c.img && product.images) {
                          const idx = product.images.indexOf(c.img);
                          if (idx !== -1) setActiveImageIndex(idx);
                        }
                      }}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        backgroundColor: '#08080a',
                        border: `1.5px solid ${selectedColor === c.name ? '#dc143c' : 'rgba(255, 255, 255, 0.12)'}`,
                        color: selectedColor === c.name ? '#ffffff' : '#8c8c9e',
                        fontSize: '0.76rem',
                        fontWeight: '800',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: '#8c8c9e', textTransform: 'uppercase' }}>
                    SIZE: <span style={{ color: '#ffffff' }}>{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    style={{
                      color: '#d4af37',
                      fontSize: '0.74rem',
                      fontWeight: '800',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Size Guide
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          minWidth: '50px',
                          padding: '10px 14px',
                          borderRadius: '6px',
                          backgroundColor: isSelected ? '#000000' : '#08080a',
                          border: `1.5px solid ${isSelected ? '#dc143c' : 'rgba(255, 255, 255, 0.12)'}`,
                          color: isSelected ? '#ffffff' : '#8c8c9e',
                          fontWeight: '800',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Single Clean Primary CTA (Eliminated Duplicate Buttons) */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '24px' }}>
              {/* Quantity Stepper */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#08080a',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '8px',
                  padding: '4px 8px'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '6px', color: '#8c8c9e', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: '800', fontSize: '0.85rem', color: '#ffffff' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '6px', color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Single Primary Action Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  backgroundColor: '#dc143c',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: '900',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(220, 20, 60, 0.4)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff2a55';
                  e.currentTarget.style.boxShadow = '0 6px 24px rgba(220, 20, 60, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc143c';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(220, 20, 60, 0.4)';
                }}
              >
                {isAdding ? 'RESERVING ALLOCATION...' : `ADD TO BAG • ${formatPrice(product.price * quantity)}`}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to Wishlist"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '8px',
                  backgroundColor: '#08080a',
                  border: '1.5px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: isSaved ? '#dc143c' : '#ffffff',
                  transition: 'all 0.2s',
                  flexShrink: 0
                }}
              >
                <Heart size={18} fill={isSaved ? '#dc143c' : 'none'} />
              </button>
            </div>

            {/* Consolidated Cash On Delivery Trust Notice (Single Clean Card, No Duplication) */}
            <div
              style={{
                backgroundColor: '#08080a',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={20} color="#d4af37" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: '800', color: '#ffffff' }}>100% CASH ON DELIVERY</div>
                  <div style={{ fontSize: '0.68rem', color: '#8c8c9e' }}>0 EGP charged today</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={20} color="#d4af37" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: '800', color: '#ffffff' }}>TRACKED COURIER</div>
                  <div style={{ fontSize: '0.68rem', color: '#8c8c9e' }}>Inspect on delivery</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={20} color="#d4af37" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: '800', color: '#ffffff' }}>DOORSTEP EXCHANGES</div>
                  <div style={{ fontSize: '0.68rem', color: '#8c8c9e' }}>Hassle-free size swaps</div>
                </div>
              </div>
            </div>

            {/* Streamlined Accordions: Only 2 essential sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Accordion 1: Details & Materials */}
              <div style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#050507' }}>
                <button
                  onClick={() => toggleAccordion('details')}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>PRODUCT DETAILS & MATERIALS</span>
                  <ChevronDown
                    size={16}
                    color="#8c8c9e"
                    style={{ transform: openAccordion === 'details' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                </button>
                {openAccordion === 'details' && (
                  <div style={{ padding: '0 16px 16px', fontSize: '0.8rem', color: '#8c8c9e', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <ul style={{ paddingLeft: '16px', margin: '12px 0 0 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {product.details ? (
                        product.details.map((d, i) => <li key={i}>{d}</li>)
                      ) : (
                        <li>Handcrafted in limited atelier allocation</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit & Care Instructions */}
              <div style={{ border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#050507' }}>
                <button
                  onClick={() => toggleAccordion('fit')}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '0.8rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>FIT & CARE INSTRUCTIONS</span>
                  <ChevronDown
                    size={16}
                    color="#8c8c9e"
                    style={{ transform: openAccordion === 'fit' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  />
                </button>
                {openAccordion === 'fit' && (
                  <div style={{ padding: '0 16px 16px', fontSize: '0.8rem', color: '#8c8c9e', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <p style={{ margin: '12px 0 6px 0' }}>
                      <strong style={{ color: '#ffffff' }}>Fit:</strong> {product.fit || 'Signature oversized box cut.'}
                    </p>
                    <p style={{ margin: 0 }}>
                      <strong style={{ color: '#ffffff' }}>Care:</strong> {product.care || 'Cold gentle wash inside out, air dry in shade.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '900',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  margin: 0
                }}
              >
                YOU MAY ALSO LIKE
              </h2>
              <button
                onClick={closeProductPage}
                style={{
                  color: '#d4af37',
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.04em'
                }}
              >
                VIEW ALL &rarr;
              </button>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))',
                gap: '20px'
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
