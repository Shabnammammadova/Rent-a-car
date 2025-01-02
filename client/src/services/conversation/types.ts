import { Conversation } from "@/types";



export type GetConversationType = {
    item: Conversation;
    message: string
}

export type GetAllConversationType = {
    items: Conversation[],
    message: string
}