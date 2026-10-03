import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { Heart, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function FeaturedGrailsSection({ onExploreShop }) {
  const {
    openProductPage,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatPrice,
    openShopPage
  } = useStore();

  const [hoveredId, setHoveredId] = useState(null);
  const [addingId, setAddingId] = useState(null);

  // Curate exactly the first 3 runway pinnacle showpieces
  const trinityProducts = PRODUCTS.slice(0, 3);

  const handleShopClick = () => {
    if (onExploreShop) {
      onExploreShop();
    } else if (openShopPage) {
      openShopPage();
    }
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    setAddingId(product.id);
    addToCart(product, {
      size: product.sizes ? product.sizes[0] : 'M',
      color: product.colors ? product.colors[0].name : 'Pitch Black',
      image: product.images ? product.images[0] : product.image,
      quantity: 1
    });
    setTimeout(() => {
      setAddingId(null);
    }, 800);
  };

  return (
    <section
      id="featured-section"
      style={{
        backgroundColor: '#000000',
        padding: 'clamp(50px, 7vw, 84px) 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div className="store-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px' }}>
          {/* Kicker with Red Bar */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ width: '28px', height: '2.5px', backgroundColor: '#dc143c', display: 'inline-block' }} />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '900',
                letterSpacing: '0.18em',
                color: '#ffd312',
                textTransform: 'uppercase'
              }}
            >
              RUNWAY SELECTIONS /// BATCH 01
            </span>
            <span style={{ width: '28px', height: '2.5px', backgroundColor: '#dc143c', display: 'inline-block' }} />
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: '900',
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '14px'
            }}
          >
            THE ATELIER TRINITY
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.8vw, 0.98rem)',
              color: '#8c8c9e',
              lineHeight: 1.6,
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            Three pinnacle brutalist silhouettes tailored in limited 50-piece batches. Handcrafted with heavy Italian loopback cotton and distressed denim.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '12px',
              padding: '4px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(220, 20, 60, 0.1)',
              border: '1px solid rgba(220, 20, 60, 0.35)',
              fontSize: '0.72rem',
              color: '#dc143c',
              fontWeight: '800',
              letterSpacing: '0.04em'
            }}
          >
            <ShieldCheck size={14} />
            <span>100% CASH ON DELIVERY PRE-ORDER • ZERO DUE TODAY</span>
          </div>
        </div>

        {/* 3 Products Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(20px, 3vw, 32px)',
            marginBottom: '48px'
          }}
        >
          {trinityProducts.map((product) => {
            const inWish = isInWishlist(product.id);
            const isHovered = hoveredId === product.id;
            const isAdding = addingId === product.id;
            const displayImg = isHovered && product.images && product.images.length > 1
              ? product.images[1]
              : (product.images && product.images[0] ? product.images[0] : product.image);

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => openProductPage(product)}
                style={{
                  backgroundColor: '#08080a',
                  borderRadius: '16px',
                  border: isHovered ? '1.5px solid #dc143c' : '1.5px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isHovered ? '0 0 24px rgba(220, 20, 60, 0.3), 4px 4px 0px #d4af37' : 'none',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
              >
                {/* Image Stage Container */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '1/1',
                    backgroundColor: '#010000',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={displayImg}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.4s ease'
                    }}
                  />

                  {/* Top Badges */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                      zIndex: 2
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#dc143c',
                        color: '#ffffff',
                        fontSize: '0.65rem',
                        fontWeight: '900',
                        letterSpacing: '0.08em',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      {product.badge || 'RUNWAY'}
                    </span>
                    <span
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffd312',
                        border: '1px solid #d4af37',
                        fontSize: '0.62rem',
                        fontWeight: '800',
                        letterSpacing: '0.04em',
                        padding: '2px 7px',
                        borderRadius: '4px'
                      }}
                    >
                      ONLY {product.stockLeft || 12} LEFT
                    </span>
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: inWish ? '#dc143c' : 'rgba(0, 0, 0, 0.75)',
                      border: inWish ? '1px solid #dc143c' : '1px solid rgba(255, 255, 255, 0.25)',
                      color: inWish ? '#ffffff' : '#ffd312',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2,
                      transition: 'all 0.2s ease'
                    }}
                    aria-label="Wishlist toggle"
                  >
                    <Heart size={16} fill={inWish ? '#ffffff' : 'none'} />
                  </button>
                </div>

                {/* Content Area */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: '800',
                          letterSpacing: '0.1em',
                          color: '#ffd312',
                          textTransform: 'uppercase'
                        }}
                      >
                        {product.categoryLabel || product.category}
                      </span>
                      <span style={{ fontSize: '0.66rem', color: '#8c8c9e', fontWeight: '700' }}>
                        100% COD
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.25rem',
                        fontWeight: '900',
                        color: '#ffffff',
                        letterSpacing: '0.02em',
                        marginBottom: '6px',
                        lineHeight: 1.2
                      }}
                    >
                      {product.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: '#8c8c9e',
                        lineHeight: 1.45,
                        marginBottom: '16px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {product.subtitle || product.description}
                    </p>
                  </div>

                  <div>
                    {/* Price Row */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                      <span
                        style={{
                          fontSize: '1.25rem',
                          fontWeight: '900',
                          color: '#ffd312',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span
                          style={{
                            fontSize: '0.82rem',
                            color: '#666675',
                            textDecoration: 'line-through',
                            fontWeight: '600'
                          }}
                        >
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '11px 16px',
                        borderRadius: '8px',
                        backgroundColor: isAdding ? '#000000' : '#dc143c',
                        border: isAdding ? '1.5px solid #d4af37' : '1.5px solid #dc143c',
                        color: isAdding ? '#ffd312' : '#ffffff',
                        fontSize: '0.78rem',
                        fontWeight: '900',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '2px 2px 0px #d4af37'
                      }}
                      onMouseEnter={(e) => {
                        if (!isAdding) {
                          e.currentTarget.style.backgroundColor = '#ff2a55';
                          e.currentTarget.style.boxShadow = '3px 3px 0px #ffd312';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAdding) {
                          e.currentTarget.style.backgroundColor = '#dc143c';
                          e.currentTarget.style.boxShadow = '2px 2px 0px #d4af37';
                        }
                      }}
                    >
                      {isAdding ? (
                        <>
                          <Check size={16} color="#ffd312" />
                          <span>ADDED TO PRE-ORDER</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={15} />
                          <span>PRE-ORDER [COD]</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catchy Thematic Call-To-Action Banner / Button */}
        <div
          style={{
            textAlign: 'center',
            padding: ' clamp(24px, 4vw, 36px) 20px',
            backgroundColor: '#050507',
            border: '1.5px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Accent Glow */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '100px',
              backgroundColor: 'rgba(220, 20, 60, 0.12)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: '900',
                letterSpacing: '0.14em',
                color: '#8c8c9e',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px'
              }}
            >
              RESTRICTED ARCHIVE /// 24+ BESPOKE PIECES
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '18px'
              }}
            >
              HUNGERING FOR MORE OCCULT GRAILS?
            </h3>

            {/* Catchy Action Button with Occult Aesthetic */}
            <button
              onClick={handleShopClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: 'clamp(14px, 2vw, 18px) clamp(28px, 4vw, 42px)',
                borderRadius: '9999px',
                backgroundColor: '#dc143c',
                color: '#ffffff',
                border: '2px solid #dc143c',
                fontSize: 'clamp(0.85rem, 1.8vw, 0.98rem)',
                fontWeight: '900',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '4px 4px 0px #d4af37, 0 0 20px rgba(220, 20, 60, 0.4)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff2a55';
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = '6px 6px 0px #ffd312, 0 0 30px rgba(220, 20, 60, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc143c';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0px #d4af37, 0 0 20px rgba(220, 20, 60, 0.4)';
              }}
            >
              <span>ENTER THE ATELIER ARCHIVE</span>
              <ArrowRight size={18} />
            </button>

            <p style={{ fontSize: '0.75rem', color: '#8c8c9e', marginTop: '12px', fontWeight: '700' }}>
              HOODIES • T-SHIRTS • LEATHER JACKETS • TACTICAL CARGOS • 100% CASH ON DELIVERY
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
