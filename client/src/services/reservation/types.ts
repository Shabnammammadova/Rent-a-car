import { Reservation } from "@/types"

export type CreateReservationRequestPayload = {
    billingAddress: string,
    billingTownCity: string,
    billingName: string,
    billingPhoneNumber: string,
    startDate: string,
    endData: string,
    pickupLocation: string
    dropOffLocation: string,
    rentId: string
}

export type CreateReservationResponseType = {
    item?: Reservation,
    message: string
}