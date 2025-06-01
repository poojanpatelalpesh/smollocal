const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/paymentController');

router.post('/:orderId/pay', makePayment);

module.exports = router;
