import React from 'react';
import './Price.css';

const Price: React.FC = () => {
  return (
    <div className="parent-container">
      {/* Upper Container - 20% height */}
      <div className="upper-container">
        {/* Upper part - Title and description */}
        <div className="title-section">
          <h1 className="pricing-title">Pricing</h1>
          <p className="pricing-subtitle">
            We provide you with most affordable<br />
            solution with Zero hidden cost
          </p>
        </div>
        
        {/* Lower part - Headers */}
        <div className="headers-section">
          <div className="header-item key-features-header">Key Features</div>
          <div className="header-item monthly-header"><h1>Monthly</h1></div>
          <div className="header-item quarterly-header">
            <span className="popular-badge">🔥 Popular</span>
            <h1>Quarterly</h1>
          </div>
          <div className="header-item yearly-header"><h1>Yearly</h1></div>
        </div>
      </div>

      {/* Lower Container - 80% height */}
      <div className="lower-container">
        <div className="content-item key-features-content">
          <div className="feature-row"><h2>WhatsApp Messages</h2></div>
          <div className="feature-row"><h2>Manage Customers</h2></div>
          <div className="feature-row"><h2>Online Store</h2></div>
        </div>
        
        <div className="content-item monthly-content">
          <div className="content-row"><h2>1000 Messages</h2></div>
          <div className="content-row checkmark">✓</div>
          <div className="content-row checkmark">✓</div>
          <div className="bonus-section">
            <div className="bonus-text">
              Bonus<br />
              No commission<br />
              for first 10<br />
              Orders*
            </div>
          </div>
          <div className="price-section">
            <div className="price">1299 INR</div>
            <div className="price-addition">+</div>
            <div className="commission">10% on each order</div>
          </div>
        </div>
        
        <div className="content-item quarterly-content">
          <div className="content-row"><h2>3200 Messages</h2></div>
          <div className="content-row checkmark">✓</div>
          <div className="content-row checkmark">✓</div>
          <div className="bonus-section">
            <div className="bonus-text">
              Bonus<br />
              No commission<br />
              for first 10<br />
              Orders*
            </div>
          </div>
          <div className="price-section">
            <div className="price">1299 INR</div>
            <div className="price-addition">+</div>
            <div className="commission">10% on each order</div>
          </div>
        </div>
        
        <div className="content-item yearly-content">
          <div className="content-row"><h2>1000 Messages</h2></div>
          <div className="content-row checkmark">✓</div>
          <div className="content-row checkmark">✓</div>
          <div className="bonus-section">
            <div className="bonus-text">
              Bonus<br />
              No commission<br />
              for first 10<br />
              Orders*
            </div>
          </div>
          <div className="price-section">
            <div className="price">1299 INR</div>
            <div className="price-addition">+</div>
            <div className="commission">10% on each order</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;