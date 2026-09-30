import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../data/storeData';
import AnimatedLogo from './AnimatedLogo';

export default function Navbar({ onNavigateSection }) {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsWishlistOpen
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMegaOpen, setShopMegaOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 35;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId) => {
    setMobileMenuOpen(false);
    setShopMegaOpen(false);
    setMoreDropdownOpen(false);
    if (onNavigateSection) {
      onNavigateSection(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 40,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: isScrolled ? '10px 16px 0' : '0',
          transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          className={`nav-shell ${isScrolled ? 'scrolled' : ''}`}
          style={{
            margin: '0 auto',
            pointerEvents: 'auto'
          }}
        >
          <nav
            className={isScrolled ? 'glass-pill' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: isScrolled ? '8px clamp(12px, 2.5vw, 24px)' : '12px clamp(12px, 3.5vw, 56px)',
              borderRadius: isScrolled ? '9999px' : '0',
              borderTop: isScrolled ? '1.5px solid #ffd312' : 'none',
              borderLeft: isScrolled ? '1.5px solid #ffd312' : 'none',
              borderRight: isScrolled ? '1.5px solid #ffd312' : 'none',
              borderBottom: isScrolled ? '1.5px solid #ffd312' : '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: isScrolled ? 'rgba(1, 1, 0, 0.94)' : 'transparent',
              boxShadow: isScrolled
                ? '0 12px 35px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 211, 18, 0.28)'
                : 'none',
              backdropFilter: isScrolled ? 'blur(18px)' : 'none',
              WebkitBackdropFilter: isScrolled ? 'blur(18px)' : 'none',
              transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, border 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease'
            }}
          >
            {/* Left Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isScrolled ? '10px' : '16px' }}>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="mobile-burger-btn mobile-only"
                aria-label="Open menu"
                style={{
                  color: '#ffffff',
                  padding: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Menu size={22} />
              </button>

              <div className="desktop-links desktop-only" style={{ alignItems: 'center', gap: isScrolled ? '14px' : '18px' }}>
                {/* Pre-Order Drops Mega Menu */}
                <div
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setShopMegaOpen(true)}
                  onMouseLeave={() => setShopMegaOpen(false)}
                >
                  <button
                    onClick={() => handleLinkClick('collection-section')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#ffffff',
                      fontSize: isScrolled ? '0.75rem' : '0.8rem',
                      fontWeight: '800',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 0',
                      transition: 'color 0.2s',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd312')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    <span>SHOP</span>
                    <ChevronDown size={14} style={{ transform: shopMegaOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {shopMegaOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-20px',
                        paddingTop: '16px',
                        width: '450px',
                        zIndex: 60
                      }}
                    >
                      <div
                        className="glass-modal"
                        style={{
                          padding: '22px',
                          borderRadius: '16px',
                          border: '2px solid #ffd312',
                          boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 25px rgba(255,211,18,0.2)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: '900', letterSpacing: '0.1em', color: '#ffd312' }}>BATCH 01 ALLOCATION</span>
                          <span className="sticker-crimson" style={{ fontSize: '0.62rem' }}>CASH ON DELIVERY ONLY</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                          {CATEGORIES.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => handleLinkClick(`category-${cat.id}`)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px 10px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                textAlign: 'left',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 211, 18, 0.15)';
                                e.currentTarget.style.borderColor = '#ffd312';
                                e.currentTarget.style.transform = 'translateX(4px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {cat.image && (
                                <img
                                  src={cat.image}
                                  alt=""
                                  style={{ width: '36px', height: '44px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ffd312' }}
                                />
                              )}
                              <div>
                                <div style={{ fontSize: '0.76rem', fontWeight: '900', color: '#ffffff' }}>
                                  {cat.name}
                                </div>
                                <div style={{ fontSize: '0.66rem', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>
                                  {cat.count} Grails
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleLinkClick('collection-section')}
                  style={{
                    color: '#ffffff',
                    fontSize: isScrolled ? '0.75rem' : '0.8rem',
                    fontWeight: '800',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd312')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                >
                  COLLECTION
                </button>

                {/* More Dropdown Menu (About, FAQ, Contact) */}
                <div
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setMoreDropdownOpen(true)}
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#ffffff',
                      fontSize: isScrolled ? '0.75rem' : '0.8rem',
                      fontWeight: '800',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 0',
                      transition: 'color 0.2s',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd312')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    <span>MORE</span>
                    <ChevronDown size={14} style={{ transform: moreDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {/* Dropdown Box */}
                  {moreDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        paddingTop: '16px',
                        width: '200px',
                        zIndex: 60
                      }}
                    >
                      <div
                        className="glass-modal"
                        style={{
                          padding: '8px',
                          borderRadius: '12px',
                          border: '1.5px solid #ffd312',
                          boxShadow: '0 15px 40px rgba(0,0,0,0.9), 0 0 20px rgba(255,211,18,0.25)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          backgroundColor: 'rgba(5, 5, 8, 0.98)'
                        }}
                      >
                        <button
                          onClick={() => handleLinkClick('editorial-section')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: '800',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 211, 18, 0.15)';
                            e.currentTarget.style.color = '#ffd312';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>About</span>
                          <span style={{ fontSize: '0.65rem', color: '#ffd312', opacity: 0.7 }}>///</span>
                        </button>

                        <button
                          onClick={() => handleLinkClick('faq-section')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: '800',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 211, 18, 0.15)';
                            e.currentTarget.style.color = '#ffd312';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>FAQ</span>
                          <span style={{ fontSize: '0.65rem', color: '#ffd312', opacity: 0.7 }}>///</span>
                        </button>

                        <button
                          onClick={() => handleLinkClick('contact-section')}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                            fontWeight: '800',
                            letterSpacing: '0.04em',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 211, 18, 0.15)';
                            e.currentTarget.style.color = '#ffd312';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>Contact</span>
                          <span style={{ fontSize: '0.65rem', color: '#ffd312', opacity: 0.7 }}>///</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center Brand Logo (Animated) */}
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <AnimatedLogo size={isScrolled ? 'sm' : 'md'} showText={true} />
            </div>

            {/* Right Action Icons & Utilities */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isScrolled ? '8px' : '12px' }}>
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                style={{
                  color: '#ffffff',
                  padding: '6px',
                  borderRadius: '50%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffd312')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                aria-label="Search items"
                title="Search Archive"
              >
                <Search size={isScrolled ? 17 : 19} />
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                style={{
                  position: 'relative',
                  color: '#ffffff',
                  padding: '6px',
                  borderRadius: '50%',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
                aria-label="View Wishlist"
                title="Wishlist"
              >
                <Heart size={isScrolled ? 17 : 19} />
                {wishlist.length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      backgroundColor: '#dc143c',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '14px',
                      height: '14px',
                      fontSize: '0.62rem',
                      fontWeight: '900',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffd312',
                  color: '#010000',
                  padding: isScrolled ? '6px 10px' : '6px 12px',
                  borderRadius: '9999px',
                  border: '1.5px solid #010000',
                  fontWeight: '900',
                  fontSize: '0.74rem',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(255,211,18,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label="View pre-order bag"
              >
                <ShoppingBag size={15} />
                <span>BAG</span>
                {cartItemCount > 0 && (
                  <span
                    style={{
                      backgroundColor: '#010000',
                      color: '#ffd312',
                      borderRadius: '9999px',
                      padding: '2px 6px',
                      fontSize: '0.68rem',
                      fontWeight: '900',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(1, 1, 0, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '85%',
              maxWidth: '360px',
              backgroundColor: '#050508',
              borderRight: '2px solid #ffd312',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 110,
              boxShadow: '10px 0 40px rgba(0,0,0,0.9)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <AnimatedLogo size="sm" showText={true} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: '#ffffff', background: 'none', border: 'none', padding: '6px', cursor: 'pointer' }}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  onClick={() => handleLinkClick('collection-section')}
                  style={{ textAlign: 'left', color: '#ffffff', fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  SHOP
                </button>

                <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleLinkClick(`category-${cat.id}`)}
                      style={{ textAlign: 'left', color: '#ffd312', fontSize: '0.85rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      • {cat.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleLinkClick('collection-section')}
                  style={{ textAlign: 'left', color: '#ffffff', fontSize: '1.1rem', fontWeight: '900', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  COLLECTION
                </button>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '900', color: '#ffd312', letterSpacing: '0.1em' }}>MORE</div>
                  <button
                    onClick={() => handleLinkClick('editorial-section')}
                    style={{ textAlign: 'left', color: '#dcdce6', fontSize: '0.95rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    About
                  </button>
                  <button
                    onClick={() => handleLinkClick('faq-section')}
                    style={{ textAlign: 'left', color: '#dcdce6', fontSize: '0.95rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    FAQ
                  </button>
                  <button
                    onClick={() => handleLinkClick('contact-section')}
                    style={{ textAlign: 'left', color: '#dcdce6', fontSize: '0.95rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <div style={{ fontSize: '0.74rem', color: '#8c8c9e', marginBottom: '8px' }}>
                PAY CASH ON ARRIVAL • 100% COD
              </div>
              <div style={{ fontSize: '0.78rem', color: '#ffd312', fontWeight: '900' }}>
                SΨGIL ARCHIVE • VOLUME IX
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
