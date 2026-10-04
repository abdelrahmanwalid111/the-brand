import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES, PRESETS } from '../data/storeData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [preset, setPreset] = useState('cyber');
  const [currency, setCurrency] = useState('EGP');

  // Dynamic Products Catalog with LocalStorage Persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('sygil_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading products from localStorage', e);
    }
    return PRODUCTS;
  });

  // Save products whenever changed
  useEffect(() => {
    try {
      localStorage.setItem('sygil_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving products to localStorage', e);
    }
  }, [products]);

  // Helper to detect dashboard route in path or hash
  const isDashboardRoute = () => {
    try {
      const path = (window.location.pathname || '').replace(/\/+$/, '');
      const hash = (window.location.hash || '').replace(/\/+$/, '');
      return (
        path === '/dashboard' ||
        path.endsWith('/dashboard') ||
        hash === '#dashboard' ||
        hash === '#/dashboard'
      );
    } catch {
      return false;
    }
  };

  // Current View: 'home' | 'shop' | 'dashboard'
  const [currentView, setCurrentView] = useState(() => {
    try {
      if (isDashboardRoute()) {
        return 'dashboard';
      }
      const hash = window.location.hash;
      if (hash === '#shop') return 'shop';
    } catch {}
    return 'home';
  });

  // Selected Product for Dedicated Product Page
  const [selectedProduct, setSelectedProduct] = useState(() => {
    try {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = PRODUCTS.find((p) => p.id === prodId);
        if (found) return found;
      }
    } catch {}
    return null;
  });

  // Quick Add / Edit Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const openAddProductModal = (productToEdit = null) => {
    setEditingProduct(productToEdit);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Active Shop Category Filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Cart (Pre-Order Bag)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sygil_cart');
      return saved ? JSON.parse(saved) : [
        {
          cartId: 'rad-01-M-Pitch Black / Cyber Gold',
          productId: 'rad-01',
          title: 'SΨGIL 650GSM OCCULT HEAVYWEIGHT ZIP HOODIE',
          price: 3600,
          image: '/assets/sygil_hoodie_darkritual.jpg',
          color: 'Pitch Black / Cyber Gold',
          size: 'M',
          quantity: 1,
          isPreOrder: true
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sygil_wishlist');
      return saved ? JSON.parse(saved) : ['rad-02', 'rad-05'];
    } catch {
      return ['rad-02'];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState({ code: '', discount: 0 });
  const [orderNote, setOrderNote] = useState('');

  // Toast notification
  const [toast, setToast] = useState(null);

  // Listen to hash change & popstate for back/forward browser buttons
  useEffect(() => {
    const handleNavigation = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (isDashboardRoute()) {
        setSelectedProduct(null);
        setCurrentView('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash && hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = products.find((p) => p.id === prodId) || PRODUCTS.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#shop' || hash === '#collection-section') {
        setSelectedProduct(null);
        setCurrentView('shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash || hash === '#' || hash === '#home') {
        setSelectedProduct(null);
        setCurrentView('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sygil_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('sygil_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync body class to active preset
  useEffect(() => {
    document.body.className = `theme-${preset}`;
  }, [preset]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const formatPrice = (amount) => {
    const curr = CURRENCIES[currency] || CURRENCIES.EGP;
    const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
    const converted = num * (curr?.rate || 1);
    if (currency === 'EGP') {
      return `${Math.round(converted).toLocaleString('en-US')} EGP`;
    }
    return `${curr.symbol}${Math.round(converted).toLocaleString('en-US')}`;
  };

  const openProductPage = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    setQuickViewProduct(null);
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    try {
      window.location.hash = `product-${product.id}`;
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductPage = () => {
    setSelectedProduct(null);
    try {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openShopPage = (category = null) => {
    setSelectedProduct(null);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsSizeGuideOpen(false);
    setIsNewsletterOpen(false);
    setIsCheckoutOpen(false);
    if (typeof category === 'string' && category.trim()) {
      setActiveCategory(category.trim());
    } else {
      setActiveCategory('all');
    }
    setCurrentView('shop');
    try {
      if (window.location.pathname === '/dashboard') {
        window.history.pushState({}, document.title, '/#shop');
      } else {
        window.location.hash = 'shop';
      }
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openHomePage = () => {
    setSelectedProduct(null);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsSizeGuideOpen(false);
    setIsNewsletterOpen(false);
    setIsCheckoutOpen(false);
    setCurrentView('home');
    try {
      if (window.location.pathname === '/dashboard') {
        window.history.pushState({}, document.title, '/');
      } else {
        window.history.pushState({}, document.title, window.location.pathname + window.location.search);
      }
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDashboardPage = () => {
    setSelectedProduct(null);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsWishlistOpen(false);
    setIsSizeGuideOpen(false);
    setIsNewsletterOpen(false);
    setIsCheckoutOpen(false);
    setCurrentView('dashboard');
    try {
      if (window.location.pathname !== '/dashboard') {
        window.history.pushState({}, document.title, '/dashboard');
      }
    } catch {
      window.location.hash = 'dashboard';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Catalog CRUD Handlers
  const addProduct = (newProduct) => {
    const productWithId = {
      ...newProduct,
      id: newProduct.id || `prod-${Date.now()}`,
      images: Array.isArray(newProduct.images) && newProduct.images.length > 0
        ? newProduct.images
        : [newProduct.image || '/assets/fallen_angel_tee.jpg'],
      price: Number(newProduct.price) || 0,
      compareAtPrice: Number(newProduct.compareAtPrice) || (Number(newProduct.price) ? Math.round(Number(newProduct.price) * 1.35) : 0),
      sizes: newProduct.sizes && newProduct.sizes.length > 0 ? newProduct.sizes : ['S', 'M', 'L', 'XL'],
      colors: newProduct.colors && newProduct.colors.length > 0 ? newProduct.colors : [
        { name: 'Pitch Black', hex: '#000000', img: (newProduct.images && newProduct.images[0]) || '/assets/fallen_angel_tee.jpg' }
      ],
      stockLeft: Number(newProduct.stockLeft) || 15,
      isPreOrder: true
    };

    setProducts((prev) => [productWithId, ...prev]);
    showToast(`Piece "${productWithId.title}" added to catalog!`, 'success');
    return productWithId;
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.price !== undefined) updated.price = Number(updatedFields.price);
          if (updatedFields.compareAtPrice !== undefined) updated.compareAtPrice = Number(updatedFields.compareAtPrice);
          if (updatedFields.stockLeft !== undefined) updated.stockLeft = Number(updatedFields.stockLeft);
          return updated;
        }
        return p;
      })
    );
    showToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    setCart((prev) => prev.filter((item) => item.productId !== productId && item.id !== productId));
    showToast('Piece removed from catalog', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(PRODUCTS);
    try {
      localStorage.removeItem('sygil_products');
    } catch {}
    showToast('Catalog restored to default archive', 'info');
  };

  const addToCart = (product, options = {}) => {
    const chosenSize = options.size || (product.sizes ? product.sizes[0] : 'OS');
    const chosenColor = options.color || (product.colors ? product.colors[0].name : 'Default');
    const chosenImage = options.image || (product.images ? product.images[0] : '/assets/leather_tee.jpg');
    const quantity = options.quantity || 1;
    const cartId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartId === cartId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          cartId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: chosenImage,
          color: chosenColor,
          size: chosenSize,
          quantity,
          isPreOrder: true
        }
      ];
    });

    showToast(`Reserved "${product.title}" (${chosenSize}) for Pre-Order (Cash on Delivery)`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
    showToast('Item removed from Pre-Order Bag', 'info');
  };

  const updateQuantity = (cartId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const isSaved = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      const title = product ? product.title : 'Grail';
      if (isSaved) {
        showToast(`Removed "${title}" from Wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${title}" to Wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const applyPromo = (codeStr) => {
    const code = codeStr.trim().toUpperCase();
    if (code === 'SYGIL15' || code === 'GENZ15' || code === 'RADIAN15') {
      setAppliedPromo({ code: 'SYGIL15', discount: 0.15 });
      showToast('15% Pre-Order Privilege Applied!', 'success');
      return true;
    } else if (code === 'SYGIL20' || code === 'GENZ20' || code === 'CAPSULE20') {
      setAppliedPromo({ code: 'SYGIL20', discount: 0.20 });
      showToast('20% 3-Piece Capsule Privilege Applied!', 'success');
      return true;
    } else if (code === 'VIP50') {
      setAppliedPromo({ code: 'VIP50', discount: 0.50 });
      showToast('50% Private Salon Privilege Applied!', 'success');
      return true;
    } else {
      showToast('Invalid or expired pre-order code', 'error');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo({ code: '', discount: 0 });
    showToast('Code removed', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = cartSubtotal * appliedPromo.discount;
  const freeShippingThreshold = 3000;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const shippingFee = cartSubtotal === 0 || isFreeShipping ? 0 : 250;
  const estimatedTax = 0; // Included
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        preset,
        setPreset,
        activePresetObj: PRESETS.find((p) => p.id === preset) || PRESETS[0],
        currency,
        setCurrency,
        formatPrice,
        currentView,
        setCurrentView,
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        openDashboardPage,
        isProductModalOpen,
        openAddProductModal,
        closeProductModal,
        editingProduct,
        activeCategory,
        setActiveCategory,
        openShopPage,
        openHomePage,
        selectedProduct,
        openProductPage,
        closeProductPage,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        appliedPromo,
        applyPromo,
        removePromo,
        isFreeShipping,
        amountToFreeShipping,
        freeShippingProgress,
        freeShippingThreshold,
        shippingFee,
        estimatedTax,
        finalTotal,
        cartItemCount,
        orderNote,
        setOrderNote,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isNewsletterOpen,
        setIsNewsletterOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
