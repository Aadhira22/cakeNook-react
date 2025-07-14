const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const ADMIN_EMAIL = "test@example.com";

router.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already in use' });
      }
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
      console.log("Registering user with isAdmin:", isAdmin);
      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ name, email, passwordHash,isAdmin});
      await user.save();
  
      res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // const isAdmin = user.email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();


    const token = jwt.sign({ id: user._id, isAdmin:user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, isAdmin:user.isAdmin }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
