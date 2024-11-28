import axiosInstance from "..";
import { RegisterRequestPayload, AuthResponseType, LoginRequestPayload } from "./types";

const login = async (payload: LoginRequestPayload) => {
    return await axiosInstance.post<AuthResponseType>("/auth/login", payload)
};

const register = async (payload: RegisterRequestPayload) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); return await axiosInstance.post<AuthResponseType>("/auth/register", payload)
};


const logout = async () => {
    return axiosInstance.post("/auth/logout")
}
const getCurrentUser = async () => {
    return await axiosInstance.get("/auth/current-user")
}

const authService = { login, register, getCurrentUser, logout };
export default authService