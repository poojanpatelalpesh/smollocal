import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/Landing';
import CheckoutPage from './pages/CheckOut';
import OrderStatus from './pages/OrderStatus'; 
import QR from './pages/QR'; // Add this import
import CartModal from './components/CartModal';
import StorePage from './pages/StorePage';
import PlaceOrder from './pages/PlaceOrder';
import CustomerLayout from './components/CustomerLayout';

function App() {
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
      <Router>
        <div className={`app ${darkMode ? 'dark' : ''}`}>
          {/* CartModal should be available on all pages */}
          <CartModal isOpen={isCartOpen} onClose={closeCartSlider} />
          
          <Routes>
            <Route path="/qr" element={<QR />} />
            <Route element={<CustomerLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/store/:sellerSlug" element={<StorePage />} />
              <Route path="/store/:sellerSlug/checkout" element={<CheckoutPage />} />
              <Route path="/store/:sellerSlug/placeorder" element={<PlaceOrder />} />
              <Route path="/order-status" element={<OrderStatus />} />
              <Route path="/store/:sellerSlug/order-status/:orderId" element={<OrderStatus />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;