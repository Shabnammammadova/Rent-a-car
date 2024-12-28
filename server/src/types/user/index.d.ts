import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    avatar?: string | undefined | null;
    password?: string;
    isBlocked: boolean;
    role: "admin" | "user";
    resetPasswordToken: string;
    resetPasswordTokenExpires: Date
}
