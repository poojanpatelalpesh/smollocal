import React, { useState, useEffect, useRef } from 'react';
import './QR.css';

interface QRProps {
  sellerId?: string;
  storeName?: string;
}

const QR: React.FC<QRProps> = ({ 
  sellerId = "seller123", 
  storeName = "My Store" 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState<string>('http://localhost:5174'); // Hardcoded for local testing
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Commented dynamic URL generation for now
    // const baseUrl = window.location.origin;
    // const generatedStoreUrl = `${baseUrl}/store/${sellerId}`;
    // setStoreUrl(generatedStoreUrl);
    // generateQRCode(generatedStoreUrl);

    generateQRCode('http://localhost:5174'); // Using hardcoded localhost for testing
  }, [sellerId]);

  const generateQRCode = async (url: string) => {
    try {
      const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
      setQrCodeUrl(qrApiUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${storeName.replace(/\s+/g, '_')}_QR_Code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <div className="qr-container">
      <div className="qr-header">
        <h1 className="qr-title">QR CODE DASHBOARD</h1>
      </div>

      <div className="qr-content">
        <div className="qr-section">
          <div className="qr-section-header">
            <h2>QR CODE</h2>
          </div>
          
          <div className="qr-code-container">
            {qrCodeUrl && (
              <div className="qr-code-wrapper">
                <img 
                  src={qrCodeUrl} 
                  alt="Store QR Code" 
                  className="qr-code-image"
                />
              </div>
            )}
            
            <button 
              className="download-btn"
              onClick={downloadQRCode}
              disabled={!qrCodeUrl}
            >
              <span className="download-icon">⬇</span>
              DOWNLOAD
            </button>
          </div>
        </div>

        <div className="store-section">
          <div className="store-section-header">
            <h2>STORE LINK</h2>
          </div>
          
          <div className="store-content">
            <div className="url-container">
              <div className="url-label">URL:</div>
              <div className="url-display">
                <input 
                  type="text" 
                  value={storeUrl} 
                  readOnly 
                  className="url-input"
                />
              </div>
            </div>
            
            <button 
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
            >
              <span className="copy-icon">📋</span>
              {copied ? 'COPIED!' : 'COPY'}
            </button>
            
            <div className="store-info">
              <p className="store-description">
                Share this QR code or URL with your customers so they can easily 
                browse and purchase products from your store.
              </p>
              
              <div className="usage-tips">
                <h3>How to use:</h3>
                <ul>
                  <li>Download the QR code and print it for physical locations</li>
                  <li>Share the URL link through social media or messaging</li>
                  <li>Add the QR code to your business cards or flyers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR;
