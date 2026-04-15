const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.json({ message: 'User already exists!' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.json({ message: 'Register successful!' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: 'User not found!' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: 'Wrong password!' });
  }

  // Create token
  const token = jwt.sign({ id: user._id }, 'secretkey123');

  res.json({ message: 'Login successful!', token, name: user.name });
});

module.exports = router;