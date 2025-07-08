const { sendWhatsAppMessageToCustomers } = require('../controllers/sendMessage');
const { protect } = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/send-message', protect, sendWhatsAppMessageToCustomers);
module.exports = router;
