import axiosInstance from "..";
import { ChangeStatusRequestPayload, CreateReviewRequestPayload } from "./types";

const create = async (data: CreateReviewRequestPayload) => {
    return await axiosInstance.post("/review", data)
}

const getAll = async () => {
    return await axiosInstance.get("/review")
}

const changeStatus = async (data: ChangeStatusRequestPayload) => {
    return await axiosInstance.patch(`/review/${data.id}/change-status`, {
        status: data.status
    })
}
const reviewService = { create, getAll, changeStatus }

export default reviewService