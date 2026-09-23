import express from "express";
import upload from "../middleware/upload.js";
import validate from "../middleware/validate.js";
import { createProduct, getProducts } from "../controllers/productController.js";
import { createProductSchema } from "../validations/productValidation.js";

const router = express.Router();

router.post("/",upload.single("image"),validate(createProductSchema),createProduct);
router.get("/",getProducts);

export default router;