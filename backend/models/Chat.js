const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const ChatSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [MessageSchema],
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
