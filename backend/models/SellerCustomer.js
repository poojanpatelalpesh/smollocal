const mongoose = require('mongoose');


const sellercustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }
}, { timestamps: true });

module.exports = mongoose.model('SellerCustomer', sellercustomerSchema);
