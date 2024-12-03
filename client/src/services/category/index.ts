import axiosInstance from ".."
import { GetAllCategoryResponseType } from "./types"


const getAll = async () => {
    return await axiosInstance.get<GetAllCategoryResponseType>("/category")
}

const categoryService = {
    getAll
}

export default categoryService