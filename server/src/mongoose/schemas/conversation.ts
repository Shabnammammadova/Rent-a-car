import mongoose from "mongoose";
const { Schema } = mongoose;

const conversationSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    messages: {
        type: [Schema.Types.ObjectId],
        ref: "Message"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

conversationSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._v;
    }
})


const Conversation = mongoose.model("Conversation", conversationSchema)

export default Conversation

