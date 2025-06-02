const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Seller = require('../models/Seller'); // import seller model
const Product = require('../models/Products');

exports.makePayment = async (req, res) => {
  const { orderId } = req.params;
  const { transactionId } = req.body;

  try {
    // Get full order with populated customer
    const order = await Order.findById(orderId).populate('customer');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (order.status !== 'approved') {
      return res.status(400).json({ message: 'Order not approved yet' });
    }

    // Prevent duplicate transactions
    const existingTxn = await Transaction.findOne({ transactionId });
    if (existingTxn) {
      return res.status(409).json({ message: 'Duplicate transaction ID' });
    }

    // 🧠 Auto-calculate total amount from products
    let calculatedAmount = 0;
    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.productId} not found` });
      }
      calculatedAmount += product.price * item.quantity;
    }

    const seller = await Seller.findById(order.seller);

    // 💰 Create transaction
    const transaction = await Transaction.create({
      order: order._id,
      transactionId,
      customerName: order.customer?.name || 'Unknown',
      customerPhone: order.customer?.phone || 'Unknown',
      sellerBusinessName: seller?.businessName || 'Unknown',
      amount: calculatedAmount,
    });

    // 🟢 Mark order as paid
    order.status = 'paid';
    order.sellerName = seller ? seller.name : '';
    await order.save();

    res.status(200).json({ message: 'Payment successful', transaction });
  } catch (error) {
    console.error('Payment failed:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};
