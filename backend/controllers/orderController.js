const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Product = require('../models/Products');
const Seller = require('../models/seller');
const SellerCustomer = require('../models/SellerCustomer');

exports.getOrdersForSeller = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.seller._id })
    .populate('customer')
    .populate('products.productId')
    .sort({ createdAt: -1 });

    // For each order, check if transaction exists
    const orderIds = orders.map(o => o._id);
    const transactions = await Transaction.find({ order: { $in: orderIds } });

    const maskedOrders = orders.map(order => {
      const transactionExists = transactions.some(t => t.order.toString() === order._id.toString());
      const customerData = order.customer && typeof order.customer.toObject === 'function'
  ? { ...order.customer.toObject() }
  : {};

      // Show phone only if order paid AND transaction exists (payment done)
      if (!(order.status === 'paid' && transactionExists)) {
        customerData.phone = undefined;
      }

      return { ...order.toObject(), customer: customerData };
    });

    res.json(maskedOrders);
  } catch (error) {
    console.error('getOrdersForSeller error:', error);
    res.status(500).json({ message: 'Could not fetch orders', error: error.message });
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

    // If order is approved, upsert customer into SellerCustomer
    if (status === 'approved' && order.customerName && order.customerPhone) {
      await SellerCustomer.findOneAndUpdate(
        { phone: order.customerPhone, seller: order.seller },
        { name: order.customerName, phone: order.customerPhone, seller: order.seller },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};


exports.placeOrder = async (req, res) => {
  const { sellerBusinessName, products } = req.body;
  const customerId = req.customer; // from auth middleware

  if (!customerId) return res.status(401).json({ message: 'Unauthorized, login first' });

  try {
    if (!sellerBusinessName) {
      return res.status(400).json({ message: 'sellerBusinessName is required' });
    }

    const seller = await Seller.findOne({ businessName: sellerBusinessName.toLowerCase() });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    // Validate products belong to seller
    const productIds = products.map(p => p.productId);
    const sellerProducts = await Product.find({ _id: { $in: productIds }, seller: seller._id });
    if (sellerProducts.length !== products.length) {
      return res.status(400).json({ message: 'One or more products not found for this seller' });
    }

    const order = new Order({
      seller: seller._id,
      products,
      customer: customerId,
      status: 'pending',
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};