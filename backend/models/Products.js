const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Category',
  required: true
},

  imageUrl: { type: String }, // This will be URL or path to the image
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
