import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

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
    shippingFee,
    finalTotal,
    formatPrice,
    addToCart,
    setIsCheckoutOpen,
    openProductPage
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput) {
      applyPromo(promoInput);
      setPromoInput('');
    }
  };

  const handleItemClick = (item) => {
    const prod = PRODUCTS.find((p) => p.id === item.id) || item;
    setIsCartOpen(false);
    openProductPage(prod);
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const upsellCandidates = PRODUCTS.filter((p) => !cart.some((c) => c.productId === p.id)).slice(0, 2);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(1, 1, 0, 0.85)',
          backdropFilter: 'blur(8px)'
        }}
      />

      {/* Slide-out Drawer */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#08080a',
          borderLeft: '2px solid #ffd312',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 110,
          boxShadow: '-10px 0 40px rgba(0,0,0,0.9)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} style={{ color: '#ffd312' }} />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
              PRE-ORDER RESERVATION BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            style={{ color: '#ffd312', padding: '6px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cash On Delivery Notification Strip */}
        <div style={{ padding: '10px 24px', backgroundColor: '#010000', borderBottom: '1px solid rgba(255,211,18,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', letterSpacing: '0.05em' }}>
            100% CASH ON DELIVERY ONLY
          </span>
          <span style={{ fontSize: '0.68rem', fontWeight: '900', color: '#ffffff', backgroundColor: '#dc143c', padding: '2px 8px', borderRadius: '4px' }}>
            0 EGP DUE TODAY
          </span>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ padding: '14px 24px', backgroundColor: '#08080a', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', fontWeight: '900', marginBottom: '8px', color: isFreeShipping ? '#ffd312' : '#ffffff' }}>
            {isFreeShipping ? (
              <span>COMPLIMENTARY EXPRESS COURIER UNLOCKED</span>
            ) : (
              <span>
                ADD <span style={{ color: '#ffd312' }}>{formatPrice(amountToFreeShipping)}</span> FOR FREE EXPRESS COURIER
              </span>
            )}
          </div>
          {/* Progress bar */}
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                backgroundColor: isFreeShipping ? '#ffd312' : '#dc143c',
                boxShadow: isFreeShipping ? '0 0 10px #ffd312' : '0 0 10px #dc143c',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <ShoppingBag size={48} style={{ color: '#ffd312', opacity: 0.3, margin: '0 auto 16px' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff', marginBottom: '8px' }}>Your Pre-Order Bag is empty</p>
              <p style={{ fontSize: '0.82rem', color: '#8c8c9e', marginBottom: '20px' }}>Reserve signature grails from Volume IX.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ fontSize: '0.8rem' }}
              >
                <span>EXPLORE PRE-ORDERS</span>
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  backgroundColor: '#010000',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(255,255,255,0.12)'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onClick={() => handleItemClick(item)}
                  style={{ width: '70px', height: '90px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ffd312', cursor: 'pointer' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <h4
                        onClick={() => handleItemClick(item)}
                        style={{ fontSize: '0.82rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.2, cursor: 'pointer' }}
                      >
                        {item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        style={{ color: '#dc143c', padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#8c8c9e', marginTop: '4px' }}>
                      Size: <span style={{ color: '#ffd312', fontWeight: '800' }}>{item.size}</span> • Color: <span style={{ color: '#ffffff', fontWeight: '800' }}>{item.color}</span>
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#ffd312', fontWeight: '900', marginTop: '2px' }}>
                      PRE-ORDER • CASH ON DELIVERY
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    {/* Stepper */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#08080a',
                        borderRadius: '6px',
                        padding: '2px 6px',
                        border: '1px solid #ffd312'
                      }}
                    >
                      <button onClick={() => updateQuantity(item.cartId, -1)} style={{ padding: '4px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Minus size={12} />
                      </button>
                      <span style={{ fontSize: '0.78rem', fontWeight: '900', minWidth: '24px', textAlign: 'center', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateQuantity(item.cartId, 1)} style={{ padding: '4px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Plus size={12} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.95rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Upsells */}
          {cart.length > 0 && upsellCandidates.length > 0 && (
            <div style={{ marginTop: '12px', padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255,211,18,0.04)', border: '1.5px dashed #ffd312' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '10px' }}>
                PAIRS NATURALLY WITH THIS FIT
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {upsellCandidates.map((up) => (
                  <div key={up.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={up.images[0]}
                        alt=""
                        onClick={() => handleItemClick(up)}
                        style={{ width: '38px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ffd312', cursor: 'pointer' }}
                      />
                      <div>
                        <div
                          onClick={() => handleItemClick(up)}
                          style={{ fontSize: '0.74rem', fontWeight: '800', color: '#ffffff', cursor: 'pointer' }}
                        >
                          {up.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#ffd312', fontWeight: '900' }}>{formatPrice(up.price)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(up, { quantity: 1 })}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '9999px',
                        backgroundColor: '#ffd312',
                        color: '#010000',
                        fontSize: '0.7rem',
                        fontWeight: '900',
                        border: '1px solid #010000',
                        cursor: 'pointer'
                      }}
                    >
                      + ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Area */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', backgroundColor: '#010000', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
            {/* Promo Code Input */}
            <div style={{ marginBottom: '14px' }}>
              {appliedPromo.code ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderRadius: '8px', backgroundColor: 'rgba(255,211,18,0.15)', border: '1.5px solid #ffd312' }}>
                  <div style={{ fontSize: '0.76rem', color: '#ffd312', fontWeight: '900' }}>
                    <span>CODE "{appliedPromo.code}" ({appliedPromo.discount * 100}% OFF INVOICE)</span>
                  </div>
                  <button onClick={removePromo} style={{ color: '#dc143c', fontSize: '0.72rem', fontWeight: '900', background: 'none', border: 'none', cursor: 'pointer' }}>
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Drip promo (e.g. SYGIL15)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={{
                      flex: 1,
                      backgroundColor: '#08080a',
                      border: '1.5px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      outline: 'none',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#ffd312',
                      color: '#010000',
                      fontSize: '0.74rem',
                      fontWeight: '900',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    APPLY
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#dcdce6', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Pre-Order Subtotal</span>
                <span style={{ color: '#ffffff', fontWeight: '800' }}>{formatPrice(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffd312', fontWeight: '900' }}>
                  <span>Privilege Discount ({appliedPromo.discount * 100}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Express Courier</span>
                <span style={{ color: shippingFee === 0 ? '#ffd312' : '#ffffff', fontWeight: '800' }}>
                  {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', marginTop: '4px', fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>
                <span>CASH DUE ON ARRIVAL</span>
                <span style={{ color: '#ffd312', fontFamily: 'var(--font-mono)' }}>{formatPrice(finalTotal)}</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#8c8c9e', textAlign: 'right' }}>
                0 EGP due today • Hand cash in EGP to courier on delivery
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedCheckout}
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '0.92rem' }}
            >
              <span>RESERVE PRE-ORDER (CASH ON DELIVERY)</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
