import { Router } from "express";

import {
    forgotPasswordSchema,
    registerSchema,
    resetPasswordSchema,
} from "../validation/auth";

import { authenticate, authorize } from "../middlewares/user";

import validateSchema from "../middlewares/validation";
import authController from "../controllers/auth";
import passport from "passport";

const router = Router();

router.post("/login", authenticate, authController.login);

router.post("/register", validateSchema(registerSchema), authController.register);

router.post("/logout", authController.logout);

router.get("/current-user", authorize({}), authController.currentUser);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    res.redirect("http://localhost:5173");
}
);

router.post(
    "/forgot-password",
    validateSchema(forgotPasswordSchema),
    authController.forgotPassword
);

router.post(
    "/reset-password",
    validateSchema(resetPasswordSchema),
    authController.resetPassword
);
export default router;