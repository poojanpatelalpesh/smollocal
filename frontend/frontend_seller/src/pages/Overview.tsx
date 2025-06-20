import React from 'react';
import './Overview.css';
import Top_left_Image from '../assets/12.jpg';
import Top_Right_Image from '../assets/14.jpg';
import Bottom_Right_Image from '../assets/15.jpg';
const Overview: React.FC = () => {
  return (
    <div className="main-container">
        <div className="what-we-do-section">
            <h1 className="what-we-do-title">What we do</h1>
            <p className="what-we-do-description">
            SmolLocal empower SMEs to manage loyal customers,<br />
            engage via messaging, and provide platform for selling online.
            </p>
        </div>

        <div className="overview-container">
      {/* New What We Do Section - 20% */}
      

      {/* Top Half - 40% (reduced from 60%) */}
      <div className="top-half">
        {/* Register & Set Up Store Card */}
        <div className="card-container register-card">
          <div className="card-content">
            <h1 className="card-title">Register & Set Up Store</h1>
            <p className="card-description">
              The business owner signs up on the app by adding their business details, address, and login credentials.
            </p>
          </div>
          {/* <div className="card-illustration">
            <div className="laptop-icon">
              <div className="laptop-screen">
                <div className="grid-pattern">
                  <div className="grid-item"></div>
                  <div className="grid-item"></div>
                  <div className="grid-item"></div>
                  <div className="grid-item"></div>
                  <div className="grid-item"></div>
                  <div className="grid-item"></div>
                </div>
              </div>
              <div className="laptop-base"></div>
            </div>
            <div className="cloud-icon">
              <div className="cloud-shape"></div>
            </div>
          </div> */}
          <div className='image-wrapper-top-left'>
            <img src={Top_left_Image} className='top-left-image'></img>
          </div>
        </div>

        {/* List Products Card */}
        <div className="card-container products-card">
          <div className="card-content">
            <h1 className="card-title">List Products</h1>
            <p className="card-description">
              hey upload product images, add names, descriptions, categories, and prices to showcase their offerings.
            </p>
          </div>
          {/* <div className="card-illustration">
            <div className="person-with-board">
              <div className="person">
                <div className="person-head"></div>
                <div className="person-body"></div>
                <div className="person-arm"></div>
              </div>
              <div className="presentation-board">
                <div className="board-content">
                  <div className="board-item"></div>
                  <div className="board-item"></div>
                </div>
              </div>
            </div>
          </div> */}
          <div className='image-wrapper-top-right'>
            <img src={Top_Right_Image} className='top-right-image'></img>
          </div>
        </div>
      </div>

      {/* Bottom Half - 40% */}
      <div className="bottom-half">
        {/* Empty Card with Random Text */}
        <div className="card-container empty-card">
          <div className="card-content">
            <h1 className="card-title">Analytics Dashboard</h1>
            <p className="card-description">
              Track your business performance with comprehensive analytics. Monitor sales trends, customer behavior, and inventory levels to make data-driven decisions for your store's growth.
            </p>
          </div>
          <div className="card-illustration">
            <div className="chart-icon">
              <div className="bar-chart">
                <div className="bar bar-1"></div>
                <div className="bar bar-2"></div>
                <div className="bar bar-3"></div>
                <div className="bar bar-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Message Card */}
        <div className="card-container whatsapp-card">
          <div className="card-content">
            <h1 className="card-title">Send personalised WhatsApp Message</h1>
            <p className="card-description">
              Using built-in messaging, the owner sends customized promotional or reminder messages to a grouped customers
            </p>
          </div>
          {/* <div className="card-illustration">
            <div className="messaging-scene">
              <div className="person-messaging">
                <div className="person-head"></div>
                <div className="person-body"></div>
              </div>
              <div className="laptop-messaging">
                <div className="laptop-screen-msg"></div>
                <div className="laptop-base-msg"></div>
              </div>
              <div className="message-bubbles">
                <div className="message-bubble"></div>
                <div className="message-bubble"></div>
              </div>
            </div>
          </div> */}
          <div className='image-wrapper-bottom-right'>
            <img src={Bottom_Right_Image} className='bottom-right-image'></img>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Overview;