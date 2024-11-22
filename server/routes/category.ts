import { Router } from "express";
import categoryController from "../controllers/location"
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validation";
import { categorySchema } from "../validation/category";
const router = Router()

router.get("/", categoryController.getAll);
router.post("/", authorize({ isAdmin: true }),
    validateSchema(categorySchema),
    categoryController.create),
    router.put("/:id", authorize({ isAdmin: true }),
        validateSchema(categorySchema),
        categoryController.update),
    router.delete("/:id", authorize({ isAdmin: true }),
        categoryController.remove
    )

export default router;