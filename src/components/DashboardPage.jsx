import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/storeData';
import { PRESET_GALLERY_ASSETS } from './ProductFormModal';
import {
  Plus,
  Search,
  ArrowLeft,
  Edit2,
  Trash2,
  Star,
  Image as ImageIcon,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  Package,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage() {
  const {
    products,
    deleteProduct,
    updateProduct,
    resetProductsToDefault,
    openAddProductModal,
    openHomePage,
    openShopPage,
    formatPrice,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'assets' | 'backup'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'featured' | 'in_stock' | 'low_stock'
  const [copiedPath, setCopiedPath] = useState(null);
  const [jsonInput, setJsonInput] = useState('');

  // Metrics
  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.isFeatured).length;
  const totalUnits = products.reduce((acc, p) => acc + (Number(p.stockLeft) || 0), 0);
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.id && p.id.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    let matchesStatus = true;
    if (statusFilter === 'featured') {
      matchesStatus = Boolean(p.isFeatured);
    } else if (statusFilter === 'in_stock') {
      matchesStatus = (Number(p.stockLeft) || 0) > 0;
    } else if (statusFilter === 'low_stock') {
      matchesStatus = (Number(p.stockLeft) || 0) > 0 && (Number(p.stockLeft) || 0) <= 5;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleFeatured = (product) => {
    const nextVal = !product.isFeatured;
    updateProduct(product.id, { isFeatured: nextVal });
    showToast(
      nextVal
        ? `Added "${product.title}" to featured homepage list.`
        : `Removed "${product.title}" from featured homepage list.`,
      'info'
    );
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.title}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleCopyAsset = (path) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    showToast(`Copied path: ${path}`, 'success');
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const handleExportJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(products, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `products_backup_${Date.now()}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    showToast('Catalog exported to JSON file.', 'success');
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed) && parsed.length > 0) {
        localStorage.setItem('sygil_products', JSON.stringify(parsed));
        window.location.reload();
      } else {
        showToast('JSON must be an array of products.', 'error');
      }
    } catch {
      showToast('Invalid JSON format.', 'error');
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Reset catalog back to initial default items? All custom additions will be reverted.'
      )
    ) {
      resetProductsToDefault();
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        color: '#0f172a',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          position: 'sticky',
          top: 0,
          zIndex: 30
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Brand & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1rem'
              }}
            >
              <Package size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>
                  Products Dashboard
                </h1>
                <span
                  style={{
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  Simple View
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                Manage store inventory, prices, and product images
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={openHomePage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                backgroundColor: '#ffffff',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Store</span>
            </button>

            <button
              onClick={() => openAddProductModal()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
        {/* KPI Stats Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '16px 20px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Total Products</span>
              <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>
                {totalProducts}
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <Package size={20} />
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '16px 20px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Total Inventory Units</span>
              <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>
                {totalUnits}
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
              <Layers size={20} />
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '16px 20px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Featured on Home</span>
              <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>
                {featuredCount}
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fefce8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca8a04' }}>
              <Sparkles size={20} />
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#ffffff',
              padding: '16px 20px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>Active Categories</span>
              <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#0f172a', marginTop: '4px' }}>
                {categoriesCount}
              </div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#faf5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea' }}>
              <ImageIcon size={20} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '20px'
          }}
        >
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: activeTab === 'products' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'products' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Products</span>
            <span
              style={{
                backgroundColor: activeTab === 'products' ? '#e2e8f0' : '#f1f5f9',
                color: '#334155',
                fontSize: '0.75rem',
                padding: '2px 6px',
                borderRadius: '999px'
              }}
            >
              {totalProducts}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: activeTab === 'assets' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'assets' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Image Assets</span>
            <span
              style={{
                backgroundColor: activeTab === 'assets' ? '#e2e8f0' : '#f1f5f9',
                color: '#334155',
                fontSize: '0.75rem',
                padding: '2px 6px',
                borderRadius: '999px'
              }}
            >
              {PRESET_GALLERY_ASSETS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            style={{
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: activeTab === 'backup' ? '#0f172a' : '#64748b',
              borderBottom: activeTab === 'backup' ? '2px solid #0f172a' : '2px solid transparent',
              cursor: 'pointer'
            }}
          >
            Backup & Data
          </button>
        </div>

        {/* Tab 1: Products Table */}
        {activeTab === 'products' && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}
          >
            {/* Filter & Search Bar */}
            <div
              style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              }}
            >
              {/* Search */}
              <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '400px' }}>
                <Search
                  size={16}
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}
                />
                <input
                  type="text"
                  placeholder="Search products by title, category, id..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.85rem',
                    backgroundColor: '#ffffff',
                    color: '#334155',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="featured">Featured on Home</option>
                  <option value="in_stock">In Stock (&gt; 0)</option>
                  <option value="low_stock">Low Stock (≤ 5)</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                    <th style={{ padding: '12px 20px', fontWeight: '600' }}>Product</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Category</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Price</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600' }}>Stock</th>
                    <th style={{ padding: '12px 16px', fontWeight: '600', textAlign: 'center' }}>Featured</th>
                    <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '48px 20px', textAlign: 'center', color: '#64748b' }}>
                        No products found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((prod) => {
                      const stock = Number(prod.stockLeft) || 0;
                      const thumb =
                        prod.image || (prod.images && prod.images[0]) || '/assets/fallen_angel_tee.jpg';

                      return (
                        <tr
                          key={prod.id}
                          style={{
                            borderBottom: '1px solid #f1f5f9',
                            transition: 'background-color 0.15s'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                        >
                          {/* Product Image & Info */}
                          <td style={{ padding: '14px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={thumb}
                                alt={prod.title}
                                style={{
                                  width: '46px',
                                  height: '46px',
                                  borderRadius: '6px',
                                  objectFit: 'cover',
                                  border: '1px solid #e2e8f0',
                                  backgroundColor: '#f1f5f9'
                                }}
                              />
                              <div>
                                <div style={{ fontWeight: '600', color: '#0f172a' }}>{prod.title}</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                                  ID: {prod.id}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td style={{ padding: '14px 16px' }}>
                            <span
                              style={{
                                backgroundColor: '#f1f5f9',
                                color: '#334155',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                textTransform: 'capitalize'
                              }}
                            >
                              {prod.category || 'Standard'}
                            </span>
                          </td>

                          {/* Price */}
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: '600', color: '#0f172a' }}>
                              {formatPrice(prod.price)}
                            </div>
                            {prod.compareAtPrice > prod.price && (
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                                {formatPrice(prod.compareAtPrice)}
                              </div>
                            )}
                          </td>

                          {/* Stock Status */}
                          <td style={{ padding: '14px 16px' }}>
                            <span
                              style={{
                                fontSize: '0.78rem',
                                fontWeight: '600',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                backgroundColor: stock > 5 ? '#f0fdf4' : stock > 0 ? '#fefce8' : '#fef2f2',
                                color: stock > 5 ? '#16a34a' : stock > 0 ? '#ca8a04' : '#dc2626'
                              }}
                            >
                              {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                            </span>
                          </td>

                          {/* Featured on Home */}
                          <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                            <button
                              onClick={() => handleToggleFeatured(prod)}
                              title={prod.isFeatured ? 'Featured on Home (Click to unfeature)' : 'Click to feature on Home'}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px',
                                color: prod.isFeatured ? '#eab308' : '#cbd5e1'
                              }}
                            >
                              <Star size={18} fill={prod.isFeatured ? '#eab308' : 'none'} />
                            </button>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => openAddProductModal(prod)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid #cbd5e1',
                                  backgroundColor: '#ffffff',
                                  color: '#334155',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                <Edit2 size={14} />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => handleDeleteProduct(prod)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid #fee2e2',
                                  backgroundColor: '#fff1f2',
                                  color: '#e11d48',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  cursor: 'pointer'
                                }}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Image Assets Gallery */}
        {activeTab === 'assets' && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700', margin: 0, color: '#0f172a' }}>
                Store Image Library
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                Browse existing lookbook and product photos. Click to copy path or quickly create a product with any image.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '16px'
              }}
            >
              {PRESET_GALLERY_ASSETS.map((asset) => {
                const isCopied = copiedPath === asset.path;
                return (
                  <div
                    key={asset.path}
                    style={{
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '180px', backgroundColor: '#f8fafc', overflow: 'hidden' }}>
                      <img
                        src={asset.path}
                        alt={asset.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#0f172a' }}>{asset.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px', wordBreak: 'break-all' }}>
                          {asset.path}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                        <button
                          onClick={() => handleCopyAsset(asset.path)}
                          style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            backgroundColor: '#ffffff',
                            color: '#334155',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          {isCopied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                          <span>{isCopied ? 'Copied' : 'Copy Path'}</span>
                        </button>

                        <button
                          onClick={() =>
                            openAddProductModal({
                              title: asset.name,
                              image: asset.path,
                              images: [asset.path],
                              price: 950,
                              stockLeft: 12
                            })
                          }
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: '#0f172a',
                            color: '#ffffff',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                          title="Create product with this image"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Backup & Data */}
        {activeTab === 'backup' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}
          >
            {/* Export */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>
                Export Catalog JSON
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px 0' }}>
                Download a complete JSON backup file containing all {products.length} products, stock numbers, and images.
              </p>
              <button
                onClick={handleExportJson}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Download size={16} />
                <span>Export Products Backup (.json)</span>
              </button>
            </div>

            {/* Import */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 8px 0', color: '#0f172a' }}>
                Import Catalog JSON
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 12px 0' }}>
                Paste a previously exported product array to replace or restore your catalog.
              </p>
              <textarea
                rows={4}
                placeholder="Paste JSON array here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  fontFamily: 'monospace',
                  boxSizing: 'border-box',
                  outline: 'none',
                  marginBottom: '12px'
                }}
              />
              <button
                onClick={handleImportJson}
                disabled={!jsonInput.trim()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: jsonInput.trim() ? '#ffffff' : '#f8fafc',
                  color: jsonInput.trim() ? '#0f172a' : '#94a3b8',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: jsonInput.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                <Upload size={16} />
                <span>Restore Catalog</span>
              </button>
            </div>

            {/* Reset Defaults */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                border: '1px solid #fee2e2',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                gridColumn: '1 / -1'
              }}
            >
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 8px 0', color: '#991b1b' }}>
                Reset Store Products
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px 0' }}>
                Reset the local catalog to original factory mock data. This will discard any custom added products.
              </p>
              <button
                onClick={handleResetDefaults}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  border: '1px solid #fca5a5',
                  backgroundColor: '#fff1f2',
                  color: '#b91c1c',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <RefreshCw size={16} />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
