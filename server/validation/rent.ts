import { Schema } from "express-validator";

export const getAllRentSchema: Schema = {
    type: {
        in: ["query"],
        matches: {
            options: [/^(recommended | popular)$/],
            errorMessage: "type must be either recommend or popular"
        },
        optional: true
    },
    take: {
        in: ["query"],
        isNumeric: true,
        optional: true
    },
    skip: {
        in: ["query"],
        isNumeric: true,
        optional: true
    },
    search: {
        in: ["query"],
        isString: true,
        optional: true
    },
    category: {
        in: ["query"],
        isString: true,
        optional: true
    },
    capacity: {
        in: ["query"],
        isNumeric: true,
        optional: true
    },
    "min_price": {
        in: ["query"],
        isNumeric: true,
        optional: true
    },
    "max_price": {
        in: ["query"],
        isNumeric: true,
        optional: true
    },
    "pickup_location": {
        in: ["query"],
        isString: true,
        optional: true
    },
    "pickup_date": {
        in: ["query"],
        isString: true,
        optional: true,
        notEmpty: true
    },
    "pickup_time": {
        in: ["query"],
        isString: true,
        optional: true
    },
    "dropoff_location": {
        in: ["query"],
        isString: true,
        optional: true
    },
    "dropoff_date": {
        in: ["query"],
        isString: true,
        optional: true
    },
    "dropoff_time": {
        in: ["query"],
        isString: true,
        optional: true
    }
}