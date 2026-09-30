import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { Heart, ChevronDown, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductPage({ product: propProduct }) {
  const {
    selectedProduct,
    closeProductPage,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    setIsCheckoutOpen
  } = useStore();

  const product = propProduct || selectedProduct || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors ? product.colors[0].name : '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 'EU 48');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('materials');
  const [isAdding, setIsAdding] = useState(false);

  const [prevProductId, setPrevProductId] = useState(product?.id);
  if (product?.id !== prevProductId) {
    setPrevProductId(product?.id);
    setSelectedColor(product?.colors?.[0]?.name || '');
    setSelectedSize(product?.sizes?.[0] || 'EU 48');
    setActiveImageIndex(0);
    setQuantity(1);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product?.id]);

  if (!product) return null;

  const isSaved = isInWishlist(product.id);

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      image: product.images ? product.images[activeImageIndex] : '/assets/leather_tee.jpg',
      quantity
    });
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const handleInstantPreOrder = () => {
    addToCart(product, {
      size: selectedSize,
      color: selectedColor,
      image: product.images ? product.images[activeImageIndex] : '/assets/leather_tee.jpg',
      quantity
    });
    setIsCheckoutOpen(true);
  };

  // Recommended coordinating pieces
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ backgroundColor: '#010000', minHeight: '100vh', color: '#ffffff', paddingTop: '30px', paddingBottom: '90px' }}>
      <div className="store-container">
        {/* Navigation Breadcrumb & Back Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
            paddingBottom: '18px'
          }}
        >
          <button
            onClick={closeProductPage}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: '#08080a',
              border: '1.5px solid #ffd312',
              color: '#ffd312',
              fontSize: '0.78rem',
              fontWeight: '900',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffd312';
              e.currentTarget.style.color = '#010000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#08080a';
              e.currentTarget.style.color = '#ffd312';
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO ALL PRE-ORDERS</span>
          </button>

          {/* Breadcrumbs */}
          <div style={{ fontSize: '0.74rem', color: '#8c8c9e', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: '800' }}>
            <span onClick={closeProductPage} style={{ cursor: 'pointer', color: '#ffffff' }}>ATELIER ARCHIVE</span>
            <span style={{ margin: '0 8px', color: '#ffd312' }}>/</span>
            <span style={{ color: '#ffd312' }}>{product.categoryLabel || product.category}</span>
            <span style={{ margin: '0 8px', color: '#ffd312' }}>/</span>
            <span style={{ color: '#ffffff' }}>{product.title}</span>
          </div>
        </div>

        {/* 2-Column Product Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(24px, 4vw, 56px)', alignItems: 'start', marginBottom: '80px' }}>
          {/* Left Column: High-Res Editorial Gallery */}
          <div>
            {/* Main Stage Image */}
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                backgroundColor: '#08080a',
                border: '2px solid #ffd312',
                boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255,211,18,0.2)',
                marginBottom: '16px'
              }}
            >
              <img
                src={product.images ? product.images[activeImageIndex] : '/assets/leather_tee.jpg'}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
              />

            </div>

            {/* Thumbnail Strip */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {product.images && product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '84px',
                    height: '110px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: `2px solid ${activeImageIndex === idx ? '#ffd312' : 'rgba(255,255,255,0.15)'}`,
                    boxShadow: activeImageIndex === idx ? '0 0 15px rgba(255,211,18,0.5)' : 'none',
                    cursor: 'pointer',
                    opacity: activeImageIndex === idx ? 1 : 0.6,
                    transition: 'all 0.2s',
                    padding: 0,
                    backgroundColor: '#08080a',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Buy Box & Product Narrative */}
          <div>
            {/* Top Label & Batch Notice */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.76rem', fontWeight: '900', letterSpacing: '0.12em', color: '#ffd312', textTransform: 'uppercase' }}>
                {product.categoryLabel || product.category}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#8c8c9e', fontWeight: '800' }}>
                BATCH ALLOCATION: 50–150 PIECES
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
                lineHeight: 1.08,
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '8px'
              }}
            >
              {product.title}
            </h1>
            <div className="title-red-line" />

            {/* Subtitle */}
            <p style={{ fontSize: '0.95rem', color: '#dcdce6', marginBottom: '22px', lineHeight: 1.6 }}>
              {product.subtitle}
            </p>

            {/* Price Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <span style={{ fontSize: 'clamp(1.8rem, 3.8vw, 2.2rem)', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span style={{ fontSize: '1.1rem', color: '#8c8c9e', textDecoration: 'line-through' }}>
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span
                style={{
                  backgroundColor: '#08080a',
                  border: '1.5px solid #ffd312',
                  color: '#ffd312',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.68rem',
                  fontWeight: '900',
                  letterSpacing: '0.04em'
                }}
              >
                0 EGP DUE TODAY • CASH ON DELIVERY
              </span>
            </div>

            {/* Colorway Selector */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase' }}>COLORWAY:</span>
                  <span style={{ color: '#ffd312', fontWeight: '900' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        border: `2px solid ${selectedColor === c.name ? '#ffd312' : 'rgba(255,255,255,0.2)'}`,
                        boxShadow: selectedColor === c.name ? '0 0 12px rgba(255,211,18,0.4)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: c.hex, border: '1px solid #fff', display: 'inline-block' }} />
                      <span style={{ fontSize: '0.76rem', fontWeight: '900', color: '#ffffff' }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector + Size Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase' }}>SELECT EU SIZE:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    style={{
                      color: '#ffd312',
                      fontSize: '0.76rem',
                      fontWeight: '900',
                      textDecoration: 'underline',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    EU Size & Fit Guide (CM)
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        minWidth: '60px',
                        padding: '12px 18px',
                        borderRadius: '8px',
                        backgroundColor: selectedSize === size ? '#ffd312' : 'rgba(255,255,255,0.06)',
                        color: selectedSize === size ? '#010000' : '#ffffff',
                        border: `2px solid ${selectedSize === size ? '#010000' : 'rgba(255,255,255,0.2)'}`,
                        boxShadow: selectedSize === size ? '2px 2px 0px #ffffff' : 'none',
                        fontWeight: '900',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Dual Buy Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {/* Stepper */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#08080a',
                    border: '2px solid #ffd312',
                    borderRadius: '9999px',
                    padding: '4px 10px'
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '8px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: '900', fontSize: '0.9rem', color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '8px', color: '#ffd312', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="btn-primary"
                  style={{ flex: '1 1 200px', padding: '14px 18px', fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)' }}
                >
                  {isAdding ? (
                    <span>RESERVING ALLOCATION...</span>
                  ) : (
                    <span>RESERVE • {formatPrice(product.price * quantity)} (COD)</span>
                  )}
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSaved ? '#dc143c' : '#ffffff',
                    backgroundColor: '#08080a',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    flexShrink: 0
                  }}
                  title="Save to Wishlist"
                >
                  <Heart size={20} fill={isSaved ? '#dc143c' : 'none'} />
                </button>
              </div>

              {/* Instant 1-Click Checkout Pre-Order Button */}
              <button
                onClick={handleInstantPreOrder}
                className="btn-crimson"
                style={{ width: '100%', padding: '14px 18px', fontSize: 'clamp(0.76rem, 1.8vw, 0.88rem)', textAlign: 'center', justifyContent: 'center' }}
              >
                <span>INSTANT 1-CLICK PRE-ORDER (0 EGP DUE TODAY)</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Cash on Delivery Guarantee Panel */}
            <div
              style={{
                backgroundColor: '#08080a',
                border: '1.5px solid rgba(255,211,18,0.4)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '28px',
                boxShadow: '3px 3px 0px rgba(255,211,18,0.2)'
              }}
            >
              <div style={{ fontSize: '0.84rem', fontWeight: '900', color: '#ffd312', marginBottom: '8px', textTransform: 'uppercase' }}>
                100% CASH ON DELIVERY GUARANTEE
              </div>
              <p style={{ fontSize: '0.8rem', color: '#dcdce6', lineHeight: 1.6, marginBottom: '12px' }}>
                Zero upfront payment required. Your order will be handcrafted at our atelier and dispatched via express courier. You inspect the sealed package and pay cash directly to the courier on arrival.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.74rem', color: '#ffffff', fontWeight: '800' }}>
                <div>• 0 EGP Charged Online</div>
                <div>• Handcrafted in Italy & Japan</div>
                <div>• 30-Day Doorstep Returns</div>
                <div>• Free Express Courier on 3,000 EGP+</div>
              </div>
            </div>

            {/* Detailed Accordions Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Accordion 1: Materials & Specifications */}
              <div style={{ border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#08080a' }}>
                <button
                  onClick={() => toggleAccordion('materials')}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '0.82rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>01 / MATERIALS & ATELIER SOURCING</span>
                  <ChevronDown size={18} style={{ transform: openAccordion === 'materials' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                </button>
                {openAccordion === 'materials' && (
                  <div style={{ padding: '16px 20px 20px', fontSize: '0.85rem', color: '#dcdce6', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {product.details ? (
                        product.details.map((d, i) => <li key={i}>{d}</li>)
                      ) : (
                        <li>100% bespoke artisanal craftsmanship</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit & Silhouette */}
              <div style={{ border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#08080a' }}>
                <button
                  onClick={() => toggleAccordion('fit')}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '0.82rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>02 / RUNWAY FIT & SILHOUETTE GUIDE</span>
                  <ChevronDown size={18} style={{ transform: openAccordion === 'fit' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                </button>
                {openAccordion === 'fit' && (
                  <div style={{ padding: '16px 20px 20px', fontSize: '0.85rem', color: '#dcdce6', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ marginBottom: '10px' }}>{product.fit || 'Cut with an exaggerated boxy runway drape.'}</p>
                    <p style={{ color: '#ffd312', fontWeight: '800' }}>
                      Tip: Stay true to size for maximum streetwear drape, or size down for standard tailoring fit.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Cash On Delivery Process */}
              <div style={{ border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#08080a' }}>
                <button
                  onClick={() => toggleAccordion('cod')}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '0.82rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>03 / 100% CASH ON DELIVERY TIMELINE</span>
                  <ChevronDown size={18} style={{ transform: openAccordion === 'cod' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                </button>
                {openAccordion === 'cod' && (
                  <div style={{ padding: '16px 20px 20px', fontSize: '0.85rem', color: '#dcdce6', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ marginBottom: '10px' }}>
                      <strong>Step 1:</strong> You reserve this piece with zero card details.
                    </p>
                    <p style={{ marginBottom: '10px' }}>
                      <strong>Step 2:</strong> Our atelier crafts your batch piece in Florence (2–3 weeks).
                    </p>
                    <p>
                      <strong>Step 3:</strong> Private courier calls your WhatsApp upon arrival. You inspect the sealed box and pay the exact cash amount.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Archival Care */}
              <div style={{ border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#08080a' }}>
                <button
                  onClick={() => toggleAccordion('care')}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: '900',
                    fontSize: '0.82rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>04 / ARCHIVAL CARE & STORAGE</span>
                  <ChevronDown size={18} style={{ transform: openAccordion === 'care' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', color: '#ffd312' }} />
                </button>
                {openAccordion === 'care' && (
                  <div style={{ padding: '16px 20px 20px', fontSize: '0.85rem', color: '#dcdce6', lineHeight: 1.7, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <p>{product.care || 'Specialist clean only. Hang on wide contoured wooden hanger away from direct sunlight.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        {/* Complete The Runway Ensemble (Related Products) */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '60px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span className="sticker-badge" style={{ marginBottom: '8px', display: 'inline-block' }}>
              CURATED COORDINATION
            </span>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: '900', color: '#ffffff' }}>
              COMPLETE THE RUNWAY DRIP <span style={{ color: '#ffd312' }}>///</span>
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#8c8c9e', marginTop: '6px' }}>
              Pair with architectural outerwear or brutalist leather accessories to unlock the 20% 3-piece bundle privilege.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
