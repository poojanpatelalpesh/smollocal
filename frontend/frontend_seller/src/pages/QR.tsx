import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { qrAPI } from '../services/api';
import './QR.css';

const QR: React.FC = () => {
  const { token, seller } = useAuth();
  const navigate = useNavigate();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [storeUrl, setStoreUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (token) {
      generateQRCode();
    }
  }, [token]);

  const generateQRCode = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await qrAPI.generateQR(token);
      setQrCodeUrl(response.qrImage);
      setStoreUrl(response.storeUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      console.error('Error generating QR code:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = async () => {
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${seller?.businessName?.replace(/\s+/g, '_') || 'store'}_QR_Code.png`;
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

  if (isLoading) {
    return (
      <div className="qr-container">
        <div className="qr-header">
          <h1 className="qr-title">QR CODE DASHBOARD</h1>
        </div>
        <div className="qr-content">
          <div className="loading-message">Generating QR Code...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="qr-container">
      <div className="qr-header">
        <div className="qr-title">
          <button className="back-button" onClick={() => navigate('/Landing')}>
        <ArrowLeft size={30} />
        </button>
        </div>
      </div>

      <div className="qr-content">
        {error && (
          <div className="error-message" style={{ 
            color: 'red', 
            marginBottom: '1rem', 
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#fee',
            borderRadius: '8px'
          }}>
            {error}
          </div>
        )}

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
              disabled={!storeUrl}
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
