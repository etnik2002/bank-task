import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { loginLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

router.post("/login", loginLimiter, authController.login.bind(authController));

export default router;
