import express from "express";
import { updateOrder } from "../controllers/orderController.js"; // Adjust the path to your file

const router = express.Router();

router.put("/uorders/:id", updateOrder); // Assuming the endpoint is /uorders

export default router;
