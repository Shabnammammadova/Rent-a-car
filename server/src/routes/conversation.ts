import { Router } from "express";
import conversationController from "../controllers/conversation"
import validateSchema from "../middlewares/validation";
import { conversationSchema } from "../validation/conversation";
import { authorize } from "../middlewares/user";

const router = Router()

router.get("/", authorize({ isAdmin: true }), conversationController.getAll)

router.get("/:id", authorize({ isAdmin: true }), conversationController.getById)

router.get("/user/:userId", conversationController.getByUserId)

router.post("/",
    validateSchema(conversationSchema),
    conversationController.create);

export default router;