import { Schema } from "express-validator";


export const createReviewSchema: Schema = {
    reservationId: {
        in: ["body"],
        isString: true,
        notEmpty: true
    },
    rentId: {
        in: ["body"],
        isString: true,
        notEmpty: true
    }, rating: {
        in: ["body"],
        isInt: true,
        notEmpty: true,
        isLength: {
            options: {
                min: 1, max: 5
            }
        }
    },
    content: {
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
