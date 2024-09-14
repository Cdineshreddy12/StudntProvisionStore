// routes.js
import { Router } from 'express';
import Product from '../Models/Product.js';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = Router();

// Product routes
router.post('/addProduct', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});



// Order routes
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;