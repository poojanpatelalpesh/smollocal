const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  }
}, { timestamps: true });

categorySchema.index({ name: 1, seller: 1 }, { unique: true }); // enforce unique category name per seller

module.exports = mongoose.model('Category', categorySchema);
