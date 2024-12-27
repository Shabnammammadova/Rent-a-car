import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    conversation: {
        type: Schema.Types.ObjectId,
        ref: "Conversation",
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

messageSchema.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
        delete ret._v;
    }
})


const Message = mongoose.model("Message", messageSchema)

export default Message

