import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/storeData';
import { Search, X } from 'lucide-react';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, formatPrice, openProductPage, products } = useStore();
  const allProducts = (products && products.length > 0) ? products : PRODUCTS;
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const handleClose = () => {
    setQuery('');
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularTags = ['650gsm Hoodie', 'Lambskin Moto Top', 'French Terry Crewneck', 'Acid Wash Hoodie', 'Stand-Collar Top', 'Alpaca Fleece'];

  const results = query.trim()
    ? allProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.details && p.details.some((d) => d.toLowerCase().includes(query.toLowerCase())))
      )
    : [];

  const handleProductSelect = (product) => {
    handleClose();
    openProductPage(product);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', flexDirection: 'column' }}>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(1, 1, 0, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}
      />

      {/* Search Header Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 130,
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        {/* Search Bar Input Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            borderBottom: '3px solid #dc143c',
            paddingBottom: '16px',
            marginBottom: '24px'
          }}
        >
          <Search size={30} style={{ color: '#dc143c' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search grails by style, fabric, drop..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)',
              fontWeight: '800',
              outline: 'none'
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: '#dc143c', padding: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          )}
          <button
            onClick={handleClose}
            aria-label="Close search"
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: '#dc143c',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: '900',
              border: '1.5px solid #d4af37',
              cursor: 'pointer'
            }}
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.74rem', color: '#d4af37', fontWeight: '900', textTransform: 'uppercase' }}>
            TRENDING:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                color: '#ffffff',
                fontSize: '0.74rem',
                fontWeight: '800',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dc143c';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
          {query.trim() && (
            <div style={{ marginBottom: '16px', fontSize: '0.78rem', color: '#ffd312', fontWeight: '900' }}>
              FOUND {results.length} MATCHING GRAILS FOR "{query.toUpperCase()}"
            </div>
          )}

          {results.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  style={{
                    backgroundColor: '#08080a',
                    border: '1.5px solid rgba(255,255,255,0.15)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-3px, -3px)';
                    e.currentTarget.style.borderColor = '#dc143c';
                    e.currentTarget.style.boxShadow = '3px 3px 0px #d4af37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#d4af37', fontWeight: '900', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {product.categoryLabel || product.category}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '900', color: '#ffffff', lineHeight: 1.2, marginBottom: '6px' }}>
                      {product.title}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '900', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '8px', fontWeight: '900' }}>No grails found for "{query}"</p>
              <p style={{ fontSize: '0.85rem', color: '#8c8c9e' }}>Try searching for "trench", "leather", "knit", or "boots".</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '900', letterSpacing: '0.12em', color: '#d4af37', textTransform: 'uppercase', marginBottom: '16px' }}>
                FEATURED GRAILS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                {allProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    style={{
                      backgroundColor: '#08080a',
                      border: '1.5px solid rgba(255,255,255,0.15)',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '14px' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: '900', color: '#ffffff' }}>{product.title}</div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '900', color: '#ffd312', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>{formatPrice(product.price)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
