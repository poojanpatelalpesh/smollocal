import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import { useCart } from '../context/CartContext.tsx';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, removeFromCart, items } = useCart();

  const [expanded, setExpanded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  // Always get current quantity from cart context
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setShowAddedMessage(true);

    setTimeout(() => {
      setIsAdding(false);
      setShowAddedMessage(false);
    }, 1500);
  };

  const handleIncrease = () => {
    addToCart(product);
  };

  const handleDecrease = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-price">₹{product.price.toFixed(2)}</span>
        </div>

        <p className={`product-description ${expanded ? 'expanded' : ''}`}>
          {product.description}
        </p>

        <div className="product-actions">
          <button
            className="read-more"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>

          {showAddedMessage && <span className="added-message">Item added to cart!</span>}

          {quantity > 0 ? (
            <div className="quantity-controls">
              <button onClick={handleDecrease} disabled={isAdding && quantity <= 1}>−</button>
              <span className="quantity">{quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          ) : (
            <button
              className={`add-to-cart ${isAdding ? 'adding' : ''}`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
