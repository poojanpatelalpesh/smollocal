import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const PlaceOrder: React.FC = () => {
  const { sellerSlug } = useParams<{ sellerSlug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { customer, cartItems } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!customer || !cartItems) {
    return <div>Missing order details. Please go back and try again.</div>;
  }

  const handlePlaceOrder = async () => {
    console.log('Placing order...');
    setLoading(true);
    setError(null);
    try {
      console.log('Sending fetch to:', `${API_BASE}/api/customerOrder/placeOrder`);
      const res = await fetch(`${API_BASE}/api/customerOrder/placeOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerBusinessName: sellerSlug,
          products: cartItems.map((item: any) => ({ productId: item.product.id, quantity: item.quantity })),
          customerName: customer.name,
          customerPhone: customer.phone,
          customerAddress: customer.address,
        }),
      });
      if (!res.ok) throw new Error('Failed to place order');
      const data = await res.json();
      setSuccess(true);
      clearCart();
      navigate(`/store/${sellerSlug}/order-status/${data.orderId}`);
      console.log('Fetch response:', res);
    } catch (err: any) {
      setError(err.message || 'Error placing order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="placeorder-page">
      <h2>Order Summary</h2>
      <div>
        <strong>Name:</strong> {customer.name}<br />
        <strong>Phone:</strong> {customer.phone}<br />
        <strong>Address:</strong> {customer.address}<br />
      </div>
      <h3>Items:</h3>
      <ul>
        {cartItems.map((item: any) => (
          <li key={item.product.id}>{item.product.name} x {item.quantity}</li>
        ))}
      </ul>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success ? (
        <div style={{color:'green'}}>Order placed successfully! Redirecting...</div>
      ) : (
        <button onClick={handlePlaceOrder} disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
      )}
    </div>
  );
};

export default PlaceOrder; 