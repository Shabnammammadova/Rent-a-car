import { Request, Response } from "express";
import Conversation from "../mongoose/schemas/conversation";

const getAll = async (_: Request, res: Response) => {
    try {
        const conversation = await Conversation.find()
        res.status(200).json({
            message: "Conversations fetched successfully",
            items: conversation
        });
        console.log("Fetched conversation:", conversation);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error")
    }
}

const getByUserId = async (req: Request, res: Response) => {
    try {
        let { userId } = req.params;
        if (req.isAuthenticated()) {
            userId = req.user._id.toString()
        }
        console.log("UserId:", userId);
        const conversation = await Conversation.findOne({
            userId
        }).populate("messages")

        if (!conversation) {
            res.status(404).json({
                message: "Conversation not found"

            })
            return
        }
        res.status(200).json({
            message: "Conversation fetched successfully",
            item: conversation,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error")
    }
}


const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log("Conversation ID:", id);

        const conversation = await Conversation.findById(id).populate("messages");
        if (!conversation) {
            res.status(404).json({
                message: "Conversation not found"
            });
            return
        }
        res.status(200).json({
            message: "Conversation fetched successfully",
            item: conversation
        })
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error")
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { userId, userEmail, userName } = req.matchedData;

        let userData = {
            userId,
            userEmail,
            userName
        }


        if (req.isAuthenticated()) {
            userData = {
                userId: req.user._id,
                userEmail: req.user.email,
                userName: `${req.user.name} ${req.user.surname}`
            }
        }


        const conversation = await Conversation.create(userData);

        res.status(201).json({
            message: "Conversation created successfully ",
            item: conversation
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error")
    }
}

export default {
    create,
    getAll,
    getByUserId,
    getById
}