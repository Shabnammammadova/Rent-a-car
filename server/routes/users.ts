import { Router } from "express";
import { authorize } from "../middlewares/user";
import User from "../mongoose/schemas/user";
import { changeUserRoleSchema, findUserSchema } from "../validation/user";
import validateSchema from "../middlewares/validation";


const router = Router();

router.get("/", authorize({ isAdmin: true }), async (req, res) => {
    const users = await User.find().select([
        "name",
        "surname",
        "email",
        "role",
    ]);

    res.json({
        users: users.map((user) => ({
            ...user.toObject(),
            id: user._id,
            _id: undefined,
        })),
    });
});

router.patch(
    "/change-role/:id",
    authorize({ isAdmin: true }),
    validateSchema(changeUserRoleSchema),
    async (req, res) => {
        const { id } = req.params;
        const { role } = req.body;

        const user = await User.findById(id).select([
            "role",
            "email",
            "name",
            "surname",
        ]);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.role === role) {
            return res.status(400).json({ message: "User already has this role" });
        }

        user.role = role;
        await user.save();

        return res.json({ message: "Role changed successfully", user });
    }
);


router.delete(
    "/:id",
    authorize({ isAdmin: true }),
    validateSchema(findUserSchema),
    async (req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            await user.deleteOne();

            res.send(user);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: "Something went wrong!" });
        }
    }
);

export default router;