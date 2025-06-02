const express = require('express');
const router = express.Router();
const {
  registerSeller,
  loginSeller,
  getSellerProfile,
} = require('../controllers/sellerController.js');
const { protect } = require('../middleware/authMiddleware');

console.log("error here");
router.get('/test', (req, res) => res.send('Seller route is live!'));

router.post('/register', registerSeller);
router.post('/login', loginSeller);
router.get('/profile', protect, getSellerProfile);

module.exports = router;
