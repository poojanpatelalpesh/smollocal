const express = require('express');
const multer = require('multer');
const { 
  createProduct, 
  getAllProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct, 
  getProductsBySellerSlug 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware'); // use your existing protect middleware

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.route('/')
  .post(protect, upload.single('image'), createProduct)
  .get(protect, getAllProducts);

router.route('/:id')
  .get(protect, getProductById)
  .put(protect, upload.single('image'), updateProduct)
  .delete(protect, deleteProduct);

// Public route to get products by seller slug
router.get('/public/:sellerSlug', getProductsBySellerSlug);

module.exports = router;
