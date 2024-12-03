import axiosInstance from "..";
import { RegisterRequestPayload, AuthResponseType, LoginRequestPayload, ForgotPasswordPayload, ResetPasswordPayload } from "./types";

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




const forgotPassword = async (payload: ForgotPasswordPayload) => {
    return await axiosInstance.post("/auth/forgot-password", payload);
};


const resetPassword = async (payload: ResetPasswordPayload) => {
    return await axiosInstance.post("/auth/reset-password", payload);
};
const authService = { login, register, getCurrentUser, logout, forgotPassword, resetPassword };
export default authService