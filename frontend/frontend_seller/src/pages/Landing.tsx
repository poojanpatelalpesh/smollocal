import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
// Import your logo - make sure the path is correct
import OurLogo from '../assets/Our-Logo.png'; // Rename your file to remove spaces

const Landing: React.FC = () => {
  // Fallback image URL or you can use your imported logo
  const logoSrc = OurLogo; // Update this path to match your actual image location
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Business Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* First Row (4 cards) */}
          <div className="first-row">
            {/* Business Info Card */}
            <div className="card business-card">
              <div className="business-info">
                
                  {/* Main image */}
                  <img 
                    src={logoSrc} 
                    alt="Business logo" 
                    className="main-image"
                    onError={handleImageError}
                  />
                  {/* Fallback icon */}
                  {/* <div className="fallback-icon">
                    <span>🏪</span>
                  </div> */}
                
                <h4>XYZ BAKERY</h4>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span>ONLINE</span>
                </div>
              </div>
            </div>

            {/* Add Category Card */}
            <Link to="./ProductMangementPage" className="card-link">
              <div className="card action-card">
                <div className="card-icon">
                  <span>📦</span>
                </div>
                <div className="card-content">
                  <b>ADD CATEGORY</b>
                  <p>Manage product categories</p>
                </div>
              </div>
            </Link>

            {/* Add Customer Card */}
            <Link to="./CustomerPage" className="card-link">
              <div className="card action-card">
                <div className="card-icon">
                  <span>👤</span>
                </div>
                <div className="card-content">
                  <b>ADD CUSTOMER</b>
                  <p>Expand your customer base</p>
                </div>
              </div>
            </Link>

            {/* Store Link / QR Card */}
            <Link to="./QR" className="card-link">
              <div className="card action-card">
                <div className="card-icon">
                  <span>🔗</span>
                </div>
                <div className="card-content">
                  <b>STORE LINK/QR</b>
                  <p>Share your store</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Second Row (3 cards with orders taking 2fr width) */}
          <div className="second-row">
            {/* Orders Card (wider - takes 2fr) */}
            <Link to="./Dashboard" className="card-link">
              <div className="card orders-card">
                <div className="orders-content">
                  <div className="orders-number">24</div>
                  <div className="orders-title">ORDERS</div>
                  <div className="orders-subtitle">Manage all your orders</div>
                </div>
              </div>
            </Link>

            {/* Previous Orders Card (takes 1fr) */}
            <Link to="./order-history" className="card-link">
              <div className="card action-card">
                <div className="card-icon">
                  <span>🕒</span>
                </div>
                <div className="card-content">
                  <b>PREVIOUS ORDERS</b>
                  <p>View order history</p>
                </div>
              </div>
            </Link>

            {/* Notify Customers Card (takes 1fr) */}
            <Link to="./MessageAll" className="card-link">
              <div className="card action-card">
                <div className="card-icon notification-icon">
                  <span>🔔</span>
                </div>
                <div className="card-content">
                  <b>NOTIFY CUSTOMERS</b>
                  <p>Send updates & promotions</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;