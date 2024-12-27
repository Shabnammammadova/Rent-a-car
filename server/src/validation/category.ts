import { Schema } from "express-validator";

export const categorySchema: Schema = {
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name must be a string",
        },
        notEmpty: {
            errorMessage: "Name is required",
        },
    },
};