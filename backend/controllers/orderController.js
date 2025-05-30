const Order = require('../models/Order');

exports.getOrdersForSeller = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.seller._id }).sort({ createdAt: -1 });
    res.json(orders);
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
