
import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X, AlertTriangle, Info } from 'lucide-react';
import './Notification.css';

interface NotificationProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  isOpen,
  onClose,
  type,
  title,
  message,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="notification-icon success" />;
      case 'error':
        return <XCircle className="notification-icon error" />;
      case 'warning':
        return <AlertTriangle className="notification-icon warning" />;
      case 'info':
        return <Info className="notification-icon info" />;
      default:
        return <Info className="notification-icon info" />;
    }
  };

  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        <div className="notification-icon-container">
          {getIcon()}
        </div>
        <div className="notification-text">
          <h4 className="notification-title">{title}</h4>
          {message && <p className="notification-message">{message}</p>}
        </div>
        <button onClick={onClose} className="notification-close">
          <X size={16} />
        </button>
      </div>
      <div className="notification-progress">
        <div 
          className="notification-progress-bar"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default Notification; 