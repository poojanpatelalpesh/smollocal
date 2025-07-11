import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OurLogo from '../assets/images/Our-Logo.png';
import '../styles/hero.css';

const LandingPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Check for error passed via state (from StorePage)
  useEffect(() => {
    if (location.state && location.state.error) {
      setError(location.state.error);
      // Clean up state so error doesn't persist on next visit
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let slug = '';
    // Accept either a full link or just the code
    try {
      const url = new URL(input);
      // Try to extract /store/:sellerSlug
      const match = url.pathname.match(/\/store\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        slug = match[1];
      } else {
        setError('Please enter a valid store link or code.');
        return;
      }
    } catch {
      // Not a URL, treat as code
      if (/^[a-zA-Z0-9_-]+$/.test(input.trim())) {
        slug = input.trim();
      } else {
        setError('Please enter a valid store link or code.');
        return;
      }
    }
    navigate(`/store/${slug}`);
  };

  return (
    <div className="landing-hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #e0f7fa 0%, #fff 100%)' }}>
      <img src={OurLogo} alt="Logo" style={{ width: 180, marginBottom: 24 }} />
      <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#003e29', marginBottom: 8 }}>Welcome to Your Storefront</h1>
      <p style={{ fontSize: '1.2rem', color: '#333', marginBottom: 32, maxWidth: 400, textAlign: 'center' }}>
        Shop directly from your favorite vendor. Enter the store link or code you received to start shopping!
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 340 }}>
        <input
          type="text"
          placeholder="Paste store link or enter code"
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ padding: '0.75rem 1rem', fontSize: '1rem', borderRadius: 8, border: '1px solid #b2dfdb', marginBottom: 12, width: '100%' }}
        />
        <button
          type="submit"
          style={{ background: '#003e29', color: 'white', fontWeight: 600, fontSize: '1.1rem', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
        >
          Go to Store
        </button>
        {error && (
          <div style={{
            color: '#d32f2f',
            marginTop: 18,
            fontSize: '1.08rem',
            background: '#fff3f3',
            border: '1px solid #ffcdd2',
            borderRadius: 8,
            padding: '12px 18px',
            maxWidth: 340,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(211,47,47,0.07)'
          }}>
            <strong>Oops!</strong> We don’t recognize that store link or code.<br />
            Please double-check and try again, or contact your vendor for the correct link.
          </div>
        )}
      </form>
      <div style={{ marginTop: 40, color: '#666', fontSize: '1rem', maxWidth: 400, textAlign: 'center' }}>
        <span>Don’t have a store link? Please contact your vendor to get access.</span>
      </div>
    </div>
  );
};

export default LandingPage;
