import { Router } from "express";
import rentController from "../controllers/rent"
import validateSchema from "../middlewares/validation";
import { createRentSchema, editRentSchema, getAllRentSchema } from "../validation/rent";
import { authorize } from "../middlewares/user";
import upload from "../middlewares/multer";
const router = Router();
router.get("/", validateSchema(getAllRentSchema), rentController.getAll)
router.post("/", authorize({ isAdmin: true }),
    upload.array("images", 8),
    validateSchema(createRentSchema),
    rentController.create
)
router.put("/Iid", authorize({ isAdmin: true }),
    upload.array("images", 8),
    validateSchema(editRentSchema),
    rentController.edit
)
router.delete("/:id", authorize({ isAdmin: true }), rentController.remove)
export default router