import axiosInstance from ".."
import { CreateRentRequestPayload, GetAllRentResponseType, GetByIdRentResponseType } from "./types"


const getAll = async (pageParams?: { take?: number, skip?: number, type?: "recommended" | "popular" }, searchParamsStr?: string) => {

    const searchParams = new URLSearchParams(searchParamsStr);
    if (pageParams?.take) searchParams.append("take", pageParams.take.toString())
    if (pageParams?.skip) searchParams.append("skip", pageParams.skip.toString())
    if (pageParams?.type) searchParams.append("type", pageParams.type)
    return await axiosInstance.get<GetAllRentResponseType>(`/rent?${searchParams.toString()}`)
}
const getById = async (id: string) => {
    return await axiosInstance.get<GetByIdRentResponseType>(`/rent/${id}`)
}
const create = async (data: CreateRentRequestPayload) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("fuel", data.fuel.toString());
    formData.append("gearBox", data.gearBox);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("capacity", data.capacity.toString());
    formData.append("discount", data.discount.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("pickUpLocation", data.pickUpLocation);
    data.dropOffLocations.forEach((location) => {
        formData.append("dropOffLocations", location)
    });
    if (data.images)
        Array.from(data.images).forEach((image) => {
            formData.append("images", image)
        });
    formData.append("showInRecommendation", data.showInRecommendation.toString());

    return await axiosInstance.post("/rent", formData)
}

const edit = async (data: CreateRentRequestPayload & { id?: string }) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("fuel", data.fuel.toString());
    formData.append("gearBox", data.gearBox);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("capacity", data.capacity.toString());
    formData.append("discount", data.discount.toString());
    formData.append("categoryId", data.categoryId);
    formData.append("pickUpLocation", data.pickUpLocation);
    data.dropOffLocations.forEach((location, index) => {
        formData.append(`dropOffLocations[${index}]`, location)
    });

    if (data.images)
        Array.from(data.images).forEach((image) => {
            formData.append(`images`, image)
        });
    formData.append("showInRecommendation", data.showInRecommendation.toString());

    return await axiosInstance.put(`/rent/${data.id}`, formData)
}

const rentService = {
    getAll,
    getById,
    create,
    edit
}

export default rentService