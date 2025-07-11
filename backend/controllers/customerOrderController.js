const Order = require('../models/Order');
const Product = require('../models/Products');
const Seller = require('../models/seller');

exports.placeOrder = async (req, res) => {
  const { sellerSlug, products, customerName, customerPhone, customerAddress } = req.body;

  try {
    if (!sellerSlug) {
      return res.status(400).json({ message: 'sellerSlug is required' });
    }

    // Prevent empty orders
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one product.' });
    }

    const seller = await Seller.findOne({ slug: sellerSlug });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const productIds = products.map(p => p.productId);
    const sellerProducts = await Product.find({ _id: { $in: productIds }, seller: seller._id });
    if (sellerProducts.length !== products.length) {
      return res.status(400).json({ message: 'One or more products not found for this seller' });
    }

    // Prevent zero-value orders
    let total = 0;
    for (const item of products) {
      const prod = sellerProducts.find(p => p._id.toString() === item.productId.toString());
      if (prod) {
        total += prod.price * (item.quantity || 1);
      }
    }
    if (total <= 0) {
      return res.status(400).json({ message: 'Order total must be greater than zero.' });
    }

    const order = new Order({
      seller: seller._id,
      sellerName: seller.businessName,
      products,
      status: 'pending',
      customerName,
      customerPhone,
      customerAddress,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('products.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch order', error: error.message });
  }
};