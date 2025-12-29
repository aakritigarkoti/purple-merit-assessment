const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

// 1. GET ALL USERS (Admin Only - with Pagination)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const users = await User.find()
      .select('-password') // Don't send passwords back
      .limit(limit)
      .skip((page - 1) * limit);
      
    const total = await User.countDocuments();
    
    res.json({ users, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. UPDATE USER STATUS (Admin Only - Activate/Deactivate)
router.patch('/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body; // Expecting 'active' or 'inactive'
    await User.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "User status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. GET MY PROFILE (Logged in User)
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. UPDATE MY PROFILE (Name & Email)
router.put('/me', verifyToken, async (req, res) => {
  try {
    const { fullName, email } = req.body;
    await User.findByIdAndUpdate(req.user.id, { fullName, email });
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. CHANGE PASSWORD
router.put('/me/password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Verify old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect current password" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;