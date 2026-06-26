const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const User = require('../models/User');

// Create or return existing chat between customer and owner for a product
router.post('/create', async (req, res) => {
  try {
    const { productId, customerId } = req.body;
    if (!productId || !customerId) return res.status(400).json({ message: 'Missing data' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const ownerId = product.owner;

    // find chat
    let chat = await Chat.findOne({ product: productId, owner: ownerId, customer: customerId }).populate('messages.sender', 'name prn');
    if (chat) return res.json(chat);

    // create
    chat = new Chat({ product: productId, owner: ownerId, customer: customerId, messages: []});
    await chat.save();
    chat = await Chat.findById(chat._id).populate('messages.sender', 'name prn');

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single chat by id
router.get('/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate('messages.sender', 'name prn');
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
