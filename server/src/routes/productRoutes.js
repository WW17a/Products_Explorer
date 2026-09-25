import express from "express";
import upload from "../middleware/upload.js";
import validate from "../middleware/validate.js";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";
import { createProductSchema, updateProductSchema } from "../validations/productValidation.js";
import validateObjectId from "../middleware/validateObjectId.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware,upload.single("image"),validate(createProductSchema),createProduct);
router.put("/:id",authMiddleware,upload.single("image"),validate(updateProductSchema),updateProduct)
router.delete("/:id",authMiddleware, validateObjectId,deleteProduct);
router.get("/",getProducts);

export default router;