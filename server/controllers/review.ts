import { Request, Response } from "express"
import Review from "../mongoose/schemas/review"
import Reservation from "../mongoose/schemas/reservation";

const getAll = async (req: Request, res: Response) => {
    try {
        const review = await Review.find().populate("author").populate("rent");
        res.status(200).json(review)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const { reservationId, rentId, content, rating } = req.matchedData;
        const reservation = await Reservation.findById(reservationId);

        if (!reservation) {
            res.status(404).json({ message: "Reservation not found" })
            return
        }
        if (reservation.hasReview) {
            res.status(400).json({ message: "Reservation already has a review" })
            return
        }

        const review = await Review.create({
            author: user!._id,
            rent: rentId,
            content,
            rating
        });

        reservation.hasReview = true;
        await reservation.save();

        res.status(201).json({
            message: "Review created successfully",
            review
        })
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}
export default {
    getAll, create
}