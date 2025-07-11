import React from 'react';
import { Edit2, Trash2, Package } from 'lucide-react';
import { Category } from './types/types';
import './CategoryCard.css';

interface CategoryCardProps {
  category: Category;
  productCount: number;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onSelect: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  productCount,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <div className="category-card">
      <div className="category-card-content">
        <div className="category-card-header">
          <div className="category-card-info">
            <div className="category-card-icon">
              <Package />
            </div>
            <div>
              <h3 className="category-card-title">{category.name}</h3>
              <p className="category-card-count">{productCount} products</p>
            </div>
          </div>
          <div className="category-card-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(category);
              }}
              className="category-card-action-btn edit"
              title="Edit category"
            >
              <Edit2 />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(category);
              }}
              className="category-card-action-btn delete"
              title="Delete category"
            >
              <Trash2 />
            </button>
          </div>
        </div>
        
        <button
          onClick={() => onSelect(category)}
          className="category-card-manage-btn"
        >
          Manage Products
        </button>
      </div>
    </div>
  );
};