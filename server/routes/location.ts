import { Router } from "express";
import locationController from "../controllers/location"
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validation";
import { locationSchema } from "../validation/location";
const router = Router()

router.get("/", locationController.getAll);
router.post("/", authorize({ isAdmin: true }),
    validateSchema(locationSchema),
    locationController.create),
    router.put("/:id", authorize({ isAdmin: true }),
        validateSchema(locationSchema),
        locationController.update),
    router.delete("/:id", authorize({ isAdmin: true }),
        locationController.remove
    )


export default router