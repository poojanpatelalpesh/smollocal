import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import LandingPage from './pages/Landing';
import CheckoutPage from './pages/CheckOut';
import OrderStatus from './pages/OrderStatus'; 
import CartModal from './components/CartModal';

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
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />

          <CartModal isOpen={isCartOpen} onClose={closeCartSlider} />

          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/checkout" element={<CheckoutPage openCartSlider={openCartSlider} />} />
              <Route path="/order-status" element={<OrderStatus openCartSlider={openCartSlider} />} /> {/* <-- Passed here */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
