const express = require('express');
const router = express.Router();
const {
  registerSeller,
  loginSeller,
  getSellerProfile,
} = require('../controllers/sellerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.get('/profile', protect, getSellerProfile);

module.exports = router;
