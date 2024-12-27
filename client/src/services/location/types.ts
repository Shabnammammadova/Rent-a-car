import { Location } from "@/types"

export type GetAllLocationResponseType = {
    items: Location[];
    message: string
}
export type CreateLocationRequestPayload = {
    name: string;
}
export type GetByIdLocationResponseType = {
    item: Location;
    message: string
}