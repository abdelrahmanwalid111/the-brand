import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeTicker from './components/MarqueeTicker';
import CategoryRails from './components/CategoryRails';
import ShopPage from './components/ShopPage';
import FeaturedGrailsSection from './components/FeaturedGrailsSection';
import ShopTheLookHotspots from './components/ShopTheLookHotspots';
import EditorialStorySection from './components/EditorialStorySection';
import CommunitySection from './components/CommunitySection';
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
  const { setIsNewsletterOpen, selectedProduct, closeProductPage, currentView, openShopPage, openHomePage, activeCategory } = useStore();
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
  }, [selectedProduct, currentView]);

  const scrollToSection = (sectionId) => {
    if (selectedProduct) {
      closeProductPage();
    }
    if (sectionId === 'shop' || sectionId === 'collection-section') {
      openShopPage();
      return;
    }
    if (sectionId === 'home') {
      openHomePage();
      return;
    }
    if (sectionId.startsWith('category-')) {
      const catId = sectionId.replace('category-', '');
      openShopPage(catId);
      return;
    }
    if (currentView === 'shop') {
      openHomePage();
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Occult Marquee Ribbon (Black & Crimson, Above Top Navbar) */}
      <MarqueeTicker />

      {/* 2. Floating Frosted Pill Header */}
      <Navbar onNavigateSection={scrollToSection} />

      {/* Main Content Area: PDP or Dedicated Shop Page or Full Homepage */}
      {selectedProduct ? (
        <main style={{ flex: 1 }}>
          <ProductPage />
        </main>
      ) : currentView === 'shop' ? (
        <main style={{ flex: 1 }}>
          <ShopPage onNavigateHome={openHomePage} />
        </main>
      ) : (
        <main style={{ flex: 1 }}>
          {/* 3. Runway Campaign Hero Carousel */}
          <HeroSection
            onShopClick={() => openShopPage()}
          />

          {/* 4. Quick Category Selector Rails */}
          <CategoryRails
            activeCategory={activeCategory}
            onSelectCategory={(catId) => {
              openShopPage(catId);
            }}
          />

          {/* 5. Curated 3-Piece Showcase (Replacing full Shop catalog on Homepage) */}
          <FeaturedGrailsSection onExploreShop={openShopPage} />

          {/* 6. Interactive Radar Hotspots */}
          <ShopTheLookHotspots />

          {/* 7. The Sygil Story ("MORE THAN JUST CLOTHES") */}
          <EditorialStorySection
            onExploreStory={() => openShopPage()}
          />

          {/* 10. Stay In The Loop (Figma Community Newsletter Strip) */}
          <CommunitySection />

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
            backgroundColor: '#dc143c',
            color: '#ffffff',
            fontSize: 'clamp(0.68rem, 1.8vw, 0.78rem)',
            fontWeight: '900',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            border: '2px solid #dc143c',
            boxShadow: '3px 3px 0px #d4af37',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff2a55';
            e.currentTarget.style.boxShadow = '4px 4px 0px #ffd312, 0 0 16px rgba(220, 20, 60, 0.6)';
            e.currentTarget.style.transform = 'translate(-2px, -2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dc143c';
            e.currentTarget.style.boxShadow = '3px 3px 0px #d4af37';
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

