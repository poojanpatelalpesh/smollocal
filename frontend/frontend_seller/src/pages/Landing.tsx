import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, Order } from '../services/api';
import './Landing.css';
// Import your logo - make sure the path is correct
import OurLogo from '../assets/Our-Logo.png'; // Rename your file to remove spaces

const Landing: React.FC = () => {
  const { seller, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Fallback image URL or you can use your imported logo
  const logoSrc = OurLogo; // Update this path to match your actual image location
  
  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  const loadOrders = async () => {
    if (!token) return;
    
    setLoading(true);
    setError('');
    
    try {
      const ordersData = await ordersAPI.getAll(token);
      setOrders(ordersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load orders');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate dynamic statistics
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const completedOrders = orders.filter(order => 
    ['approved', 'denied', 'paid'].includes(order.status)
  );
  const totalOrders = orders.length;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const fallback = target.nextElementSibling as HTMLElement;
    if (fallback) {
      fallback.style.display = 'flex';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Business Dashboard</h1>
          </div>
        </header>
        <main className="dashboard-main">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            fontSize: '18px'
          }}>
            Loading dashboard...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Business Dashboard</h1>
          </div>
        </header>
        <main className="dashboard-main">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            color: 'red',
            textAlign: 'center'
          }}>
            <div>
              <p>Error: {error}</p>
              <button 
                onClick={loadOrders}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Business Dashboard</h1>
          <div className="header-actions">
            <span className="welcome-text">Welcome, {seller?.name || 'Seller'}!</span>
          </div>
        </div>
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
                
                <h4>{seller?.businessName || 'Your Business'}</h4>
                <div className="status-indicator">
                  <span className="status-dot"></span>
                  <span>ONLINE</span>
                </div>
                <p className="business-address">{seller?.address}</p>
              </div>
            </div>

            {/* Add Category Card */}
            <Link to="/ProductMangementPage" className="card-link">
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
            <Link to="/CustomerPage" className="card-link">
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
            <Link to="/QR" className="card-link">
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
            {/* Active Orders Card (wider - takes 2fr) */}
            <Link to="/Dashboard" className="card-link">
              <div className="card orders-card">
                <div className="orders-content">
                  <div className="orders-number">{pendingOrders.length}</div>
                  <div className="orders-label">PENDING</div>
                  <div className="orders-title">ORDERS</div>
                  <div className="orders-subtitle">Manage pending orders</div>
                </div>
              </div>
            </Link>

            {/* Previous Orders Card (takes 1fr) */}
            <Link to="/order-history" className="card-link">
              <div className="card action-card">
                <div className="card-icon">
                  <span>🕒</span>
                </div>
                <div className="card-content">
                  <h3>COMPLETED ORDERS</h3>
                  <p>{completedOrders.length} orders</p>
                </div>
              </div>
            </Link>

            {/* Notify Customers Card (takes 1fr) */}
            <Link to="/MessageAll" className="card-link">
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