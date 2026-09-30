import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { LOOKBOOK_HOTSPOTS, PRODUCTS } from '../data/storeData';
import { Plus, X } from 'lucide-react';

export default function ShopTheLookHotspots() {
  const { formatPrice, addToCart, openQuickView } = useStore();
  const [activeHotspot, setActiveHotspot] = useState(LOOKBOOK_HOTSPOTS[0]);

  const getProductForHotspot = (hs) => {
    return PRODUCTS.find((p) => p.id === hs.productId) || PRODUCTS[0];
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
              Tap the electric radar pins to inspect individual garments from the full runway ensemble and add directly to your bag.
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
            maxHeight: '750px',
            backgroundColor: '#050508',
            border: '2px solid #ffd312',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255,211,18,0.25)'
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
              background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 40%, rgba(1,1,0,0.7) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Interactive Hotspot Radar Pins */}
          {LOOKBOOK_HOTSPOTS.map((hs) => {
            const isSelected = activeHotspot && activeHotspot.id === hs.id;
            return (
              <button
                key={hs.id}
                onClick={() => setActiveHotspot(hs)}
                aria-label={`Inspect ${hs.title}`}
                className="hotspot-dot"
                style={{
                  top: `${hs.y}%`,
                  left: `${hs.x}%`,
                  backgroundColor: isSelected ? '#dc143c' : '#ffd312',
                  color: isSelected ? '#ffffff' : '#010000',
                  transform: isSelected ? 'scale(1.4)' : 'scale(1)',
                  zIndex: isSelected ? 30 : 20
                }}
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            );
          })}

          {/* Floating Product Preview Card for Active Hotspot */}
          {activeHotspot && (
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                width: 'min(90%, 360px)',
                backgroundColor: 'rgba(8, 8, 10, 0.96)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '2px solid #ffd312',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '4px 4px 0px #ffd312, 0 20px 50px rgba(0,0,0,0.9)',
                zIndex: 35,
                animation: 'slideDownToast 0.3s ease-out'
              }}
            >
              {(() => {
                const prod = getProductForHotspot(activeHotspot);
                return (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span className="sticker-badge" style={{ fontSize: '0.62rem' }}>
                        PINNED PIECE
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        style={{ color: '#ffd312', padding: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        style={{ width: '68px', height: '84px', objectFit: 'cover', borderRadius: '8px', border: '1.5px solid #ffd312' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.2, marginBottom: '4px' }}>
                          {prod.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#8c8c9e', marginBottom: '6px' }}>
                          {activeHotspot.desc}
                        </div>
                        <div style={{ fontSize: '1.05rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                          {formatPrice(prod.price)}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => addToCart(prod, { quantity: 1 })}
                        className="btn-primary"
                        style={{ flex: 1, padding: '10px', fontSize: '0.76rem' }}
                      >
                        <span>RESERVE PRE-ORDER</span>
                      </button>

                      <button
                        onClick={() => openQuickView(prod)}
                        className="btn-secondary"
                        style={{ padding: '10px 14px', fontSize: '0.76rem' }}
                      >
                        <span>VIEW</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
