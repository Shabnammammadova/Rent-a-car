import mongoose from "mongoose";
const { Schema } = mongoose;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

locationSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._v;
    }
})

export default mongoose.model("Location", locationSchema);