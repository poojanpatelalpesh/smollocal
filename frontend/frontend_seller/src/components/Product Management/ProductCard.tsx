import React, { useState } from 'react';
import { Edit2, Trash2, ImageIcon } from 'lucide-react';
import { Product } from './types/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 0;

  const toggleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const shouldTruncate = product.description.length > maxLength;
  const shortDescription =
    product.description.slice(0, maxLength) + (shouldTruncate ? '' : '');

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
        ) : (
          <div className="product-card-placeholder">
            <ImageIcon />
          </div>
        )}

        <div className="product-card-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(product);
            }}
            className="product-card-action-btn edit"
            title="Edit product"
          >
            <Edit2 />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id);
            }}
            className="product-card-action-btn delete"
            title="Delete product"
          >
            <Trash2 />
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <div className="product-card-header">
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-price">₹{product.price}</p>
        </div>

        {isExpanded && (
          <p className="product-card-description">{product.description}</p>
        )}

        {!isExpanded && shouldTruncate && (
          <p className="product-card-description">{shortDescription}</p>
        )}

        {shouldTruncate && (
          <button
            onClick={toggleReadMore}
            className="read-more-btn"
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>
    </div>
  );
};
