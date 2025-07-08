import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import OrderList from '../components/OrderList';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, Order } from '../services/api';
import './Dashboard.css';
import Notification from '../components/Notification';

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('pending');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const prevOrderIds = React.useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!token) return;
    let isMounted = true;
    const poll = async () => {
      console.log('Polling orders...');
      try {
        const ordersData = await ordersAPI.getAll(token);
        if (isMounted) {
          setOrders([...ordersData]); // Always set new array to force re-render
          if (loading) setLoading(false);
        }
      } catch (err) {
        // Optionally handle polling errors
      }
    };
    poll(); // initial fetch
    const interval = setInterval(poll, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
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

  const handleAcceptOrder = async (id: string) => {
    if (!token) return;
    
    try {
      const updatedOrder = await ordersAPI.updateStatus(token, id, 'approved');
      setOrders(orders.map(order => 
        order._id === id ? updatedOrder : order
      ));
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('Failed to accept order');
    }
  };

  const handleCancelOrder = async (id: string) => {
    if (!token) return;
    
    const reason = prompt('Please provide a reason for cancellation:');
    if (reason === null) return; // User cancelled
    
    try {
      const updatedOrder = await ordersAPI.updateStatus(token, id, 'denied', reason);
      setOrders(orders.map(order => 
        order._id === id ? updatedOrder : order
      ));
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Failed to cancel order');
    }
  };

  const handleSendMessage = (id: string, message: string) => {
    console.log(`Message sent to order ${id}: ${message}`);
    // In a real app, you would send this to an API
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const orderCounts = {
    pending: orders.filter(order => order.status === 'pending').length,
    approved: orders.filter(order => order.status === 'approved').length,
    denied: orders.filter(order => order.status === 'denied').length,
    paid: orders.filter(order => order.status === 'paid').length,
    all: orders.length
  };

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-title-section">
            <Link to="/Landing" className="back-btn">
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </Link>
            <h1>Orders Dashboard</h1>
          </div>
          <div className="error-state">
            <p>Error: {error}</p>
            <button onClick={loadOrders} className="retry-btn">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <Link to="/Landing" className="back-btn">
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <h1>Orders Dashboard</h1>
        </div>
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({orderCounts.pending})
          </button>
          <button 
            className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved ({orderCounts.approved})
          </button>
          <button 
            className={`filter-btn ${filter === 'denied' ? 'active' : ''}`}
            onClick={() => setFilter('denied')}
          >
            Denied ({orderCounts.denied})
          </button>
          <button 
            className={`filter-btn ${filter === 'paid' ? 'active' : ''}`}
            onClick={() => setFilter('paid')}
          >
            Paid ({orderCounts.paid})
          </button>
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({orderCounts.all})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading orders...</p>
        </div>
      ) : (
        <OrderList 
          orders={filteredOrders}
          onAcceptOrder={handleAcceptOrder}
          onCancelOrder={handleCancelOrder}
          onSendMessage={handleSendMessage}
        />
      )}

      {showToast && (
        <Notification
          isOpen={showToast}
          onClose={() => setShowToast(false)}
          type="success"
          title="New Order"
          message={toastMessage}
          duration={3000}
        />
      )}
    </div>
  );
};

export default Dashboard;