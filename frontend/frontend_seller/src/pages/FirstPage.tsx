import React, { useRef, useEffect, useState } from 'react';
import './FirstPage.css';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';
import Overview from './Overview'; 
import Price from './Price';
import FirstPage_Image from '../assets/13.jpg';
import OurLogo from '../assets/Our-Logo.png';
import { MdEmail , MdPhone } from 'react-icons/md';

const FirstPage: React.FC = () => {
  const navigate = useNavigate();
  const homeRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null); 
  const aboutRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');

  const handleSignupClick = () => {
    navigate('/Signup');
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

  const scrollToSection = (sectionId: string) => {
    const offset = 64; // height of navbar
    let targetPosition = 0;
    if (sectionId === 'home' && homeRef.current) {
      targetPosition = homeRef.current.offsetTop - offset;
    } else if (sectionId === 'overview' && overviewRef.current) {
      targetPosition = overviewRef.current.offsetTop - offset;
    } else if (sectionId === 'about' && aboutRef.current) {
      targetPosition = aboutRef.current.offsetTop - offset;
    } else if (sectionId === 'price' && priceRef.current) {
      targetPosition = priceRef.current.offsetTop - offset;
    }

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      const homeTop = homeRef.current?.offsetTop || 0;
      const homeHeight = homeRef.current?.offsetHeight || 0;

      const overviewTop = overviewRef.current?.offsetTop || 0;
      const overviewHeight = overviewRef.current?.offsetHeight || 0;

      const aboutTop = aboutRef.current?.offsetTop || 0;
      const aboutHeight = aboutRef.current?.offsetHeight || 0;

      const priceTop = priceRef.current?.offsetTop || 0;
      const priceHeight = priceRef.current?.offsetHeight || 0;

      if (scrollPosition >= homeTop && scrollPosition < homeTop + homeHeight) {
        setActiveSection('home');
      } else if (scrollPosition >= overviewTop && scrollPosition < overviewTop + overviewHeight) {
        setActiveSection('overview');
      } else if (scrollPosition >= aboutTop && scrollPosition < aboutTop + aboutHeight) {
        setActiveSection('about');
      } else if (scrollPosition >= priceTop && scrollPosition < priceTop + priceHeight) {
        setActiveSection('price');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={OurLogo} alt="Smollocal Logo" />
        </div>

        <nav className="navigation">
          <a onClick={() => scrollToSection('overview')}>Overview</a>
          <a onClick={() => scrollToSection('price')}>Pricing</a>
          <a onClick={() => scrollToSection('about')}>About Us</a>
        </nav>

        <div className="header-buttons">
          <button className="header-login-button" onClick={handleLoginClick}>Login</button>
          <button className="header-signup-button" onClick={handleSignupClick}>Sign Up</button>
        </div>
      </header>

      {/* Home/Main Section */}
      <main className="main-content" ref={homeRef} id="home">
        <div className="content-wrapper">
          <h1 className="main-title">
            One place, full pace your business, your space.
          </h1>

          <div className="description">
            <p>Send personalized messages to loyal buyers.</p>
            <p>They order online, you deliver, and your profits grow.</p>
          </div>

          <div className="button-group">
            <button className="lets-begin" onClick={handleSignupClick}>Let's Begin</button>
          </div>
        </div>

        <div className="image-wrapper">
          <img src={FirstPage_Image} alt="Business illustration showing people managing their online business" className="main-image" />
        </div>
      </main>

      {/* Overview Section */}
      <div ref={overviewRef}>
        <Overview />
      </div>

      {/* Price Section */}
      <div ref={priceRef}>
        <Price />
      </div>

      {/* About Us Section */}
      <section ref={aboutRef} id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-heading">Meet the Team</h2>

          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar poojan-avatar">
                <div className="avatar-content">
                  <div className="avatar-bg"></div>
                </div>
              </div>
              <h3 className="member-name">Poojan Patel</h3>
              <div className="contact-icons">
                <div className="contact-icon email-icon">
                  <MdEmail size={20} color="white" />
                </div>
                <div className="contact-icon phone-icon">
                  <MdPhone size={20} color="white" />
                </div>
              </div>
            </div>

            <div className="team-member">
              <div className="member-avatar raman-avatar">
                <div className="landscape-bg">
                  <div className="sky"></div>
                  <div className="cloud cloud-1"></div>
                  <div className="cloud cloud-2"></div>
                  <div className="hill hill-1"></div>
                  <div className="hill hill-2"></div>
                </div>
              </div>
              <h3 className="member-name">Raman Pareek</h3>
              <div className="contact-icons">
                <div className="contact-icon email-icon">
                  <MdEmail size={20} color="white" />
                </div>
                <div className="contact-icon phone-icon">
                  <MdPhone size={20} color="white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-left">
              <div className="footer-contact">
                <div className="contact-item">
                  <span className="contact-icon-footer email">
                    <MdEmail size={20} color="white" />
                  </span>
                  <span>xyz@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon-footer phone">
                    <MdPhone size={20} color="white" />
                  </span>
                  <span>+91 9999 99999</span>
                </div>
              </div>
            </div>

            <div className="footer-center">
              <div className="footer-logo">
                <img src={OurLogo} alt="Smollocal Logo" />
              </div>
            </div>

            <div className="footer-right">
              <div className="company-info">
                <h4>Smollocal Private Ltd</h4>
                <address>
                  3rd Floor, Tower-A,<br />
                  Gopal Palace,<br />
                  Nehrunagar,<br />
                  Ambawadi,<br />
                  Ahmedabad, Gujarat<br />
                  - 380015
                </address>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default FirstPage;