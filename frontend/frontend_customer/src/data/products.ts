import { Product } from '../types/index.ts';

export const products: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation technology, 30-hour battery life, and ultra-comfortable ear cushions for extended listening sessions. Perfect for music enthusiasts and professionals alike.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Electronics'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with precision using our smart fitness watch. Monitor heart rate, sleep patterns, and daily activity with this water-resistant, long-lasting device. Syncs wirelessly with your smartphone for comprehensive health insights.',
    price: 159.95,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Ultra-thin Laptop',
    description: 'Powerful performance meets sleek design in our ultra-thin laptop. Featuring a stunning 4K display, the latest processor technology, and all-day battery life in a lightweight aluminum body. Perfect for work and entertainment on the go.',
    price: 1299.00,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Computers'
  },
  {
    id: 4,
    name: 'Professional Camera Kit',
    description: 'Capture breathtaking photos and videos with our professional camera kit. Includes a high-resolution digital camera, versatile lenses, and accessories for every shooting scenario. Ideal for both beginners and experienced photographers.',
    price: 849.50,
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Photography'
  },
  {
    id: 5,
    name: 'Smart Home Speaker',
    description: 'Transform your living space with our intelligent home speaker. Voice-controlled with premium sound quality and smart home integration capabilities. Control your music, lights, thermostat, and more with simple voice commands.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/1072851/pexels-photo-1072851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Home'
  },
  {
    id: 6,
    name: 'Ergonomic Office Chair',
    description: 'Work in comfort with our ergonomic office chair. Featuring adjustable lumbar support, breathable mesh backing, and customizable height and tilt settings. Designed to provide optimal support during long work sessions.',
    price: 249.95,
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Office'
  },
  {
    id: 7,
    name: 'Wireless Charging Pad',
    description: 'Eliminate cable clutter with our wireless charging pad. Compatible with all Qi-enabled devices, this sleek pad provides fast, efficient charging without the hassle of plugging in. Features LED indicators and foreign object detection for safe charging.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Accessories'
  },
  {
    id: 8,
    name: 'Premium Coffee Maker',
    description: 'Brew barista-quality coffee at home with our premium coffee maker. Programmable settings, temperature control, and a built-in grinder ensure the perfect cup every time. The stylish design complements any kitchen decor.',
    price: 189.00,
    image: 'https://images.pexels.com/photos/585754/pexels-photo-585754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Kitchen'
  },
];

// import React, { useState, useEffect } from 'react';

// function ProductList() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://your-backend-url/api/products')  // <-- replace with your API endpoint
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Error fetching products:', err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div>
//       {products.map(product => (
//         <div key={product.id || product._id}>
//           <h2>{product.name}</h2>
//           <p>{product.description}</p>
//           <p>${product.price}</p>
//           <img src={product.image} alt={product.name} />
//         </div>
//       ))}
//     </div>
//   );
// }
