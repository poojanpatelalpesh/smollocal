import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, Building, MapPin, Globe, ArrowRight } from 'lucide-react';
import { FormCard, Button } from '../components/FormCard';
import './Signup.css';

export const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    email: '',
    password: '',
    phoneNumber: '',
    businessName: '',
    storeAddress: '',
    domainName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 10) {
      handleInputChange('phoneNumber', value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([_, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.phoneNumber.length !== 10) {
      alert('Phone number must be exactly 10 digits');
      return;
    }

    // Handle signup logic here
    console.log('Signup attempt:', formData);
    alert('Account created successfully! (This is a demo)');
  };

  return (
    <FormCard 
      title="Create Account" 
      subtitle="Join our platform as a seller"
    >
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-field">
          <label className="signup-label">
            Seller Name <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <User className="signup-icon" />
            <input
              type="text"
              value={formData.sellerName}
              onChange={(e) => handleInputChange('sellerName', e.target.value)}
              placeholder="Enter seller name"
              required
              className="signup-input"
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
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit phone number"
              required
              maxLength={10}
              className="signup-input"
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
              value={formData.storeAddress}
              onChange={(e) => handleInputChange('storeAddress', e.target.value)}
              placeholder="Enter store address"
              required
              className="signup-input"
            />
          </div>
        </div>

        <div className="signup-field">
          <label className="signup-label">
            Domain Name <span className="signup-required">*</span>
          </label>
          <div className="signup-input-container">
            <Globe className="signup-icon" />
            <input
              type="text"
              value={formData.domainName}
              onChange={(e) => handleInputChange('domainName', e.target.value)}
              placeholder="Enter domain name"
              required
              className="signup-input"
            />
          </div>
        </div>

        <Button type="submit">
          <span className="signup-button-content">
            Create Account
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

        <div className="signup-footer">
          <p className="signup-footer-text">
            Already have an account?{' '}
            <Link 
              to="/login" 
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