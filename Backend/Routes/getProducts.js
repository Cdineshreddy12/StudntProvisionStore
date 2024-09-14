import express from 'express';
import Product from '../Models/Product.js';  // Adjust the import path based on your project structure

const router = express.Router();

// Route to fetch all products
router.get('/', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    // Send the products as a JSON response
    res.status(200).json(products);
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
