import React from 'react';
import { X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import './ConfirmModal.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: 'danger' | 'warning' | 'info' | 'success';
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="confirm-modal-icon danger" />;
      case 'warning':
        return <AlertTriangle className="confirm-modal-icon warning" />;
      case 'success':
        return <CheckCircle className="confirm-modal-icon success" />;
      case 'info':
        return <Info className="confirm-modal-icon info" />;
      default:
        return <AlertTriangle className="confirm-modal-icon warning" />;
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'confirm-modal-btn confirm-modal-btn-danger';
      case 'warning':
        return 'confirm-modal-btn confirm-modal-btn-warning';
      case 'success':
        return 'confirm-modal-btn confirm-modal-btn-success';
      case 'info':
        return 'confirm-modal-btn confirm-modal-btn-info';
      default:
        return 'confirm-modal-btn confirm-modal-btn-warning';
    }
  };

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal-header">
          <div className="confirm-modal-icon-container">
            {getIcon()}
          </div>
          <button 
            onClick={onClose} 
            className="confirm-modal-close-btn"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="confirm-modal-content">
          <h3 className="confirm-modal-title">{title}</h3>
          <p className="confirm-modal-message">{message}</p>
        </div>

        <div className="confirm-modal-actions">
          <button
            onClick={onClose}
            className="confirm-modal-btn confirm-modal-btn-cancel"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={getButtonClass()}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="confirm-modal-loading">
                <div className="confirm-modal-spinner"></div>
                <span>Processing...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 