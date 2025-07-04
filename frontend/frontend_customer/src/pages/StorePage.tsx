import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { Product } from '../types/index';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const StorePage: React.FC = () => {
  const { sellerSlug } = useParams<{ sellerSlug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sellerSlug) return;
    setLoading(true);
    fetch(`${API_BASE}/api/products/public/${sellerSlug}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        // Map backend product fields to frontend Product type
        const mapped = data.map((p: any) => ({
          id: p._id || p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          image: p.imageUrl || p.image,
          category: p.category || 'Uncategorized',
        }));
        setProducts(mapped);
        setError(null);
      })
      .catch(err => {
        setError(err.message || 'Error fetching products');
      })
      .finally(() => setLoading(false));
  }, [sellerSlug]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{color:'red'}}>Error: {error}</div>;

  return (
    <div>
      <h2 style={{textAlign:'center', marginTop:20}}>{sellerSlug ? `Welcome to ${sellerSlug}'s Store` : 'Store'}</h2>
      <ProductGrid products={products} />
    </div>
  );
};

export default StorePage; 