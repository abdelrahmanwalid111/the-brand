import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Eye } from 'lucide-react';

export default function ProductCard({ product }) {
  const { formatPrice, addToCart, toggleWishlist, isInWishlist, openQuickView, openProductPage } = useStore();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0].name : '');
  const [addingSize, setAddingSize] = useState(null);

  const isSaved = isInWishlist(product.id);
  const currentImage = product.images && product.images.length > 0
    ? (isHovered && product.images.length > 1 ? product.images[1] : product.images[activeImageIndex])
    : '/assets/leather_tee.jpg';

  const handleQuickAddSize = (e, size) => {
    e.stopPropagation();
    setAddingSize(size);
    addToCart(product, {
      size,
      color: selectedColor,
      image: currentImage,
      quantity: 1
    });
    setTimeout(() => {
      setAddingSize(null);
    }, 1000);
  };

  const handleColorChange = (e, color) => {
    e.stopPropagation();
    setSelectedColor(color.name);
    if (color.img) {
      const idx = product.images ? product.images.indexOf(color.img) : -1;
      if (idx !== -1) {
        setActiveImageIndex(idx);
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0b0b0e',
        border: '1.5px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all var(--transition-smooth)'
      }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.borderColor = '#ffd312';
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = '4px 4px 0px #ffd312';
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top Image Container */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          backgroundColor: '#08080a',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => openProductPage(product)}
      >
        {/* Product Image */}
        <img
          src={currentImage}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Top Right Buttons (Wishlist & Quick View) */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 10
          }}
        >
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label="Save to wishlist"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(1, 1, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isSaved ? '#dc143c' : '#ffffff',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
              e.currentTarget.style.borderColor = '#dc143c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            <Heart size={16} fill={isSaved ? '#dc143c' : 'none'} />
          </button>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            aria-label="Quick View"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(1, 1, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              transition: 'all 0.2s',
              cursor: 'pointer',
              opacity: isHovered ? 1 : 0.8
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
              e.currentTarget.style.borderColor = '#ffd312';
              e.currentTarget.style.color = '#ffd312';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.color = '#ffffff';
            }}
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Quick Size Pills Drawer on Hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px',
            background: 'linear-gradient(to top, rgba(1,1,0,0.98) 0%, rgba(1,1,0,0.88) 70%, transparent 100%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            opacity: isHovered ? 1 : 0,
            transition: 'all var(--transition-fast)',
            zIndex: 15
          }}
        >
          <div style={{ fontSize: '0.68rem', fontWeight: '900', letterSpacing: '0.08em', color: '#ffd312', textTransform: 'uppercase' }}>
            RESERVE PRE-ORDER (EU SIZE):
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {product.sizes ? (
              product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAddSize(e, size)}
                  style={{
                    flex: '1 0 auto',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    backgroundColor: addingSize === size ? '#ffd312' : 'rgba(255,255,255,0.1)',
                    color: addingSize === size ? '#010000' : '#ffffff',
                    border: '1px solid rgba(255,255,255,0.25)',
                    fontSize: '0.72rem',
                    fontWeight: '900',
                    fontFamily: 'var(--font-mono)',
                    transition: 'all 0.15s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (addingSize !== size) {
                      e.currentTarget.style.backgroundColor = '#ffd312';
                      e.currentTarget.style.color = '#010000';
                      e.currentTarget.style.borderColor = '#ffd312';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (addingSize !== size) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                    }
                  }}
                >
                  {addingSize === size ? 'RESERVED' : size}
                </button>
              ))
            ) : (
              <button
                onClick={(e) => handleQuickAddSize(e, 'OS')}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#ffd312',
                  color: '#010000',
                  fontSize: '0.75rem',
                  fontWeight: '900',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                PRE-ORDER (CASH ON DELIVERY)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Category */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase' }}>
              {product.categoryLabel || product.category}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => openProductPage(product)}
            style={{
              fontSize: '0.92rem',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: 1.25,
              marginBottom: '6px',
              cursor: 'pointer',
              transition: 'color 0.2s',
              minHeight: '2.3em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd312')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
          >
            {product.title}
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '0.76rem',
              color: '#8c8c9e',
              lineHeight: 1.4,
              marginBottom: '12px',
              minHeight: '2.8em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.subtitle}
          </p>
        </div>

        {/* Color Swatches & Price Row */}
        <div>
          {/* Color Swatches */}
          {product.colors && product.colors.length > 1 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', minHeight: '22px' }}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => handleColorChange(e, c)}
                  title={c.name}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: c.hex,
                    border: selectedColor === c.name ? '2px solid #ffd312' : '1px solid rgba(255,255,255,0.3)',
                    outline: selectedColor === c.name ? '2px solid #ffffff' : 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.15s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ))}
              <span style={{ fontSize: '0.65rem', color: '#8c8c9e', marginLeft: '4px', fontWeight: '700' }}>
                {selectedColor}
              </span>
            </div>
          ) : (
            <div style={{ minHeight: '22px', marginBottom: '12px' }} />
          )}

          {/* Price & Pre-order info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span style={{ fontSize: '0.8rem', color: '#8c8c9e', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <span style={{ fontSize: '0.68rem', color: '#ffd312', fontWeight: '900' }}>
              CASH ON DELIVERY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
