const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' },

  message: { type: String, required: true },   // ✔ FIXED FIELD

  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
