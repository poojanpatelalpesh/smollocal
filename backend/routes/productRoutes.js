const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createProduct, getMyProducts } = require('../controllers/productController');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const upload = multer({ storage });

router.post('/', protect, upload.single('image'), createProduct);
router.get('/', protect, getMyProducts);

module.exports = router;
