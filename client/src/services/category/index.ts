import axiosInstance from ".."
import { CreateCategoryRequestPayload, GetAllCategoryResponseType } from "./types"


const getAll = async () => {
    return await axiosInstance.get<GetAllCategoryResponseType>("/category")
}
const create = async (data: CreateCategoryRequestPayload) => {
    const response = await axiosInstance.post("/category", {
        name: data.name,
    });

    return response.data;
}
const categoryService = {
    getAll, create
}

export default categoryService