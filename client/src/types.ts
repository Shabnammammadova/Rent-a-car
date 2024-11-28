export type User = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    isBlocked: boolean;
    createdAt: string;
    role: UserRole;
};

export enum UserRole {
    Admin = "admin",
    User = "user",
}