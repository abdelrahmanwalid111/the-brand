import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { LOOKBOOK_HOTSPOTS, PRODUCTS } from '../data/storeData';
import { Plus, Eye, X, ArrowRight, ShoppingBag } from 'lucide-react';

export default function ShopTheLookHotspots() {
  const { formatPrice, openQuickView, openProductPage, addToCart, products } = useStore();
  const allProducts = (products && products.length > 0) ? products : PRODUCTS;
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isPinned, setIsPinned] = useState(false);
  const closeTimerRef = useRef(null);

  const getProductForHotspot = (hs) => {
    return allProducts.find((p) => p.id === hs.productId) || allProducts[0];
  };

  const handleMouseEnter = (hs) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    // Only switch if not pinned or if user hovers the current one
    if (!isPinned) {
      setActiveHotspot(hs);
    }
  };

  const handleMouseLeave = () => {
    if (isPinned) return; // Keep open if locked by click
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setActiveHotspot(null);
    }, 450); // 450ms bridge grace period so it never vanishes prematurely
  };

  const handlePinToggle = (e, hs) => {
    e.stopPropagation();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (activeHotspot?.id === hs.id && isPinned) {
      setIsPinned(false);
      setActiveHotspot(null);
    } else {
      setActiveHotspot(hs);
      setIsPinned(true);
    }
  };

  const handleCloseCard = (e) => {
    e.stopPropagation();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsPinned(false);
    setActiveHotspot(null);
  };

  const handleOpenProduct = (e, product) => {
    e.stopPropagation();
    setIsPinned(false);
    setActiveHotspot(null);
    if (product) {
      openProductPage(product);
    }
  };

  const handleQuickView = (e, product) => {
    e.stopPropagation();
    setIsPinned(false);
    setActiveHotspot(null);
    if (product) {
      openQuickView(product);
    }
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (product) {
      addToCart(product, { quantity: 1 });
    }
  };

  return (
    <section id="lookbook-section" style={{ padding: '90px 0', backgroundColor: '#010000' }}>
      <div className="store-container">
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span className="sticker-badge">
                INTERACTIVE LOOKBOOK
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ffffff', fontWeight: '900' }}>
              STEAL THE RUNWAY FIT <span style={{ color: '#ffd312' }}>///</span> RADAR
            </h2>
            <div className="title-red-line" />
            <p style={{ fontSize: '0.9rem', color: '#dcdce6', marginTop: '6px', maxWidth: '620px' }}>
              Tap or hover any radar pin to inspect runway pieces, preview materials, and reserve directly with 100% Cash on Delivery.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="sticker-crimson">
              4 INTERACTIVE GRAIL PINS
            </span>
          </div>
        </div>

        {/* Interactive Lookbook Scene Container */}
        <div
          style={{
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            aspectRatio: '16/10',
            minHeight: 'clamp(380px, 52vw, 700px)',
            maxHeight: '750px',
            backgroundColor: '#050508',
            border: '2px solid #dc143c',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(220,20,60,0.3)'
          }}
          onClick={() => {
            setIsPinned(false);
            setActiveHotspot(null);
          }}
        >
          {/* Main Lookbook Editorial Image */}
          <img
            src="/assets/lookbook_hotspot.jpg"
            alt="Radian Runway Editorial Look"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%'
            }}
          />

          {/* Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.72) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Interactive Garment Radar Hotspot Pins */}
          {LOOKBOOK_HOTSPOTS.map((hs) => {
            const isCardOpen = activeHotspot?.id === hs.id;
            const prod = getProductForHotspot(hs);
            const title = prod?.title || hs.title;
            const category = prod?.categoryLabel || prod?.category || hs.category || 'RUNWAY';
            const price = prod?.price || hs.price;
            const shortLabel = hs.shortLabel || prod?.categoryLabel || hs.title;
            const image = prod?.images?.[0] || hs.image;
            const isUpper = hs.y < 45;
            const isRightSide = hs.x > 50;

            return (
              <div
                key={hs.id}
                style={{
                  position: 'absolute',
                  top: `${hs.y}%`,
                  left: `${hs.x}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isCardOpen ? 65 : 30
                }}
                onMouseEnter={() => handleMouseEnter(hs)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Radar Pulse Button and Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
                  <button
                    onClick={(e) => handlePinToggle(e, hs)}
                    className="radar-sonar-pin"
                    aria-label={`View ${title}`}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: isCardOpen ? '#ffd312' : '#dc143c',
                      border: `2.5px solid ${isCardOpen ? '#ffffff' : '#d4af37'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCardOpen ? '#000000' : '#ffffff',
                      cursor: 'pointer',
                      boxShadow: isCardOpen
                        ? '0 0 25px rgba(255, 211, 18, 0.9), 0 4px 15px rgba(0,0,0,0.9)'
                        : '0 0 22px rgba(220, 20, 60, 0.95), 0 4px 15px rgba(0,0,0,0.9)',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: isCardOpen ? 'scale(1.2)' : 'scale(1)'
                    }}
                  >
                    <Plus
                      size={20}
                      strokeWidth={3.5}
                      style={{
                        transform: isCardOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  </button>

                  {/* Floating Label Badge (desktop / tablet) */}
                  <button
                    onClick={(e) => handlePinToggle(e, hs)}
                    className="desktop-only"
                    style={{
                      backgroundColor: isCardOpen ? '#dc143c' : 'rgba(0, 0, 0, 0.92)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: `1.5px solid ${isCardOpen ? '#dc143c' : '#d4af37'}`,
                      color: '#ffffff',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.85)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>{shortLabel}</span>
                    <span style={{ color: isCardOpen ? '#ffffff' : '#ffd312', fontWeight: '900', fontFamily: 'var(--font-mono)' }}>
                      • {formatPrice(price)}
                    </span>
                  </button>
                </div>

                {/* Floating Garment Preview Card with Anti-Disappear Hover Bridge */}
                {isCardOpen && (
                  <div
                    onMouseEnter={() => {
                      if (closeTimerRef.current) {
                        clearTimeout(closeTimerRef.current);
                        closeTimerRef.current = null;
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                    className="glass-modal hotspot-card-enter"
                    style={{
                      position: 'absolute',
                      top: isUpper ? '44px' : 'auto',
                      bottom: !isUpper ? '44px' : 'auto',
                      left: isRightSide ? 'auto' : '0',
                      right: isRightSide ? '0' : 'auto',
                      width: 'min(82vw, 260px)',
                      padding: '12px',
                      borderRadius: '14px',
                      border: '1.5px solid #dc143c',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.95), 0 0 25px rgba(220,20,60,0.35)',
                      zIndex: 80,
                      backgroundColor: 'rgba(5, 5, 8, 0.98)',
                      backdropFilter: 'blur(16px)'
                    }}
                  >
                    {/* Invisible Hit Buffer extending towards pin to bridge any gap */}
                    <div
                      style={{
                        position: 'absolute',
                        top: isUpper ? '-24px' : 'auto',
                        bottom: !isUpper ? '-24px' : 'auto',
                        left: '-15px',
                        right: '-15px',
                        height: '30px',
                        pointerEvents: 'auto',
                        zIndex: -1
                      }}
                    />

                    {/* Card Header: Category + Close Button */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.64rem', color: '#ffd312', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {category}
                      </span>
                      <button
                        onClick={handleCloseCard}
                        aria-label="Close preview"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#8c8c9e',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#8c8c9e')}
                      >
                        <X size={15} />
                      </button>
                    </div>

                    {/* Product Image Thumbnail */}
                    <div
                      onClick={(e) => handleOpenProduct(e, prod)}
                      style={{
                        aspectRatio: '1',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        marginBottom: '8px',
                        backgroundColor: '#010000',
                        border: '1px solid rgba(255,255,255,0.12)',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={image}
                        alt={title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          left: '6px',
                          backgroundColor: 'rgba(220, 20, 60, 0.9)',
                          color: '#ffffff',
                          fontSize: '0.58rem',
                          fontWeight: '900',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          letterSpacing: '0.04em'
                        }}
                      >
                        0 EGP TODAY
                      </div>
                    </div>

                    {/* Product Title */}
                    <h4
                      onClick={(e) => handleOpenProduct(e, prod)}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '900',
                        color: '#ffffff',
                        lineHeight: 1.25,
                        marginBottom: '4px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      title={title}
                    >
                      {title}
                    </h4>

                    {/* Price */}
                    <div
                      style={{
                        fontSize: '0.92rem',
                        fontWeight: '900',
                        color: '#ffd312',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.02em',
                        marginBottom: '10px'
                      }}
                    >
                      {formatPrice(price)}
                    </div>

                    {/* Action Buttons: Quick View + View Piece */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      <button
                        onClick={(e) => handleQuickView(e, prod)}
                        style={{
                          padding: '7px 8px',
                          backgroundColor: '#000000',
                          border: '1px solid #d4af37',
                          color: '#ffd312',
                          fontSize: '0.68rem',
                          fontWeight: '900',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ffd312';
                          e.currentTarget.style.color = '#000000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#000000';
                          e.currentTarget.style.color = '#ffd312';
                        }}
                      >
                        <Eye size={12} />
                        <span>QUICK VIEW</span>
                      </button>

                      <button
                        onClick={(e) => handleOpenProduct(e, prod)}
                        style={{
                          padding: '7px 8px',
                          backgroundColor: '#dc143c',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          fontWeight: '900',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          boxShadow: '0 2px 10px rgba(220, 20, 60, 0.4)',
                          transition: 'all 0.2s',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#ff2a55';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#dc143c';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <span>DETAILS</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
