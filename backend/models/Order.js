const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 }
    }
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: false,
  },
  customerName: { type: String },
  customerPhone: { type: String },
  customerAddress: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'denied','paid'],
    default: 'pending'
  },
  denialReason: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
