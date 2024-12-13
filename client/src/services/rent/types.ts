import { Rent } from "@/types"


export type GetAllRentResponseType = {
    items: Rent[]
    message: string,
    total: number,
    skip: number,
    take: number
}
export type GetByIdRentResponseType = {
    item: Rent;
    message: string
}

export type CreateRentRequestPayload = {
    name: string;
    fuel: number;
    gearBox: string;
    price: number;
    description: string;
    capacity: number;
    discount: number;
    categoryId: string;
    dropOffLocations: string[];
    images?: File[];
    pickUpLocation: string;
    showInRecommendation: boolean
}