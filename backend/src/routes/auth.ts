import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/facebook/callback", authController.facebookCallback);
router.post("/facebook/callback", authController.googleCallback);

export default router;
