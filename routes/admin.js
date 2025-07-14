const Cake = require('../models/Cake');
const Order = require('../models/Order');
const express=require('express');
const router = express.Router();
const authenticateAdmin=require("./authAdmin");

// GET all orders (admin only)
router.get('/orders', authenticateAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email'); // Optional: Populate user info
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.patch('/orders/:id/status', authenticateAdmin, async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = "delivered";
      await order.save();
  
      res.json({ message: "Order status updated", order });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports=router;
  