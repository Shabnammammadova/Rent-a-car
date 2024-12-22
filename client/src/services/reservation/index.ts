import axiosInstance from "..";
import { ChangeStatusRequestPayload, CreateReservationRequestPayload } from "./types";

const getAll = async () => {
    return await axiosInstance.get("/reservation")
}



const create = async (data: CreateReservationRequestPayload) => {
    return await axiosInstance.post("/reservation", data)
}

const changeStatus = async (data: ChangeStatusRequestPayload) => {
    return await axiosInstance.patch(`/reservation/${data.id}/change-status`, {
        status: data.status
    })
}
const cancel = async (data: { id: string }) => {
    return await axiosInstance.patch(`/reservation/${data.id}/cancel`)
}


const reservationService = { create, getAll, changeStatus, cancel }

export default reservationService