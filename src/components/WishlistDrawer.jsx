import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
    openProductPage,
    openShopPage
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleItemClick = (product) => {
    setIsWishlistOpen(false);
    openProductPage(product);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      />

      {/* Wishlist Drawer Container (Matching Cart Drawer in Style) */}
      <div
        className="responsive-drawer"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#010000',
          borderLeft: '1.5px solid #dc143c',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 110,
          boxShadow: '-12px 0 45px rgba(0,0,0,0.95), -2px 0 20px rgba(220, 20, 60, 0.25)',
          color: '#ffffff'
        }}
      >
        {/* =========================================
            HEADER (SAVED PIECES + ITEMS COUNT + CLOSE X)
            ========================================= */}
        <div
          style={{
            padding: '24px 24px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.45rem',
                fontWeight: '900',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#ffffff',
                margin: '0 0 4px 0',
                lineHeight: 1
              }}
            >
              SAVED PIECES
            </h2>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: '900',
                letterSpacing: '0.08em',
                color: '#ffd312',
                textTransform: 'uppercase'
              }}
            >
              {savedProducts.length} {savedProducts.length === 1 ? 'ITEM' : 'ITEMS'}
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close saved pieces"
            style={{
              color: '#ffffff',
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s, transform 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#dc143c';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Top Perks Bar */}
        {savedProducts.length > 0 && (
          <div
            style={{
              padding: '10px 24px',
              backgroundColor: 'rgba(220, 20, 60, 0.06)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '0.04em'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd312' }}>
              <Heart size={14} fill="#dc143c" color="#dc143c" />
              <span>EXCLUSIVE ARCHIVE GRAILS</span>
            </div>
            <span style={{ color: '#8c8c9e' }}>100% COD AVAILABLE</span>
          </div>
        )}

        {/* =========================================
            SAVED ITEMS LIST (Scrollable)
            ========================================= */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '8px 24px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {savedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', margin: 'auto' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#08080a',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: '#dc143c'
                }}
              >
                <Heart size={28} />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.1rem',
                  fontWeight: '900',
                  color: '#ffffff',
                  marginBottom: '8px',
                  textTransform: 'uppercase'
                }}
              >
                YOUR WISHLIST IS EMPTY
              </h3>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#8c8c9e',
                  marginBottom: '24px',
                  maxWidth: '280px',
                  margin: '0 auto 24px',
                  lineHeight: 1.5
                }}
              >
                Explore our occult grails and save your favorite pieces to reserve them later.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  openShopPage();
                }}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.8rem' }}
              >
                DISCOVER GRAILS
              </button>
            </div>
          ) : (
            savedProducts.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '18px 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Product Thumbnail Image */}
                <div
                  onClick={() => handleItemClick(item)}
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#08080a',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={item.images?.[0] || item.image || '/assets/fallen_angel_tee.jpg'}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info: Title, Subtitle, Price */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4
                    onClick={() => handleItemClick(item)}
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: '900',
                      letterSpacing: '0.04em',
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      margin: '0 0 2px 0',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    title={item.title}
                  >
                    {item.title}
                  </h4>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#8c8c9e',
                      textTransform: 'uppercase',
                      fontWeight: '700',
                      marginBottom: '4px'
                    }}
                  >
                    {item.categoryLabel || item.category || 'PRE-ORDER'}
                  </div>
                  <div
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: '900',
                      color: '#ffd312',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {formatPrice(item.price)}
                  </div>
                </div>

                {/* Move to bag Action Button */}
                <button
                  onClick={() => {
                    addToCart(item, { quantity: 1 });
                    toggleWishlist(item.id);
                  }}
                  aria-label={`Move ${item.title} to bag`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#000000',
                    border: '1px solid #d4af37',
                    color: '#ffd312',
                    fontSize: '0.74rem',
                    fontWeight: '900',
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dc143c';
                    e.currentTarget.style.borderColor = '#dc143c';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000000';
                    e.currentTarget.style.borderColor = '#d4af37';
                    e.currentTarget.style.color = '#ffd312';
                  }}
                >
                  <ShoppingBag size={12} />
                  <span>MOVE TO BAG</span>
                </button>

                {/* Red Trash Delete Button (Matching Cart) */}
                <button
                  onClick={() => toggleWishlist(item.id)}
                  aria-label={`Remove ${item.title} from saved`}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#dc143c',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'transform 0.2s, color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff2a55';
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#dc143c';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* =========================================
            FOOTER SECTION
            ========================================= */}
        {savedProducts.length > 0 && (
          <div
            style={{
              padding: '16px 24px 20px',
              backgroundColor: '#010000',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Continue Shopping Gold Button */}
            <button
              onClick={() => setIsWishlistOpen(false)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffd312',
                fontSize: '0.78rem',
                fontWeight: '900',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc143c';
                e.currentTarget.style.borderColor = '#dc143c';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#ffd312';
              }}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
