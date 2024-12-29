import express, { Request, Response } from "express"
import multer from "multer"
import path from "path"
import User from "../mongoose/schemas/user"


const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/uploads"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    },
})

const upload = multer({ storage })

router.post(
    "/avatar",
    upload.single("avatar"),
    async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" })
            return
        }

        const avatarUrl = `../public/uploads/${req.file.filename}`
        const { userId } = req.body

        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { avatar: avatarUrl },
                { new: true }
            )

            if (!user) {
                res.status(404).json({ message: "User not found" })
                return
            }

            res.status(200).json({ message: "Avatar updated", user })
        } catch (error) {
            res.status(500).json({ message: "Error updating avatar", error })
        }
    }
)

export default router
