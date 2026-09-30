import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { isWishlistOpen, setIsWishlistOpen, wishlist, toggleWishlist, addToCart, formatPrice, openProductPage } = useStore();

  if (!isWishlistOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p) => {
      addToCart(p, { quantity: 1 });
    });
    setIsWishlistOpen(false);
  };

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
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)'
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--card-border)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 110,
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={18} style={{ color: '#e11d48' }} fill="#e11d48" />
            <h3 style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-primary)' }}>
              SAVED PIECES ({savedProducts.length})
            </h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            style={{ color: 'var(--fg-primary)', padding: '6px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {savedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <Heart size={44} style={{ color: 'var(--fg-muted)', opacity: 0.3, margin: '0 auto 16px' }} />
              <p style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--fg-primary)', marginBottom: '8px' }}>Your Wishlist is empty</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>Tap the heart on any piece to save it for later review.</p>
            </div>
          ) : (
            savedProducts.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '12px',
                  backgroundColor: 'var(--card-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)'
                }}
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  onClick={() => handleItemClick(item)}
                  style={{ width: '64px', height: '80px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <h4
                        onClick={() => handleItemClick(item)}
                        style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--fg-primary)', lineHeight: 1.2, cursor: 'pointer' }}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(item.id)}
                        style={{ color: 'var(--fg-muted)', padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--accent)', marginTop: '4px' }}>
                      {formatPrice(item.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(item, { quantity: 1 });
                      toggleWishlist(item.id);
                    }}
                    className="btn-primary"
                    style={{ padding: '8px 12px', fontSize: '0.7rem', width: 'fit-content' }}
                  >
                    <ShoppingBag size={12} />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedProducts.length > 0 && (
          <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-tertiary)', borderTop: '1px solid var(--card-border)' }}>
            <button
              onClick={handleMoveAllToBag}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '0.82rem' }}
            >
              <span>MOVE ALL TO BAG</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
