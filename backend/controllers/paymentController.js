const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const Seller = require('../models/seller'); // import seller model

exports.makePayment = async (req, res) => {
  const { orderId } = req.params;
  const { transactionId, amount } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status !== 'approved')
      return res.status(400).json({ message: 'Order not approved yet' });

    // Save transaction details
    const transaction = await Transaction.create({
      order: order._id,
      transactionId,
      customerName: order.customer.name,
      customerPhone: order.customer.phone,
      amount,
    });

    // Fetch seller to get the name
    const seller = await Seller.findById(order.seller);

    // Update order status and save seller name
    order.status = 'paid';
    order.sellerName = seller ? seller.name : '';
    await order.save();

    res.json({ message: 'Payment successful', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment failed' });
  }
};
