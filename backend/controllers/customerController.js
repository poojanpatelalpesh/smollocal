const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register customer
exports.registerCustomer = async (req, res) => {
  const { name, email, phone, password, address } = req.body;
  const sellerId = req.seller?._id;

  if (!name || !email || !phone || !password || !sellerId) {
    return res.status(400).json({ message: 'All fields required, including seller' });
  }

  try {
    const existingCustomer = await Customer.findOne({ email: email.toLowerCase(), seller: sellerId });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already registered for this seller' });
    }

    const customer = await Customer.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      address: address || '',
      seller: sellerId
    });

    res.status(201).json({
      message: 'Customer registered successfully',
      token: generateToken(customer._id),
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        seller: customer.seller
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login customer
exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await Customer.findOne({ email: email.toLowerCase() });
    if (!customer) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await customer.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      token: generateToken(customer._id),
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get total customer count
exports.getCustomerCount = async (req, res) => {
  try {
    const sellerId = req.seller?._id;
    if (!sellerId) return res.status(401).json({ message: 'Unauthorized' });
    const count = await Customer.countDocuments({ seller: sellerId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
