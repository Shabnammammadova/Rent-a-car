import { Schema } from "express-validator";



export const createReservationSchema: Schema = {
    rentId: {
        in: ["body"],
        isString: true,
        notEmpty: true
    },
    startDate: {
        in: ["body"],
        isString: true,
        notEmpty: true
    },
    endDate: {
        in: ["body"],
        isString: true,
        notEmpty: true
    }
}

export const changeStatusSchema: Schema = {
    status: {
        in: ["body"],
        isString: true,
        notEmpty: true,
        isIn: {
            options: [["approved", "rejected"]]
        }
    }
}