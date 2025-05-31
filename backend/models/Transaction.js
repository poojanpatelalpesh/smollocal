const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: String,
  phone: String,
  transactionId: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
