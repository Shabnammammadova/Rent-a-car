import { Reservation, ReservationStatus } from "@/types"

export type CreateReservationRequestPayload = {
    billingAddress: string,
    billingTownCity: string,
    billingName: string,
    billingPhoneNumber: string,
    startDate: string,
    endDate: string,
    pickUpLocation: string
    dropOffLocation: string,
    rentId: string
}

export type CreateReservationResponseType = {
    item?: Reservation,
    message: string
}

export type ChangeStatusRequestPayload = {
    id: string;
    status: ReservationStatus.Approved | ReservationStatus.Rejected
}