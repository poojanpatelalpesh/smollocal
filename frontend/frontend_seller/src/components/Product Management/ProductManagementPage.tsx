import React from 'react';
import { CategoryManager } from './CategoryManager';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Category, Product } from './types/types';

export const ProductManagementPage: React.FC = () => {
  const [categories, setCategories] = useLocalStorage<Category[]>('pm_categories', []);
  const [products, setProducts] = useLocalStorage<Product[]>('pm_products', []);

  return (
    <CategoryManager
      categories={categories}
      products={products}
      onUpdateCategories={setCategories}
      onUpdateProducts={setProducts}
    />
  );
};