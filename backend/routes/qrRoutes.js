const express = require('express');
const router = express.Router();
const { generateQR, generateQRForSlug } = require('../controllers/qrController');
const { protect } = require('../middleware/authMiddleware');

router.get('/seller/qr', protect, generateQR);
router.get('/:sellerSlug', generateQRForSlug);

module.exports = router;
