// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

module.exports = async function(req, res, next) {
  try {
    // Support both Authorization header and x-access-token (optional)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[0] === 'Bearer'
      ? authHeader.split(' ')[1]
      : (req.headers['x-access-token'] || req.headers['token'] || req.headers['x-user-token']);

    if (!token) return res.status(401).json({ error: 'No token provided' });

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // decoded has { _id: ... } (we signed with _id)
    if (!decoded || !decoded._id) return res.status(401).json({ error: 'Invalid token payload' });

    const user = await User.findById(decoded._id).select('-passwordHash');
    if (!user) return res.status(401).json({ error: 'User not found' });

    // attach user object to req
    req.user = user;
    next();
  } catch (err) {
    console.error('AUTH MIDDLEWARE ERR', err);
    return res.status(500).json({ error: 'Auth middleware failed' });
  }
};
