import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Check, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/storeData';

export const PRESET_GALLERY_ASSETS = [
  { name: 'Blood Ritual Hoodie', path: '/assets/blood_ritual_hoodie.jpg' },
  { name: 'Crimson Cross Tee', path: '/assets/crimson_cross_tee.jpg' },
  { name: 'Fallen Angel Tee', path: '/assets/fallen_angel_tee.jpg' },
  { name: 'SΨGIL Dark Ritual Hoodie', path: '/assets/sygil_hoodie_darkritual.jpg' },
  { name: 'SΨGIL Tactical Moto Jacket', path: '/assets/sygil_jacket_moto.jpg' },
  { name: 'SΨGIL Cargo Pants', path: '/assets/sygil_pants_cargo.jpg' },
  { name: 'Obsidian Trench Jacket', path: '/assets/obsidian_jacket.jpg' },
  { name: 'Shadow Tactical Cargos', path: '/assets/shadow_cargo_pants.jpg' },
  { name: 'Occult Star Pendant', path: '/assets/occult_star_necklace.jpg' },
  { name: 'Ornate Buckle Leather Belt', path: '/assets/ornate_buckle_belt.jpg' },
  { name: 'Runic Embroidered Cap', path: '/assets/runic_cap.jpg' },
  { name: 'Box-Cut Heavy Crewneck', path: '/assets/knit_sweater.jpg' },
  { name: 'Matte Leather Harness Tee', path: '/assets/leather_tee.jpg' },
  { name: 'Raven Shearling Trench', path: '/assets/raven_trench.jpg' },
  { name: 'Radian Leather Corset Top', path: '/assets/radian_corset_top.jpg' },
  { name: 'Radian Cropped Bomber', path: '/assets/radian_cropped_jacket.jpg' },
  { name: 'Sygil Signature Graphic Tee', path: '/assets/sygil_tshirt_sigil.jpg' },
  { name: 'Combat Leather Boots', path: '/assets/leather_boots.jpg' },
  { name: 'Archive Tactical Bag', path: '/assets/leather_bag.jpg' },
  { name: 'Occult Runway Model Portrait', path: '/assets/sygil_story_portrait.jpg' }
];

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductFormModal() {
  const {
    isProductModalOpen,
    closeProductModal,
    editingProduct,
    addProduct,
    updateProduct
  } = useStore();

  const isEditing = Boolean(editingProduct && editingProduct.id);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 't-shirts',
    categoryLabel: 'T-Shirts',
    price: 950,
    compareAtPrice: 1300,
    stockLeft: 16,
    isFeatured: false,
    image: '/assets/fallen_angel_tee.jpg',
    sizes: ['S', 'M', 'L', 'XL'],
    description: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        title: editingProduct.title || '',
        subtitle: editingProduct.subtitle || '',
        category: editingProduct.category || 't-shirts',
        categoryLabel: editingProduct.categoryLabel || 'T-Shirts',
        price: editingProduct.price || 0,
        compareAtPrice: editingProduct.compareAtPrice || 0,
        stockLeft: editingProduct.stockLeft !== undefined ? editingProduct.stockLeft : 15,
        isFeatured: Boolean(editingProduct.isFeatured),
        image: editingProduct.image || (editingProduct.images && editingProduct.images[0]) || '/assets/fallen_angel_tee.jpg',
        sizes: editingProduct.sizes && editingProduct.sizes.length > 0 ? [...editingProduct.sizes] : ['S', 'M', 'L', 'XL'],
        description: editingProduct.description || ''
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        category: 't-shirts',
        categoryLabel: 'T-Shirts',
        price: 950,
        compareAtPrice: 1300,
        stockLeft: 16,
        isFeatured: false,
        image: '/assets/fallen_angel_tee.jpg',
        sizes: ['S', 'M', 'L', 'XL'],
        description: ''
      });
    }
    setError('');
  }, [editingProduct, isProductModalOpen]);

  if (!isProductModalOpen) return null;

  const handleCategoryChange = (catId) => {
    const matched = CATEGORIES.find((c) => c.id === catId);
    setFormData((prev) => ({
      ...prev,
      category: catId,
      categoryLabel: matched ? matched.name : catId.toUpperCase()
    }));
  };

  const toggleSize = (size) => {
    setFormData((prev) => {
      const exists = prev.sizes.includes(size);
      const nextSizes = exists ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size];
      return { ...prev, sizes: nextSizes };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Product title is required.');
      return;
    }
    if (Number(formData.price) <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      compareAtPrice: Number(formData.compareAtPrice) || 0,
      stockLeft: Number(formData.stockLeft) || 0,
      images: [formData.image],
      colors: [{ name: 'Default', hex: '#000000', img: formData.image }]
    };

    if (isEditing) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    closeProductModal();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeProductModal();
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff'
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
              {isEditing ? 'Update the details and stock for this product.' : 'Fill out the details below to add a product to the catalog.'}
            </p>
          </div>
          <button
            onClick={closeProductModal}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Title & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Heavyweight Boxy T-Shirt"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
              Subtitle / Brief Note
            </label>
            <input
              type="text"
              placeholder="e.g. 100% Combed Heavy Cotton • Limited Run"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Pricing & Stock */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
                Price (EGP) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
                Compare At Price (EGP)
              </label>
              <input
                type="number"
                min="0"
                placeholder="Optional strike-through"
                value={formData.compareAtPrice}
                onChange={(e) => setFormData({ ...formData, compareAtPrice: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
                Inventory Stock Units
              </label>
              <input
                type="number"
                min="0"
                value={formData.stockLeft}
                onChange={(e) => setFormData({ ...formData, stockLeft: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Product Image */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
              Product Image URL / Path
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '8px',
                  backgroundColor: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {formData.image ? (
                  <img src={formData.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <ImageIcon size={20} color="#94a3b8" />
                )}
              </div>
              <input
                type="text"
                placeholder="/assets/fallen_angel_tee.jpg or any image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Quick Picker from Presets */}
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', display: 'block', marginBottom: '6px' }}>
                Or select an image from the library:
              </span>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  overflowX: 'auto',
                  paddingBottom: '6px'
                }}
              >
                {PRESET_GALLERY_ASSETS.map((asset) => {
                  const isSelected = formData.image === asset.path;
                  return (
                    <button
                      key={asset.path}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: asset.path })}
                      title={asset.name}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '6px',
                        border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        overflow: 'hidden',
                        padding: 0,
                        backgroundColor: '#f8fafc',
                        cursor: 'pointer',
                        flexShrink: 0,
                        position: 'relative'
                      }}
                    >
                      <img src={asset.path} alt={asset.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(37, 99, 235, 0.4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={14} color="#ffffff" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
              Available Sizes
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {STANDARD_SIZES.map((size) => {
                const isActive = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      border: isActive ? '1px solid #2563eb' : '1px solid #cbd5e1',
                      backgroundColor: isActive ? '#eff6ff' : '#ffffff',
                      color: isActive ? '#1d4ed8' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '6px', color: '#334155' }}>
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Detailed product description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Featured on Home Toggle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}
          >
            <div>
              <span style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: '#1e293b' }}>
                Feature on Homepage
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Showcase this piece in the curated 3-piece spotlight on the home page.
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563eb' }}
            />
          </div>

          {/* Footer Actions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #e2e8f0'
            }}
          >
            <button
              type="button"
              onClick={closeProductModal}
              style={{
                padding: '10px 18px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#475569',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                backgroundColor: '#0f172a',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.88rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
