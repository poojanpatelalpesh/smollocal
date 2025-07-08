const express = require('express');
const router = express.Router();
const { registerCustomer, loginCustomer, getCustomerCount } = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', protect, registerCustomer);
router.post('/login', loginCustomer);
router.get('/count', protect, getCustomerCount);

module.exports = router;
