import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ShopHub</h3>
            <p>Your premier destination for premium products and exceptional shopping experiences.</p>
          </div>
          
          <div className="footer-section">
            <h3>Shop</h3>
            <ul className="footer-links">
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Deals & Promotions</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Stay Connected</h3>
            <p>Subscribe to our newsletter for updates on new products and special offers.</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 ShopHub. All rights reserved.</p>
          
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;