import { Category } from "@/types";


export type GetAllCategoryResponseType = {
    items: Category[];
    message: string
}

export type CreateCategoryRequestPayload = {
    name: string;
}