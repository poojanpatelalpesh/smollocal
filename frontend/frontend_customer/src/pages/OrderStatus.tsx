import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Package, CreditCard, Truck, MessageSquare, Loader2, Home, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/orderstatus.css';
import { useCart } from '../context/CartContext';

interface OrderStatusProps {
  openCartSlider: () => void;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ openCartSlider }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Processing your order...');

  // Access state passed via navigation from checkout
  const state = location.state as {
    formData: {
      firstName: string;
      lastName: string;
      streetAddress: string;
      townCity: string;
      phoneNumber: string;
    };
    paymentMethod: 'online' | 'cod';
    cartItems: {
      product: {
        id: number;
        name: string;
        description?: string;
        price: number;
        image?: string;
      };
      quantity: number;
    }[];
    total: number;
  } | undefined;

  // If no state or paymentMethod is not online, show message and redirect option
  if (!state || state.paymentMethod !== 'online') {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>This page is accessible only after selecting "Pay Online" at checkout.</h2>
        <button 
          onClick={() => navigate('/')} 
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            backgroundColor: '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Go back to Home
        </button>
      </div>
    );
  }

  const [orderStatus, setOrderStatus] = useState('approved');
  const [sellerMessage, setSellerMessage] = useState('');

  // Loading simulation with different messages
  useEffect(() => {
    const loadingMessages = [
      'Processing your order...',
      'Verifying payment details...',
      'Contacting seller...',
      'Finalizing order status...',
      'Almost ready...'
    ];

    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex++;
        setLoadingText(loadingMessages[messageIndex]);
      }
    }, 800);

    // Simulate loading time (3-4 seconds)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      clearInterval(messageInterval);
    }, 4000);

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(messageInterval);
    };
  }, []);

  const orderData = {
    orderId: '#ORD-2025-001234',
    items: state.cartItems.map(item => ({
      id: item.product.id,
      name: item.product.name,
      description: item.product.description || '',
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image || '',
    })),
    subtotal: state.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    shipping: 0,
    tax: 0,
    total: state.total,
    paymentMethod: 'Credit Card',
    estimatedDelivery: '3-5 business days',
  };

  const handlePayClick = () => {
    console.log('Redirecting to payment...');
    // You can add payment loading state here if needed
    // setIsLoading(true);
    // setLoadingText('Redirecting to payment gateway...');
  };

  // Navigation handlers for cancelled orders
  const handleReturnHome = () => {
    navigate('/');
  };

  const handleReturnToCart = () => {
    // Navigate back to cart with current cart items
    navigate('/cart', { 
      state: { 
        cartItems: state.cartItems,
        returnFromOrder: true 
      } 
    });
    openCartSlider(); // Open the cart slider after navigation
  };

  // Toggle order status with loading simulation
  const handleStatusToggle = (newStatus: string) => {
    setIsLoading(true);
    setLoadingText(`Updating order status to ${newStatus}...`);
    
    setTimeout(() => {
      setOrderStatus(newStatus);
      setIsLoading(false);
    }, 1500);
  };

  // Loading Component
  const LoadingWindow = () => (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-content">
          {/* Animated Logo/Icon */}
          <div className="loading-icon-container">
            <div className="loading-icon-wrapper">
              <Package className="loading-package-icon" />
              <Loader2 className="loading-spinner" />
            </div>
          </div>
          
          {/* Loading Text */}
          <h2 className="loading-title">Please Wait</h2>
          <p className="loading-message">{loadingText}</p>
          
          {/* Progress Bar */}
          <div className="loading-progress">
            <div className="loading-progress-bar"></div>
          </div>
          
          {/* Loading Dots */}
          <div className="loading-dots">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        </div>
      </div>
    </div>
  );

  // Show loading screen
  if (isLoading) {
    return <LoadingWindow />;
  }

  return (
    <div className="order-container">
      {/* Demo Toggle - Remove in production */}
      <div className="demo-toggle">
        <button
          onClick={() => handleStatusToggle('approved')}
          className={`toggle-button ${orderStatus === 'approved' ? 'approved' : ''}`}
        >
          ✅ Approved State
        </button>
        <button
          onClick={() => handleStatusToggle('cancelled')}
          className={`toggle-button ${orderStatus === 'cancelled' ? 'cancelled' : ''}`}
        >
          ❌ Cancelled State
        </button>
      </div>

      <div className="order-wrapper">
        {/* Left Column - Main Order Content */}
        <div className="order-main-content">
          {/* Status Header */}
          <div className={`status-header ${orderStatus === 'approved' ? 'status-approved' : 'status-cancelled'}`}>
            <div className="status-header-content">
              {orderStatus === 'approved' ? (
                <CheckCircle className="status-icon" />
              ) : (
                <XCircle className="status-icon" />
              )}
              <div>
                <h2 className="status-title">
                  {orderStatus === 'approved' ? 'Items Available! 🎉' : 'Order Cancelled 😔'}
                </h2>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="status-badge">
            <Package className="badge-icon" />
            <span className="badge-label">Order Status:</span>
            <span className={`badge-status ${orderStatus === 'approved' ? 'approved' : 'cancelled'}`}>
              {orderStatus === 'approved' ? '✅ Approved' : '❌ Cancelled'}
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
                      {orderStatus === 'approved' && (
                        <span className="quantity-note"></span>
                      )}
                    </div>
                  </div>
                  <div className="item-price">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditional Content */}
          {orderStatus === 'approved' ? (
            <div className="payment-section">
              <div className="payment-card">
                <div className="payment-details">
                  <div className="payment-icon-container">
                    <CreditCard className="payment-icon" />
                  </div>
                  <div>
                    <h3 className="payment-title">Complete Your Payment</h3>
                  </div>
                </div>
                <button onClick={handlePayClick} className="payment-button">
                  Pay Now 
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="seller-message-section">
                <div className="seller-message-card">
                  <div className="seller-message-icon">
                    <MessageSquare className="seller-icon" />
                  </div>
                  <div>
                    <h3 className="seller-title">Message from Seller</h3>
                    <div className="seller-message-box">
                      <p>All Items not Available, Sorry!!</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation buttons for cancelled orders */}
              <div className="navigation-section">
                <div className="navigation-buttons">
                  <button onClick={handleReturnHome} className="nav-button home-button">
                    <Home className="nav-button-icon" />
                    Return to Home
                  </button>
                  <button onClick={handleReturnToCart} className="nav-button cart-button">
                    <ShoppingCart className="nav-button-icon" />
                    Return to Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Order Summary Sidebar */}
        <div className="order-sidebar">
          <div className="order-summary">
            <h3 className="summary-title">Order Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${orderData.subtotal}</span>
              </div>
              <div className="summary-row">
                <span className="summary-shipping">
                  <Truck className="summary-icon" />
                  Shipping:
                </span>
                <span className="summary-shipping-status">
                  {orderData.shipping === 0 ? 'FREE' : `$${orderData.shipping}`}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>{orderData.tax === 0 ? '$0.00' : `$${orderData.tax}`}</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span className="summary-total-value">${orderData.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
