const Product = require('../models/Products');
const Category = require('../models/Category'); // ✅ Added
const fs = require('fs');
const { uploadImage, deleteImage } = require('../utils/cloudinary');

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const sellerId = req.seller._id;

    // ✅ Ensure category belongs to the seller
    const categoryExists = await Category.findOne({ _id: category, seller: sellerId });
    if (!categoryExists) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    let imageUrl = '';
    if (req.file) {
      const result = await uploadImage(req.file.path);
      fs.unlinkSync(req.file.path); // remove local file after upload
      imageUrl = result.secure_url;
    }

    const product = new Product({
      seller: sellerId,
      name,
      description,
      price,
      category,
      imageUrl,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message || 'Failed to create product' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, seller: req.seller._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.findOne({ _id: req.params.id, seller: req.seller._id });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    // ✅ Ensure updated category also belongs to the seller
    if (category) {
      const categoryExists = await Category.findOne({ _id: category, seller: req.seller._id });
      if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
      }
      product.category = category;
    }

    if (req.file) {
      // remove old image
      const publicId = product.imageUrl.split('/').pop().split('.')[0];
      await deleteImage(`products/${publicId}`);

      const result = await uploadImage(req.file.path);
      fs.unlinkSync(req.file.path);
      product.imageUrl = result.secure_url;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id, seller: req.seller._id });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const publicId = product.imageUrl.split('/').pop().split('.')[0];
    await deleteImage(`products/${publicId}`);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public: Get products by seller slug
exports.getProductsBySellerSlug = async (req, res) => {
  try {
    const { sellerSlug } = req.params;
    const Seller = require('../models/Seller');
    const seller = await Seller.findOne({ slug: sellerSlug });
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    const products = await Product.find({ seller: seller._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
