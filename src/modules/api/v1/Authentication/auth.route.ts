import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/auth/signup", authController.regster )
router.post("/auth/signin", authController.login )

export const authRouter = router;