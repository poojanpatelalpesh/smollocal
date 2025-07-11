const SellerCustomer = require('../models/SellerCustomer');

// @desc    Create a new customer
// @route   POST /api/seller-customers
// @access  Private (seller)
exports.createCustomer = async (req, res) => {
  const { name, phone } = req.body;

  try {
    // Ensure seller is available via req.seller (from auth middleware)
    const sellerId = req.seller._id;

    // Check if customer with same phone already exists for this seller
    const existingCustomer = await SellerCustomer.findOne({ phone, seller: sellerId });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer with this phone already exists.' });
    }

    const newCustomer = await SellerCustomer.create({
      name,
      phone,
      seller: sellerId
    });

    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not create customer.' });
  }
};

// @desc    Get all customers of logged-in seller
// @route   GET /api/seller-customers
// @access  Private (seller)
exports.getCustomers = async (req, res) => {
  try {
    const sellerId = req.seller._id;
    const customers = await SellerCustomer.find({ seller: sellerId });
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customers.' });
  }
};

// @desc    Get a single customer by ID
// @route   GET /api/seller-customers/:id
// @access  Private (seller)
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await SellerCustomer.findOne({
      _id: req.params.id,
      seller: req.seller._id
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching customer.' });
  }
};

// @desc    Update a customer
// @route   PUT /api/seller-customers/:id
// @access  Private (seller)
exports.updateCustomer = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const customer = await SellerCustomer.findOneAndUpdate(
      { _id: req.params.id, seller: req.seller._id },
      { name, phone },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update customer.' });
  }
};

// @desc    Delete a customer
// @route   DELETE /api/seller-customers/:id
// @access  Private (seller)
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await SellerCustomer.findOneAndDelete({
      _id: req.params.id,
      seller: req.seller._id
    });

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found or not authorized.' });
    }

    res.json({ message: 'Customer deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete customer.' });
  }
};

// @desc    Get total customer count for seller
// @route   GET /api/addCustomer/count
// @access  Private (seller)
exports.getCustomerCount = async (req, res) => {
  try {
    const sellerId = req.seller._id;
    const count = await SellerCustomer.countDocuments({ seller: sellerId });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customer count.' });
  }
};
