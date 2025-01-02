import { DefaultEventsMap, Socket } from "socket.io";
import Message from "../mongoose/schemas/message";
import Conversation from "../mongoose/schemas/conversation";

export function socketHandlers(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
    const socketUsers: Record<string, string> = {}
    socket.on("register", (userId: string) => onRegister(userId, socket, socketUsers))

    socket.on("message", (data: { message: string; to: string, from: string }) => onMessage(data, socket, socketUsers))

    socket.on("disconnect", () => onDisconnect(socket, socketUsers))
}

function onRegister(userId: string, socket: Socket, socketUsers: Record<string, string>) {
    socketUsers[userId] = socket.id
}

async function onMessage({ message, to, from }: { message: string; to: string, from: string }, socket: Socket, socketUsers: Record<string, string>) {
    try {
        const socketId = socketUsers[to]

        const conversation = await Conversation.findOne({
            $or: [
                { userId: from },
                { userId: to }
            ]
        })
        // console.log("Socket ID:", socketId);
        // console.log("Message received:", { message, to, from });
        // console.log("Conversation found:", conversation);


        if (!conversation) return

        const messageItem = await Message.create({
            text: message,
            userId: from,
            userName: conversation.userName,
            conversation: conversation._id
        })


        conversation.messages.push(messageItem._id)
        await conversation.save()
        if (socketId) {
            socket.to(socketId).emit("message", messageItem)
        }
    } catch (err) {
        console.log(err);

    }

}



function onDisconnect(socket: Socket, socketUsers: Record<string, string>) {
    Object.entries(socketUsers).forEach((item) => {
        if (item[1] === socket.id) {
            delete socketUsers[item[0]]
        }
    });
}