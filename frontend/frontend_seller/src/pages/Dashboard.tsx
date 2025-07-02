import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import { Order } from '../types/models';
import { mockOrders } from '../data/mockData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAcceptOrder = (uuid: string) => {
    setOrders(orders.map(order =>
      order.uuid === uuid ? { ...order, status: 'Accepted' } : order
    ));
  };

  const handleCancelOrder = (uuid: string) => {
    setOrders(orders.map(order =>
      order.uuid === uuid ? { ...order, status: 'Canceled' } : order
    ));
  };

  const handleSendMessage = (uuid: string, message: string) => {
    console.log(`Message sent to order ${uuid}: ${message}`);
    alert("Message sent to customer successfully!!");
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Orders Dashboard</h1>
      </div>

      {loading ? (
        <div className="loading-state">
          <p>Loading orders...</p>
        </div>
      ) : (
        <OrderList 
          orders={orders}
          onAcceptOrder={handleAcceptOrder}
          onCancelOrder={handleCancelOrder}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Dashboard;
