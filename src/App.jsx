import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeTicker from './components/MarqueeTicker';
import CategoryRails from './components/CategoryRails';
import ProductGrid from './components/ProductGrid';
import FeaturedSpotlight from './components/FeaturedSpotlight';
import ShopTheLookHotspots from './components/ShopTheLookHotspots';
import CapsuleBundleBuilder from './components/CapsuleBundleBuilder';
import EditorialStorySection from './components/EditorialStorySection';
import PressWallAndReviews from './components/PressWallAndReviews';
import BrandValuesMatrix from './components/BrandValuesMatrix';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';

import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchOverlay from './components/SearchOverlay';
import WishlistDrawer from './components/WishlistDrawer';
import SizeGuideModal from './components/SizeGuideModal';
import NewsletterModal from './components/NewsletterModal';
import CheckoutModal from './components/CheckoutModal';
import ToastNotification from './components/ToastNotification';

function StoreMain() {
  const { setIsNewsletterOpen, selectedProduct, closeProductPage } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFloatingDiscount, setShowFloatingDiscount] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingDiscount(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger title red line draw animation once per title when loaded or scrolled into view
  useEffect(() => {
    const lines = document.querySelectorAll('.title-red-line');
    if (!('IntersectionObserver' in window)) {
      lines.forEach((l) => l.classList.add('animate-drawn'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-drawn');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    lines.forEach((l) => observer.observe(l));
    return () => observer.disconnect();
  }, [selectedProduct]);

  const scrollToSection = (sectionId) => {
    if (selectedProduct) {
      closeProductPage();
    }
    setTimeout(() => {
      if (sectionId.startsWith('category-')) {
        const catId = sectionId.replace('category-', '');
        setActiveCategory(catId);
        const el = document.getElementById('collection-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, selectedProduct ? 60 : 0);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Occult Marquee Ribbon (Black & Crimson, Above Top Navbar) */}
      <MarqueeTicker />

      {/* 2. Floating Frosted Pill Header */}
      <Navbar onNavigateSection={scrollToSection} />

      {/* Main Content Area: PDP or Full Homepage */}
      {selectedProduct ? (
        <main style={{ flex: 1 }}>
          <ProductPage />
        </main>
      ) : (
        <main style={{ flex: 1 }}>
          {/* 3. Runway Campaign Hero Carousel */}
          <HeroSection
            onShopClick={() => scrollToSection('collection-section')}
          />

          {/* 4. Quick Category Selector Rails */}
          <CategoryRails
            activeCategory={activeCategory}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              scrollToSection('collection-section');
            }}
          />

          {/* 6. Filterable & Sortable Signature Product Catalog */}
          <ProductGrid
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* 7. Hero Product Spotlight Showcase */}
          <FeaturedSpotlight />

          {/* 8. Interactive "Shop The Look" Radar Hotspots */}
          <ShopTheLookHotspots />

          {/* 9. Curate Your 3-Piece Capsule Builder (-20%) */}
          <CapsuleBundleBuilder />

          {/* 10. Florentine Atelier Editorial Story */}
          <EditorialStorySection
            onExploreStory={() => scrollToSection('collection-section')}
          />

          {/* 11. Press Quotes & Editorial Accolades */}
          <PressWallAndReviews />

          {/* 12. Brand Pillars Matrix & FAQs */}
          <BrandValuesMatrix />
        </main>
      )}

      {/* 13. Comprehensive Luxury Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Modals, Drawers & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchOverlay />
      <WishlistDrawer />
      <SizeGuideModal />
      <NewsletterModal />
      <CheckoutModal />
      <ToastNotification />

      {/* Floating Privilege Trigger Pill (Bottom Left, shows only after scrolling past hero) */}
      <div
        className="desktop-only"
        style={{
          position: 'fixed',
          bottom: 'clamp(14px, 2.5vw, 28px)',
          left: 'clamp(14px, 2.5vw, 28px)',
          zIndex: 35,
          opacity: showFloatingDiscount ? 1 : 0,
          pointerEvents: showFloatingDiscount ? 'auto' : 'none',
          transform: showFloatingDiscount ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button
          onClick={() => setIsNewsletterOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: 'clamp(7px, 1.5vw, 10px) clamp(12px, 2.5vw, 18px)',
            borderRadius: '9999px',
            backgroundColor: '#ffd312',
            color: '#010000',
            fontSize: 'clamp(0.68rem, 1.8vw, 0.78rem)',
            fontWeight: '900',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            border: '2px solid #010000',
            boxShadow: '3px 3px 0px #ffffff',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.boxShadow = '4px 4px 0px #dc143c';
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffd312';
            e.currentTarget.style.boxShadow = '3px 3px 0px #ffffff';
            e.currentTarget.style.transform = 'translate(0, 0)';
          }}
        >
          <span>CLAIM 15% OFF</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreMain />
    </StoreProvider>
  );
}

