import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Product, ProductFormData } from '../types/types';
import './ProductModal.css';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  product?: Product;
  title: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  title,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    image: '',
    price: 0,
  });
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
      });
      setPreview(product.image);
    } else {
      setFormData({
        name: '',
        description: '',
        image: '',
        price: 0,
      });
      setPreview('');
    }
  }, [product, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({ ...formData, image: result });
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="product-modal-overlay">
      <div className="product-modal">
        <div className="product-modal-header">
          <h2 className="product-modal-title">{title}</h2>
          <button onClick={onClose} className="product-modal-close-btn">
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-modal-form">
          <div className="product-modal-field">
            <label className="product-modal-label">Product Image</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`product-modal-upload-area ${preview ? 'has-image' : ''}`}
            >
              {preview ? (
                <div className="product-modal-upload-preview">
                  <img
                    src={preview}
                    alt="Preview"
                    className="product-modal-upload-image"
                  />
                  <div className="product-modal-upload-overlay">
                    <Upload />
                  </div>
                </div>
              ) : (
                <div className="product-modal-upload-placeholder">
                  <ImageIcon />
                  <p>Click to upload product image</p>
                  <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="product-modal-upload-input"
            />
          </div>

          <div className="product-modal-field">
            <label htmlFor="name" className="product-modal-label">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="product-modal-input"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="product-modal-field">
            <label htmlFor="price" className="product-modal-label">
              Price *
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
              }
              className="product-modal-input"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="product-modal-field">
            <label htmlFor="description" className="product-modal-label">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="product-modal-textarea"
              placeholder="Enter product description"
            />
          </div>

          <div className="product-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="product-modal-cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="product-modal-submit-btn">
              {product ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
