const QRCode = require('qrcode');
const Seller = require('../models/seller');

exports.generateQR = async (req, res) => {
  try {
    const seller = await Seller.findById(req.seller._id);

    if (!seller || !seller.businessName) {
      return res.status(404).json({ message: 'Seller or business name not found' });
    }

    const storeUrl = `http://localhost:5173/store/${seller.businessName}`;
    const qrImage = await QRCode.toDataURL(storeUrl);

    res.json({ qrImage, storeUrl });
  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate QR code' });
  }
};

exports.generateQRForSlug = async (req, res) => {
  try {
    const { sellerSlug } = req.params;
    const seller = await Seller.findOne({ slug: sellerSlug });
    if (!seller) return res.status(404).json({ message: 'Seller not found' });

    const storeUrl = `http://localhost:5173/store/${sellerSlug}`;
    const qrImage = await QRCode.toDataURL(storeUrl);

    res.json({ qrImage, storeUrl });
  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate QR code' });
  }
};
