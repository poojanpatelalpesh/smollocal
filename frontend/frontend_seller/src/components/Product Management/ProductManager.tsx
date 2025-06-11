import React, { useState } from 'react';
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

  const handleCreateProduct = (data: ProductFormData) => {
    const newProduct = createProduct(category.id, data.name, data.description, data.image);
    const allProducts = JSON.parse(localStorage.getItem('pm_products') || '[]');
    const updatedProducts = [...allProducts, newProduct];
    localStorage.setItem('pm_products', JSON.stringify(updatedProducts));
    onUpdateProducts(updatedProducts);
  };

  const handleEditProduct = (data: ProductFormData) => {
    if (editingProduct) {
      const updatedProduct = updateProduct(editingProduct, data);
      const allProducts = JSON.parse(localStorage.getItem('pm_products') || '[]');
      const updatedProducts = allProducts.map((prod: Product) =>
        prod.id === editingProduct.id ? updatedProduct : prod
      );
      localStorage.setItem('pm_products', JSON.stringify(updatedProducts));
      onUpdateProducts(updatedProducts);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const allProducts = JSON.parse(localStorage.getItem('pm_products') || '[]');
      const filteredProducts = allProducts.filter((prod: Product) => prod.id !== productId);
      localStorage.setItem('pm_products', JSON.stringify(filteredProducts));
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

  return (
    <div className="product-manager">
      <div className="product-manager-container">
        <div className="product-manager-header">
          <div className="product-manager-title-section">
            <button
              onClick={onBack}
              className="product-manager-back-btn"
            >
              <ArrowLeft />
            </button>
            <div>
              <h1>{category.name}</h1>
              <p>{category.description}</p>
            </div>
          </div>
          <button
            onClick={openCreateModal}
            className="product-manager-add-btn"
          >
            <Plus />
            <span>Add Product</span>
          </button>
        </div>

        {products.length === 0 ? (
          <div className="product-manager-empty">
            <div className="product-manager-empty-card">
              <div className="product-manager-empty-icon">
                <Plus />
              </div>
              <h3>No Products Yet</h3>
              <p>Add your first product to this category</p>
              <button
                onClick={openCreateModal}
                className="product-manager-empty-btn"
              >
                Add Product
              </button>
            </div>
          </div>
        ) : (
          <div className="product-manager-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          product={editingProduct}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
        />
      </div>
    </div>
  );
};