import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../data/storeData';
import ProductCard from './ProductCard';
import { LayoutGrid, Grid3X3, Grid2X2, ArrowUpDown } from 'lucide-react';

export default function ProductGrid({ activeCategory, setActiveCategory }) {
  const [columns, setColumns] = useState(3);
  const [sortBy, setSortBy] = useState('featured');

  // Filter products
  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory !== 'all' && product.category !== activeCategory) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const getGridClass = () => {
    if (columns === 2) return 'grid-cols-product-2';
    if (columns === 4) return 'grid-cols-product-4';
    return 'grid-cols-product-3';
  };

  return (
    <section id="collection-section" style={{ padding: '60px 0 90px' }}>
      <div className="store-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <span className="sticker-badge">
              VOLUME IX PRE-ORDERS
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', color: '#ffffff', fontWeight: '900', marginBottom: '12px' }}>
            SIGNATURE <span className="blood-text">GRAILS</span> <span style={{ color: '#ffd312' }}>///</span> CATALOG
          </h2>
          <div className="title-red-line title-red-line-center" />
          <p style={{ fontSize: '0.92rem', color: '#dcdce6', lineHeight: 1.6 }}>
            High-voltage streetwear silhouettes, 100% Italian buttery lambskins, and 750gsm virgin cashmere outerwear. 100% Cash On Delivery.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '32px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '16px'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.74rem',
                    fontWeight: '900',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    backgroundColor: isActive ? '#ffd312' : 'rgba(255,255,255,0.06)',
                    color: isActive ? '#010000' : '#ffffff',
                    border: `1.5px solid ${isActive ? '#ffd312' : 'rgba(255,255,255,0.15)'}`,
                    boxShadow: isActive ? '2px 2px 0px #ffffff' : 'none',
                    transition: 'all 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffd312';
                      e.currentTarget.style.borderColor = '#ffd312';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ marginLeft: '4px', opacity: 0.7 }}>({cat.count})</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls: Sort & Column Layouts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ArrowUpDown size={14} style={{ color: '#ffd312' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: '#0b0b0e',
                  border: '1.5px solid #ffd312',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: '900',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="featured">Sort: Featured Drops</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Grid Column Switchers (Desktop) */}
            <div className="desktop-layout-switcher" style={{ display: 'flex', alignItems: 'center', gap: '4px', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '12px' }}>
              <button
                onClick={() => setColumns(2)}
                title="2 Columns"
                style={{
                  padding: '6px',
                  borderRadius: '4px',
                  color: columns === 2 ? '#ffd312' : '#8c8c9e',
                  background: columns === 2 ? 'rgba(255,211,18,0.15)' : 'transparent',
                  border: columns === 2 ? '1px solid #ffd312' : 'none',
                  cursor: 'pointer'
                }}
              >
                <Grid2X2 size={16} />
              </button>
              <button
                onClick={() => setColumns(3)}
                title="3 Columns"
                style={{
                  padding: '6px',
                  borderRadius: '4px',
                  color: columns === 3 ? '#ffd312' : '#8c8c9e',
                  background: columns === 3 ? 'rgba(255,211,18,0.15)' : 'transparent',
                  border: columns === 3 ? '1px solid #ffd312' : 'none',
                  cursor: 'pointer'
                }}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setColumns(4)}
                title="4 Columns"
                style={{
                  padding: '6px',
                  borderRadius: '4px',
                  color: columns === 4 ? '#ffd312' : '#8c8c9e',
                  background: columns === 4 ? 'rgba(255,211,18,0.15)' : 'transparent',
                  border: columns === 4 ? '1px solid #ffd312' : 'none',
                  cursor: 'pointer'
                }}
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Count Display */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '0.75rem', color: '#8c8c9e' }}>
          <span>SHOWING {sortedProducts.length} GRAILS</span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              style={{ color: '#ffd312', fontWeight: '900', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className={getGridClass()}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#0b0b0e', borderRadius: '16px', border: '2px dashed #ffd312' }}>
            <p style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '16px', fontWeight: '800' }}>No items match the selected criteria.</p>
            <button onClick={() => setActiveCategory('all')} className="btn-primary">
              VIEW ALL ARCHIVE
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
