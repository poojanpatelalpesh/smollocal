import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { FormCard, Button } from '../components/FormCard';
import './Login.css';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    alert('Login successful! (This is a demo)');
  };

  return (
    <FormCard 
      title="Welcome Back" 
      subtitle="Sign in to your seller account"
    >
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-field">
          <label className="login-label">
            Email Address <span className="login-required">*</span>
          </label>
          <div className="login-input-container">
            <Mail className="login-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>
        </div>

        <div className="login-field">
          <label className="login-label">
            Password <span className="login-required">*</span>
          </label>
          <div className="login-input-container">
            <Lock className="login-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>
        </div>

        <Button type="submit">
          <span className="login-button-content">
            Sign In
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>

        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="login-link"
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </FormCard>
  );
};