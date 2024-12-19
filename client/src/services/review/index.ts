import axiosInstance from "..";
import { CreateReviewRequestPayload } from "./types";



const create = async (data: CreateReviewRequestPayload) => {
    return await axiosInstance.post("/review", data)
}




const reviewService = { create }

export default reviewService