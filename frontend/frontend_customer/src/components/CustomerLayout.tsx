import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CartModal from './CartModal';
import { CartProvider } from '../context/CartContext';
import { Outlet } from 'react-router-dom';

const CustomerLayout: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setDarkMode(savedMode === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const openCartSlider = () => setIsCartOpen(true);
  const closeCartSlider = () => setIsCartOpen(false);

  return (
    <CartProvider>
      <div className={`app ${darkMode ? 'dark' : ''}`}>
        <CartModal isOpen={isCartOpen} onClose={closeCartSlider} />
        <Header darkMode={darkMode} setDarkMode={setDarkMode} openCartSlider={openCartSlider} />
        <main><Outlet /></main>
      </div>
    </CartProvider>
  );
};

export default CustomerLayout; 