// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default link behavior
    navigate(-1);       // Navigate to previous page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a 
          href="#" 
          onClick={handleBack}
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Dashboard
        </a>
        <Link 
          to="/Login/Landing/order-history"
          className={`nav-link ${location.pathname === '/order-history' ? 'active' : ''}`}
        >
          Order History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
