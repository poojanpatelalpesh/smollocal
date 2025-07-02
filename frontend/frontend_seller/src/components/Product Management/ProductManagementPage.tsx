import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryManager } from './CategoryManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Category, Product } from './types/types';

export const ProductManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useLocalStorage<Category[]>('pm_categories', []);
  const [products, setProducts] = useLocalStorage<Product[]>('pm_products', []);

  const handleBack = () => {
    // Determine the correct landing route based on current path
    const currentPath = location.pathname;
    
    if (currentPath.includes('Login')) {
      navigate('/Login/Landing');
    } else if (currentPath.includes('Signup')) {
      navigate('/Signup/Landing');
    } else {
      // Fallback to default landing page
      navigate('/Landing');
    }
  };

  return (
    <CategoryManager
      categories={categories}
      products={products}
      onUpdateCategories={setCategories}
      onUpdateProducts={setProducts}
      onBack={handleBack}
    />
  );
};