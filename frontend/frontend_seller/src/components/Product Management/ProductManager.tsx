import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Category, Product, ProductFormData } from './types/types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './modals/ProductModal';
import { createProduct, updateProduct } from './utils/storage';
import './ProductManager.css';

interface ProductManagerProps {
  category: Category;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  onBack: () => void;
}

export const ProductManager: React.FC<ProductManagerProps> = ({
  category,
  products,
  onUpdateProducts,
  onBack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isMobileView, setIsMobileView] = useState(false);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
        setIsMobileView(true);
      } else if (width < 1024) {
        setScreenSize('tablet');
        setIsMobileView(false);
      } else {
        setScreenSize('desktop');
        setIsMobileView(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get grid configuration based on screen size
  const getGridConfig = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          columns: window.innerWidth < 480 ? 1 : 2,
          maxItems: window.innerWidth < 480 ? 4 : 6,
          itemHeight: window.innerWidth < 380 ? 260 : 300
        };
      case 'tablet':
        return {
          columns: 2,
          maxItems: 6,
          itemHeight: 350
        };
      default:
        return {
          columns: 4,
          maxItems: 8,
          itemHeight: 400
        };
    }
  };

  const handleCreateProduct = (data: ProductFormData) => {
    const newProduct = createProduct(category.id, data.name, data.description, data.image);
    // Using in-memory state instead of localStorage for Claude.ai compatibility
    const updatedProducts = [...products, newProduct];
    onUpdateProducts(updatedProducts);
  };

  const handleEditProduct = (data: ProductFormData) => {
    if (editingProduct) {
      const updatedProduct = updateProduct(editingProduct, data);
      const updatedProducts = products.map((prod: Product) =>
        prod.id === editingProduct.id ? updatedProduct : prod
      );
      onUpdateProducts(updatedProducts);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const filteredProducts = products.filter((prod: Product) => prod.id !== productId);
      onUpdateProducts(filteredProducts);
    }
  };

  const openCreateModal = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const gridConfig = getGridConfig();

  return (
    <div className="product-manager">
      <div className="product-manager-container">
        <div className={`product-manager-header ${isMobileView ? 'mobile-header' : ''}`}>
          <button
            onClick={onBack}
            className="product-manager-back-btn"
            aria-label="Go back"
          >
            <ArrowLeft />
          </button>
          
          <div className="product-manager-title-section">
            <div>
              <h1>{category.name}</h1>
            </div>
          </div>
          
          <button
            onClick={openCreateModal}
            className="product-manager-add-btn"
            aria-label="Add new product"
          >
            <Plus />
            <span>{isMobileView ? 'Add' : 'Add Product'}</span>
          </button>
        </div>

        {products.length === 0 ? (
          <div className="product-manager-empty">
            <div className="product-manager-empty-card">
              <h2>No Products Yet</h2>
              <p>
                {isMobileView 
                  ? `Add your first product to ${category.name}` 
                  : `Add your first product to this category to start your collection`
                }
              </p>
              <button
                onClick={openCreateModal}
                className="product-manager-empty-btn"
              >
                Add Product
              </button>
            </div>
          </div>
        ) : (
          <div 
            className={`product-manager-grid ${screenSize}-grid`}
            style={{
              gridTemplateColumns: `repeat(${gridConfig.columns}, 1fr)`,
              maxHeight: `calc(${Math.ceil(gridConfig.maxItems / gridConfig.columns)} * (${gridConfig.itemHeight}px + 1rem))`,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={handleDeleteProduct}
                isMobileView={isMobileView}
              />
            ))}
          </div>
        )}

        {/* Show product count on mobile */}
        {isMobileView && products.length > 0 && (
          <div className="mobile-product-count">
            {products.length} {products.length === 1 ? 'product' : 'products'} in {category.name}
          </div>
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          product={editingProduct}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
          isMobileView={isMobileView}
        />
      </div>
    </div>
  );
};