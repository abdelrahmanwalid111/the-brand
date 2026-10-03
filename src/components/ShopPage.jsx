import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, CATEGORIES } from '../data/storeData';
import { Heart, ShoppingBag, SlidersHorizontal, ChevronDown, ChevronUp, X, Check } from 'lucide-react';

export default function ShopPage({ onNavigateHome }) {
  const { addToCart, toggleWishlist, isInWishlist, openProductPage, formatPrice, activeCategory, setActiveCategory } = useStore();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'all');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync when activeCategory from navbar/rails changes
  useEffect(() => {
    if (activeCategory) {
      setSelectedCategory(activeCategory);
    }
  }, [activeCategory]);

  // Accordion open/collapse states
  const [accordionOpen, setAccordionOpen] = useState({
    category: true,
    size: true,
    color: true,
    price: true,
    collection: false
  });

  const toggleAccordion = (key) => {
    setAccordionOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    if (setActiveCategory) setActiveCategory('all');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(5000);
    setSortBy('featured');
  };

  // Color options
  const COLOR_OPTIONS = [
    { id: 'black', name: 'Pitch Black', hex: '#000000', border: '#333338' },
    { id: 'white', name: 'Crisp White', hex: '#ffffff', border: '#ffffff' },
    { id: 'grey', name: 'Heather Grey', hex: '#8c8c9e', border: '#8c8c9e' },
    { id: 'gold', name: 'Cyber Gold', hex: '#ffd312', border: '#d4af37' },
    { id: 'red', name: 'Crimson Red', hex: '#dc143c', border: '#dc143c' }
  ];

  // Size options
  const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'all' && typeof selectedCategory === 'string' && product.category !== selectedCategory) {
        return false;
      }
      // Size filter
      if (selectedSize && (!product.sizes || !product.sizes.includes(selectedSize))) {
        return false;
      }
      // Color filter
      if (selectedColor) {
        if (!product.colors || !product.colors.some((c) => {
          if (selectedColor === 'black') return c.name.toLowerCase().includes('black') || c.hex === '#000000' || c.hex === '#010000' || c.hex === '#08080a';
          if (selectedColor === 'white') return c.name.toLowerCase().includes('white') || c.hex === '#ffffff';
          if (selectedColor === 'grey') return c.name.toLowerCase().includes('grey') || c.name.toLowerCase().includes('silver') || c.name.toLowerCase().includes('charcoal');
          if (selectedColor === 'gold') return c.name.toLowerCase().includes('gold') || c.name.toLowerCase().includes('yellow');
          if (selectedColor === 'red') return c.name.toLowerCase().includes('red') || c.name.toLowerCase().includes('crimson');
          return false;
        })) {
          return false;
        }
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSize, selectedColor, maxPrice]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filteredProducts, sortBy]);

  // Dynamic category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = PRODUCTS.filter((p) => p.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  return (
    <div id="shop-page-root" style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '100vh', paddingBottom: '80px' }}>
      {/* 1. SHOP HERO BANNER (Matching Figma Mockup) */}
      <section
        style={{
          position: 'relative',
          backgroundColor: '#010000',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          minHeight: '260px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Background Atmospheric Model Image aligned to right with gradient fade */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to right, #000000 0%, rgba(0,0,0,0.88) 32%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.2) 100%), url('/assets/sygil_hero_cinematic.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.9,
            zIndex: 0
          }}
        />

        <div className="store-container" style={{ position: 'relative', zIndex: 1, width: '100%', padding: 'clamp(32px, 5vw, 48px) 24px' }}>
          {/* Breadcrumb Navigation: Home > Shop */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: '#8c8c9e',
              marginBottom: '18px',
              fontWeight: '700'
            }}
          >
            <span
              onClick={onNavigateHome}
              style={{ cursor: 'pointer', transition: 'color 0.2s', color: '#dcdce6' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#dcdce6')}
            >
              Home
            </span>
            <span style={{ color: '#8c8c9e' }}>&gt;</span>
            <span style={{ color: '#ffd312' }}>Shop</span>
          </nav>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              {/* Kicker with Red Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ width: '28px', height: '3px', backgroundColor: '#dc143c', display: 'inline-block' }} />
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: '900',
                    letterSpacing: '0.18em',
                    color: '#ffffff',
                    textTransform: 'uppercase'
                  }}
                >
                  SYGIL
                </span>
              </div>

              {/* Massive Serif Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                  fontWeight: '900',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  margin: '0 0 4px 0',
                  textTransform: 'uppercase'
                }}
              >
                SHOP
              </h1>

              {/* Gold Subtitle from Mockup */}
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
                  fontWeight: '800',
                  letterSpacing: '0.08em',
                  color: '#d4af37',
                  lineHeight: 1.1,
                  textTransform: 'uppercase',
                  marginBottom: '14px'
                }}
              >
                ALL COLLECTIONS
              </div>

              {/* Red Accent Dash */}
              <div style={{ width: '48px', height: '2px', backgroundColor: '#dc143c', marginBottom: '14px' }} />

              {/* Tagline from Mockup */}
              <p
                style={{
                  fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)',
                  fontWeight: '800',
                  color: '#dcdce6',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                Clothing for a different mindset. Wear your story.
              </p>
            </div>

            {/* Vertical Motto from Mockup (Desktop only) */}
            <div
              className="desktop-only"
              style={{
                textAlign: 'right',
                borderLeft: '1px solid rgba(255, 255, 255, 0.15)',
                paddingLeft: '24px',
                marginBottom: '8px'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: '900', letterSpacing: '0.2em', color: '#8c8c9e', lineHeight: 1.7, textTransform: 'uppercase' }}>
                CLOTHES<br />
                FOR A LOUDER<br />
                <span style={{ color: '#ffd312' }}>SILENCE.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN SHOP CONTENT: FILTERS SIDEBAR + 4-COLUMN PRODUCTS GRID */}
      <div className="store-container" style={{ padding: '36px 24px 0' }}>
        {/* Mobile Filter Toggle Button */}
        <div style={{ display: 'none', marginBottom: '20px' }} className="mobile-filter-bar">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              backgroundColor: '#08080a',
              border: '1.5px solid #d4af37',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            <SlidersHorizontal size={16} color="#d4af37" />
            <span>FILTERS</span>
            {(selectedCategory !== 'all' || selectedSize || selectedColor || maxPrice < 5000) && (
              <span style={{ backgroundColor: '#dc143c', color: '#ffffff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '999px', fontWeight: '900' }}>
                ACTIVE
              </span>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', gap: 'clamp(28px, 4vw, 48px)', alignItems: 'flex-start' }}>
          {/* =========================================
              LEFT SIDEBAR: FILTERS (Matching Mockup)
              ========================================= */}
          <aside
            className={`shop-filters-sidebar ${mobileFiltersOpen ? 'mobile-open' : ''}`}
            style={{
              width: '270px',
              minWidth: '270px',
              backgroundColor: '#050507',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '24px 20px',
              position: 'sticky',
              top: '90px'
            }}
          >
            {/* Mobile Close Button */}
            {mobileFiltersOpen && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#dc143c', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={22} />
                </button>
              </div>
            )}

            {/* Sidebar Header: FILTERS + Reset All */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '20px'
              }}
            >
              <h2
                style={{
                  fontSize: '0.95rem',
                  fontWeight: '900',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                  margin: 0
                }}
              >
                FILTERS
              </h2>
              <button
                onClick={handleResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#dc143c',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  padding: 0,
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                Reset All
              </button>
            </div>

            {/* 1. CATEGORY ACCORDION */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
              <div
                onClick={() => toggleAccordion('category')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: accordionOpen.category ? '14px' : '0',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
                  CATEGORY
                </span>
                {accordionOpen.category ? <ChevronUp size={16} color="#8c8c9e" /> : <ChevronDown size={16} color="#8c8c9e" />}
              </div>

              {accordionOpen.category && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const count = categoryCounts[cat.id] || 0;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          if (setActiveCategory) setActiveCategory(cat.id);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: 'none',
                          border: 'none',
                          padding: '3px 0',
                          color: isSelected ? '#ffffff' : '#8c8c9e',
                          fontSize: '0.8rem',
                          fontWeight: isSelected ? '900' : '600',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'color 0.2s'
                        }}
                      >
                        {/* Radio Dot indicator from Figma Mockup */}
                        <span
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            border: `1.5px solid ${isSelected ? '#dc143c' : 'rgba(255, 255, 255, 0.3)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'border-color 0.2s'
                          }}
                        >
                          {isSelected && (
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#dc143c' }} />
                          )}
                        </span>
                        <span style={{ flex: 1, color: isSelected ? '#ffffff' : '#8c8c9e' }}>
                          {cat.name} {count > 0 && <span style={{ opacity: 0.6 }}>({count})</span>}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. SIZE ACCORDION */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
              <div
                onClick={() => toggleAccordion('size')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: accordionOpen.size ? '14px' : '0',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
                  SIZE
                </span>
                {accordionOpen.size ? <ChevronUp size={16} color="#8c8c9e" /> : <ChevronDown size={16} color="#8c8c9e" />}
              </div>

              {accordionOpen.size && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {SIZE_OPTIONS.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(isSelected ? null : sz)}
                        style={{
                          padding: '8px 0',
                          backgroundColor: isSelected ? '#000000' : '#08080a',
                          border: `1.5px solid ${isSelected ? '#dc143c' : 'rgba(255, 255, 255, 0.12)'}`,
                          borderRadius: '6px',
                          color: isSelected ? '#ffffff' : '#8c8c9e',
                          fontWeight: '800',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          textAlign: 'center',
                          boxShadow: isSelected ? '0 0 10px rgba(220, 20, 60, 0.3)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 3. COLOR ACCORDION */}
            <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '20px' }}>
              <div
                onClick={() => toggleAccordion('color')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: accordionOpen.color ? '14px' : '0',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
                  COLOR
                </span>
                {accordionOpen.color ? <ChevronUp size={16} color="#8c8c9e" /> : <ChevronDown size={16} color="#8c8c9e" />}
              </div>

              {accordionOpen.color && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {COLOR_OPTIONS.map((c) => {
                    const isSelected = selectedColor === c.id;
                    return (
                      <button
                        key={c.id}
                        title={c.name}
                        onClick={() => setSelectedColor(isSelected ? null : c.id)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: `2px solid ${c.border}`,
                          outline: isSelected ? '2px solid #d4af37' : 'none',
                          outlineOffset: '2px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                          transition: 'all 0.2s'
                        }}
                      >
                        {isSelected && (
                          <Check size={14} color={c.id === 'white' || c.id === 'gold' ? '#000000' : '#ffffff'} strokeWidth={3} />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. PRICE RANGE ACCORDION */}
            <div>
              <div
                onClick={() => toggleAccordion('price')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  marginBottom: accordionOpen.price ? '14px' : '0',
                  userSelect: 'none'
                }}
              >
                <span style={{ fontSize: '0.82rem', fontWeight: '900', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#ffffff' }}>
                  PRICE RANGE
                </span>
                {accordionOpen.price ? <ChevronUp size={16} color="#8c8c9e" /> : <ChevronDown size={16} color="#8c8c9e" />}
              </div>

              {accordionOpen.price && (
                <div>
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#ffd312',
                      cursor: 'pointer',
                      marginBottom: '10px'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8c8c9e', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                    <span>EGP 0</span>
                    <span style={{ color: '#ffd312' }}>{formatPrice(maxPrice)}</span>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* =========================================
              RIGHT PRODUCTS CATALOG AREA
              ========================================= */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {/* Top Toolbar: ALL PRODUCTS (32 Products) + Sort By Dropdown */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <h2
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '900',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    margin: 0
                  }}
                >
                  {(!selectedCategory || typeof selectedCategory !== 'string' || selectedCategory === 'all')
                    ? 'ALL PRODUCTS'
                    : selectedCategory.toUpperCase()}
                </h2>
                <span style={{ fontSize: '0.85rem', color: '#8c8c9e', fontWeight: '700' }}>
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
                </span>
              </div>

              {/* Sort By Dropdown matching Mockup */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: '#8c8c9e', fontWeight: '800' }}>Sort by:</span>
                <div style={{ position: 'relative' }}>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      appearance: 'none',
                      backgroundColor: '#08080a',
                      border: '1.5px solid #d4af37',
                      borderRadius: '8px',
                      padding: '8px 32px 8px 14px',
                      color: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown
                    size={14}
                    color="#d4af37"
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  />
                </div>
              </div>
            </div>

            {/* 4-COLUMN PRODUCTS GRID */}
            {sortedProducts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '80px 20px',
                  backgroundColor: '#050507',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <p style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ffffff', marginBottom: '8px' }}>
                  No grails match the selected filters
                </p>
                <p style={{ fontSize: '0.85rem', color: '#8c8c9e', marginBottom: '20px' }}>
                  Try resetting your category, size, or price slider.
                </p>
                <button onClick={handleResetFilters} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 230px), 1fr))',
                  gap: '20px'
                }}
              >
                {sortedProducts.map((product) => {
                  const inWish = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      style={{
                        position: 'relative',
                        backgroundColor: '#08080a',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(255, 255, 255, 0.08)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#dc143c';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 20, 60, 0.3), 3px 3px 0px #d4af37';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'none';
                      }}
                      onClick={() => openProductPage(product)}
                    >
                      {/* Image Stage Container */}
                      <div
                        style={{
                          position: 'relative',
                          aspectRatio: '1/1',
                          backgroundColor: '#000000',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {/* Product Image */}
                        <img
                          src={product.images && product.images[0] ? product.images[0] : product.image}
                          alt={product.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.4s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />

                        {/* Top-Left NEW Tag Badge (from Mockup) */}
                        {product.isNew && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '10px',
                              left: '10px',
                              backgroundColor: '#dc143c',
                              color: '#ffffff',
                              fontSize: '0.65rem',
                              fontWeight: '900',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              letterSpacing: '0.06em',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                            }}
                          >
                            NEW
                          </div>
                        )}

                        {/* Top-Right Wishlist Heart Button (from Mockup) */}
                        <button
                          aria-label="Save to Wishlist"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: inWish ? '#dc143c' : '#ffffff',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.borderColor = '#dc143c';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                          }}
                        >
                          <Heart size={15} fill={inWish ? '#dc143c' : 'none'} color={inWish ? '#dc143c' : '#ffffff'} />
                        </button>
                      </div>

                      {/* Card Info Details */}
                      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                        <div>
                          {/* Category Kicker */}
                          <div
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: '800',
                              letterSpacing: '0.08em',
                              color: '#8c8c9e',
                              textTransform: 'uppercase',
                              marginBottom: '4px'
                            }}
                          >
                            {product.categoryLabel || product.category}
                          </div>

                          {/* Product Title */}
                          <h3
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: '900',
                              letterSpacing: '0.04em',
                              color: '#ffffff',
                              textTransform: 'uppercase',
                              lineHeight: 1.25,
                              margin: '0 0 10px 0'
                            }}
                          >
                            {product.title}
                          </h3>
                        </div>

                        {/* Price & Cart Button Row (from Mockup) */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <div
                            style={{
                              fontSize: '0.92rem',
                              fontWeight: '900',
                              color: '#ffd312',
                              fontFamily: 'var(--font-mono)',
                              letterSpacing: '0.02em'
                            }}
                          >
                            {formatPrice(product.price)}
                          </div>

                          {/* Quick Add to Bag / Cart Button */}
                          <button
                            aria-label={`Add ${product.title} to bag`}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, {
                                size: product.sizes ? product.sizes[0] : 'OS',
                                quantity: 1
                              });
                            }}
                            style={{
                              width: '34px',
                              height: '34px',
                              borderRadius: '8px',
                              backgroundColor: '#000000',
                              border: '1.5px solid #d4af37',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#ffd312',
                              cursor: 'pointer',
                              boxShadow: '1.5px 1.5px 0px rgba(220, 20, 60, 0.4)',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc143c';
                              e.currentTarget.style.borderColor = '#dc143c';
                              e.currentTarget.style.color = '#ffffff';
                              e.currentTarget.style.transform = 'scale(1.08)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#000000';
                              e.currentTarget.style.borderColor = '#d4af37';
                              e.currentTarget.style.color = '#ffd312';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <ShoppingBag size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
