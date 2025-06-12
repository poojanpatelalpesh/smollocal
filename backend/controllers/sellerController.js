const Seller = require('../models/Seller');
const generateToken = require('../utils/generateTokes.js');
const slugify = require('slugify');

exports.registerSeller = async (req, res) => {
  const { name, email, phone, password, businessName, address } = req.body;

  try {
    // Step 1: Create slug
    const baseSlug = slugify(businessName, { lower: true, strict: true });
    let slug = baseSlug;
    let suffix = 1;

    // Step 2: Ensure uniqueness of slug
    while (await Seller.findOne({ slug })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    // Step 3: Check for existing seller by email/phone/business name
    const existingSeller = await Seller.findOne({
      $or: [
        { email }, 
        { phone }, 
        { businessName: businessName.toLowerCase() }
      ]
    });

    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists with provided credentials' });
    }

    // Step 4: Create seller with slug
    const seller = await Seller.create({
      name,
      email,
      phone,
      password,
      businessName,
      address,
      slug
    });

    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      businessName: seller.businessName,
      address: seller.address,
      slug: seller.slug,
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