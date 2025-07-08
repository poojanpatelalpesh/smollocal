const twilio = require('twilio');
const SellerCustomer = require('../models/SellerCustomer');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// @desc    Send WhatsApp message to all seller's customers
// @route   POST /api/seller-customers/send-message
// @access  Private (seller)
exports.sendWhatsAppMessageToCustomers = async (req, res) => {
  const { message } = req.body;
  const sellerId = req.seller._id;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const customers = await SellerCustomer.find({ seller: sellerId });

    if (!customers.length) {
      return res.status(404).json({ message: 'No customers found' });
    }

    const sendPromises = customers.map((customer) => {
      const phoneNumber = customer.phone.startsWith('+')
        ? customer.phone
        : `+91${customer.phone}`; // Adjust prefix as needed

      return client.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${phoneNumber}`,
        body: message
      });
    });

    await Promise.all(sendPromises);

    res.status(200).json({ message: 'Messages sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send WhatsApp messages' });
  }
};
