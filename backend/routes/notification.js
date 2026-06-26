const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for a user (owner)
router.get('/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
  console.log("DEBUG: fetching notifications for user:", ownerId); 

    const notifs = await Notification.find({ owner: ownerId })
      .populate('fromUser', 'name')
      .populate('product', 'title')
      .sort({ createdAt: -1 });
    console.log("DEBUG: notifications from DB:", notifs); 

    const formatted = notifs.map(n => ({
      _id: n._id,
      senderName: n.fromUser?.name || "Unknown User",
      message: n.message || "No content",  
      productTitle: n.product?.title || null,
      productId: n.product?._id || null,
      chatId: n.chat,             // 🔥 ADD THIS
      createdAt: n.createdAt,
      isRead: n.isRead
    }));


        console.log("DEBUG: formatted notifications:", formatted);
    res.json(formatted);
    
  } catch (err) {
    console.error("DEBUG: error fetching notifications:", err); 
    res.status(500).json({ message: "Server error" });
  }
});

// mark notification read
router.put('/mark-read/:id', async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notif);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
