import React from 'react';
import Notification from './components/Notification';
import { ordersAPI } from './services/api';
import { useAuth } from './context/AuthContext';

const OrderNotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const { token } = useAuth();
  const prevOrderIds = React.useRef<Set<string>>(new Set());
  const firstPollDone = React.useRef(false);

  React.useEffect(() => {
    if (!token) return;
    let isMounted = true;
    const poll = async () => {
      try {
        const ordersData = await ordersAPI.getAll(token);
        if (isMounted) {
          const newOrderIds = new Set(ordersData.map(o => o._id));
          if (!firstPollDone.current) {
            // On first poll, just set the IDs, no notification
            prevOrderIds.current = newOrderIds;
            firstPollDone.current = true;
          } else {
            const prevIds = prevOrderIds.current;
            const trulyNewOrders = ordersData.filter(o => !prevIds.has(o._id));
            if (trulyNewOrders.length > 0) {
              trulyNewOrders.forEach(order => {
                setToastMessage(`New order from ${order.customer?.name || order.customerName || 'Customer'}!`);
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
              });
            }
            prevOrderIds.current = newOrderIds;
          }
        }
      } catch {}
    };
    poll();
    const interval = setInterval(poll, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token]);

  return (
    <>
      <Notification
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        type="info"
        title="New Order"
        message={toastMessage}
        duration={3000}
      />
      {children}
    </>
  );
};

export default OrderNotificationProvider; 