const Seller = require('../models/Seller');
const generateToken = require('../utils/generateTokes.js');

exports.registerSeller = async (req, res) => {
  console.log("i am hidden here");
  const { name, email, phone, password, businessName, address } = req.body;

  try {
    // Check if email or phone or business name is already taken
    const existingSeller = await Seller.findOne({
      $or: [{ email }, { phone }, { businessName: businessName.toLowerCase() }]
    });

    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists with provided credentials' });
    }

    const seller = await Seller.create({
      name,
      email,
      phone,
      password,
      businessName,
      address
    });

    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      businessName: seller.businessName,
      address: seller.address,
      token: generateToken(seller._id)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not register seller.' });
  }
};

exports.loginSeller = async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });

  if (seller && (await seller.matchPassword(password))) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      token: generateToken(seller._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.getSellerProfile = async (req, res) => {
  const seller = req.seller;
  res.json(seller);
};