import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/storeData';
import AnimatedLogo from './AnimatedLogo';

export default function Navbar({ onNavigateSection }) {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
    openHomePage
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  
  // Radian-style Mega Menu States
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState('shop'); // 'shop' | 'material' | 'collection'
  const [inspirationIndex, setInspirationIndex] = useState(0);
  const [navTopOffset, setNavTopOffset] = useState(56);
  const headerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  useEffect(() => {
    const updateNavOffset = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setNavTopOffset(Math.round(rect.bottom));
      }
    };
    updateNavOffset();
    window.addEventListener('resize', updateNavOffset);
    window.addEventListener('scroll', updateNavOffset, { passive: true });
    return () => {
      window.removeEventListener('resize', updateNavOffset);
      window.removeEventListener('scroll', updateNavOffset);
    };
  }, [isScrolled]);

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

  const handleOpenMega = (tab) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setNavTopOffset(Math.round(rect.bottom));
    }
    setActiveMegaTab(tab);
    setMegaMenuOpen(true);
    setMoreDropdownOpen(false);
  };

  const handleScheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 450);
  };

  const handleCancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleLinkClick = (sectionId) => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
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

  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setMoreDropdownOpen(false);
    if (onNavigateSection) {
      onNavigateSection('home');
    } else if (openHomePage) {
      openHomePage();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Radian Lookbook Inspiration Cards
  const INSPIRATION_PIECES = [
    {
      title: 'DARK RITUAL 650GSM',
      category: 'HOODIES',
      image: '/assets/sygil_hoodie_darkritual.jpg',
      tag: 'BATCH 01 RUNWAY',
      target: 'category-hoodies'
    },
    {
      title: 'LAMBSKIN MOTO TOP',
      category: 'JACKETS',
      image: '/assets/sygil_jacket_moto.jpg',
      tag: 'MATTE ITALIAN LEATHER',
      target: 'category-jackets'
    },
    {
      title: 'SACRED GEOMETRY TEE',
      category: 'T-SHIRTS',
      image: '/assets/sygil_tshirt_sigil.jpg',
      tag: 'SILVER STAR MANDALA',
      target: 'category-t-shirts'
    },
    {
      title: 'TACTICAL WIDE-LEG',
      category: 'PANTS',
      image: '/assets/sygil_pants_cargo.jpg',
      tag: 'ACID WASHED DENIM',
      target: 'category-pants'
    }
  ];

  // Radian Multi-Column Shop Categories
  const SHOP_COLUMNS = [
    {
      title: 'HOODIES & FLEECE',
      catId: 'hoodies',
      items: [
        { name: 'Dark Ritual 650GSM Hoodie', isNew: true },
        { name: 'Sumerian Sleeve Rune Hoodie' },
        { name: 'Occult Double-Ply Heavy Fleece' },
        { name: 'Acid-Wash Box Cut Pullover' }
      ]
    },
    {
      title: 'T-SHIRTS & TOPS',
      catId: 't-shirts',
      items: [
        { name: 'Sacred Geometry Box-Cut Tee', isNew: true },
        { name: 'Occult Sumerian Mandala Tee' },
        { name: 'Raw Cut Drop-Shoulder Top' },
        { name: 'Mandarin Stand-Collar Layer' }
      ]
    },
    {
      title: 'JACKETS & LEATHER',
      catId: 'jackets',
      items: [
        { name: 'Lambskin Moto Top Jacket', isNew: true },
        { name: 'Cuneiform Denim Outerwear' },
        { name: 'Atelier Bonded Trench Coat' },
        { name: 'Cropped Industrial Moto' }
      ]
    },
    {
      title: 'PANTS & CARGOS',
      catId: 'pants',
      items: [
        { name: 'Distressed Wide-Leg Cargo Pants', isNew: true },
        { name: 'Occult Tactical Buckled Trousers' },
        { name: 'Runic Heavy Fleece Sweatpants' },
        { name: 'Raw Edged Sumerian Track Pants' }
      ]
    }
  ];

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={handleCancelClose}
        onMouseLeave={handleScheduleClose}
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: isScrolled ? '10px 16px 0' : '0',
          transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div
          className={`nav-shell ${isScrolled ? 'scrolled' : ''}`}
          onMouseEnter={handleCancelClose}
          style={{
            margin: '0 auto',
            pointerEvents: 'auto'
          }}
        >
          <nav
            onMouseEnter={handleCancelClose}
            className={isScrolled ? 'glass-pill' : ''}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: isScrolled ? '8px clamp(12px, 2.5vw, 24px)' : '12px clamp(12px, 3.5vw, 56px)',
              borderRadius: isScrolled ? '9999px' : '0',
              borderTop: isScrolled ? '1.5px solid #dc143c' : 'none',
              borderLeft: isScrolled ? '1.5px solid #dc143c' : 'none',
              borderRight: isScrolled ? '1.5px solid #dc143c' : 'none',
              borderBottom: isScrolled ? '1.5px solid #dc143c' : '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
              boxShadow: isScrolled
                ? '0 12px 35px rgba(0, 0, 0, 0.95), 0 0 25px rgba(220, 20, 60, 0.35)'
                : 'none',
              backdropFilter: isScrolled ? 'blur(18px)' : 'none',
              WebkitBackdropFilter: isScrolled ? 'blur(18px)' : 'none',
              transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.35s ease, border 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease'
            }}
          >
            {/* Left Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isScrolled ? '10px' : '16px' }}>
              <button
                onClick={() => {
                  if (megaMenuOpen) {
                    setMegaMenuOpen(false);
                  } else {
                    setMobileMenuOpen(!mobileMenuOpen);
                  }
                }}
                className="mobile-burger-btn mobile-only"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                style={{
                  color: '#ffffff',
                  padding: '8px',
                  minWidth: '40px',
                  minHeight: '40px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {mobileMenuOpen || megaMenuOpen ? <X size={22} style={{ color: '#dc143c' }} /> : <Menu size={22} />}
              </button>

              <div className="desktop-links desktop-only" style={{ alignItems: 'center', gap: isScrolled ? '14px' : '22px' }}>
                {/* SHOP Link (Radian Dropdown Trigger) */}
                <div
                  onMouseEnter={() => handleOpenMega('shop')}
                  onMouseLeave={handleScheduleClose}
                  style={{ position: 'relative' }}
                >
                  <button
                    onClick={() => handleLinkClick('collection-section')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: megaMenuOpen && activeMegaTab === 'shop' ? '#dc143c' : '#ffffff',
                      fontSize: isScrolled ? '0.75rem' : '0.8rem',
                      fontWeight: '800',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 0',
                      borderBottom: megaMenuOpen && activeMegaTab === 'shop' ? '2px solid #dc143c' : '2px solid transparent',
                      transition: 'color 0.2s, border-bottom 0.2s',
                      background: 'none',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
                    onMouseLeave={(e) => {
                      if (!megaMenuOpen || activeMegaTab !== 'shop') e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <span>SHOP</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transform: megaMenuOpen && activeMegaTab === 'shop' ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>
                </div>

                {/* COLLECTION Link (Radian Dropdown Trigger) */}
                <div
                  onMouseEnter={() => handleOpenMega('collection')}
                  onMouseLeave={handleScheduleClose}
                  style={{ position: 'relative' }}
                >
                  <button
                    onClick={() => handleLinkClick('collection-section')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: megaMenuOpen && activeMegaTab === 'collection' ? '#dc143c' : '#ffffff',
                      fontSize: isScrolled ? '0.75rem' : '0.8rem',
                      fontWeight: '800',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '4px 0',
                      borderBottom: megaMenuOpen && activeMegaTab === 'collection' ? '2px solid #dc143c' : '2px solid transparent',
                      transition: 'color 0.2s, border-bottom 0.2s',
                      background: 'none',
                      borderTop: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
                    onMouseLeave={(e) => {
                      if (!megaMenuOpen || activeMegaTab !== 'collection') e.currentTarget.style.color = '#ffffff';
                    }}
                  >
                    <span>COLLECTION</span>
                    <ChevronDown
                      size={14}
                      style={{
                        transform: megaMenuOpen && activeMegaTab === 'collection' ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>
                </div>

                {/* More Dropdown Menu (About, FAQ, Contact) */}
                <div
                  style={{ position: 'relative' }}
                  onMouseEnter={() => { setMoreDropdownOpen(true); setMegaMenuOpen(false); }}
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: moreDropdownOpen ? '#dc143c' : '#ffffff',
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
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
                    onMouseLeave={(e) => {
                      if (!moreDropdownOpen) e.currentTarget.style.color = '#ffffff';
                    }}
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
                          border: '1.5px solid #dc143c',
                          boxShadow: '0 15px 40px rgba(0,0,0,0.9), 0 0 20px rgba(220,20,60,0.3)',
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
                            e.currentTarget.style.backgroundColor = 'rgba(220, 20, 60, 0.15)';
                            e.currentTarget.style.color = '#dc143c';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>About</span>
                          <span style={{ fontSize: '0.65rem', color: '#ffd312', opacity: 0.8 }}>///</span>
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
                            e.currentTarget.style.backgroundColor = 'rgba(220, 20, 60, 0.15)';
                            e.currentTarget.style.color = '#dc143c';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>FAQ</span>
                          <span style={{ fontSize: '0.65rem', color: '#ffd312', opacity: 0.8 }}>///</span>
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
                            e.currentTarget.style.backgroundColor = 'rgba(220, 20, 60, 0.15)';
                            e.currentTarget.style.color = '#dc143c';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ffffff';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <span>Contact</span>
                          <span style={{ fontSize: '0.65rem', color: '#ffd312', opacity: 0.8 }}>///</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center Brand Logo */}
            <div
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}
              onClick={handleLogoClick}
              role="button"
              tabIndex={0}
              aria-label="Return to Homepage"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleLogoClick();
              }}
            >
              <AnimatedLogo size={isScrolled ? 'sm' : 'md'} showText={true} onClick={handleLogoClick} />
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
                onMouseEnter={(e) => (e.currentTarget.style.color = '#dc143c')}
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

              {/* Cart Button - Red Primary with Gold Badge */}
              <button
                onClick={() => setIsCartOpen(true)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#dc143c',
                  color: '#ffffff',
                  padding: isScrolled ? '6px 12px' : '6px 14px',
                  borderRadius: '9999px',
                  border: '1.5px solid #dc143c',
                  boxShadow: '0 0 16px rgba(220, 20, 60, 0.45)',
                  fontWeight: '900',
                  fontSize: '0.74rem',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = '#ff2a55';
                  e.currentTarget.style.boxShadow = '0 0 22px rgba(220,20,60,0.7), 0 0 10px #ffd312';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = '#dc143c';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(220, 20, 60, 0.45)';
                }}
                aria-label="View pre-order bag"
              >
                <ShoppingBag size={16} />
                <span className="desktop-only" style={{ display: 'inline' }}>BAG</span>
                {cartItemCount > 0 && (
                  <span
                    style={{
                      backgroundColor: '#d4af37',
                      color: '#000000',
                      borderRadius: '9999px',
                      padding: '2px 7px',
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

      {/* =========================================================================
          RADIAN-STYLE EXPANSIVE MEGA MENU OVERLAY (SLIDE-DOWN CURTAIN ANIMATION)
          ========================================================================= */}
      {megaMenuOpen && (
        <div
          onMouseEnter={handleCancelClose}
          onMouseLeave={handleScheduleClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 48,
            pointerEvents: 'auto'
          }}
        >
          {/* Dimmed Frosted Backdrop */}
          <div
            className="radian-backdrop-fade"
            onClick={() => setMegaMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.72)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 1
            }}
          />

          {/* Sliding Panel with Radian animation */}
          <div
            className="radian-mega-overlay"
            onMouseEnter={handleCancelClose}
            onMouseLeave={handleScheduleClose}
            style={{
              position: 'relative',
              zIndex: 2,
              marginTop: `${navTopOffset}px`,
              backgroundColor: 'rgba(3, 3, 5, 0.98)',
              borderBottom: '2px solid #dc143c',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.98), 0 0 35px rgba(220, 20, 60, 0.35)',
              maxHeight: `calc(100vh - ${navTopOffset}px)`,
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '36px clamp(20px, 3.8vw, 64px)',
                display: 'grid',
                gridTemplateColumns: 'minmax(280px, 32%) 1fr',
                gap: 'clamp(28px, 4vw, 56px)'
              }}
            >
              {/* Left Column: High-Impact Typography & Inspiration Carousel */}
              <div
                style={{
                  borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingRight: 'clamp(20px, 3vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  {/* Primary Navigation Headings */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    <button
                      onClick={() => handleLinkClick('collection-section')}
                      onMouseEnter={() => setActiveMegaTab('shop')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '4px 0'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                          fontWeight: '900',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-heading)',
                          color: activeMegaTab === 'shop' ? '#ffffff' : 'rgba(255,255,255,0.4)',
                          borderBottom: activeMegaTab === 'shop' ? '2.5px solid #dc143c' : 'none',
                          paddingBottom: '2px',
                          transition: 'all 0.2s'
                        }}
                      >
                        SHOP
                      </span>
                      <span style={{ color: activeMegaTab === 'shop' ? '#dc143c' : 'transparent', fontSize: '1.2rem', fontWeight: '900' }}>
                        ›
                      </span>
                    </button>

                    <button
                      onClick={() => handleLinkClick('collection-section')}
                      onMouseEnter={() => setActiveMegaTab('material')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '4px 0'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                          fontWeight: '900',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-heading)',
                          color: activeMegaTab === 'material' ? '#ffffff' : 'rgba(255,255,255,0.4)',
                          borderBottom: activeMegaTab === 'material' ? '2.5px solid #dc143c' : 'none',
                          paddingBottom: '2px',
                          transition: 'all 0.2s'
                        }}
                      >
                        MATERIAL
                      </span>
                      <span style={{ color: activeMegaTab === 'material' ? '#dc143c' : 'transparent', fontSize: '1.2rem', fontWeight: '900' }}>
                        ›
                      </span>
                    </button>

                    <button
                      onClick={() => handleLinkClick('collection-section')}
                      onMouseEnter={() => setActiveMegaTab('collection')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '4px 0'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                          fontWeight: '900',
                          letterSpacing: '0.02em',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-heading)',
                          color: activeMegaTab === 'collection' ? '#ffffff' : 'rgba(255,255,255,0.4)',
                          borderBottom: activeMegaTab === 'collection' ? '2.5px solid #dc143c' : 'none',
                          paddingBottom: '2px',
                          transition: 'all 0.2s'
                        }}
                      >
                        ALL COLLECTIONS
                      </span>
                      <span style={{ color: activeMegaTab === 'collection' ? '#dc143c' : 'transparent', fontSize: '1.2rem', fontWeight: '900' }}>
                        ›
                      </span>
                    </button>
                  </div>

                  {/* Find Your Inspiration Carousel matching Radian */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: '900', letterSpacing: '0.12em', color: '#8c8c9e', textTransform: 'uppercase' }}>
                        FIND YOUR INSPIRATION
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => setInspirationIndex((prev) => (prev > 0 ? prev - 1 : INSPIRATION_PIECES.length - 2))}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffd312'; e.currentTarget.style.color = '#ffd312'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ffffff'; }}
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setInspirationIndex((prev) => (prev + 1) % (INSPIRATION_PIECES.length - 1))}
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffd312'; e.currentTarget.style.color = '#ffd312'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#ffffff'; }}
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* Lookbook cards row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      {INSPIRATION_PIECES.slice(inspirationIndex, inspirationIndex + 2).map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleLinkClick(item.target)}
                          style={{
                            borderRadius: '14px',
                            overflow: 'hidden',
                            backgroundColor: '#08080a',
                            border: '1px solid rgba(255,255,255,0.14)',
                            cursor: 'pointer',
                            position: 'relative',
                            aspectRatio: '3/4',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#ffd312';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,211,18,0.25)';
                            const img = e.currentTarget.querySelector('img');
                            if (img) img.style.transform = 'scale(1.08)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                            e.currentTarget.style.boxShadow = 'none';
                            const img = e.currentTarget.querySelector('img');
                            if (img) img.style.transform = 'scale(1)';
                          }}
                        >
                          <img
                            src={item.image}
                            alt=""
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              padding: '10px 12px',
                              background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)'
                            }}
                          >
                            <div style={{ fontSize: '0.62rem', color: '#ffd312', fontWeight: '900', letterSpacing: '0.08em' }}>{item.tag}</div>
                            <div style={{ fontSize: '0.74rem', color: '#ffffff', fontWeight: '900' }}>{item.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Left Bottom Auxiliary Information */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#8c8c9e' }}>
                  <div>
                    <div style={{ fontWeight: '800', color: '#ffffff', marginBottom: '2px' }}>Customer Care</div>
                    <div onClick={() => handleLinkClick('faq-section')} style={{ cursor: 'pointer', color: '#ffd312' }}>100% Cash On Delivery</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', color: '#ffffff', marginBottom: '2px' }}>Atelier</div>
                    <div onClick={() => handleLinkClick('editorial-section')} style={{ cursor: 'pointer', color: '#dcdce6' }}>Florence × Cairo</div>
                  </div>
                </div>
              </div>

              {/* Right Section: Multi-Column Detailed Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {activeMegaTab === 'shop' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(16px, 2.5vw, 32px)' }}>
                    {SHOP_COLUMNS.map((col, idx) => (
                      <div key={idx} className="radian-stagger-item" style={{ animationDelay: `${idx * 0.05}s` }}>
                        <div
                          onClick={() => handleLinkClick(`category-${col.catId}`)}
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: '900',
                            letterSpacing: '0.12em',
                            color: '#ffd312',
                            textTransform: 'uppercase',
                            marginBottom: '16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>{col.title}</span>
                          <span style={{ fontSize: '0.7rem' }}>→</span>
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '11px' }}>
                          {col.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <button
                                onClick={() => handleLinkClick(`category-${col.catId}`)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#dcdce6',
                                  fontSize: '0.78rem',
                                  fontWeight: '600',
                                  lineHeight: 1.35,
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  padding: 0,
                                  transition: 'all 0.18s ease',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '6px'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = '#ffffff';
                                  e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#dcdce6';
                                  e.currentTarget.style.transform = 'translateX(0)';
                                }}
                              >
                                <span>{item.name}</span>
                                {item.isNew && (
                                  <span style={{ fontSize: '0.58rem', fontWeight: '900', backgroundColor: '#dc143c', color: '#ffffff', padding: '1px 5px', borderRadius: '3px' }}>
                                    HOT
                                  </span>
                                )}
                                {item.isBundle && (
                                  <span style={{ fontSize: '0.58rem', fontWeight: '900', backgroundColor: '#ffd312', color: '#010000', padding: '1px 5px', borderRadius: '3px' }}>
                                    -20%
                                  </span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeMegaTab === 'material' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {[
                      { title: '650GSM ITALIAN FLEECE', subtitle: 'Biella combed loopback cotton, heavy enzyme acid-wash with zero pilling guarantee.', tag: 'HEAVYWEIGHT' },
                      { title: 'MATTE FLORENTINE LAMBSKIN', subtitle: 'Hand-graded full-grain leather, supple hand-feel with asymmetric Excella hardware.', tag: '100% LEATHER' },
                      { title: 'SUMERIAN RAW SELVEDGE DENIM', subtitle: 'Rigid architectural structure with cuneiform laser embroidery on seams.', tag: 'DENIM CRAFT' },
                      { title: 'VIRGIN CASHMERE RIBBING', subtitle: '3-inch high-tension cuffs and contoured collar that never stretches out.', tag: 'KNITWEAR' }
                    ].map((mat, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleLinkClick('collection-section')}
                        style={{
                          padding: '18px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffd312'; e.currentTarget.style.backgroundColor = 'rgba(255,211,18,0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
                      >
                        <span style={{ fontSize: '0.62rem', fontWeight: '900', color: '#ffd312', letterSpacing: '0.08em' }}>{mat.tag}</span>
                        <div style={{ fontSize: '0.88rem', fontWeight: '900', color: '#ffffff', margin: '4px 0 6px' }}>{mat.title}</div>
                        <p style={{ fontSize: '0.74rem', color: '#8c8c9e', lineHeight: 1.5, margin: 0 }}>{mat.subtitle}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeMegaTab === 'collection' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                    {[
                      { title: 'VOLUME IX (AUTUMN WINTER 2026)', count: '8 Signature Grails', desc: 'The flagship runway edition. Sumerian occult geometries meet cyberpunk brutalism.', tag: 'NOW LIVE' },
                      { title: 'THE RITUAL WARDROBE', count: '66 Pieces Allocated', desc: 'Strict allocation run. Hand-numbered certificate with doorstep courier handover.', tag: 'LIMITED EDITION' },
                      { title: 'CYBERPUNK RUNWAY DROP', count: 'Strict 50 Allocations', desc: 'Limited edition industrial silhouettes crafted with matte hardware and raw selvedge textures.', tag: 'RUNWAY' },
                      { title: 'ATELIER PERMANENT ARCHIVE', count: 'Core Occult Essentials', desc: 'Signature heavyweight blank tees, rib knitwear, and modular combat cargo trousers.', tag: 'FOUNDATION' }
                    ].map((col, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleLinkClick('collection-section')}
                        style={{
                          padding: '18px',
                          borderRadius: '12px',
                          backgroundColor: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ffd312'; e.currentTarget.style.backgroundColor = 'rgba(255,211,18,0.05)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: '900', color: '#dc143c', letterSpacing: '0.08em' }}>{col.tag}</span>
                          <span style={{ fontSize: '0.68rem', color: '#ffd312', fontFamily: 'var(--font-mono)' }}>{col.count}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ffffff', marginBottom: '6px' }}>{col.title}</div>
                        <p style={{ fontSize: '0.74rem', color: '#8c8c9e', lineHeight: 1.5, margin: 0 }}>{col.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Right Bottom Privilege Banner */}
                <div
                  style={{
                    marginTop: '28px',
                    padding: '12px 18px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 211, 18, 0.05)',
                    border: '1px solid rgba(255, 211, 18, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', color: '#dcdce6' }}>
                    <strong style={{ color: '#ffd312' }}>Zero Upfront Payment:</strong> 100% Cash On Delivery. Inspect your sealed package with the courier on doorstep handover.
                  </div>
                  <button
                    onClick={() => handleLinkClick('collection-section')}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '900',
                      letterSpacing: '0.06em',
                      color: '#ffffff',
                      backgroundColor: '#dc143c',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      cursor: 'pointer',
                      border: 'none',
                      flexShrink: 0
                    }}
                  >
                    EXPLORE ALL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            className="mobile-drawer-anim"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '88%',
              maxWidth: '360px',
              backgroundColor: '#050508',
              borderRight: '2px solid #dc143c',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 110,
              boxShadow: '10px 0 40px rgba(0,0,0,0.95)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogoClick}
                  role="button"
                  tabIndex={0}
                  aria-label="Return to Homepage"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleLogoClick();
                  }}
                >
                  <AnimatedLogo size="sm" showText={true} onClick={handleLogoClick} />
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ color: '#dc143c', background: 'none', border: 'none', padding: '8px', cursor: 'pointer' }}
                  aria-label="Close navigation"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <button
                  onClick={() => handleLinkClick('collection-section')}
                  style={{ textAlign: 'left', color: '#ffffff', fontSize: '1.05rem', fontWeight: '900', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}
                >
                  SHOP ALL GRAILS
                </button>

                <div style={{ paddingLeft: '12px', display: 'flex', flexDirection: 'column', gap: '8px', borderLeft: '2px solid rgba(255,211,18,0.3)' }}>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleLinkClick(`category-${cat.id}`)}
                      style={{ textAlign: 'left', color: '#ffd312', fontSize: '0.85rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
                    >
                      • {cat.name}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleLinkClick('wardrobe-section')}
                  style={{ textAlign: 'left', color: '#ffffff', fontSize: '1.05rem', fontWeight: '900', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}
                >
                  THE WARDROBE
                </button>

                <button
                  onClick={() => handleLinkClick('lookbook-section')}
                  style={{ textAlign: 'left', color: '#dc143c', fontSize: '1.05rem', fontWeight: '900', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0' }}
                >
                  RUNWAY RADAR LOOKBOOK
                </button>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: '900', color: '#ffd312', letterSpacing: '0.12em' }}>EXPLORE &amp; ASSISTANCE</div>
                  <button
                    onClick={() => handleLinkClick('editorial-section')}
                    style={{ textAlign: 'left', color: '#dcdce6', fontSize: '0.9rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
                  >
                    About The Sygil Story
                  </button>
                  <button
                    onClick={() => handleLinkClick('faq-section')}
                    style={{ textAlign: 'left', color: '#dcdce6', fontSize: '0.9rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
                  >
                    FAQ &amp; Cash On Delivery
                  </button>
                  <button
                    onClick={() => handleLinkClick('contact-section')}
                    style={{ textAlign: 'left', color: '#dcdce6', fontSize: '0.9rem', fontWeight: '800', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
                  >
                    Client Concierge / Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Footer */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
              <div style={{ fontSize: '0.72rem', color: '#ffd312', fontWeight: '900', marginBottom: '4px' }}>
                PAY CASH ON DOORSTEP ARRIVAL
              </div>
              <div style={{ fontSize: '0.68rem', color: '#8c8c9e' }}>
                0 EGP Due Online • Inspect Sealed Box
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
