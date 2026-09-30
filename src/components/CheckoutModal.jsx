import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartSubtotal,
    discountAmount,
    appliedPromo,
    shippingFee,
    finalTotal,
    formatPrice
  } = useStore();

  const [step, setStep] = useState('shipping');
  const [formData, setFormData] = useState({
    firstName: 'Kareem',
    lastName: 'Vance',
    phone: '+20 10 9821 4452',
    email: 'kareem.archive@sygil.io',
    address: '15 Gezira Street, Zamalek',
    city: 'Cairo',
    postalCode: '11511',
    country: 'Egypt',
    courierNotes: 'Please ring bell upon doorstep arrival.',
    needChange: false,
    changeAmount: ''
  });

  const [trackingNumber, setTrackingNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleNextToConfirmation = (e) => {
    e.preventDefault();
    setStep('confirmation');
  };

  const handleCompletePreOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const randomPreOrderId = `SYGIL-PRE-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingNumber(randomPreOrderId);
      setStep('confirmed');
      try {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#ffd312', '#dc143c', '#ffffff']
        });
      } catch {}
      clearCart();
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div
        onClick={() => {
          if (step !== 'confirmed') setIsCheckoutOpen(false);
        }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(1, 1, 0, 0.92)',
          backdropFilter: 'blur(8px)'
        }}
      />

      <div
        style={{
          position: 'relative',
          backgroundColor: '#08080a',
          border: '2px solid #ffd312',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 35px rgba(255,211,18,0.35)',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          zIndex: 150,
          padding: '36px clamp(20px, 4vw, 40px)'
        }}
      >
        <button
          onClick={() => setIsCheckoutOpen(false)}
          aria-label="Close pre-order modal"
          style={{ position: 'absolute', top: '20px', right: '20px', color: '#ffd312', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          <X size={24} />
        </button>

        {step !== 'confirmed' ? (
          <div>
            {/* Header & Steps Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span className="sticker-badge" style={{ fontSize: '0.65rem' }}>
                    PRE-ORDER PORTAL • 100% CASH ON DELIVERY
                  </span>
                  <span className="sticker-crimson" style={{ fontSize: '0.65rem' }}>
                    0 EGP DUE TODAY
                  </span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#ffffff' }}>
                  {step === 'shipping' ? '01. RECIPIENT & COURIER MANIFEST' : '02. CASH ON DELIVERY CONFIRMATION'}
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: '900' }}>
                <span style={{ color: step === 'shipping' ? '#ffd312' : '#ffffff' }}>1. Delivery Address</span>
                <span style={{ color: '#8c8c9e' }}>→</span>
                <span style={{ color: step === 'confirmation' ? '#ffd312' : '#8c8c9e' }}>2. Cash Confirmation</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {/* Form Side */}
              <div>
                {step === 'shipping' ? (
                  <form onSubmit={handleNextToConfirmation} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>FIRST NAME</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>LAST NAME</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>
                        PHONE / WHATSAPP NUMBER (FOR COURIER ARRIVAL CALL)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+20 10 0000 0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid #ffd312', color: '#ffffff', fontSize: '0.82rem', outline: 'none', fontFamily: 'var(--font-mono)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>EMAIL FOR TRACKING & DISPATCH NOTICES</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>DELIVERY STREET ADDRESS</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>CITY</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>POSTAL</label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', marginBottom: '4px' }}>COURIER DELIVERY INSTRUCTIONS (OPTIONAL)</label>
                      <input
                        type="text"
                        placeholder="e.g. Ring bell 4B or leave at gate"
                        value={formData.courierNotes}
                        onChange={(e) => setFormData({ ...formData, courierNotes: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', fontSize: '0.82rem', outline: 'none' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{ marginTop: '10px', padding: '15px' }}
                    >
                      <span>CONTINUE TO CASH CONFIRMATION</span>
                      <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCompletePreOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Destination Summary Box */}
                    <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: '#010000', border: '1.5px solid #ffd312' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                        <span style={{ color: '#8c8c9e' }}>Delivery Address:</span>
                        <span style={{ color: '#ffffff', fontWeight: '800' }}>{formData.address}, {formData.city}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '6px' }}>
                        <span style={{ color: '#8c8c9e' }}>Courier Call Phone:</span>
                        <span style={{ color: '#ffd312', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{formData.phone}</span>
                      </div>
                      <button type="button" onClick={() => setStep('shipping')} style={{ fontSize: '0.7rem', color: '#ffd312', fontWeight: '900', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Edit Address & Contact
                      </button>
                    </div>

                    {/* Cash Payment Guarantee Card */}
                    <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 211, 18, 0.08)', border: '2px solid #ffd312', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ color: '#ffd312', fontWeight: '900', fontSize: '0.88rem' }}>
                        <span>100% CASH PAYMENT UPON DELIVERY</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#dcdce6', lineHeight: 1.5 }}>
                        No credit card or online transaction is required. You will hand the exact amount of <strong style={{ color: '#ffd312' }}>{formatPrice(finalTotal)}</strong> in cash directly to the courier upon doorstep handover.
                      </p>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '6px', borderTop: '1px solid rgba(255,211,18,0.2)' }}>
                        <span style={{ fontSize: '0.72rem', color: '#ffffff' }}>
                          • 0 EGP Due Today
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#ffffff' }}>
                          • Inspect Before Paying
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#ffffff' }}>
                          • Official SΨGIL Receipt
                        </span>
                      </div>
                    </div>

                    {/* Change Note Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#010000', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <input
                        type="checkbox"
                        id="needChangeCheck"
                        checked={formData.needChange}
                        onChange={(e) => setFormData({ ...formData, needChange: e.target.checked })}
                        style={{ accentColor: '#ffd312', width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <label htmlFor="needChangeCheck" style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: '700', cursor: 'pointer' }}>
                        I will need cash change from the courier
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="btn-primary"
                      style={{ padding: '16px', fontSize: '0.92rem' }}
                    >
                      {isProcessing ? (
                        <span>ALLOCATING ATELIER PRE-ORDER BATCH...</span>
                      ) : (
                        <span>CONFIRM PRE-ORDER RESERVATION • 0 EGP DUE NOW</span>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Order Manifest Side */}
              <div style={{ backgroundColor: '#010000', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312', textTransform: 'uppercase' }}>
                      PRE-ORDER MANIFEST ({cart.length} GRAILS)
                    </span>
                    <span className="sticker-dark" style={{ fontSize: '0.62rem' }}>
                      BATCH 01
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', marginBottom: '16px' }}>
                    {cart.map((item) => (
                      <div key={item.cartId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={item.image} alt="" style={{ width: '36px', height: '46px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ffd312' }} />
                          <div>
                            <div style={{ fontSize: '0.76rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.2 }}>{item.title}</div>
                            <div style={{ fontSize: '0.7rem', color: '#8c8c9e' }}>Qty: {item.quantity} • Size: {item.size}</div>
                          </div>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dcdce6' }}>
                    <span>Pre-Order Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffd312', fontWeight: '900' }}>
                      <span>Privilege Discount ({appliedPromo.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#dcdce6' }}>
                    <span>Express Courier</span>
                    <span style={{ color: shippingFee === 0 ? '#ffd312' : '#ffffff', fontWeight: '800' }}>
                      {shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '800', color: '#dc143c', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px', marginTop: '4px' }}>
                    <span>AMOUNT DUE TODAY:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '900' }}>0 EGP</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '900', color: '#ffffff', borderTop: '1px solid #ffd312', paddingTop: '10px', marginTop: '4px' }}>
                    <span style={{ color: '#ffd312' }}>CASH DUE ON DELIVERY:</span>
                    <span style={{ color: '#ffd312', fontFamily: 'var(--font-mono)' }}>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation Receipt Voucher */
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: '0.74rem', fontWeight: '900', letterSpacing: '0.2em', color: '#ffd312', textTransform: 'uppercase', marginBottom: '8px' }}>
              PRE-ORDER RESERVATION CONFIRMED & ALLOCATED
            </div>

            <h3 style={{ fontSize: '2.1rem', fontWeight: '900', color: '#ffffff', marginBottom: '10px' }}>
              SΨGIL BATCH GRAILS SECURED
            </h3>

            <p style={{ fontSize: '0.9rem', color: '#dcdce6', maxWidth: '580px', margin: '0 auto 24px', lineHeight: 1.6 }}>
              Your pieces have been allocated to <strong>Production Batch 01</strong> at our Florence Atelier. A confirmation dispatch notice has been sent to your WhatsApp number.
            </p>

            {/* Pre-Order Voucher Box */}
            <div style={{ padding: '22px 26px', borderRadius: '18px', backgroundColor: '#010000', border: '2px solid #ffd312', maxWidth: '520px', margin: '0 auto 28px', textAlign: 'left', boxShadow: '4px 4px 0px #ffd312' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: '#ffd312', fontWeight: '900' }}>SΨGIL OFFICIAL PRE-ORDER VOUCHER:</span>
                <span style={{ fontSize: '0.7rem', color: '#dc143c', fontWeight: '900' }}>BATCH 01 QUEUE</span>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.35rem', fontWeight: '900', color: '#ffffff', marginBottom: '12px' }}>
                {trackingNumber}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.76rem', color: '#dcdce6' }}>
                <div>
                  <span style={{ color: '#8c8c9e', display: 'block' }}>Recipient:</span>
                  <span style={{ fontWeight: '800', color: '#ffffff' }}>{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                  <span style={{ color: '#8c8c9e', display: 'block' }}>WhatsApp Contact:</span>
                  <span style={{ fontWeight: '800', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>{formData.phone}</span>
                </div>
                <div>
                  <span style={{ color: '#8c8c9e', display: 'block' }}>Delivery City:</span>
                  <span style={{ fontWeight: '800', color: '#ffffff' }}>{formData.city}, {formData.country}</span>
                </div>
                <div>
                  <span style={{ color: '#8c8c9e', display: 'block' }}>Exact Cash Due to Courier:</span>
                  <span style={{ fontWeight: '900', color: '#ffd312', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handlePrint}
                className="btn-secondary"
                style={{ padding: '12px 24px', fontSize: '0.82rem' }}
              >
                <Printer size={15} />
                <span>PRINT PRE-ORDER VOUCHER</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.82rem' }}
              >
                <span>RETURN TO ATELIER DROPS</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
