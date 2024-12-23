import { User } from "@/types"

export type LoginRequestPayload = {
    email: string,
    password: string,
}

export type AuthResponseType = {
    message: string,
    user: User
}

export type RegisterRequestPayload = {
    name: string,
    surname: string,
    email: string,
    password: string,
}

export type ForgotPasswordPayload = {
    email: string
}

export type ResetPasswordPayload = {
    password: string,
    token: string
}