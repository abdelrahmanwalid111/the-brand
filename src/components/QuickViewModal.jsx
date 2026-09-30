import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, Plus, Minus } from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    openProductPage
  } = useStore();

  const product = quickViewProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'EU 48');
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0].name : '');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      image: product.images ? product.images[activeImageIndex] : '/assets/leather_tee.jpg',
      quantity
    });
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeQuickView();
    }, 600);
  };

  const handleOpenFullPage = () => {
    const current = product;
    closeQuickView();
    openProductPage(current);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 115, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div
        onClick={closeQuickView}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(1, 1, 0, 0.85)',
          backdropFilter: 'blur(8px)'
        }}
      />

      <div
        style={{
          position: 'relative',
          backgroundColor: '#08080a',
          border: '2px solid #ffd312',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255,211,18,0.3)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 120,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}
      >
        <button
          onClick={closeQuickView}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 30,
            backgroundColor: '#010000',
            color: '#ffd312',
            border: '1.5px solid #ffd312',
            borderRadius: '50%',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Left: Product Editorial Gallery */}
        <div style={{ padding: '24px', backgroundColor: '#010000' }}>
          <div
            onClick={handleOpenFullPage}
            style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer' }}
          >
            <img
              src={product.images ? product.images[activeImageIndex] : '/assets/leather_tee.jpg'}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '60px',
                    height: '75px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: `2px solid ${activeImageIndex === idx ? '#ffd312' : 'transparent'}`,
                    opacity: activeImageIndex === idx ? 1 : 0.6,
                    padding: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase' }}>
                {product.categoryLabel || product.category}
              </span>
              <button
                onClick={handleOpenFullPage}
                style={{
                  color: '#ffd312',
                  fontSize: '0.74rem',
                  fontWeight: '900',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                OPEN FULL PRODUCT PAGE →
              </button>
            </div>

            <h3
              onClick={handleOpenFullPage}
              style={{ fontSize: '1.35rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.2, marginBottom: '6px', cursor: 'pointer' }}
            >
              {product.title}
            </h3>

            <p style={{ fontSize: '0.8rem', color: '#8c8c9e', marginBottom: '16px' }}>
              {product.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '0.95rem', color: '#8c8c9e', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Colors */}
            {product.colors && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: '900', marginBottom: '6px', color: '#ffffff' }}>
                  COLORWAY: <span style={{ color: '#ffd312' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
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
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? '2px solid #ffd312' : '1px solid rgba(255,255,255,0.3)',
                        outline: selectedColor === c.name ? '2px solid #ffffff' : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.74rem', fontWeight: '900' }}>
                  <span>SELECT EU SIZE:</span>
                  <button
                    onClick={() => {
                      closeQuickView();
                      setIsSizeGuideOpen(true);
                    }}
                    style={{ color: '#ffd312', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    EU Size Guide (CM)
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        backgroundColor: selectedSize === s ? '#ffd312' : 'rgba(255,255,255,0.06)',
                        color: selectedSize === s ? '#010000' : '#ffffff',
                        border: `1.5px solid ${selectedSize === s ? '#010000' : 'rgba(255,255,255,0.2)'}`,
                        fontSize: '0.78rem',
                        fontWeight: '900',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#010000', borderRadius: '9999px', padding: '2px 8px', border: '1.5px solid #ffd312' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '6px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: '0.85rem', fontWeight: '900', minWidth: '24px', textAlign: 'center', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {quantity}
                </span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '6px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Plus size={12} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, padding: '14px', fontSize: '0.85rem' }}
              >
                {addedSuccess ? 'PRE-ORDER RESERVED' : `RESERVE PRE-ORDER • ${formatPrice(product.price * quantity)} (COD)`}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '48px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isSaved ? '#dc143c' : '#ffffff',
                  backgroundColor: '#010000',
                  cursor: 'pointer'
                }}
              >
                <Heart size={18} fill={isSaved ? '#dc143c' : 'none'} />
              </button>
            </div>

            <div style={{ fontSize: '0.72rem', color: '#dcdce6', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,211,18,0.06)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,211,18,0.2)' }}>
              <span><strong>100% Cash On Delivery:</strong> 0 EGP due today. Pay cash directly to courier upon arrival.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
