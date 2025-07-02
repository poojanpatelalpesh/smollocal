import React, { useState } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Category, Product, CategoryFormData } from './types/types';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './modals/CategoryModal';
import { ProductManager } from './ProductManager';
import { createCategory, updateCategory } from './utils/storage';
import { useNavigate } from 'react-router-dom';
import './CategoryManager.css';

interface CategoryManagerProps {
  categories: Category[];
  products: Product[];
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateProducts: (products: Product[]) => void;
  onBack: () => void;
}

export const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  products,
  onUpdateCategories,
  onUpdateProducts,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const navigate = useNavigate();

  const handleCreateCategory = (data: CategoryFormData) => {
    const newCategory = createCategory(data.name);
    onUpdateCategories([...categories, newCategory]);
  };

  const handleEditCategory = (data: CategoryFormData) => {
    if (editingCategory) {
      const updatedCategory = updateCategory(editingCategory, data);
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id ? updatedCategory : cat
      );
      onUpdateCategories(updatedCategories);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? All products in this category will also be deleted.')) {
      const filteredCategories = categories.filter(cat => cat.id !== categoryId);
      const filteredProducts = products.filter(prod => prod.categoryId !== categoryId);
      onUpdateCategories(filteredCategories);
      onUpdateProducts(filteredProducts);
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
    return products.filter(product => product.categoryId === categoryId).length;
  };

  // Handle back button click - goes to landing page
  const handleBackClick = () => {
    console.log('Back button clicked - navigating to landing page');
    //onBack(); // This will call the handleBack function from ProductManagementPage
    navigate(-1);
  };

  if (selectedCategory) {
    return (
      <ProductManager
        category={selectedCategory}
        products={products.filter(p => p.categoryId === selectedCategory.id)}
        onUpdateProducts={onUpdateProducts}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="category-manager">
      <div className="category-manager-container">
        <div className="category-manager-header">
          {/* Back button should be a direct child of header */}
          <button
            onClick={handleBackClick}
            className="category-manager-back-btn"
          >
            <ArrowLeft />
          </button>
  
          <div className="category-manager-title-section">
            <h1>Product Management</h1>
            <p>Organize your products by categories</p>
          </div>
  
          <button className="category-manager-add-btn" onClick={openCreateModal}>
            <Plus />
            <span>Add Category</span>
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="category-manager-empty">
            <div className="category-manager-empty-card">
              <h2>No Categories Yet</h2>
              <p>Create your first category to start organizing your products</p>
              <button
                onClick={openCreateModal}
                className="category-manager-empty-btn"
              >
                Create Category
              </button>
            </div>
          </div>
        ) : (
          <div className="category-manager-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                productCount={getProductCount(category.id)}
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
        />
      </div>
    </div>
  );
};