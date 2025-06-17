const express = require('express');
const router = express.Router();
const { generateQR } = require('../controllers/qrController');
const { protect } = require('../middleware/authMiddleware');

router.get('/seller/qr', protect, generateQR);

module.exports = router;
