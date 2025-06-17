const dotenv = require('dotenv');

// 1. Load environment variables at the top — ALWAYS!
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const sellerRoutes = require('./routes/sellerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerOrderRoutes = require('./routes/customerOrderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const qrRoutes = require('./routes/qrRoutes');


const app = express();

// 2. Setup middleware before routes
app.use(cors());
app.use(express.json());

// 3. Connect to MongoDB after dotenv loaded
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Add this test route here:
app.post('/testjson', (req, res) => {
  console.log('Test JSON body:', req.body);
  res.json({ received: req.body });
});

// 4. Now register all routes
app.use('/api/orders/customer', customerOrderRoutes); // Customer order placement
app.use('/api/payments', paymentRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/qr', qrRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 5. Listen on port
const PORT = process.env.PORT || 8989;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
