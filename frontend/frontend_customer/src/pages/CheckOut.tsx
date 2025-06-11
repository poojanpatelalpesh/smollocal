import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Added useNavigate

interface FormData {
  firstName: string;
  lastName: string;
  streetAddress: string;
  townCity: string;
  phoneNumber: string;
}

interface CheckoutPageProps {
  openCartSlider: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ openCartSlider }) => {
  const { items: cartItems, addToCart, removeFromCart, getCartTotal } = useCart();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    townCity: '',
    phoneNumber: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');

  const navigate = useNavigate(); // ✅ Added

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'townCity', 'phoneNumber'];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        alert('Please fill all required fields marked with *');
        return;
      }
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    console.log('Order placed:', { formData, paymentMethod, cartItems });
    navigate('/order-status', { state: { formData, paymentMethod, cartItems, total } }); // ✅ Replaced alert
  };

  return (
    <div className="checkout-page">
      <div className="header">
        <div className="container header-content">
          <h1 className="company-logo">OUR company logo</h1>
          <div className="breadcrumb">
            <Link to="/">Product</Link> /{' '}
            <button
              type="button"
              onClick={openCartSlider}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: '#4f46e5',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              View Cart
            </button>{' '}
            / <span className="active">CheckOut</span>
          </div>
        </div>
      </div>

      <div className="container checkout-content">
        <div className="checkout-box">
          {/* Billing Details */}
          <div className="billing-details">
            <h2>Billing Details</h2>
            <form className="billing-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Please enter letters only"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="lastName">Last Name *</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Please enter letters only"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="streetAddress">Street Address *</label>
                <input
                  id="streetAddress"
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z0-9\s,.-]+"
                  title="Please enter letters and numbers only"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="townCity">Town/City *</label>
                <input
                  id="townCity"
                  type="text"
                  name="townCity"
                  value={formData.townCity}
                  onChange={handleInputChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Please enter letters only"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  pattern="\d{10}"
                  maxLength={10}
                  title="Please enter exactly 10 digits"
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div className="save-info flex items-center gap-2">
                <input type="checkbox" id="saveInfo" />
                <label htmlFor="saveInfo">Save this information for faster check-out next time</label>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="sticky-box">
              <h2>Your Order</h2>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.product.id} className="cart-item">
                    <div className="item-image">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' fill='%23f3f4f6'/><text x='24' y='24' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='16' fill='%236b7280'>${item.product.name.charAt(0)}</text></svg>`;
                        }}
                      />
                    </div>
                    <div className="item-info">
                      <h4>{item.product.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <button type="button" onClick={() => removeFromCart(item.product.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => addToCart(item.product)}>+</button>
                      </div>
                    </div>
                    <div className="item-price">₹{item.product.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div><span>Subtotal:</span><span>₹{subtotal}</span></div>
                <div><span>Shipping:</span><span>Free</span></div>
                <div className="total"><span>Total:</span><span>₹{total}</span></div>
              </div>

              <div className="payment-methods">
                <h3>Payment Method</h3>
                <div className="payment-options">
                  <div>
                    <input
                      type="radio"
                      id="payOnline"
                      name="payment"
                      value="online"
                      checked={paymentMethod === 'online'}
                      onChange={e => setPaymentMethod(e.target.value as 'online' | 'cod')}
                    />
                    <label htmlFor="payOnline">Pay Online</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={e => setPaymentMethod(e.target.value as 'online' | 'cod')}
                    />
                    <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                  </div>
                </div>
              </div>

              <button onClick={handleSubmit} className="place-order-btn">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
