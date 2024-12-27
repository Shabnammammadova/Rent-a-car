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
    },
    pickUpLocation: {
        in: ["body"],
        isString: true,
        notEmpty: true,
    },
    dropOffLocation: {
        in: ["body"],
        isString: true,
        notEmpty: true
    },
    billingName: {
        in: ["body"],
        isString: true,
        notEmpty: true
    },
    billingPhoneNumber: {
        in: ["body"],
        isString: true,
        notEmpty: true
    },
    billingAddress: {
        in: ["body"],
        isString: true,
        notEmpty: true,
    },
    billingTownCity: {
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