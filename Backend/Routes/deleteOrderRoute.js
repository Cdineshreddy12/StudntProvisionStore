import express from "express";
import { deleteOrder } from "../controllers/orderController.js"; // Adjust the path to your file

const router = express.Router();

router.delete("/dorders/:id", deleteOrder); // Assuming the endpoint is /dorders

export default router;
