const QRCode = require('qrcode');
const Seller = require('../models/seller');

exports.generateQR = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller._id);

    if (!seller || !seller.slug) {
      return res.status(404).json({ message: 'Seller or slug not found' });
    }

    const storeUrl = `https://yourdomain.com/store/${seller.slug}`;
    const qrImage = await QRCode.toDataURL(storeUrl);

    res.json({ qrImage, storeUrl });
  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate QR code' });
  }
};
