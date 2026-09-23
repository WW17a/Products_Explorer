import express from "express";

import { signup, signin, } from "../controllers/authController.js";
import validate from "../middleware/validate.js";
import { signupSchema, signinSchema, } from "../validations/authValidation.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/signin", validate(signinSchema), signin);

export default router;