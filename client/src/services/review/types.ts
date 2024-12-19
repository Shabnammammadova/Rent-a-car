export type CreateReviewRequestPayload = {
    rating: number;
    content: string;
    rentId: string;
    reservationId: string
}