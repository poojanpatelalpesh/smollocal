// routes/customerOrderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/customerOrderController');
const { protectCustomer } = require('../middleware/customerAuth');

router.post('/placeOrder', protectCustomer, placeOrder);

module.exports = router;

