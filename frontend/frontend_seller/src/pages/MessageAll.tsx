import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MessageAll.css';

interface MessageAllProps {
  totalCustomers?: number; // optional prop for total customers count
}

const MessageAll: React.FC<MessageAllProps> = ({ totalCustomers = 0 }) => {
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    if (input.length <= 500) {
      setMessage(input);
    } else {
      setMessage(input.slice(0, 500));
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      alert(`Message sent to all customers!`);
      setMessage('');
    }
  };

  const getPreviewMessage = () => {
    return message || '';
  };

  return (
    <div className="message-all-container">
      <div className="message-all-header">
        <div className="header-content">
          <div className="header-with-back">
            <button className="back-button" onClick={() => navigate(-1)}>
              <ArrowLeft size={30} />
            </button>
            <h1>MESSAGE ALL CUSTOMERS</h1>
          </div>
        </div>
      </div>

      <div className="message-all-content">
        <div className="message-input-section">
          <div className="input-container">
            <div className="input-header">
              <div className="header-with-icon">
                <div className="dashboard-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                </div>
                <h2>COMPOSE MESSAGE</h2>
              </div>
            </div>

            <div className="message-form">
              <div className="textarea-container">
                <textarea
                  className="message-textarea"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  value={message}
                  onChange={handleMessageChange}
                  rows={8}
                />
                <div className="character-count">
                  {message.length}/500 characters
                </div>
              </div>

              <div className="send-options">
                <button className="send-button" onClick={handleSendMessage}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                  SEND NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-section">
          <div className="preview-container">
            <div className="preview-header">
              <h3>MESSAGE PREVIEW</h3>
              <div className="recipient-info">
                <span>📱 {totalCustomers.toLocaleString()} recipients</span>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-message-box">
                <div className="message-header">
                  <div className="sender-info">
                    <div className="sender-avatar">📱</div>
                    {/* Removed sender-details block */}
                  </div>
                  <div className="message-time">Now</div>
                </div>
                <div
                  className="message-content"
                  style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                >
                  {getPreviewMessage()}
                </div>

                <div className="message-footer">
                  <span className="delivery-status">✓ Ready to send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAll;