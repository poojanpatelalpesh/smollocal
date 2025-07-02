import React from 'react';
import OrderCard from './OrderCard';
import { Order } from '../types/models';
import './OrderList.css';

interface OrderListProps {
  orders: Order[];
  onAcceptOrder: (uuid: string) => void;
  onCancelOrder: (uuid: string) => void;
  onSendMessage: (uuid: string, message: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({
  orders,
  onAcceptOrder,
  onCancelOrder,
  onSendMessage,
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
          key={order.uuid}
          order={order}
          onAccept={() => onAcceptOrder(order.uuid)}
          onCancel={() => onCancelOrder(order.uuid)}
          onSendMessage={(message) => onSendMessage(order.uuid, message)}
        />
      ))}
    </div>
  );
};

export default OrderList;
