import { Conversation } from "@/types";



export type GetConversationType = {
    items: Conversation;
    message: string
}

export type GetAllConversationType = {
    items: Conversation[],
    message: string
}