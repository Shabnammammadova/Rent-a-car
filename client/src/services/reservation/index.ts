import axiosInstance from "..";
import { CreateReservationRequestPayload } from "./types";

const create = async (data: CreateReservationRequestPayload) => {
    return await axiosInstance.post("/reservation", data)
}

const reservationService = { create };

export default reservationService