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
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'M');
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0].name : '');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const [prevProductId, setPrevProductId] = useState(product?.id);
  if (product?.id !== prevProductId) {
    setPrevProductId(product?.id);
    setSelectedColor(product?.colors?.[0]?.name || '');
    setSelectedSize(product?.sizes?.[0] || 'M');
    setActiveImageIndex(0);
    setQuantity(1);
  }

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      image: product.images ? product.images[activeImageIndex] : (product.image || '/assets/sygil_hoodie_darkritual.jpg'),
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 115, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(8px, 2.5vw, 16px)' }}>
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
        className="responsive-modal"
        style={{
          position: 'relative',
          backgroundColor: '#08080a',
          border: '2px solid #dc143c',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(220,20,60,0.35)',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          zIndex: 120,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))'
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
            color: '#dc143c',
            border: '1.5px solid #dc143c',
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

        {/* Left: Product Editorial Gallery from Figma */}
        <div style={{ padding: '24px', backgroundColor: '#010000' }}>
          <div
            onClick={handleOpenFullPage}
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '12px',
              border: '1.5px solid #dc143c',
              boxShadow: '0 0 25px rgba(0,0,0,0.8), 0 0 15px rgba(220,20,60,0.25)',
              cursor: 'pointer'
            }}
          >
            <img
              src={product.images ? product.images[activeImageIndex] : '/assets/leather_tee.jpg'}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Thumbnails with active crimson border from Figma */}
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
                    border: `2px solid ${activeImageIndex === idx ? '#dc143c' : 'rgba(255,255,255,0.15)'}`,
                    boxShadow: activeImageIndex === idx ? '0 0 12px rgba(220,20,60,0.5)' : 'none',
                    opacity: activeImageIndex === idx ? 1 : 0.6,
                    padding: 0,
                    cursor: 'pointer',
                    backgroundColor: '#08080a',
                    transition: 'all 0.2s'
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info from Figma */}
        <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: '900', letterSpacing: '0.12em', color: '#dc143c', textTransform: 'uppercase' }}>
                DARK RITUAL COLLECTION
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
              style={{ fontSize: '1.45rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.2, marginBottom: '6px', cursor: 'pointer', textTransform: 'uppercase' }}
            >
              {product.title}
            </h3>

            <p style={{ fontSize: '0.82rem', color: '#8c8c9e', marginBottom: '16px', lineHeight: 1.5 }}>
              {product.description || product.subtitle}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.7rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(product.price)}
              </span>
              <span
                style={{
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  fontSize: '0.68rem',
                  fontWeight: '900',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.08em'
                }}
              >
                LIMITED
              </span>
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
                    style={{ color: '#d4af37', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
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
                        backgroundColor: selectedSize === s ? '#dc143c' : 'rgba(255,255,255,0.06)',
                        color: '#ffffff',
                        border: `1.5px solid ${selectedSize === s ? '#d4af37' : 'rgba(255,255,255,0.2)'}`,
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
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#010000', borderRadius: '9999px', padding: '2px 8px', border: '1.5px solid #d4af37' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '6px', color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Minus size={12} />
                </button>
                <span style={{ fontSize: '0.85rem', fontWeight: '900', minWidth: '24px', textAlign: 'center', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  {quantity}
                </span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '6px', color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Plus size={12} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  flex: '1 1 180px',
                  padding: '13px 20px',
                  fontSize: 'clamp(0.82rem, 1.8vw, 0.9rem)',
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontWeight: '900',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 18px rgba(220, 20, 60, 0.45)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff2a55';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 22px rgba(220, 20, 60, 0.65)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#dc143c';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 18px rgba(220, 20, 60, 0.45)';
                }}
              >
                {addedSuccess ? 'PRE-ORDER RESERVED' : `ADD TO CART • ${formatPrice(product.price * quantity)} (COD)`}
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
