import React, { useState } from 'react';
import './OrderCard.css';
import { CheckCircle, XCircle } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Order } from '../types/models';

const OrderCard: React.FC = () => {
  const [order, setOrder] = useState<Order>(mockOrders[0]);
  const [message, setMessage] = useState('');

  const handleAccept = () => {
    setOrder({ ...order, status: 'Accepted' });
  };

  const handleCancel = () => {
    setOrder({ ...order, status: 'Canceled' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Message sent to ${order.customer.name}: ${message}`);
      setMessage('');
    }
  };

  return (
    <div className="order-card">
      <h2 className="order-title">Order #{order.id}</h2>

      <div className="order-content-wrapper">
        <div className="order-details-container">
          <div className="product-info">
            <h4>Products</h4>
            {order.products.map((product, index) => (
              <div className="product-item" key={index}>
                <span className="product-name">{product.name}</span>
                <span className="product-quantity">Qty: {product.quantity}</span>
              </div>
            ))}
          </div>

          <div className="customer-info">
            <h4>Customer</h4>
            <div className="customer-name">{order.customer.name}</div>
            <div className="customer-address">{order.customer.address}</div>
          </div>

          <div className="order-status">
            <span className={`status-badge status-${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="order-actions-container">
          {order.status === 'Pending' && (
            <div className="action-buttons">
              <button
                style={{ backgroundColor: '#06D6A0' }}
                onClick={handleAccept}
              >
                <CheckCircle size={16} />
                Accept
              </button>
              <button
                style={{ backgroundColor: '#FF0033' }}
                onClick={handleCancel}
              >
                <XCircle size={16} />
                Cancel
              </button>
            </div>
          )}

          <div className="message-box">
            <h4>Message Customer</h4>
            <textarea
              className="message-input"
              placeholder="Type your message here..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="message-send"
              style={{ backgroundColor: '#4F46E5' }}
              onClick={handleSendMessage}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
