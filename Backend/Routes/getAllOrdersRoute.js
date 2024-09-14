import express from "express";
import { getAllOrders } from "../controllers/orderController.js"; // Adjust the path to your file

const router = express.Router();

router.get("/orders", getAllOrders); // Assuming the endpoint is /orders

export default router;
