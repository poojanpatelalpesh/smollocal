import React from 'react';
import './FromCard.css';

interface FormCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const FormCard: React.FC<FormCardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="form-card-container">
      <div className="form-card-wrapper">
        <div className="form-card">
          <div className="form-card-header">
            <h1 className="form-card-title">{title}</h1>
            <p className="form-card-subtitle">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  pattern,
  maxLength
}) => {
  return (
    <div className="input-field">
      <label className="input-field-label">
        {label} {required && <span className="input-field-required">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        className="input-field-input"
      />
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  type = 'button', 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`form-button ${className}`}
    >
      {children}
    </button>
  );
};