import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './ConfirmModal.css';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

const TEMPLATES = [
  'Sorry, this item is currently out of stock.',
  'We are unable to fulfill this order at this time.',
  'Order cancelled due to incorrect pricing or product information.'
];

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ isOpen, onClose, onConfirm, isLoading }) => {
  const [customReason, setCustomReason] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTemplateClick = (reason: string) => {
    if (!isLoading) onConfirm(reason);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customReason.trim()) {
      setError('Please enter a reason or select a template.');
      return;
    }
    setError('');
    onConfirm(customReason.trim());
  };

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <div className="confirm-modal-icon-container">
            <AlertTriangle className="confirm-modal-icon danger" />
          </div>
          <button onClick={onClose} className="confirm-modal-close-btn" disabled={isLoading}>
            <X size={20} />
          </button>
        </div>
        <div className="confirm-modal-content">
          <h3 className="confirm-modal-title">Cancel Order</h3>
          <p className="confirm-modal-message">Please select a reason for cancelling this order, or type your own.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '18px 0' }}>
            {TEMPLATES.map((t, i) => (
              <button
                key={i}
                type="button"
                className="confirm-modal-btn confirm-modal-btn-warning"
                style={{ textAlign: 'left', justifyContent: 'flex-start', fontWeight: 500, fontSize: '1rem', padding: '12px 16px' }}
                onClick={() => handleTemplateClick(t)}
                disabled={isLoading}
              >
                {t}
              </button>
            ))}
          </div>
          <form onSubmit={handleCustomSubmit} style={{ marginTop: 12 }}>
            <textarea
              className="message-input"
              placeholder="Or type your own reason..."
              rows={3}
              value={customReason}
              onChange={e => setCustomReason(e.target.value)}
              disabled={isLoading}
              style={{ width: '100%', borderRadius: 8, border: '1px solid #e5e7eb', padding: '10px', fontSize: '1rem', marginBottom: 8 }}
            />
            {error && <div style={{ color: '#dc2626', marginBottom: 8 }}>{error}</div>}
            <div className="confirm-modal-actions">
              <button
                type="button"
                className="confirm-modal-btn confirm-modal-btn-cancel"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="confirm-modal-btn confirm-modal-btn-danger"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Submit Reason'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal; 