
import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="hero">
        <div className="container">
          <h1>Bakery's Name</h1>
          <p>Two line Tagline</p>
        </div>
      </div>
      <ProductGrid products={products} />
    </>
  );
};

export default LandingPage;
