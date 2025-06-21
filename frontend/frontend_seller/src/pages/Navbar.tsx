// src/components/Navbar.tsx
import React from 'react';
import { Link, useLocation , useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link 
          to="/Landing" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/order-history" 
          className={`nav-link ${location.pathname === '/order-history' ? 'active' : ''}`}
        >
          Order History
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
