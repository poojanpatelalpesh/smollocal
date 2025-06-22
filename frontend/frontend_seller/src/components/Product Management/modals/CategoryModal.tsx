import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Category, CategoryFormData } from '../types/types';
import './CategoryModal.css';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => void;
  category?: Category;
  title: string;
  isLoading?: boolean;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  category,
  title,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
      });
    } else {
      setFormData({
        name: '',
      });
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && !isLoading) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="category-modal-overlay">
      <div className="category-modal">
        <div className="category-modal-header">
          <h2 className="category-modal-title">{title}</h2>
          <button
            onClick={onClose}
            className="category-modal-close-btn"
            disabled={isLoading}
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="category-modal-form">
          <div className="category-modal-field">
            <label htmlFor="name" className="category-modal-label">
              Category Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="category-modal-input"
              placeholder="Enter category name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="category-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="category-modal-cancel-btn"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="category-modal-submit-btn"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading ? 'Saving...' : (category ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
