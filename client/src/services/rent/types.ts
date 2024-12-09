import { Rent } from "@/types"

export type GetAllRequestQueryData = {
    type?: "recommended" | "popular";
    take?: number;
    skip?: number;
    search?: string;
    categoryId?: string;
    capacity?: number;
    min_price?: number;
    max_price?: number;
    pickup_location?: string;
    pickup_date?: string;
    pickup_time?: string;
    dropoff_location?: string;
    dropoff_date?: string
}



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