const Product = require('../models/Products');

exports.createProduct = async (req, res) => {
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const finalImageUrl = req.file?.path || imageUrl || '';

    if (!finalImageUrl) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const product = await Product.create({
      seller: req.seller._id,
      name,
      description,
      price,
      category,
      imageUrl: finalImageUrl,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch products' });
  }
};
