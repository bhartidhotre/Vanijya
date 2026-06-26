require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");

const Notification = require("./models/Notification");
const Chat = require("./models/Chat");
const User = require('./models/User');
const Product = require('./models/Product');

// Routes
const products = require("./routes/products");
const authRoutes = require("./routes/auth");
const chatRoutes = require('./routes/chat');
const notifRoutes = require('./routes/notification');

const app = express();

// ----------------------
// Middlewares
// ----------------------
app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 30 });
// app.use(limiter);

// simple demo auth middleware
app.use((req, res, next) => {
  if (req.headers['x-user-id']) req.userId = req.headers['x-user-id'];
  next();
});

// ----------------------
// API Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", products);
app.use("/api/chats", chatRoutes);
app.use("/api/notifications", notifRoutes);

// ----------------------
// Create HTTP server + Socket.IO
// ----------------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

// Track online users (userId -> socketId)
const onlineUsers = new Map();

// ----------------------
// SOCKET LOGIC
// ----------------------
io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  // setup user session
  socket.on("setup", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("user online:", userId);
  });

  // join chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  // send message
 socket.on("sendMessage", async (payload) => {
   console.log("DEBUG: sendMessage payload:", payload);
  try {
    const { chatId, senderId, text } = payload;
    if (!chatId || !senderId || !text) return;

    // Fetch chat
    const chat = await Chat.findById(chatId);
    if (!chat) return;

    // Create message
    const message = { sender: senderId, text, createdAt: new Date(), read: false };
    chat.messages.push(message);
    await chat.save();

    // Determine recipient (other user)
    const recipientId = chat.owner.toString() === senderId ? chat.customer.toString() : chat.owner.toString();
console.log("DEBUG: creating notification for", recipientId, "from", senderId, "text:", text);

    // Create notification for recipient
    const notif = await Notification.create({
      owner: recipientId,
      fromUser: senderId,
      product: chat.product,
      chat: chat._id,
      message: text,
      isRead: false,
      createdAt: new Date()
    });

    // Get sender name
    const populatedSender = await User.findById(senderId).select("name");

    // Emit message to chat room
    io.to(chatId).emit("message", {
      chatId,
      message: {
        _id: chat.messages[chat.messages.length - 1]._id,
        sender: senderId,
        text,
        createdAt: message.createdAt
      },
    });

    // Emit notification in real-time
   const populatedProduct = await Product.findById(chat.product).select("title");

if (recipientSocket) {
  io.to(recipientSocket).emit("notification", {
    _id: notif._id,
    senderName: populatedSender.name,
    message: text,
    productTitle: populatedProduct?.title || null,   // 🔥 ADD THIS
    productId: chat.product,    
    chatId: chat._id,                                // 🔥 NEED THIS FOR REDIRECT TO CHAT
    createdAt: notif.createdAt,
    isRead: false
  });
}


    console.log("DEBUG: message sent and notification created", { chatId, senderId, recipientId, notif });

  } catch (err) {
    console.error("sendMessage error", err);
  }
});


  // disconnect
  socket.on("disconnect", () => {
    for (const [userId, sid] of onlineUsers.entries()) {
      if (sid === socket.id) onlineUsers.delete(userId);
    }
    console.log("socket disconnected:", socket.id);
  });
});

// ----------------------
// Start Server
// ----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    console.log("Connected DB:", mongoose.connection.name);
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("DB Error:", err));
