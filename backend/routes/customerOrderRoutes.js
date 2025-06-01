// routes/customerOrderRoutes.js
const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/customerOrderController');

router.post('/', placeOrder);

module.exports = router;

