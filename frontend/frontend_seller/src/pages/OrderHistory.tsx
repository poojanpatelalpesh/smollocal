import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import { Order } from '../types/models';
import { mockOrders } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      // Filter to only include accepted or canceled orders
      const historicalOrders = mockOrders.filter(
        order => order.status === 'Accepted' || order.status === 'Canceled'
      );
      setOrders(historicalOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSendMessage = (id: string, message: string) => {
    console.log(`Message sent to order ${id}: ${message}`);
    // In a real app, you would send this to an API
  };

  const filteredOrders = searchTerm
    ? orders.filter(order => 
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : orders;

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
            placeholder="Search by customer or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
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