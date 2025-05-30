const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getOrdersForSeller, updateOrderStatus } = require('../controllers/orderController');

router.get('/', protect, getOrdersForSeller);
router.put('/:orderId', protect, updateOrderStatus);

module.exports = router;
