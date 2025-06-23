import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Category, Product, ProductFormData } from './types/types';
import { ProductCard } from './ProductCard';
import ProductModal  from './modals/ProductModal';
import ConfirmModal from '../ConfirmModal';
import Notification from '../Notification';
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
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; productId: string | null; productName: string }>({
    isOpen: false,
    productId: null,
    productName: ''
  });
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: ''
  });

  const showNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message?: string) => {
    setNotification({
      isOpen: true,
      type,
      title,
      message
    });
  };

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
      showNotification('success', 'Product Created', `${data.name} has been created successfully!`);
    } catch (error) {
      console.error('Error creating product:', error);
      showNotification('error', 'Creation Failed', 'Failed to create product. Please try again.');
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
      showNotification('success', 'Product Updated', `${data.name} has been updated successfully!`);
    } catch (error) {
      console.error('Error updating product:', error);
      showNotification('error', 'Update Failed', 'Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!token) return;
    
    try {
      await productsAPI.delete(token, productId);
      const filteredProducts = products.filter((prod: Product) => prod._id !== productId);
      onUpdateProducts(filteredProducts);
      setDeleteModal({ isOpen: false, productId: null, productName: '' });
      showNotification('success', 'Product Deleted', 'Product has been deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      showNotification('error', 'Deletion Failed', 'Failed to delete product. Please try again.');
    }
  };

  const openDeleteModal = (product: Product) => {
    setDeleteModal({
      isOpen: true,
      productId: product._id,
      productName: product.name
    });
  };

  const handleDeleteClick = (productId: string) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      openDeleteModal(product);
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

        <div className="product-manager-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={openEditModal}
              onDelete={handleDeleteClick}
            />
          ))}
          
          {/* Always show Add Product card */}
          <div className="product-card create-product-card" onClick={openCreateModal}>
            <div className="product-card-image-container">
              <div className="product-card-placeholder">
                <Plus />
              </div>
            </div>
            <div className="product-card-content">
              <div className="product-card-header">
                <p className="product-card-title">Add Product</p>
              </div>
              <p className="product-card-description">Create a new product in this category</p>
            </div>
          </div>
        </div>

        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          product={editingProduct}
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
          isLoading={isLoading}
        />

        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, productId: null, productName: '' })}
          onConfirm={() => deleteModal.productId && handleDeleteProduct(deleteModal.productId)}
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteModal.productName}"? This action cannot be undone.`}
          type="danger"
          confirmText="Delete Product"
          cancelText="Cancel"
          isLoading={isLoading}
        />

        <Notification
          isOpen={notification.isOpen}
          onClose={() => setNotification(prev => ({ ...prev, isOpen: false }))}
          type={notification.type}
          title={notification.title}
          message={notification.message}
        />
      </div>
    </div>
  );
};