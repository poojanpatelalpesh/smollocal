
import React from 'react';
import OrderCard from './OrderCard';
import { Order } from '../services/api';
import './OrderList.css';

interface OrderListProps {
  orders: Order[];
  onAcceptOrder: (id: string) => void;
  onCancelOrder: (id: string) => void;
  onSendMessage?: (id: string, message: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ 
  orders, 
  onAcceptOrder, 
  onCancelOrder,
  onSendMessage
}) => {
  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <p>No orders found</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          onAccept={onAcceptOrder}
          onCancel={onCancelOrder}
          {...(onSendMessage ? { onSendMessage } : {})}
        />
      ))}
    </div>
  );
};

export default OrderList;
