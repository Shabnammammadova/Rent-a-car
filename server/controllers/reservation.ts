import { Request, Response } from "express";
import reservation from "../mongoose/schemas/reservation";
import Rent from "../mongoose/schemas/rent";
import Reservation from "../mongoose/schemas/reservation";
import { calculateDateDifference } from "../utils/date";
import { Rent as TRent } from "../types/schema";


const getAll = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const filter: Record<string, string> = {};
        if (user?.role !== "admin") {
            filter.user = user?._id.toString() ?? ""
        }
        const reservations = await reservation.find(filter)
            .populate("rent", "images price currency name description")
            .populate("pickUpLocation")
            .populate("pickUpLocation")



        reservations.forEach((reservation) => {
            (reservation.rent as TRent).images = (reservation.rent as TRent).images.map((image) => {
                if (image.includes(process.env.BASE_URL!)) return image;
                return `${process.env.BASE_URL}/public/rent/${image}`
            })
        })

        res.json({
            items: reservations,
            message: "Reservations fetched succesfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: "Internal Server Error"
        })

    }
}



const create = async (req: Request, res: Response) => {
    try {
        const { startDate, endDate, dropOffLocation, pickUpLocation, billingName, billingAddress, billingPhoneNumber, billingTownCity, rentId } = req.matchedData

        const rent = await Rent.findById(rentId);
        if (!rent) {
            res.status(404).json({ message: "Rent not found" })
            return
        }

        const exitReservation = await Reservation.findOne({
            rent: rentId,
            startDate: { $lte: endDate },
            endDate: { $gte: startDate },
            status: {
                $in: ["pending", "approved"]
            },
        });
        if (exitReservation) {
            res
                .status(400)
                .json({ message: "This rent is already between thesw dates" });
            return
        }

        const dateCount = calculateDateDifference(startDate, endDate)
        const total = dateCount * rent.price
        const reservation = new Reservation({
            rent: rentId,
            user: req.user?._id,
            pickUpLocation,
            dropOffLocation,
            startDate,
            endDate,
            total,
            billing: {
                name: billingName,
                address: billingAddress,
                phoneNumber: billingPhoneNumber,
                townCity: billingTownCity,
            },
        })
        await reservation.save()
        res.json({
            message: "Reservation created  succesfully",
            item: reservation
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}
const cancel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findOne({
            _id: id,
            user: req.user?._id,
            status: "pending"
        })
        if (!reservation) {
            res.status(404).json({ message: "Reservation not found" })
            return
        }
        reservation.status = "cancelled"

        await reservation.save()
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const changeStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.matchedData;
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            res.status(404).json({
                message: "Reservation not found"
            });
            return
        }


        if (reservation.status === "cancelled" || reservation.status === "rejected") {
            res.status(400).json({
                message: "Reservation is already cancelled or rejected"
            })
            return
        }


        reservation.status = status;
        await reservation.save();

        res.json({
            message: "Reservation status updated succesfully",
            item: reservation
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}

export default {
    getAll,
    create,
    cancel,
    changeStatus
}