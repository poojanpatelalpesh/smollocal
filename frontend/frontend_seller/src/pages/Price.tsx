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

      {/* Lower Container - 80% height - Desktop Only */}
      <div className="lower-container">
        {/* Key Features Column - Only 3 rows */}
        <div className="content-item key-features-content">
          <div className="feature-row"><h2>WhatsApp Messages</h2></div>
          <div className="feature-row"><h2>Manage Customers</h2></div>
          <div className="feature-row"><h2>Online Store</h2></div>
          {/* No bonus or price sections here */}
        </div>
        
        {/* Monthly Column - Full height with all sections */}
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
        
        {/* Quarterly Column - Full height with all sections */}
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
        
        {/* Yearly Column - Full height with all sections */}
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

      {/* Mobile Layout - Hidden on Desktop */}
      <div className="mobile-plan-container">
        {/* Monthly Plan Section */}
        <div className="mobile-plan-section">
          <div className="mobile-plan-header">
            <div className="mobile-key-features-header">Key Features</div>
            <div className="mobile-plan-header-section mobile-monthly-header">Monthly</div>
          </div>
          <div className="mobile-plan-content">
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">WhatsApp Messages</div>
              <div className="mobile-feature-value mobile-monthly-value">1000 Messages</div>
            </div>
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">Manage Customers</div>
              <div className="mobile-feature-value mobile-monthly-value">✓</div>
            </div>
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">Online Store</div>
              <div className="mobile-feature-value mobile-monthly-value">✓</div>
            </div>
            <div className="mobile-bonus-row">
              <div className="mobile-bonus-label">Bonus</div>
              <div className="mobile-bonus-value mobile-monthly-bonus">
                No commission for first 10 Orders*
              </div>
            </div>
            <div className="mobile-price-row">
              <div className="mobile-price-label">Price</div>
              <div className="mobile-price-value mobile-monthly-price">
                <div className="mobile-price-main">1299 INR</div>
                <div className="mobile-price-addition">+</div>
                <div className="mobile-commission">10% on each order</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quarterly Plan Section */}
        <div className="mobile-plan-section">
          <div className="mobile-plan-header">
            <div className="mobile-key-features-header">Key Features</div>
            <div className="mobile-plan-header-section mobile-quarterly-header">
              <span className="popular-badge-mobile">🔥 Popular</span>
              Quarterly
            </div>
          </div>
          <div className="mobile-plan-content">
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">WhatsApp Messages</div>
              <div className="mobile-feature-value mobile-quarterly-value">3200 Messages</div>
            </div>
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">Manage Customers</div>
              <div className="mobile-feature-value mobile-quarterly-value">✓</div>
            </div>
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">Online Store</div>
              <div className="mobile-feature-value mobile-quarterly-value">✓</div>
            </div>
            <div className="mobile-bonus-row">
              <div className="mobile-bonus-label">Bonus</div>
              <div className="mobile-bonus-value mobile-quarterly-bonus">
                No commission for first 10 Orders*
              </div>
            </div>
            <div className="mobile-price-row">
              <div className="mobile-price-label">Price</div>
              <div className="mobile-price-value mobile-quarterly-price">
                <div className="mobile-price-main">1299 INR</div>
                <div className="mobile-price-addition">+</div>
                <div className="mobile-commission">10% on each order</div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Plan Section */}
        <div className="mobile-plan-section">
          <div className="mobile-plan-header">
            <div className="mobile-key-features-header">Key Features</div>
            <div className="mobile-plan-header-section mobile-yearly-header">Yearly</div>
          </div>
          <div className="mobile-plan-content">
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">WhatsApp Messages</div>
              <div className="mobile-feature-value mobile-yearly-value">1000 Messages</div>
            </div>
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">Manage Customers</div>
              <div className="mobile-feature-value mobile-yearly-value">✓</div>
            </div>
            <div className="mobile-feature-row">
              <div className="mobile-feature-name">Online Store</div>
              <div className="mobile-feature-value mobile-yearly-value">✓</div>
            </div>
            <div className="mobile-bonus-row">
              <div className="mobile-bonus-label">Bonus</div>
              <div className="mobile-bonus-value mobile-yearly-bonus">
                No commission for first 10 Orders*
              </div>
            </div>
            <div className="mobile-price-row">
              <div className="mobile-price-label">Price</div>
              <div className="mobile-price-value mobile-yearly-price">
                <div className="mobile-price-main">1299 INR</div>
                <div className="mobile-price-addition">+</div>
                <div className="mobile-commission">10% on each order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;