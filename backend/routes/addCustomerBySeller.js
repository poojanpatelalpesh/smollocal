// routes/sellerCustomerRoutes.js
const express = require('express');
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} = require('../controllers/addCustomerBySeller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createCustomer).get(protect, getCustomers);
router
  .route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

module.exports = router;
