import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CURRENCIES, PRESETS } from '../data/storeData';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [preset, setPreset] = useState('cyber');
  const [currency, setCurrency] = useState('EGP');

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

  // Cart (Pre-Order Bag)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sygil_cart');
      return saved ? JSON.parse(saved) : [
        {
          cartId: 'rad-01-EU 48-Pitch Black / Cyber Gold',
          productId: 'rad-01',
          title: 'SΨGIL 650GSM OCCULT HEAVYWEIGHT ZIP HOODIE',
          price: 3600,
          image: '/assets/genz_hero_yellow.jpg',
          color: 'Pitch Black / Cyber Gold',
          size: 'EU 48',
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

  // Listen to hash change for back/forward browser buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = PRODUCTS.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (!hash || hash === '#' || hash === '#collection-section' || hash === '#lookbook-section' || hash === '#editorial-section' || hash === '#faq-section') {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
