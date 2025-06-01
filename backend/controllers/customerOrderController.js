const Order = require('../models/Order');
const Product = require('../models/Products');
const Seller = require('../models/seller');

exports.placeOrder = async (req, res) => {
  const { sellerBusinessName, products, customer } = req.body;

  try {
    if (!sellerBusinessName) {
      return res.status(400).json({ message: 'sellerBusinessName is required' });
    }

    const seller = await Seller.findOne({ businessName: sellerBusinessName.toLowerCase() });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const productIds = products.map(p => p.productId);
    const sellerProducts = await Product.find({ _id: { $in: productIds }, seller: seller._id });
    if (sellerProducts.length !== products.length) {
      return res.status(400).json({ message: 'One or more products not found for this seller' });
    }

    const order = new Order({
      seller: seller._id,
      sellerName: seller.businessName,
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

