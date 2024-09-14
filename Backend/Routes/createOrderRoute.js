import express from "express";
import { createOrder } from "../controllers/orderController.js"; // Adjust the path to your file

const router = express.Router();

router.post("/corder", createOrder); // Assuming the endpoint is /orders

export default router;
