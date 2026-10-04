import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { X, Plus, Minus, Trash2, Truck, Tag, ArrowRight } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    appliedPromo,
    applyPromo,
    removePromo,
    isFreeShipping,
    amountToFreeShipping,
    freeShippingProgress,
    freeShippingThreshold,
    shippingFee,
    finalTotal,
    formatPrice,
    setIsCheckoutOpen,
    openProductPage,
    products
  } = useStore();

  const allProducts = (products && products.length > 0) ? products : PRODUCTS;
  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  const handleItemClick = (item) => {
    const prod = allProducts.find((p) => p.id === item.productId || p.id === item.id) || item;
    setIsCartOpen(false);
    openProductPage(prod);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      />

      {/* Cart Drawer Container (Matching Mockup) */}
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
            HEADER (YOUR CART + 4 ITEMS + CLOSE X)
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
              YOUR CART
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
              {totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'}
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
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

        {/* =========================================
            CART ITEMS LIST (Scrollable)
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
          {cart.length === 0 ? (
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
                  color: '#8c8c9e'
                }}
              >
                <X size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff', marginBottom: '8px', textTransform: 'uppercase' }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#8c8c9e', marginBottom: '24px' }}>
                Explore our occult grails and reserve your pre-order pieces with 100% Cash on Delivery.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.8rem' }}
              >
                DISCOVER GRAILS
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
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
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info: Title, Subtitle, Size */}
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
                    {item.color || 'PRE-ORDER'}
                  </div>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: '900',
                      color: '#ffd312',
                      letterSpacing: '0.04em'
                    }}
                  >
                    SIZE: {item.size}
                  </div>
                </div>

                {/* Quantity Stepper Pill: [ — 1 + ] */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255, 255, 255, 0.22)',
                    flexShrink: 0
                  }}
                >
                  <button
                    onClick={() => updateQuantity(item.cartId, -1)}
                    aria-label="Decrease quantity"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#8c8c9e',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8c8c9e')}
                  >
                    <Minus size={12} strokeWidth={2.5} />
                  </button>

                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: '800',
                      color: '#ffffff',
                      minWidth: '16px',
                      textAlign: 'center',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.cartId, 1)}
                    aria-label="Increase quantity"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffd312',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#ffd312')}
                  >
                    <Plus size={12} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Price in Gold */}
                <div
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: '900',
                    color: '#ffd312',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.02em',
                    flexShrink: 0,
                    textAlign: 'right'
                  }}
                >
                  {formatPrice(item.price * item.quantity)}
                </div>

                {/* Red Trash Delete Button */}
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  aria-label={`Remove ${item.title}`}
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
            FOOTER SECTION: SHIPPING, PROMO, SUMMARY, CTA
            (Omits payment gateways per user request)
            ========================================= */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '20px 24px 24px',
              backgroundColor: '#010000',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* 1. Free Shipping Progress Bar */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.78rem', fontWeight: '800' }}>
                <Truck size={17} color="#ffd312" />
                {isFreeShipping ? (
                  <span style={{ color: '#ffd312', letterSpacing: '0.04em' }}>YOU UNLOCKED FREE SHIPPING</span>
                ) : (
                  <span>
                    {formatPrice(amountToFreeShipping)} AWAY FROM{' '}
                    <span style={{ color: '#ffd312' }}>FREE SHIPPING</span>
                  </span>
                )}
              </div>

              {/* Progress Track */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#26262a',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  marginBottom: '6px'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${freeShippingProgress}%`,
                    backgroundColor: '#ffd312',
                    borderRadius: '9999px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>

              <div style={{ fontSize: '0.7rem', color: '#8c8c9e', fontWeight: '600' }}>
                FREE SHIPPING ON ORDERS OVER {formatPrice(freeShippingThreshold)}
              </div>
            </div>

            {/* 2. Promo Code Input Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.76rem', fontWeight: '800', color: '#ffffff' }}>
                <Tag size={14} color="#ffd312" />
                <span>HAVE A PROMO CODE?</span>
              </div>

              {appliedPromo.code ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 14px',
                    backgroundColor: 'rgba(220, 20, 60, 0.15)',
                    border: '1px solid #dc143c',
                    borderRadius: '6px'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                    {appliedPromo.code} ({(appliedPromo.discount * 100).toFixed(0)}% OFF)
                  </span>
                  <button
                    onClick={removePromo}
                    style={{ background: 'none', border: 'none', color: '#dc143c', fontSize: '0.72rem', fontWeight: '800', cursor: 'pointer' }}
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="ENTER PROMO CODE"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: '#000000',
                      border: '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: '6px',
                      padding: '10px 14px',
                      color: '#ffffff',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      outline: 'none'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#d4af37')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.18)')}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#000000',
                      border: '1.5px solid #d4af37',
                      borderRadius: '6px',
                      color: '#ffd312',
                      fontSize: '0.76rem',
                      fontWeight: '900',
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
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
                    APPLY
                  </button>
                </form>
              )}
            </div>

            {/* 3. Cost Breakdown (SUBTOTAL, SHIPPING, TOTAL) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#8c8c9e', fontWeight: '700' }}>
                <span>SUBTOTAL</span>
                <span style={{ color: '#ffffff', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{formatPrice(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#dc143c', fontWeight: '800' }}>
                  <span>DISCOUNT</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#8c8c9e', fontWeight: '700' }}>
                <span>SHIPPING</span>
                <span style={{ color: isFreeShipping ? '#ffd312' : '#ffffff', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                  {isFreeShipping ? 'FREE' : formatPrice(shippingFee)}
                </span>
              </div>

              {/* Total Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  paddingTop: '10px',
                  marginTop: '4px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.14)'
                }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#ffffff' }}>
                  TOTAL
                </span>
                <span
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: '900',
                    color: '#ffd312',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.02em'
                  }}
                >
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* 4. Checkout Red Button (CHECKOUT →) */}
            <button
              onClick={handleProceedCheckout}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: '#dc143c',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '900',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(220, 20, 60, 0.45)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff2a55';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(220, 20, 60, 0.65)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc143c';
                e.currentTarget.style.boxShadow = '0 4px 18px rgba(220, 20, 60, 0.45)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>CHECKOUT</span>
              <ArrowRight size={18} />
            </button>

            {/* 5. Continue Shopping Gold Link */}
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffd312',
                fontSize: '0.78rem',
                fontWeight: '900',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '4px',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
