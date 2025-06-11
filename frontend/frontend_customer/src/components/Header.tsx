import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import '../styles/header.css';

type HeaderProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = () => {
  const { getItemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <img
            src="/images/logo.jpeg"
            className="logo-image"
            alt="Company Logo"
          />

          {/* Cart button */}
          <div>
            <button
              className="cart-button"
              onClick={toggleCart}
              aria-label="Shopping cart"
            >
              {/* Cart Icon (SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="cart-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={24}
                height={24}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 001.85.7L9 14h6m0 0l1.35 2.7a1 1 0 001.85-.7L17 13"
                />
              </svg>

              {/* Quantity Badge */}
              {getItemCount() > 0 && (
                <span className="cart-count">{getItemCount()}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
