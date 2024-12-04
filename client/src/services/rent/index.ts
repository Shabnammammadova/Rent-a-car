import axiosInstance from ".."
import { GetAllRentResponseType } from "./types"


const getAll = async () => {
    return await axiosInstance.get<GetAllRentResponseType>("/rent")
}

const rentService = {
    getAll
}

export default rentService