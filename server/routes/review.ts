import { Router } from "express";
import reviewController from "../controllers/review"
import { authorize } from "../middlewares/user";
import validateSchema from "../middlewares/validation";
import { changeStatusSchema, createReviewSchema } from "../validation/review";


const router = Router()

router.get("/", authorize({ isAdmin: true }), reviewController.getAll);


router.get("/:rentId", reviewController.getByRentId)
router.post("/", authorize({}), validateSchema(createReviewSchema), reviewController.create)


router.patch(
    "/:id/change-status",
    authorize({ isAdmin: true }),
    validateSchema(changeStatusSchema),
    reviewController.changeStatus
)

export default router