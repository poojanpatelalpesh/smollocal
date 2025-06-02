const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Product = require('../models/Products');

exports.getOrdersForSeller = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.seller._id }).sort({ createdAt: -1 });

    // For each order, check if transaction exists
    const orderIds = orders.map(o => o._id);
    const transactions = await Transaction.find({ order: { $in: orderIds } });

    const maskedOrders = orders.map(order => {
      const transactionExists = transactions.some(t => t.order.toString() === order._id.toString());
      const customerData = { ...order.customer.toObject() };

      // Show phone only if order paid AND transaction exists (payment done)
      if (!(order.status === 'paid' && transactionExists)) {
        customerData.phone = undefined;
      }

      return { ...order.toObject(), customer: customerData };
    });

    res.json(maskedOrders);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status, denialReason } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order || order.seller.toString() !== req.seller._id.toString()) {
      return res.status(404).json({ message: 'Order not found or not authorized' });
    }

    order.status = status;
    if (status === 'denied') {
      order.denialReason = denialReason || 'No reason provided';
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

const Seller = require('../models/Seller');

exports.placeOrder = async (req, res) => {
  console.log('placeOrder hit with body:', req.body);
  console.log('Request body:', req.body);
  try {
    const { sellerBusinessName, products, customer } = req.body;

    if (!sellerBusinessName || typeof sellerBusinessName !== 'string') {
      return res.status(400).json({ message: 'sellerBusinessName is required and must be a string' });
    }
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products array is required and cannot be empty' });
    }
    if (!customer || typeof customer !== 'object') {
      return res.status(400).json({ message: 'Customer details are required' });
    }

    const seller = await Seller.findOne({ businessName: sellerBusinessName.toLowerCase() });
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    const order = new Order({
      seller: seller._id,
      products,
      customer,
      status: 'pending',
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

