

export type User = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    isBlocked: boolean;
    createdAt: string;
    role: UserRole;
};
export type Location = {
    _id: string,
    name: string,
    createdAt: string
}
export type Rent = {
    _id: string,
    capacity: number,
    fuel: number;
    gearBox: string;
    price: number;
    name: string;
    createdAt: string;
    currency: string;
    description: string,
    discount: number;
    category: Category;
    dropOffLocations: Location[];
    images: string[];
    pickUpLocation: Location;
    showInRecommendation: boolean
}
export type Category = {
    _id: string,
    name: string,
    createdAt: string;
    count: number
}
export type Reservation = {
    billing: {
        name: string;
        phoneNumber: string;
        address: string;
        townCity: string;
    };
    createdAt: string;
    dropOffLocation: string;
    id: string;
    pickupLocation: string;
    rent: string;
    startDate: string;
    status: ReservationStatus;
    total: number;
    updatedAt: string;
    user: string;
    _id: string
}
export type SelectOption = {
    value: string,
    label: string
}
export enum UserRole {
    Admin = "admin",
    User = "user",
}

export enum ReservationStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected",
    Canceled = "canceled"
}