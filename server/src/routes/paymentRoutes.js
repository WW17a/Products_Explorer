import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { capturePaymentController, createPaymentController } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create", authMiddleware, createPaymentController);
router.post("/:paymentId/capture", authMiddleware, capturePaymentController);

export default router;