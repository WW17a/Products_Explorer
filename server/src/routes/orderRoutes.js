
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createOrderController } from "../controllers/orderController.js";
import validate from "../middleware/validate.js";
import { createOrderSchema } from "../validations/orderValidation.js";
const router = express.Router();

router.post("/", authMiddleware,validate(createOrderSchema), createOrderController);

export default router;

