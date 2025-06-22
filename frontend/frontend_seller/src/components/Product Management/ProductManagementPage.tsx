import React, { useState, useEffect } from 'react';
import { CategoryManager } from './CategoryManager';
import { useAuth } from '../../context/AuthContext';
import { categoriesAPI, productsAPI, Category, Product } from '../../services/api';

export const ProductManagementPage: React.FC = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const [categoriesData, productsData] = await Promise.all([
        categoriesAPI.getAll(token),
        productsAPI.getAll(token)
      ]);
      
      setCategories(categoriesData);
      setProducts(productsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
  };

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '18px'
      }}>
        Loading product management...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: 'red',
        textAlign: 'center'
      }}>
        <div>
          <p>Error: {error}</p>
          <button 
            onClick={loadData}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <CategoryManager
      categories={categories}
      products={products}
      onUpdateCategories={handleUpdateCategories}
      onUpdateProducts={handleUpdateProducts}
    />
  );
};