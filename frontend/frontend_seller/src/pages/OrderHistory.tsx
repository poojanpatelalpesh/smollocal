import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import { useAuth } from '../context/AuthContext';
import { ordersAPI, Order } from '../services/api';
import './OrderHistory.css';

const OrderHistory: React.FC = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // Filter for completed orders

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
      // Filter to only include completed orders (approved, denied, paid) - exclude pending
      const completedOrders = ordersData.filter(
        order => ['approved', 'denied', 'paid'].includes(order.status)
      );
      setOrders(completedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load order history');
      console.error('Error loading order history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (id: string, message: string) => {
    console.log(`Message sent to order ${id}: ${message}`);
    // In a real app, you would send this to an API
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate counts for each completed status
  const statusCounts = {
    approved: orders.filter(order => order.status === 'approved').length,
    denied: orders.filter(order => order.status === 'denied').length,
    paid: orders.filter(order => order.status === 'paid').length,
    all: orders.length
  };

  if (error) {
    return (
      <div className="order-history">
        <div className="history-header">
          <h1>Order History</h1>
        </div>
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={loadOrders} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="history-header">
        <button className="back-button" onClick={() => navigate('/Landing')}>
                <ArrowLeft size={30} />
                </button>
        <h1>Order History</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by customer name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="status-filter-controls">
        <button 
          className={`status-filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
          onClick={() => setStatusFilter('all')}
        >
          All ({statusCounts.all})
        </button>
        <button 
          className={`status-filter-btn ${statusFilter === 'approved' ? 'active' : ''}`}
          onClick={() => setStatusFilter('approved')}
        >
          Approved ({statusCounts.approved})
        </button>
        <button 
          className={`status-filter-btn ${statusFilter === 'denied' ? 'active' : ''}`}
          onClick={() => setStatusFilter('denied')}
        >
          Denied ({statusCounts.denied})
        </button>
        <button 
          className={`status-filter-btn ${statusFilter === 'paid' ? 'active' : ''}`}
          onClick={() => setStatusFilter('paid')}
        >
          Paid ({statusCounts.paid})
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading order history...</p>
        </div>
      ) : (
        <OrderList 
          orders={filteredOrders}
          onAcceptOrder={() => {}}  // No-op in history view
          onCancelOrder={() => {}}  // No-op in history view
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default OrderHistory;