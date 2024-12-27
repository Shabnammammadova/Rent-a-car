import axiosInstance from ".."
import { CreateLocationRequestPayload, GetAllLocationResponseType, GetByIdLocationResponseType } from "./types"

const getAll = async () => {
    return await axiosInstance.get<GetAllLocationResponseType>("/location")
}


const getById = async (id: string) => {
    return await axiosInstance.get<GetByIdLocationResponseType>(`/location/${id}`)
}

const create = async (data: CreateLocationRequestPayload) => {
    const response = await axiosInstance.post("/location", {
        name: data.name,
    });

    return response.data;
}

const edit = async (data: CreateLocationRequestPayload & { id?: string }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    return await axiosInstance.put(`/location/${data.id}`, formData)
}


const locationService = {
    getAll,
    create,
    getById,
    edit
}

export default locationService