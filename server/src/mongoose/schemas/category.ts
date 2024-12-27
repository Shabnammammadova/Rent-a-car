import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rents: [
        {
            type: Schema.Types.ObjectId,
            ref: "Rent",

        }
    ]
});

categorySchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._v;
    }
})

export default mongoose.model("Category", categorySchema);

