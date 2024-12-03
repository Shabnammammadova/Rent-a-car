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
export type Category = {
    _id: string,
    name: string,
    createdAt: string;
    count: number
}
export type SelectOption = {
    value: string,
    label: string
}
export enum UserRole {
    Admin = "admin",
    User = "user",
}