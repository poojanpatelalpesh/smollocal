const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: String,
  phone: String,
  transactionId: String,
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
