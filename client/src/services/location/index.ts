import axiosInstance from ".."
import { GetAllLocationResponseType } from "./types"

const getAll = async () => {
    return await axiosInstance.get<GetAllLocationResponseType>("/location")
}

const locationService = {
    getAll
}

export default locationService