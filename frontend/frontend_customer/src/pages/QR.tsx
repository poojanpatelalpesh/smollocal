import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Camera, Smartphone, CreditCard } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/qr.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const QR: React.FC = () => {
  const navigate = useNavigate();
  const { sellerSlug } = useParams<{ sellerSlug: string }>();
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sellerSlug) return;
    setLoading(true);
    setError('');
    fetch(`${API_BASE}/api/qr/${sellerSlug}`)
      .then(res => {
        if (!res.ok) throw new Error('QR code not found for this seller');
        return res.json();
      })
      .then(data => {
        setQrImage(data.qrImage);
        setError('');
      })
      .catch(err => {
        setError('No QR code found for this seller.');
        setQrImage(null);
      })
      .finally(() => setLoading(false));
  }, [sellerSlug]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDownloadClick = () => {
    if (!qrImage) return;
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `${sellerSlug || 'store'}-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="qr-container">
      {/* Back Button */}
      <button 
        onClick={handleBackClick}
        className="qr-back-button"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* QR Code Child Container */}
      <div className="qr-child-container">
        <h1 className="qr-title">QR CODE</h1>
        <div className="qr-code-container">
          <div className="qr-code-wrapper">
            {loading ? (
              <div style={{ minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>Loading QR...</span>
              </div>
            ) : error ? (
              <div style={{ color: '#dc2626', minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{error}</div>
            ) : qrImage ? (
              <img 
                src={qrImage} 
                alt="QR Code" 
                className="qr-code-image"
              />
            ) : null}
          </div>
        </div>
        <button 
          onClick={handleDownloadClick}
          className="qr-download-button"
          disabled={!qrImage}
        >
          <Download className="w-5 h-5 mr-2" />
          DOWNLOAD
        </button>
      </div>

      {/* Instructions Child Container */}
      <div className="instructions-child-container">
        <h2 className="payment-title">HOW TO MAKE PAYMENT</h2>
        <div className="payment-steps">
          <div className="payment-step">
            <div className="step-icon">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="step-content">
              <h3 className="step-title">Step 1: Open Payment App</h3>
              <p className="step-description">Open your preferred UPI app (GPay, PhonePe, Paytm, etc.) or banking app</p>
            </div>
          </div>
          <div className="payment-step">
            <div className="step-icon">
              <Camera className="w-6 h-6" />
            </div>
            <div className="step-content">
              <h3 className="step-title">Step 2: Scan QR Code</h3>
              <p className="step-description">Tap on "Scan QR" or camera icon and scan the QR code shown above</p>
            </div>
          </div>
          <div className="payment-step">
            <div className="step-icon">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="step-content">
              <h3 className="step-title">Step 3: Enter Amount</h3>
              <p className="step-description">Enter the payment amount and add a note if required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR;