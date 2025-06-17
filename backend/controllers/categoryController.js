const Category = require('../models/Category');

// Create a new category for the logged-in seller
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const sellerId = req.seller._id;

    // Check if category with same name exists for this seller
    const existing = await Category.findOne({ name, seller: sellerId });
    if (existing) return res.status(400).json({ message: 'Category already exists' });

    const category = await Category.create({ name, seller: sellerId });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories for the logged-in seller
exports.getSellerCategories = async (req, res) => {
  try {
    const categories = await Category.find({ seller: req.seller._id }).sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific category by ID for the logged-in seller
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, seller: req.seller._id });

    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a category by ID for the logged-in seller
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({ _id: req.params.id, seller: req.seller._id });
    if (!category) return res.status(404).json({ message: 'Category not found' });

    // Check if new name already exists for this seller
    const duplicate = await Category.findOne({
      _id: { $ne: category._id },
      name,
      seller: req.seller._id
    });
    if (duplicate) return res.status(400).json({ message: 'Category name already exists' });

    category.name = name || category.name;
    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a category by ID for the logged-in seller
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      seller: req.seller._id
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
