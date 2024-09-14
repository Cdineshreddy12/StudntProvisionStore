import express from "express";
import { getOrderById } from "../controllers/orderController.js"; // Adjust the path to your file

const router = express.Router();

router.get("/ordersid/:id", getOrderById); // Assuming the endpoint is /ordersid

export default router;
