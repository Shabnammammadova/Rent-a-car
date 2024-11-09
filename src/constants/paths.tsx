export const paths = {
    HOME: "/",
    LIST: "/list",
    DETAIL: (id = ":id") => `/detail/${id}`,
    PAYMENT: "/payment"
}