import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Building, MapPin, ArrowRight } from 'lucide-react';
import { FormCard, Button } from '../components/FormCard';
import { useAuth } from '../context/AuthContext';
import './Signup.css';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      handleInputChange('phone', value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validation
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.phone.length !== 10) {
      setError('Phone number must be exactly 10 digits');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('/Landing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard 
      title="Create Account" 
      subtitle="Join our platform as a seller"
    >
      <form onSubmit={handleSubmit} className="signup-form">
        {error && (
          <div className="error-message" style={{ 
            color: 'red', 
            marginBottom: '1rem', 
            textAlign: 'center',
            padding: '0.5rem',
            backgroundColor: '#fee',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        <div className="signup-field">
          <label className="signup-label">
            Seller Name <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <User className="signup-icon" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter seller name"
              required
              className="signup-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="signup-field">
          <label className="signup-label">
            Email Address <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <Mail className="signup-icon" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter email address"
              required
              className="signup-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="signup-field">
          <label className="signup-label">
            Password <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <Lock className="signup-icon" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Create password"
              required
              className="signup-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="signup-field">
          <label className="signup-label">
            Phone Number <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <Phone className="signup-icon" />
            <input
              type="tel"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
              required
              maxLength={10}
              className="signup-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="signup-field">
          <label className="signup-label">
            Business Name <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <Building className="signup-icon" />
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Enter business name"
              required
              className="signup-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="signup-field">
          <label className="signup-label">
            Store Address <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <MapPin className="signup-icon" />
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Enter store address"
              required
              className="signup-input"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          <span className="signup-button-content">
            {isLoading ? 'Creating Account...' : 'Create Account'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </span>
        </Button>

        <div className="signup-footer">
          <p className="signup-footer-text">
            Already have an account?{' '}
            <Link 
              to="/Login" 
              className="signup-link"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </FormCard>
  );
};