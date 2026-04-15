const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');        // ← add this
const orderRoutes = require('./routes/orders');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/mini-ecommerce')
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.log('Error:', err.message));

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);                   // ← add this

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});