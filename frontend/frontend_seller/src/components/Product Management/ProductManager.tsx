import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Category, Product, ProductFormData } from './types/types';
import { ProductCard } from './ProductCard';
import { ProductModal } from './modals/ProductModal';
import { useAuth } from '../../context/AuthContext';
import { productsAPI } from '../../services/api';
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
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateProduct = async (data: ProductFormData) => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('category', category._id);
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const newProduct = await productsAPI.create(token, formData);
      onUpdateProducts([...products, newProduct]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = async (data: ProductFormData) => {
    if (!token || !editingProduct) return;
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('category', category._id);
      
      if (data.image) {
        formData.append('image', data.image);
      }

      const updatedProduct = await productsAPI.update(token, editingProduct._id, formData);
      const updatedProducts = products.map((prod: Product) =>
        prod._id === editingProduct._id ? updatedProduct : prod
      );
      onUpdateProducts(updatedProducts);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!token) return;
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(token, productId);
        const filteredProducts = products.filter((prod: Product) => prod._id !== productId);
        onUpdateProducts(filteredProducts);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
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
            </div>
          </div>
          <button
            onClick={openCreateModal}
            className="product-manager-add-btn"
            disabled={isLoading}
          >
            <Plus />
            <span>Add Product</span>
          </button>
        </div>

        {products.length === 0 ? (
          <div className="product-manager-empty">
            <div className="product-manager-empty-card">
              {/* <div className="product-manager-empty-icon">
                <Plus />
              </div> */}
              <h2>No Products Yet</h2>
              <p>Add your first product to this category to start your</p>
              <button
                onClick={openCreateModal}
                className="product-manager-empty-btn"
                disabled={isLoading}
              >
                Add Product
              </button>
            </div>
          </div>
        ) : (
          <div className="product-manager-grid">
            {products.map((product) => (
              <ProductCard
                key={product._id}
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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};