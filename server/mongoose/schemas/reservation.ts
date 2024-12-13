import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const reservationSchema = new Schema({

    rent: {
        type: Types.ObjectId,
        ref: "Rent",
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending",
            "approved", "rejected", "cancelled"],
        default: "pending"
    },
    pickUpLocation: {
        type: Types.ObjectId,
        ref: "Location",
        required: true
    },
    dropOffLocation: {
        type: Types.ObjectId,
        ref: "Location",
        required: true
    },
    billing: {
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        townCity: {
            type: String,
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

reservationSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._v;
    }
})

export default mongoose.model("Reservation", reservationSchema);