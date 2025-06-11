import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import { Order } from '../types/models';
import { mockOrders } from '../data/mockData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAcceptOrder = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Accepted' } : order
    ));
  };

  const handleCancelOrder = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: 'Canceled' } : order
    ));
  };

  const handleSendMessage = (id: string, message: string) => {
    console.log(`Message sent to order ${id}: ${message}`);
    // In a real app, you would send this to an API
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filter);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Orders Dashboard</h1>
        <div className="filter-controls">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`filter-btn ${filter === 'canceled' ? 'active' : ''}`}
            onClick={() => setFilter('canceled')}
          >
            Canceled
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
    </div>
  );
};

export default Dashboard;
