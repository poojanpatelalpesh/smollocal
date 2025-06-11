import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Business Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* ---- First Row (4 cards) ---- */}
          <div className="first-row">
            {/* Business Info Card */}
            <div className="card business-card">
              <div className="business-icon">
                <span>🏪</span>
              </div>
              <div className="business-info">
                <h2>XYZ BAKERY</h2>
                <p>Business Dashboard</p>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                </div>
              </div>
            </div>

            {/* Add Category Card */}
            <Link to='./ProductMangementPage'>
              <div className="card action-card">
                <div className="card-icon">
                  <span>📦</span>
                </div>
                <div className="card-content">
                  <h3>ADD CATEGORY</h3>
                  <p>Manage product categories</p>
                </div>
                <div className="add-button">+</div>
              </div>
            </Link>

            {/* Add Customer Card */}
            <Link to='./CustomerPage'>
              <div className="card action-card">
                <div className="card-icon">
                  <span>👤</span>
                </div>
                <div className="card-content">
                  <h3>ADD CUSTOMER</h3>
                  <p>Expand your customer base</p>
                </div>
                <div className="add-button">+</div>
              </div>
            </Link>

            {/* Store Link / QR Card */}
            <Link to='./QR'>
              <div className="card action-card">
                <div className="card-icon">
                  <span>🔗</span>
                </div>
                <div className="card-content">
                  <h3>STORE LINK/QR</h3>
                  <p>Share your store</p>
                </div>
                <div className="add-button">+</div>
              </div>
            </Link>
          </div>

          {/* ---- Second Row (3 cards with orders taking 2fr width) ---- */}
          <div className="second-row">
            {/* Orders Card (wider - takes 2fr) */}
            <Link to='./Dashboard'>
              <div className="card orders-card">
                <div className="orders-content">
                  <div className="orders-number">24</div>
                  <div className="orders-label">ACTIVE</div>
                  <div className="orders-title">ORDERS</div>
                  <div className="orders-subtitle">Manage all your orders</div>
                </div>
              </div>
            </Link>

            {/* Previous Orders Card (takes 1fr) */}
            <Link to='./order-history'>
              <div className="card action-card">
                <div className="card-icon">
                  <span>🕒</span>
                </div>
                <div className="card-content">
                  <h3>PREVIOUS ORDERS</h3>
                  <p>View order history</p>
                </div>
                <div className="add-button">+</div>
              </div>
            </Link>

            {/* Notify Customers Card (takes 1fr) */}
            <Link to='./MessageAll'>
              <div className="card action-card">
                <div className="card-icon notification-icon">
                  <span>🔔</span>
                </div>
                <div className="card-content">
                  <h3>NOTIFY CUSTOMERS</h3>
                  <p>Send updates & promotions</p>
                </div>
                <div className="add-button">+</div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;