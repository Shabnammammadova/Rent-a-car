import axiosInstance from ".."
import { CreateRentRequestPayload, GetAllRentResponseType, GetAllRequestQueryData, GetByIdRentResponseType } from "./types"


const getAll = async (queryData: GetAllRequestQueryData) => {

    const searchParams = new URLSearchParams();
    const keys = Object.keys(queryData);

    keys.forEach((key) => {
        if (queryData[key as keyof GetAllRequestQueryData]) {
            searchParams.append(key, String(queryData[key as keyof GetAllRequestQueryData]))
        }
    })


    // if (queryData.type) searchParams.append("type", queryData.type);
    // if (queryData.take) searchParams.append("take", queryData.take.toString());
    // if (queryData.skip) searchParams.append("skip", queryData.skip.toString())
    // if (queryData.search) searchParams.append("search", queryData.search);
    // if (queryData.categoryId) searchParams.append("categoryId", queryData.categoryId);
    // if (queryData.capacity) searchParams.append("capacity", queryData.capacity.toString());
    // if (queryData.min_price) searchParams.append("min_price", queryData.min_price.toString());
    // if (queryData.max_price) searchParams.append("max_price", queryData.max_price.toString());
    // if (queryData.pickup_location) searchParams.append("pickup_location", queryData.pickup_location);
    // if (queryData.pickup_date) searchParams.append("pickup_date", queryData.pickup_date);
    // if (queryData.pickup_time) searchParams.append("pickup_time", queryData.pickup_time);
    // if (queryData.dropoff_location) searchParams.append("dropoff_location", queryData.dropoff_location);
    // if (queryData.dropoff_date) searchParams.append("dropoff_date", queryData.dropoff_date)


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