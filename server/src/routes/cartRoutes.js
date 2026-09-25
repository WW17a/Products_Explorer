import express from "express";

import { addToCart, getCart, updateCartItem, removeFromCart, clearCart, } from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/items", authMiddleware, addToCart);
router.patch("/items/:id", authMiddleware, validateObjectId, updateCartItem);
router.delete("/items/:id", authMiddleware, validateObjectId, removeFromCart);
router.delete("/", authMiddleware, clearCart);

export default router;