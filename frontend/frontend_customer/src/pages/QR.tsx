import React from 'react';
import { ArrowLeft, Download, Camera, Smartphone, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/qr.css';
import QRcode from '../assets/images/QR.png';

const QR: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDownloadClick = () => {
    // Create a temporary link element to download the QR code
    const link = document.createElement('a');
    link.href = QRcode; // Use the imported image
    link.download = 'QRcode.png';
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

      {/* Parent Container for Parallel Layout */}
      <div className="qr-parent-container">
        
        {/* QR Code Child Container */}
        <div className="qr-child-container">
          {/* Title */}
          <h1 className="qr-title">
            QR CODE
          </h1>

          {/* QR Code Container */}
          <div className="qr-code-container">
            <div className="qr-code-wrapper">
              <img 
                src={QRcode} 
                alt="QR Code" 
                className="qr-code-image"
              />
            </div>
          </div>

          {/* Download Button */}
          <button 
            onClick={handleDownloadClick}
            className="qr-download-button"
          >
            <Download className="w-5 h-5 mr-2" />
            DOWNLOAD
          </button>
        </div>

        {/* Instructions Child Container */}
        <div className="instructions-child-container">
          <h2 className="payment-title">
            HOW TO MAKE PAYMENT
          </h2>
          
          <div className="payment-steps">
            <div className="payment-step">
              <div className="step-icon">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Step 1: Open Payment App</h3>
                <p className="step-description">
                  Open your preferred UPI app (GPay, PhonePe, Paytm, etc.) or banking app
                </p>
              </div>
            </div>

            <div className="payment-step">
              <div className="step-icon">
                <Camera className="w-6 h-6" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Step 2: Scan QR Code</h3>
                <p className="step-description">
                  Tap on "Scan QR" or camera icon and scan the QR code shown above
                </p>
              </div>
            </div>

            <div className="payment-step">
              <div className="step-icon">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="step-content">
                <h3 className="step-title">Step 3: Enter Amount</h3>
                <p className="step-description">
                  Enter the payment amount and add a note if required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR;