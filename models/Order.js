const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  items: Array,
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;