const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Place an order
router.post('/', async (req, res) => {
  const { name, items, total } = req.body;
  const order = new Order({ name, items, total });
  await order.save();
  res.json({ message: 'Order placed successfully!' });
});

// Get all orders
router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;