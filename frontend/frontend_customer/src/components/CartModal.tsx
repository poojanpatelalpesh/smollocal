import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { items, addToCart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="modal-header">
          <h2 id="cart-title" className="modal-title">Your Cart</h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="close-button"
          >
            &times;
          </button>
        </div>

        <div className="modal-body">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item">
                  <img
                    src={product.image || '/images/placeholder.png'}
                    alt={product.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <span>{product.name}</span>
                      <span>₹{(product.price * quantity).toFixed(2)}</span>
                    </div>
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button
                          className="quantity-button"
                          onClick={() => removeFromCart(product.id)}
                        >
                          −
                        </button>

                        <span className="quantity">{quantity}</span>

                        <button
                          className="quantity-button"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>
                      {/* Removed Remove Button */}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="modal-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button className="cart-button-primary" onClick={handleCheckout}>
                Checkout
              </button>
              <button className="cart-button-secondary" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
