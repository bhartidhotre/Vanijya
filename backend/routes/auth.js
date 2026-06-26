// routes/auth.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthorizedPRN = require('../models/AuthorizedPRN'); // keep your existing check
const User = require('../models/User');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

// Helper to build user object returned to client
function publicUser(user) {
  return {
    _id: user._id,
    prn: user.prn,
    email: user.email,
    name: user.name || ''
  };
}

/* ============================
   REGISTER
   - returns { message, token, user }
=============================== */
router.post('/register', [
  body('prn').trim().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('name').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { prn, email, password, name } = req.body;

    // Optional: ensure PRN is allowed (if you use AuthorizedPRN)
    if (AuthorizedPRN) {
      const authorized = await AuthorizedPRN.findOne({ prn });
      if (!authorized) return res.status(403).json({ error: "PRN not authorized." });
    }

    // Check duplicate by prn or email
    const exists = await User.findOne({ $or: [{ prn }, { email }] });
    if (exists) return res.status(409).json({ error: "PRN or Email already registered." });

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({ prn, email, passwordHash, name });
    await user.save();

    // create JWT with _id payload (so decoded has _id)
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: "Registered successfully",
      token,
      user: publicUser(user)
    });
  } catch (err) {
    console.error('REGISTER ERR', err);
    res.status(500).json({ error: "Server error" });
  }
});


/* ============================
   LOGIN
   - returns { message, token, user }
=============================== */
router.post('/login', [
  body('prn').notEmpty(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { prn, password } = req.body;

    const user = await User.findOne({ prn });
    if (!user) return res.status(400).json({ error: "Invalid PRN or Password" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Invalid PRN or Password" });

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: "Login successful",
      token,
      user: publicUser(user)
    });
  } catch (err) {
    console.error('LOGIN ERR', err);
    res.status(500).json({ error: "Server error" });
  }
});


/* ============================
   GET CURRENT USER (protected)
   - expects Authorization: Bearer <token>
=============================== */
const auth = require('../middleware/authMiddleware'); // uses file below
router.get('/me', auth, async (req, res) => {
  try {
    // auth middleware set req.user
    return res.json(req.user);
  } catch (err) {
    console.error('ME ERR', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
