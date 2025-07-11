// routes/sellerCustomerRoutes.js
const express = require('express');
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerCount
} = require('../controllers/addCustomerBySeller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createCustomer).get(protect, getCustomers);
// Route to get customer count
router.get('/count', protect, getCustomerCount);

router
  .route('/:id')
  .get(protect, getCustomerById)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

module.exports = router;
