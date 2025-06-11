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
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  category,
  title,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    // description: '',
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        // description: category.description,
      });
    } else {
      setFormData({
        name: '',
        // description: '',
      });
    }
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      onClose();
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
            />
          </div>

          {/* 
          <div className="category-modal-field">
            <label htmlFor="description" className="category-modal-label">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="category-modal-textarea"
              placeholder="Enter category description"
            />
          </div>
          */}

          <div className="category-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="category-modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="category-modal-submit-btn"
            >
              {category ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
