import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Category, Product, CategoryFormData } from './types/types';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './modals/CategoryModal';
import ConfirmModal from '../ConfirmModal';
import Notification from '../Notification';
import { ProductManager } from './ProductManager';
import { useAuth } from '../../context/AuthContext';
import { categoriesAPI, productsAPI } from '../../services/api';
import './CategoryManager.css';

interface CategoryManagerProps {
  categories: Category[];
  products: Product[];
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateProducts: (products: Product[]) => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  products,
  onUpdateCategories,
  onUpdateProducts,
}) => {
  const { token } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; categoryId: string | null; categoryName: string }>({
    isOpen: false,
    categoryId: null,
    categoryName: ''
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

  const handleCreateCategory = async (data: CategoryFormData) => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const newCategory = await categoriesAPI.create(token, data.name);
      onUpdateCategories([...categories, newCategory]);
      setIsModalOpen(false);
      showNotification('success', 'Category Created', `${data.name} has been created successfully!`);
    } catch (error) {
      console.error('Error creating category:', error);
      showNotification('error', 'Creation Failed', 'Failed to create category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditCategory = async (data: CategoryFormData) => {
    if (!token || !editingCategory) return;
    
    setIsLoading(true);
    try {
      const updatedCategory = await categoriesAPI.update(token, editingCategory._id, data.name);
      const updatedCategories = categories.map(cat =>
        cat._id === editingCategory._id ? updatedCategory : cat
      );
      onUpdateCategories(updatedCategories);
      setIsModalOpen(false);
      showNotification('success', 'Category Updated', `${data.name} has been updated successfully!`);
    } catch (error) {
      console.error('Error updating category:', error);
      showNotification('error', 'Update Failed', 'Failed to update category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!token) return;
    
    try {
      await categoriesAPI.delete(token, categoryId);
      const filteredCategories = categories.filter(cat => cat._id !== categoryId);
      const filteredProducts = products.filter(prod => prod.category !== categoryId);
      onUpdateCategories(filteredCategories);
      onUpdateProducts(filteredProducts);
      setDeleteModal({ isOpen: false, categoryId: null, categoryName: '' });
      showNotification('success', 'Category Deleted', 'Category has been deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
      showNotification('error', 'Deletion Failed', 'Failed to delete category. Please try again.');
    }
  };

  const openDeleteModal = (category: Category) => {
    setDeleteModal({
      isOpen: true,
      categoryId: category._id,
      categoryName: category.name
    });
  };

  const openCreateModal = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const getProductCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId).length;
  };

  if (selectedCategory) {
    return (
      <ProductManager
        category={selectedCategory}
        products={products.filter(p => p.category === selectedCategory._id)}
        onUpdateProducts={onUpdateProducts}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="category-manager">
      <div className="category-manager-container">
        <div className="category-manager-header">
          <div className="category-manager-title-section">
            <h1>Product Management</h1>
            <p>Organize your products by categories</p>
          </div>
          <button
            onClick={openCreateModal}
            className="category-manager-add-btn"
            disabled={isLoading}
          >
            <Plus />
            <span>Add Category</span>
          </button>
        </div>

        <div className="category-manager-grid">
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              productCount={getProductCount(category._id)}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onSelect={setSelectedCategory}
            />
          ))}
          
          {/* Always show Create Category card */}
          <div className="category-card create-category-card" onClick={openCreateModal}>
            <div className="category-card-content">
              <div className="category-card-header">
                <div className="category-card-info">
                  <div className="category-card-icon">
                    <Plus />
                  </div>
                  <div>
                    <h3 className="category-card-title">Create Category</h3>
                    <p className="category-card-count">Add new category</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingCategory ? handleEditCategory : handleCreateCategory}
          category={editingCategory}
          title={editingCategory ? 'Edit Category' : 'Create New Category'}
          isLoading={isLoading}
        />

        <ConfirmModal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, categoryId: null, categoryName: '' })}
          onConfirm={() => deleteModal.categoryId && handleDeleteCategory(deleteModal.categoryId)}
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteModal.categoryName}"? This action cannot be undone and will also delete all products in this category.`}
          type="danger"
          confirmText="Delete Category"
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