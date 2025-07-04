// routes/customerOrderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder, getOrderById } = require('../controllers/customerOrderController');

router.post('/placeOrder', placeOrder);
router.get('/:orderId', getOrderById);

module.exports = router;

