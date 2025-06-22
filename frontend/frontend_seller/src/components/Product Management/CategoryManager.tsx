import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Category, Product, CategoryFormData } from './types/types';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './modals/CategoryModal';
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

  const handleCreateCategory = async (data: CategoryFormData) => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const newCategory = await categoriesAPI.create(token, data.name);
      onUpdateCategories([...categories, newCategory]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category');
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
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Failed to update category');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!token) return;
    
    if (window.confirm('Are you sure you want to delete this category? All products in this category will also be deleted.')) {
      try {
        await categoriesAPI.delete(token, categoryId);
        const filteredCategories = categories.filter(cat => cat._id !== categoryId);
        const filteredProducts = products.filter(prod => prod.category !== categoryId);
        onUpdateCategories(filteredCategories);
        onUpdateProducts(filteredProducts);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category');
      }
    }
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

        {categories.length === 0 ? (
          <div className="category-manager-empty">
            <div className="category-manager-empty-card">
              {/* <div className="category-manager-empty-icon">
                <Plus />
              </div> */}
              <h2>No Categories Yet</h2>
              <p>Create your first category to start organizing your products</p>
              <button
                onClick={openCreateModal}
                className="category-manager-empty-btn"
                disabled={isLoading}
              >
                Create Category
              </button>
            </div>
          </div>
        ) : (
          <div className="category-manager-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                productCount={getProductCount(category._id)}
                onEdit={openEditModal}
                onDelete={handleDeleteCategory}
                onSelect={setSelectedCategory}
              />
            ))}
          </div>
        )}

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={editingCategory ? handleEditCategory : handleCreateCategory}
          category={editingCategory}
          title={editingCategory ? 'Edit Category' : 'Create New Category'}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};