import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OurLogo from '../assets/images/Our-Logo.png';

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

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7890';

const CheckoutPage: React.FC<CheckoutPageProps> = ({ openCartSlider }) => {
  const { items: cartItems, addToCart, removeFromCart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    streetAddress: '',
    townCity: '',
    phoneNumber: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { sellerSlug } = useParams<{ sellerSlug: string }>();

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpModal && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpModal, timer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const generateOtp = () => {
  //   const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
  //   setGeneratedOtp(newOtp);
  //   console.log('Generated OTP:', newOtp); // In real app, this would be sent via SMS
  //   return newOtp;
  // };

  const generateOtp = () => {
  const newOtp = '1111'; // Temporary fixed OTP
  setGeneratedOtp(newOtp);
  console.log('Generated OTP:', newOtp); // In real app, this would be sent via SMS
  return newOtp;
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

    // Generate and show OTP modal
    generateOtp();
    setShowOtpModal(true);
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '']);
    
    // Focus first OTP input
    setTimeout(() => {
      otpRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (/^\d{1,4}$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
      setOtp(newOtp);
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 3);
      otpRefs.current[nextIndex]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      alert('Please enter complete 4-digit OTP');
      return;
    }

    setIsVerifying(true);

    setTimeout(async () => {
      if (enteredOtp === generatedOtp) {
        setIsVerifying(false);
        setShowOtpModal(false);
        try {
          const res = await fetch(`${API_BASE}/api/orders/customer/placeOrder`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sellerSlug,
              products: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
              })),
              customerName: formData.firstName + ' ' + formData.lastName,
              customerPhone: formData.phoneNumber,
              customerAddress: formData.streetAddress + ', ' + formData.townCity
            })
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Order failed');
          navigate(`/store/${sellerSlug}/order-status/${data.orderId}`);
          clearCart();
        } catch (err: any) {
          alert('Order failed: ' + (err.message || err));
        }
      } else {
        setIsVerifying(false);
        alert('Invalid OTP. Please try again.');
        setOtp(['', '', '', '']);
        otpRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResendOtp = () => {
    if (canResend) {
      generateOtp();
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '']);
      otpRefs.current[0]?.focus();
      alert('New OTP sent to your phone number');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="checkout-page">
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
                    <div className="item-price">₹{(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div><span>Subtotal:</span><span>₹{subtotal}</span></div>
                <div><span>Shipping:</span><span>Free</span></div>
                <div className="total"><span>Total:</span><span>₹{(total).toFixed(2)}</span></div>
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

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="otp-modal-overlay">
          <div className="otp-modal">
            <h3 className="otp-title">
              Verify Your Phone Number
            </h3>
            <p className="otp-subtitle">
              We've sent a 4-digit OTP to {formData.phoneNumber}
            </p>

            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { otpRefs.current[index] = el; }}
                  type="text"
                  value={digit}
                  onChange={e => handleOtpChange(index, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  maxLength={1}
                  className="otp-input"
                />
              ))}
            </div>

            <div className="otp-timer">
              {timer > 0 ? (
                <p className="timer-text">
                  Resend OTP in {formatTime(timer)}
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="resend-button"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <div className="otp-actions">
              <button
                onClick={() => setShowOtpModal(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying || otp.join('').length !== 4}
                className={`verify-button ${isVerifying || otp.join('').length !== 4 ? 'disabled' : ''}`}
              >
                {isVerifying ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;