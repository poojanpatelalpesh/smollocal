// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  QrCode, 
  Users, 
  MessageSquare, 
  History,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seller, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowLogoutModal(false);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const navItems = [
    { path: '/Landing', label: 'Dashboard', icon: Home },
    { path: '/ProductMangementPage', label: 'Products', icon: Package },
    { path: '/Dashboard', label: 'Orders', icon: ShoppingCart },
    { path: '/order-history', label: 'History', icon: History },
    { path: '/CustomerPage', label: 'Customers', icon: Users },
    { path: '/QR', label: 'QR Code', icon: QrCode },
    { path: '/MessageAll', label: 'Messages', icon: MessageSquare },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo/Brand */}
          <div className="navbar-brand">
            <Link to="/Landing" className="brand-link">
              <h2 className="brand-text">smo ocal</h2>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-nav desktop-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <Icon size={20} className="nav-icon" />
                  <span className="nav-text">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Info and Logout */}
          <div className="navbar-user">
            <div className="user-info">
              <span className="user-name">{seller?.name || 'Seller'}</span>
              <span className="user-business">{seller?.businessName}</span>
            </div>
            <button onClick={openLogoutModal} className="logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="mobile-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} className="nav-icon" />
                  <span className="nav-text">{item.label}</span>
                </Link>
              );
            })}
            <button onClick={openLogoutModal} className="mobile-logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </nav>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Logout"
        message="Are you sure you want to logout? You will need to login again to access your account."
        type="warning"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default Navbar;
