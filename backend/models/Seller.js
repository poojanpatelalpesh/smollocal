const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Utility function to make fields lowercase before saving for uniqueness
const toLower = (str) => (str ? str.toLowerCase() : str);

const sellerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true 
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number'],
  },
  password: { 
    type: String, 
    required: true 
  },
  businessName: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    set: toLower, // Convert to lowercase before saving to enforce case-insensitive uniqueness
  },
  address: { 
    type: String, 
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  }
}, { timestamps: true });

sellerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

sellerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Seller = mongoose.models.Seller || mongoose.model('Seller', sellerSchema);

module.exports = Seller;
