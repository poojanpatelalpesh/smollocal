/// <reference types="vite/client" />

import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Package, CreditCard, Truck, MessageSquare, Loader2, Home, ShoppingCart, Banknote } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/orderstatus.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const OrderStatus: React.FC = () => {
  const { sellerSlug, orderId } = useParams<{ sellerSlug: string; orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(true);
  const [loadingText, setLoadingText] = useState('Processing your order...');

  // Animated loading messages
  useEffect(() => {
    if (!loading) return;
    const loadingMessages = [
      'Processing your order...',
      'Verifying order details...',
      'Contacting seller...',
      'Checking item availability...',
      'Finalizing order status...',
      'Almost ready...'
    ];
    let messageIndex = 0;
    setLoadingText(loadingMessages[0]);
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex++;
        setLoadingText(loadingMessages[messageIndex]);
      }
    }, 800);
    return () => clearInterval(messageInterval);
  }, [loading]);

  // Poll backend for order status
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const fetchOrder = () => {
      fetch(`${API_BASE}/api/orders/customer/${orderId}`)
        .then(res => {
          if (!res.ok) throw new Error('Order not found');
          return res.json();
        })
        .then(data => {
          setOrder(data);
          setError(null);
          setLoading(false);
          if (data.status !== 'pending') {
            setPolling(false);
          }
        })
        .catch(err => {
          setError(err.message || 'Error fetching order');
          setLoading(false);
        });
    };
    fetchOrder();
    if (polling) {
      interval = setInterval(fetchOrder, 2000);
    }
    return () => clearInterval(interval);
  }, [orderId, polling]);

  // Loading Component (from your design)
  const LoadingWindow = () => (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-icon-container">
            <div className="loading-icon-wrapper">
              <Package className="loading-package-icon" />
              <Loader2 className="loading-spinner" />
            </div>
          </div>
          <h2 className="loading-title">Please Wait</h2>
          <p className="loading-message">{loadingText}</p>
          <div className="loading-progress">
            <div className="loading-progress-bar"></div>
          </div>
          <div className="loading-dots">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingWindow />;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:40}}>Error: {error}</div>;
  if (!order) return <div style={{textAlign:'center',marginTop:40}}>Order not found.</div>;

  // Build orderData for summary UI
  const orderData = {
    orderId: order._id,
    items: order.products.map((item: any) => ({
      id: item.productId?._id || item.productId?.id || '',
      name: item.productId?.name || 'Product',
      description: item.productId?.description || '',
      price: item.productId?.price || 0,
      quantity: item.quantity,
      image: item.productId?.imageUrl || item.productId?.image || '',
    })),
    subtotal: order.products.reduce((sum: number, item: any) => sum + (item.productId?.price || 0) * item.quantity, 0),
    shipping: 0,
    tax: 0,
    total: order.products.reduce((sum: number, item: any) => sum + (item.productId?.price || 0) * item.quantity, 0),
    paymentMethod: 'N/A', // Not tracked in backend
    estimatedDelivery: '3-5 business days',
  };

  // Navigation handlers
  const handleReturnHome = () => {
    navigate('/');
  };
  const handleReturnToCart = () => {
    navigate('/store/' + sellerSlug);
  };

  return (
    <div className="order-container">
      <div className="order-wrapper">
        {/* Left Column - Main Order Content */}
        <div className="order-main-content">
          {/* Status Header */}
          <div className={`status-header ${order.status === 'approved' ? 'status-approved' : order.status === 'denied' ? 'status-cancelled' : ''}`}>
            <div className="status-header-content">
              {order.status === 'approved' ? (
                <CheckCircle className="status-icon" />
              ) : order.status === 'denied' ? (
                <XCircle className="status-icon" />
              ) : (
                <Package className="status-icon" />
              )}
              <div>
                <h2 className="status-title">
                  {order.status === 'approved'
                    ? 'Items Available! 🎉'
                    : order.status === 'denied'
                    ? 'Order Cancelled 😔'
                    : 'Order Pending...'}
                </h2>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="status-badge">
            <Package className="badge-icon" />
            <span className="badge-label">Order Status:</span>
            <span className={`badge-status ${order.status === 'approved' ? 'approved' : order.status === 'denied' ? 'cancelled' : ''}`}>
              {order.status === 'approved'
                ? '✅ Approved'
                : order.status === 'denied'
                ? '❌ Cancelled'
                : '⏳ Pending'}
            </span>
          </div>

          {/* Order Items */}
          <div className="order-section">
            <h3 className="order-section-title">
              <Package className="section-icon" />
              Order Items
            </h3>
            <div className="order-items">
              {orderData.items.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span role="img" aria-label="package">📦</span>
                    )}
                  </div>
                  <div className="item-details">
                    <h4 className="item-title">{item.name}</h4>
                    <div className="item-quantity-display">
                      <span className="quantity-label">Quantity:</span>
                      <span className="quantity-value">{item.quantity}</span>
                    </div>
                  </div>
                  <div className="item-price">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditional Content */}
          {order.status === 'approved' ? (
            <>
              <div className="cod-section">
                <div className="cod-card">
                  <div className="cod-details">
                    <div className="cod-icon-container">
                      <Banknote className="cod-icon" />
                    </div>
                    <div className="cod-info">
                      <h3 className="cod-title">Order Confirmed</h3>
                      <p className="cod-description">
                        Your order has been confirmed! Our team will prepare your items for delivery.
                      </p>
                      <div className="cod-delivery-info">
                        <Truck className="cod-delivery-icon" />
                        <span>Estimated delivery: {orderData.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                  <div className="cod-amount">
                    <span className="cod-amount-label">Total:</span>
                    <span className="cod-amount-value">₹{orderData.total}</span>
                  </div>
                </div>
                <div className="order-tracking-info">
                  <h4 className="tracking-title">What happens next?</h4>
                  <div className="tracking-steps">
                    <div className="tracking-step">
                      <div className="step-number">1</div>
                      <div className="step-text">We'll prepare your order for delivery</div>
                    </div>
                    <div className="tracking-step">
                      <div className="step-number">2</div>
                      <div className="step-text">You'll receive delivery updates via SMS/Email</div>
                    </div>
                    <div className="tracking-step">
                      <div className="step-number">3</div>
                      <div className="step-text">Pay cash to the delivery person</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : order.status === 'denied' ? (
            <>
              <div className="seller-message-section">
                <div className="seller-message-card">
                  <div className="seller-message-icon">
                    <MessageSquare className="seller-icon" />
                  </div>
                  <div>
                    <h3 className="seller-title">Message from Seller</h3>
                    <div className="seller-message-box">
                      <p>{order.denialReason || 'All Items not Available, Sorry!!'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="navigation-section">
                <div className="navigation-buttons">
                  <button onClick={handleReturnHome} className="nav-button home-button">
                    <Home className="nav-button-icon" />
                    Return to Home
                  </button>
                  <button onClick={handleReturnToCart} className="nav-button cart-button-bottom">
                    <ShoppingCart className="nav-button-icon" />
                    Return to Store
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Right Column - Order Summary Sidebar */}
        <div className="order-sidebar">
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{orderData.subtotal}</span>
              </div>
              <div className="summary-row">
                <span className="summary-shipping">
                  <Truck className="summary-icon" />
                  Shipping:
                </span>
                <span className="summary-shipping-status">
                  {orderData.shipping === 0 ? 'FREE' : `₹${orderData.shipping}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>{orderData.tax === 0 ? '₹0.00' : `₹${orderData.tax}`}</span>
              </div>
              <div className="summary-row">
                <span>Payment Method:</span>
                <span className="payment-method-badge">
                  <Banknote className="payment-method-icon" /> COD
                </span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span className="summary-total-value">₹{orderData.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;