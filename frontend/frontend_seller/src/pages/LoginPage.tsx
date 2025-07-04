
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { FormCard, Button } from '../components/FormCard';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/Landing');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard 
      title="Welcome Back" 
      subtitle="Sign in to your seller account"
    >
      <form onSubmit={handleSubmit} className="login-form">
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          <span className="login-button-content">
            {isLoading ? 'Signing In...' : 'Sign In'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </span>
        </Button>

        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link 
              to="/Signup" 
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
